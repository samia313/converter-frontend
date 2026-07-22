import { Redis } from '@upstash/redis';

/**
 * Production-grade Redis-based job queue using Upstash
 * Handles PDF processing jobs with retries, status tracking, and monitoring
 */

export type JobType = 'compress' | 'merge' | 'split' | 'convert' | 'ocr' | 'edit' | 'rotate' | 'crop';
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'retry';

export interface ConversionJob {
  id: string;
  type: JobType;
  status: JobStatus;
  inputSize: number;
  outputSize?: number;
  userId?: string;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  retries: number;
  maxRetries: number;
  error?: string;
  fileUrl?: string;
  expiresAt: number;
  metadata?: Record<string, any>;
}

export interface ProcessingMetrics {
  totalJobs: number;
  pendingJobs: number;
  processingJobs: number;
  completedJobs: number;
  failedJobs: number;
  averageProcessingTime: number;
  successRate: number;
}

class QueueService {
  private redis: Redis;
  private readonly QUEUE_PREFIX = 'pdf-queue:';
  private readonly JOB_PREFIX = 'pdf-job:';
  private readonly METRICS_PREFIX = 'pdf-metrics:';
  private readonly DEFAULT_TTL = 86400 * 7; // 7 days
  private readonly JOB_TIMEOUT = 300; // 5 minutes

  constructor() {
    const url = process.env.REDIS_URL || process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      throw new Error('Redis connection details not configured');
    }

