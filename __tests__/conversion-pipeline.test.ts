/**
 * End-to-end integration tests for the PDF processing pipeline
 * Tests all components: queue, storage, logging, and metrics
 */

import { getQueueService } from '@/lib/services/queue';
import { getStorageService } from '@/lib/services/storage-service';
import { getLoggingService } from '@/lib/services/logging-service';
import { getMetricsService } from '@/lib/services/metrics-service';
import { getConversionService } from '@/lib/services/conversion-service';

describe('PDF Processing Pipeline - Integration Tests', () => {
  let queueService: any;
  let storageService: any;
  let loggingService: any;
  let metricsService: any;
  let conversionService: any;

  beforeAll(() => {
    queueService = getQueueService();
    storageService = getStorageService();
    loggingService = getLoggingService();
    metricsService = getMetricsService();
    conversionService = getConversionService();
  });

  describe('Queue Service', () => {
    it('should enqueue a job', async () => {
      const job = await queueService.enqueueJob('compress', 1024 * 1024, 'user-123');

      expect(job).toBeDefined();
      expect(job.id).toBeDefined();
      expect(job.type).toBe('compress');
      expect(job.status).toBe('pending');
      expect(job.inputSize).toBe(1024 * 1024);
    });

    it('should retrieve a job', async () => {
      const enqueuedJob = await queueService.enqueueJob('merge', 5 * 1024 * 1024);
      const retrievedJob = await queueService.getJob(enqueuedJob.id);

      expect(retrievedJob).toBeDefined();
      expect(retrievedJob?.id).toBe(enqueuedJob.id);
      expect(retrievedJob?.type).toBe('merge');
    });

    it('should update job status', async () => {
      const job = await queueService.enqueueJob('split', 2 * 1024 * 1024);
      const updated = await queueService.updateJobStatus(job.id, 'processing');

      expect(updated?.status).toBe('processing');
      expect(updated?.startedAt).toBeDefined();
    });

    it('should complete a job', async () => {
      const job = await queueService.enqueueJob('compress', 1024 * 1024);
      const completed = await queueService.completeJob(job.id, 512 * 1024, 'https://example.com/output.pdf');

      expect(completed?.status).toBe('completed');
      expect(completed?.outputSize).toBe(512 * 1024);
      expect(completed?.fileUrl).toBe('https://example.com/output.pdf');
      expect(completed?.completedAt).toBeDefined();
    });

    it('should handle job failure and retry', async () => {
      const job = await queueService.enqueueJob('convert', 2 * 1024 * 1024);
      const failed = await queueService.failJob(job.id, 'Test error');

      expect(failed?.status).toBe('retry');
      expect(failed?.retries).toBe(1);
      expect(failed?.error).toBe('Test error');
    });

    it('should get queue metrics', async () => {
      // Enqueue multiple jobs
      await queueService.enqueueJob('compress', 1024 * 1024);
      await queueService.enqueueJob('merge', 2 * 1024 * 1024);
      await queueService.enqueueJob('split', 3 * 1024 * 1024);

      const metrics = await queueService.getMetrics();

      expect(metrics.totalJobs).toBeGreaterThanOrEqual(3);
      expect(metrics.pendingJobs).toBeGreaterThanOrEqual(0);
      expect(metrics.successRate).toBeGreaterThanOrEqual(0);
    });

    it('should check queue health', async () => {
      const health = await queueService.healthCheck();

      expect(health.status).toMatch(/healthy|degraded|unhealthy/);
      expect(health.message).toBeDefined();
      expect(health.metrics).toBeDefined();
    });
  });

  describe('Storage Service', () => {
    it('should upload a file', async () => {
      const buffer = Buffer.from('test PDF content');
      const url = await storageService.uploadFile(
        'test-conversion-1',
        'input',
        'test.pdf',
        buffer,
        'application/pdf'
      );

      expect(url).toBeDefined();
      expect(url).toContain('test-conversion-1');
    });

    it('should retrieve a file', async () => {
      const buffer = Buffer.from('test file content');
      await storageService.uploadFile(
        'test-conversion-2',
        'input',
        'test.pdf',
        buffer,
        'application/pdf'
      );

      const retrieved = await storageService.getFile('test-conversion-2', 'input');

      expect(retrieved).toBeDefined();
      expect(retrieved?.length).toBeGreaterThan(0);
    });

    it('should verify file integrity', async () => {
      const buffer = Buffer.from('test integrity content');
      await storageService.uploadFile(
        'test-conversion-3',
        'output',
        'test.pdf',
        buffer,
        'application/pdf'
      );

      // Get checksum
      const crypto = require('crypto');
      const expectedChecksum = crypto.createHash('sha256').update(buffer).digest('hex');

      const isValid = await storageService.verifyFile(
        'test-conversion-3',
        'output',
        expectedChecksum
      );

      expect(isValid).toBe(true);
    });

    it('should delete files', async () => {
      const buffer = Buffer.from('test delete content');
      await storageService.uploadFile(
        'test-conversion-delete',
        'input',
        'test.pdf',
        buffer,
        'application/pdf'
      );

      const deleted = await storageService.deleteFile('test-conversion-delete');

      expect(deleted).toBe(true);
    });

    it('should get storage stats', () => {
      const stats = storageService.getStats();

      expect(stats).toHaveProperty('fileCount');
      expect(stats).toHaveProperty('totalSize');
      expect(stats).toHaveProperty('totalSizeGB');
    });
  });

  describe('Logging Service', () => {
    it('should log conversion events', async () => {
      await loggingService.logConversion(
        'test-conversion-1',
        'info',
        'Test log message',
        { testKey: 'testValue' }
      );

      const logs = await loggingService.getConversionLogs('test-conversion-1');

      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].message).toBe('Test log message');
    });

    it('should log errors', async () => {
      await loggingService.logError('test_error', 'Test error message', {
        context: 'test',
      });

      const stats = loggingService.getStats();

      expect(stats.byLevel.error).toBeGreaterThan(0);
    });

    it('should search logs', async () => {
      await loggingService.logSystem('info', 'Test search log', {
        searchable: true,
      });

      const results = await loggingService.searchLogs('search');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should get log statistics', () => {
      const stats = loggingService.getStats();

      expect(stats).toHaveProperty('totalLogs');
      expect(stats).toHaveProperty('byLevel');
      expect(stats).toHaveProperty('byHour');
    });
  });

  describe('Metrics Service', () => {
    it('should record conversions', async () => {
      await metricsService.recordConversion('compress', true, 1000, 1024 * 1024, 512 * 1024);
      await metricsService.recordConversion('compress', true, 1500, 1024 * 1024, 512 * 1024);

      const metrics = metricsService.getMetrics('compress');

      expect(metrics?.successCount).toBe(2);
      expect(metrics?.failureCount).toBe(0);
      expect(metrics?.averageProcessingTimeMs).toBeGreaterThan(0);
    });

    it('should record failures', async () => {
      await metricsService.recordConversion('merge', false, 500, 2 * 1024 * 1024);

      const metrics = metricsService.getMetrics('merge');

      expect(metrics?.failureCount).toBeGreaterThan(0);
    });

    it('should get performance summary', async () => {
      const summary = metricsService.getPerformanceSummary();

      expect(summary).toHaveProperty('totalConversions');
      expect(summary).toHaveProperty('totalSuccesses');
      expect(summary).toHaveProperty('totalFailures');
      expect(summary).toHaveProperty('successRate');
    });

    it('should check alert conditions', async () => {
      // Record failures to trigger alert
      for (let i = 0; i < 100; i++) {
        await metricsService.recordConversion('test-fail', false, 100, 1024);
      }

      const alerts = metricsService.checkAlertConditions();

      // Should have alerts for high failure rate
      const failureAlerts = alerts.filter((a) => a.metric.includes('failure_rate'));
      expect(failureAlerts.length).toBeGreaterThan(0);
    });

    it('should get system metrics', () => {
      const metrics = metricsService.getSystemMetrics();

      expect(metrics).toHaveProperty('uptime');
      expect(metrics).toHaveProperty('memoryUsage');
      expect(metrics).toHaveProperty('conversions');
      expect(metrics).toHaveProperty('timestamp');
    });
  });

  describe('Conversion Service', () => {
    it('should validate input', async () => {
      try {
        await conversionService.submitConversion({
          type: 'compress',
          // Missing files/buffer
        });
        fail('Should have thrown error');
      } catch (error) {
        expect((error as Error).message).toContain('No input files');
      }
    });

    it('should submit conversion', async () => {
      const buffer = Buffer.from('test conversion');
      const result = await conversionService.submitConversion({
        type: 'compress',
        buffer,
        userId: 'user-123',
        options: { inputFileName: 'test.pdf' },
      });

      expect(result.jobId).toBeDefined();
      expect(result.status).toBe('queued');
    });

    it('should get conversion status', async () => {
      const buffer = Buffer.from('test status');
      const submitted = await conversionService.submitConversion({
        type: 'merge',
        buffer,
      });

      const status = await conversionService.getConversionStatus(submitted.jobId);

      expect(status.jobId).toBe(submitted.jobId);
      expect(status.status).toBe('queued');
    });

    it('should get system health', async () => {
      const health = await conversionService.getSystemHealth();

      expect(health).toHaveProperty('status');
      expect(health).toHaveProperty('queue');
      expect(health).toHaveProperty('metrics');
      expect(health).toHaveProperty('timestamp');
    });
  });

  describe('End-to-End Workflow', () => {
    it('should complete a full conversion workflow', async () => {
      // 1. Submit job
      const buffer = Buffer.from('test end-to-end');
      const submitted = await conversionService.submitConversion({
        type: 'compress',
        buffer,
        userId: 'user-e2e',
        metadata: { test: 'e2e' },
      });

      expect(submitted.status).toBe('queued');

      // 2. Check status
      let status = await conversionService.getConversionStatus(submitted.jobId);
      expect(status.status).toBe('queued');

      // 3. Process job
      const job = await queueService.getNextJob('compress');
      expect(job).toBeDefined();

      // 4. Get conversion logs
      const logs = await loggingService.getConversionLogs(submitted.jobId);
      expect(logs.length).toBeGreaterThan(0);

      // 5. Check metrics
      const metrics = metricsService.getPerformanceSummary();
      expect(metrics.totalConversions).toBeGreaterThanOrEqual(0);

      // 6. Get system health
      const health = await conversionService.getSystemHealth();
      expect(health.status).toBeDefined();
    });
  });
});
