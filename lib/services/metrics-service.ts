/**
 * Metrics service for tracking processing statistics and performance
 * Provides insights into system health and user patterns
 */

export interface MetricPoint {
  timestamp: number;
  value: number;
  metadata?: Record<string, any>;
}

export interface ConversionMetrics {
  type: string;
  successCount: number;
  failureCount: number;
  totalProcessingTimeMs: number;
  averageProcessingTimeMs: number;
  minProcessingTimeMs: number;
  maxProcessingTimeMs: number;
  averageInputSize: number;
  averageOutputSize: number;
  averageCompressionRatio: number;
}

export interface SystemMetrics {
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  conversions: Record<string, ConversionMetrics>;
  timestamp: number;
}

class MetricsService {
  private metrics: Map<string, MetricPoint[]> = new Map();
  private conversionStats: Map<string, ConversionMetrics> = new Map();
  private startTime = Date.now();
  private readonly RETENTION_POINTS = 1000;

  /**
   * Record a conversion
   */
  async recordConversion(
    type: string,
    success: boolean,
    processingTimeMs: number,
    inputSize: number,
    outputSize?: number
  ): Promise<void> {
    try {
      // Get or create metrics for this type
      let stats = this.conversionStats.get(type);
      if (!stats) {
        stats = {
          type,
          successCount: 0,
          failureCount: 0,
          totalProcessingTimeMs: 0,
          averageProcessingTimeMs: 0,
          minProcessingTimeMs: Infinity,
          maxProcessingTimeMs: 0,
          averageInputSize: 0,
          averageOutputSize: 0,
          averageCompressionRatio: 0,
        };
        this.conversionStats.set(type, stats);
      }

      // Update counters
      if (success) {
        stats.successCount++;
      } else {
        stats.failureCount++;
      }

      // Update processing time stats
      stats.totalProcessingTimeMs += processingTimeMs;
      stats.averageProcessingTimeMs = stats.totalProcessingTimeMs / (stats.successCount + stats.failureCount);
      stats.minProcessingTimeMs = Math.min(stats.minProcessingTimeMs, processingTimeMs);
      stats.maxProcessingTimeMs = Math.max(stats.maxProcessingTimeMs, processingTimeMs);

      // Update size stats
      const totalCount = stats.successCount + stats.failureCount;
      stats.averageInputSize = (stats.averageInputSize * (totalCount - 1) + inputSize) / totalCount;

      if (outputSize && success) {
        stats.averageOutputSize = (stats.averageOutputSize * (stats.successCount - 1) + outputSize) / stats.successCount;

        // Calculate compression ratio for compression operations
        if (type === 'compress' && inputSize > 0) {
          const ratio = ((inputSize - outputSize) / inputSize) * 100;
          stats.averageCompressionRatio = ratio;
        }
      }

      this.conversionStats.set(type, stats);

      // Record metric point
      const key = `conversion:${type}:${success ? 'success' : 'failure'}`;
      if (!this.metrics.has(key)) {
        this.metrics.set(key, []);
      }

      const points = this.metrics.get(key)!;
      points.push({
        timestamp: Date.now(),
        value: 1,
        metadata: {
          processingTimeMs,
          inputSize,
          outputSize,
        },
      });

      // Keep only recent points
      if (points.length > this.RETENTION_POINTS) {
        points.splice(0, points.length - this.RETENTION_POINTS);
      }

      console.log('[v0] Metrics recorded:', {
        type,
        success,
        processingTimeMs,
        stats: {
          successCount: stats.successCount,
          failureCount: stats.failureCount,
          averageProcessingTimeMs: Math.round(stats.averageProcessingTimeMs),
        },
      });
    } catch (error) {
      console.error('[v0] Failed to record metrics:', error);
    }
  }

  /**
   * Get metrics for a conversion type
   */
  getMetrics(type: string): ConversionMetrics | null {
    return this.conversionStats.get(type) || null;
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): Record<string, ConversionMetrics> {
    const result: Record<string, ConversionMetrics> = {};
    for (const [type, stats] of this.conversionStats) {
      result[type] = stats;
    }
    return result;
  }