    this.redis = new Redis({
      url,
      token,
    });
  }

  /**
   * Enqueue a new conversion job
   */
  async enqueueJob(
    type: JobType,
    inputSize: number,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<ConversionJob> {
    const jobId = this.generateJobId();
    const now = Date.now();

    const job: ConversionJob = {
      id: jobId,
      type,
      status: 'pending',
      inputSize,
      userId,
      createdAt: now,
      expiresAt: now + this.DEFAULT_TTL * 1000,
      retries: 0,
      maxRetries: 3,
      metadata,
    };

    // Store job in Redis
    const key = `${this.JOB_PREFIX}${jobId}`;
    await this.redis.setex(key, this.DEFAULT_TTL, JSON.stringify(job));

    // Add to queue
    const queueKey = `${this.QUEUE_PREFIX}${type}:queue`;
    await this.redis.lpush(queueKey, jobId);

    console.log('[v0] Job enqueued:', {
      jobId,
      type,
      inputSize,
      userId,
    });

    return job;
  }

  /**
   * Get job status
   */
  async getJob(jobId: string): Promise<ConversionJob | null> {
    const key = `${this.JOB_PREFIX}${jobId}`;
    const data = await this.redis.get(key);
    return data ? JSON.parse(data as string) : null;
  }

  /**
   * Update job status
   */
  async updateJobStatus(
    jobId: string,
    status: JobStatus,
    updates?: Partial<ConversionJob>
  ): Promise<ConversionJob | null> {
    const job = await this.getJob(jobId);
    if (!job) return null;

    const updated: ConversionJob = {
      ...job,
      status,
      ...updates,
      ...(status === 'processing' && !job.startedAt && { startedAt: Date.now() }),
      ...(status === 'completed' && !job.completedAt && { completedAt: Date.now() }),
    };

    const key = `${this.JOB_PREFIX}${jobId}`;
    await this.redis.setex(key, this.DEFAULT_TTL, JSON.stringify(updated));

    console.log('[v0] Job status updated:', {
      jobId,
      status,
      outputSize: updates?.outputSize,
    });

    return updated;
  }

  /**
   * Mark job as completed
   */
  async completeJob(jobId: string, outputSize: number, fileUrl: string): Promise<ConversionJob | null> {
    return this.updateJobStatus(jobId, 'completed', {
      outputSize,
      fileUrl,
      completedAt: Date.now(),
    });
  }

  /**
   * Mark job as failed
   */
  async failJob(jobId: string, error: string): Promise<ConversionJob | null> {
    const job = await this.getJob(jobId);
    if (!job) return null;

    // Check if we should retry
    if (job.retries < job.maxRetries) {
      console.log('[v0] Job will retry:', {
        jobId,
        attempt: job.retries + 1,
        maxRetries: job.maxRetries,
      });

      // Put back in queue for retry
      const queueKey = `${this.QUEUE_PREFIX}${job.type}:queue:retry`;
      await this.redis.lpush(queueKey, jobId);

      return this.updateJobStatus(jobId, 'retry', {
        retries: job.retries + 1,
        error,
      });
    }

    console.error('[v0] Job failed permanently:', {
      jobId,
      error,
      retries: job.retries,
    });

    return this.updateJobStatus(jobId, 'failed', {
      error,
      retries: job.retries + 1,
    });
  }

  /**
   * Get next pending job from queue
   */
  async getNextJob(type: JobType): Promise<ConversionJob | null> {
    const queueKey = `${this.QUEUE_PREFIX}${type}:queue`;
    const jobId = await this.redis.rpop(queueKey);

    if (!jobId) return null;

    const job = await this.getJob(jobId as string);
    if (job && job.status === 'pending') {
      await this.updateJobStatus(job.id, 'processing');
      return job;
    }

    return null;
  }

  /**
   * Get queue metrics
   */
  async getMetrics(): Promise<ProcessingMetrics> {
    const keys = await this.redis.keys(`${this.JOB_PREFIX}*`);

    let totalJobs = 0;
    let pendingJobs = 0;
    let processingJobs = 0;
    let completedJobs = 0;
    let failedJobs = 0;
    let totalProcessingTime = 0;
    let completedCount = 0;

    for (const key of keys) {
      const data = await this.redis.get(key);
      if (!data) continue;

      const job = JSON.parse(data as string) as ConversionJob;
      totalJobs++;

      if (job.status === 'pending') pendingJobs++;
      else if (job.status === 'processing') processingJobs++;
      else if (job.status === 'completed') {
        completedJobs++;
        if (job.startedAt && job.completedAt) {
          totalProcessingTime += job.completedAt - job.startedAt;
          completedCount++;
        }
      } else if (job.status === 'failed') failedJobs++;
    }

    return {
      totalJobs,
      pendingJobs,
      processingJobs,
      completedJobs,
      failedJobs,
      averageProcessingTime: completedCount > 0 ? totalProcessingTime / completedCount : 0,
      successRate: totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0,
    };
  }

  /**
   * Health check for queue
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    message: string;
    metrics: ProcessingMetrics;
  }> {
    try {
      const metrics = await this.getMetrics();

      if (metrics.failedJobs > metrics.completedJobs * 0.5) {
        return {
          status: 'degraded',
          message: 'High failure rate detected',
          metrics,
        };
      }

      if (metrics.processingJobs > 100) {
        return {
          status: 'degraded',
          message: 'Queue backlog detected',
          metrics,
        };
      }

      return {
        status: 'healthy',
        message: 'Queue is operational',
        metrics,
      };
    } catch (error) {
      console.error('[v0] Queue health check failed:', error);
      return {
        status: 'unhealthy',
        message: error instanceof Error ? error.message : 'Unknown error',
        metrics: {
          totalJobs: 0,
          pendingJobs: 0,
          processingJobs: 0,
          completedJobs: 0,
          failedJobs: 0,
          averageProcessingTime: 0,
          successRate: 0,
        },
      };
    }
  }

  /**
   * Clear old/expired jobs
   */
  async cleanup(): Promise<number> {
    const keys = await this.redis.keys(`${this.JOB_PREFIX}*`);
    let cleaned = 0;

    for (const key of keys) {
      const data = await this.redis.get(key);
      if (data) {
        const job = JSON.parse(data as string) as ConversionJob;
        if (job.expiresAt < Date.now()) {
          await this.redis.del(key);
          cleaned++;
        }
      }
    }

    console.log('[v0] Cleanup completed:', { cleaned });
    return cleaned;
  }

  /**
   * Generate unique job ID
   */
  private generateJobId(): string {
    return `job-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  }
}

// Singleton instance
let queueService: QueueService;

export function getQueueService(): QueueService {
  if (!queueService) {
    queueService = new QueueService();
  }
  return queueService;
}
