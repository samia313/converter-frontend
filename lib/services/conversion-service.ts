import { getQueueService, ConversionJob, JobType } from './queue';
import { getStorageService } from './storage-service';
import { getLoggingService } from './logging-service';
import { getMetricsService } from './metrics-service';

/**
 * Centralized conversion service
 * Orchestrates the entire PDF processing pipeline
 */

export interface ConversionRequest {
  type: JobType;
  files?: File[];
  buffer?: Buffer;
  options?: Record<string, any>;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface ConversionResult {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  outputUrl?: string;
  outputSize?: number;
  processingTime?: number;
  error?: string;
}

class ConversionService {
  private queue = getQueueService();
  private storage = getStorageService();
  private logging = getLoggingService();
  private metrics = getMetricsService();

  /**
   * Submit a conversion job
   */
  async submitConversion(request: ConversionRequest): Promise<ConversionResult> {
    const startTime = Date.now();

    try {
      // Validate input
      const validation = this.validateInput(request);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Calculate input size
      let inputSize = 0;
      if (request.buffer) {
        inputSize = request.buffer.length;
      } else if (request.files) {
        inputSize = request.files.reduce((sum, f) => sum + f.size, 0);
      }

      // Check file size limits
      if (inputSize > 500 * 1024 * 1024) { // 500MB
        throw new Error('File size exceeds maximum limit of 500MB');
      }

      // Enqueue job
      console.log('[v0] Submitting conversion:', {
        type: request.type,
        inputSize,
        userId: request.userId,
      });

      const job = await this.queue.enqueueJob(
        request.type,
        inputSize,
        request.userId,
        request.metadata
      );

      // Store input file if buffer provided
      if (request.buffer && request.options?.inputFileName) {
        await this.storage.uploadFile(
          job.id,
          'input',
          request.options.inputFileName,
          request.buffer,
          'application/pdf'
        );
      }

      // Log submission
      await this.logging.logConversion(job.id, 'info', 'Conversion job submitted', {
        type: request.type,
        inputSize,
        userId: request.userId,
      });

      return {
        jobId: job.id,
        status: 'queued',
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error('[v0] Conversion submission failed:', errorMsg);

      await this.logging.logError('conversion_submit_failed', errorMsg, {
        type: request.type,
        userId: request.userId,
      });

      throw error;
    }
  }

  /**
   * Get conversion status
   */
  async getConversionStatus(jobId: string): Promise<ConversionResult> {
    const job = await this.queue.getJob(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    return {
      jobId: job.id,
      status: job.status as any,
      outputUrl: job.fileUrl,
      outputSize: job.outputSize,
      processingTime: job.completedAt && job.startedAt ? job.completedAt - job.startedAt : undefined,
      error: job.error,
    };
  }

  /**
   * Process a conversion job (called by worker)
   */
  async processConversion(
    job: ConversionJob,
    processor: (buffer: Buffer, options: any) => Promise<Buffer>
  ): Promise<ConversionResult> {
    const startTime = Date.now();

    try {
      // Update status to processing
      await this.queue.updateJobStatus(job.id, 'processing', {
        startedAt: Date.now(),
      });

      await this.logging.logConversion(job.id, 'info', 'Processing started', {
        type: job.type,
        inputSize: job.inputSize,
      });

      // Retrieve input file
      let inputBuffer: Buffer | null = null;
      if (job.metadata?.inputFileName) {
        inputBuffer = await this.storage.getFile(job.id, 'input');
      }

      if (!inputBuffer) {
        throw new Error('Input file not found');
      }

      // Validate input is not empty
      if (inputBuffer.length === 0) {
        throw new Error('Input file is empty');
      }

      // Process conversion
      const outputBuffer = await processor(inputBuffer, job.metadata?.options || {});

      // Validate output
      if (!outputBuffer || outputBuffer.length === 0) {
        throw new Error('Output file is empty. Conversion may have failed.');
      }

      // Validate output is valid PDF
      const headerStr = String.fromCharCode(...outputBuffer.slice(0, 5));
      if (headerStr !== '%PDF-') {
        throw new Error('Output is not a valid PDF file');
      }

      // Upload output file
      const outputFileName = `${job.type}-output-${Date.now()}.pdf`;
      const fileUrl = await this.storage.uploadFile(
        job.id,
        'output',
        outputFileName,
        outputBuffer,
        'application/pdf'
      );

      // Mark job as completed
      const processingTime = Date.now() - startTime;
      await this.queue.completeJob(job.id, outputBuffer.length, fileUrl);

      await this.logging.logConversion(job.id, 'info', 'Conversion completed', {
        outputSize: outputBuffer.length,
        processingTime,
        compressionRatio: job.type === 'compress' 
          ? Math.round((1 - outputBuffer.length / job.inputSize) * 100) 
          : undefined,
      });

      // Record metrics
      await this.metrics.recordConversion(job.type, true, processingTime, job.inputSize);

      console.log('[v0] Conversion completed:', {
        jobId: job.id,
        type: job.type,
        inputSize: job.inputSize,
        outputSize: outputBuffer.length,
        processingTime,
      });

      return {
        jobId: job.id,
        status: 'completed',
        outputUrl: fileUrl,
        outputSize: outputBuffer.length,
        processingTime,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      const processingTime = Date.now() - startTime;

      console.error('[v0] Conversion processing failed:', {
        jobId: job.id,
        error: errorMsg,
        processingTime,
      });

      // Record failure
      await this.metrics.recordConversion(job.type, false, processingTime, job.inputSize);

      // Handle retry
      const updated = await this.queue.failJob(job.id, errorMsg);

      if (updated?.status === 'retry') {
        await this.logging.logConversion(job.id, 'warn', 'Job will retry', {
          attempt: updated.retries,
          maxRetries: updated.maxRetries,
          error: errorMsg,
        });

        return {
          jobId: job.id,
          status: 'processing',
          error: errorMsg,
        };
      }

      await this.logging.logConversion(job.id, 'error', 'Conversion failed permanently', {
        error: errorMsg,
        retries: updated?.retries || 0,
      });

      await this.logging.logError(job.type, errorMsg, {
        jobId: job.id,
        inputSize: job.inputSize,
      });

      return {
        jobId: job.id,
        status: 'failed',
        error: errorMsg,
        processingTime,
      };
    }
  }

  /**
   * Validate input
   */
  private validateInput(request: ConversionRequest): { valid: boolean; error?: string } {
    if (!request.type) {
      return { valid: false, error: 'Conversion type is required' };
    }

    if (!request.buffer && !request.files) {
      return { valid: false, error: 'No input files provided' };
    }

    if (request.files && request.files.length === 0) {
      return { valid: false, error: 'No files provided' };
    }

    return { valid: true };
  }

  /**
   * Get system health
   */
  async getSystemHealth() {
    const queueHealth = await this.queue.healthCheck();
    const metrics = await this.metrics.getSystemMetrics();

    return {
      status: queueHealth.status,
      queue: queueHealth,
      metrics,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clean up expired jobs and files
   */
  async cleanup() {
    console.log('[v0] Starting cleanup...');

    const cleanedJobs = await this.queue.cleanup();
    const cleanedFiles = await this.storage.cleanup();

    console.log('[v0] Cleanup completed:', {
      cleanedJobs,
      cleanedFiles,
    });

    return { cleanedJobs, cleanedFiles };
  }
}

// Singleton instance
let conversionService: ConversionService;

export function getConversionService(): ConversionService {
  if (!conversionService) {
    conversionService = new ConversionService();
  }
  return conversionService;
}