  /**
   * Get system metrics
   */
  getSystemMetrics(): SystemMetrics {
    return {
      uptime: Date.now() - this.startTime,
      memoryUsage: process.memoryUsage(),
      conversions: this.getAllMetrics(),
      timestamp: Date.now(),
    };
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    const summary: Record<string, any> = {
      totalConversions: 0,
      totalSuccesses: 0,
      totalFailures: 0,
      successRate: 0,
      averageProcessingTime: 0,
      byType: {},
    };

    for (const [type, stats] of this.conversionStats) {
      const total = stats.successCount + stats.failureCount;
      summary.totalConversions += total;
      summary.totalSuccesses += stats.successCount;
      summary.totalFailures += stats.failureCount;

      summary.byType[type] = {
        successCount: stats.successCount,
        failureCount: stats.failureCount,
        successRate: total > 0 ? (stats.successCount / total) * 100 : 0,
        averageProcessingTimeMs: Math.round(stats.averageProcessingTimeMs),
        averageCompressionRatio: Math.round(stats.averageCompressionRatio * 100) / 100,
      };
    }

    summary.successRate =
      summary.totalConversions > 0 ? (summary.totalSuccesses / summary.totalConversions) * 100 : 0;
    summary.averageProcessingTime =
      summary.totalConversions > 0
        ? Math.round(
            Array.from(this.conversionStats.values()).reduce((sum, s) => sum + s.totalProcessingTimeMs, 0) /
              summary.totalConversions
          )
        : 0;

    return summary;
  }

  /**
   * Get metrics for the past N hours
   */
  getMetricsForPeriod(hoursAgo: number = 1): Record<string, any> {
    const cutoffTime = Date.now() - hoursAgo * 60 * 60 * 1000;
    const result: Record<string, any> = {};

    for (const [key, points] of this.metrics) {
      const recentPoints = points.filter((p) => p.timestamp > cutoffTime);
      if (recentPoints.length > 0) {
        result[key] = {
          count: recentPoints.length,
          averageValue: recentPoints.reduce((sum, p) => sum + p.value, 0) / recentPoints.length,
          totalValue: recentPoints.reduce((sum, p) => sum + p.value, 0),
        };
      }
    }

    return result;
  }

  /**
   * Alert conditions check
   */
  checkAlertConditions(): Array<{ level: 'warning' | 'critical'; message: string; metric: string }> {
    const alerts: Array<{ level: 'warning' | 'critical'; message: string; metric: string }> = [];

    for (const [type, stats] of this.conversionStats) {
      const total = stats.successCount + stats.failureCount;
      if (total === 0) continue;

      const failureRate = (stats.failureCount / total) * 100;

      // Alert on high failure rate
      if (failureRate > 50) {
        alerts.push({
          level: 'critical',
          message: `High failure rate for ${type}: ${failureRate.toFixed(1)}%`,
          metric: `${type}:failure_rate`,
        });
      } else if (failureRate > 10) {
        alerts.push({
          level: 'warning',
          message: `Elevated failure rate for ${type}: ${failureRate.toFixed(1)}%`,
          metric: `${type}:failure_rate`,
        });
      }

      // Alert on slow processing
      if (stats.averageProcessingTimeMs > 30000) {
        alerts.push({
          level: 'warning',
          message: `Slow processing time for ${type}: ${(stats.averageProcessingTimeMs / 1000).toFixed(1)}s`,
          metric: `${type}:processing_time`,
        });
      }
    }

    return alerts;
  }

  /**
   * Reset metrics
   */
  reset(): void {
    this.metrics.clear();
    this.conversionStats.clear();
    this.startTime = Date.now();
    console.log('[v0] Metrics reset');
  }
}

// Singleton instance
let metricsService: MetricsService;

export function getMetricsService(): MetricsService {
  if (!metricsService) {
    metricsService = new MetricsService();
  }
  return metricsService;
}
