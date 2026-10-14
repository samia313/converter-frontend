import { NextRequest, NextResponse } from 'next/server';
import { getDigitalOceanConfig } from '@/lib/digitalocean-config';
import { getQueueService } from '@/lib/services/queue';
import { getStorageService } from '@/lib/services/storage-service';
import { getLoggingService } from '@/lib/services/logging-service';
import { getMetricsService } from '@/lib/services/metrics-service';

/**
 * Health check endpoint for production monitoring
 * Returns system status, metrics, and performance data
 */

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const converterConfig = getDigitalOceanConfig();
  const conversionWorkerConfigured = Boolean(converterConfig.baseUrl && converterConfig.apiKey);
  const aiProviderConfigured = Boolean(
    process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_2 ||
    process.env.OPENAI_API_KEY_3 || process.env.OPENAI_API_KEY_4
  );
  let conversionWorkerReachable = false;
  if (conversionWorkerConfigured) {
    try {
      const baseUrl = converterConfig.baseUrl!;
      const response = await fetch(`${baseUrl}/health`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(4000),
      });
      conversionWorkerReachable = response.ok;
    } catch {
      conversionWorkerReachable = false;
    }
  }

  try {
    const queue = getQueueService();
    const storage = getStorageService();
    const logging = getLoggingService();
    const metrics = getMetricsService();

    // Get queue health
    const queueHealth = await queue.healthCheck();

    // Get storage stats
    const storageStats = storage.getStats();

    // Get logging stats
    const loggingStats = logging.getStats();

    // Get system metrics
    const systemMetrics = metrics.getSystemMetrics();

    // Get performance summary
    const performanceSummary = metrics.getPerformanceSummary();

    // Check alert conditions
    const alerts = metrics.checkAlertConditions();

    // Determine overall health
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    if (queueHealth.status === 'unhealthy') {
      overallStatus = 'unhealthy';
    } else if (
      queueHealth.status === 'degraded' ||
      alerts.some((a) => a.level === 'critical') ||
      !conversionWorkerConfigured ||
      !conversionWorkerReachable ||
      !aiProviderConfigured
    ) {
      overallStatus = 'degraded';
    }

    const response = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: systemMetrics.uptime,
      responseTime: `${Date.now() - startTime}ms`,
      components: {
        queue: {
          status: queueHealth.status,
          message: queueHealth.message,
          metrics: queueHealth.metrics,
        },
        storage: {
          status: 'healthy',
          ...storageStats,
        },
        logging: {
          status: 'healthy',
          ...loggingStats,
        },
        conversionWorker: {
          status: !conversionWorkerConfigured ? 'not_configured' : conversionWorkerReachable ? 'reachable' : 'unreachable',
        },
        aiProvider: {
          status: aiProviderConfigured ? 'configured' : 'not_configured',
        },
        database: {
          status: 'unknown',
          message: 'Database connectivity is not verified by this health check.',
        },
      },
      performance: performanceSummary,
      memory: {
        heapUsedMB: Math.round(systemMetrics.memoryUsage.heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(systemMetrics.memoryUsage.heapTotal / 1024 / 1024),
        rssMemoryMB: Math.round(systemMetrics.memoryUsage.rss / 1024 / 1024),
      },
      alerts: alerts.filter((a) => a.level === 'critical'),
      warnings: alerts.filter((a) => a.level === 'warning'),
    };

    console.log('[v0] Health check completed:', {
      status: overallStatus,
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json(response, {
      status: overallStatus === 'unhealthy' ? 503 : 200,
    });
  } catch (error) {
    console.error('[v0] Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

/**
 * POST endpoint for manual health checks and cleanup
 */
export async function POST(request: NextRequest) {
  const { action } = await request.json();

  try {
    const queue = getQueueService();
    const storage = getStorageService();
    const logging = getLoggingService();

    switch (action) {
      case 'cleanup': {
        const queueCleaned = await queue.cleanup();
        const storageCleaned = await storage.cleanup();
        const logsCleaned = await logging.cleanup();

        return NextResponse.json({
          status: 'success',
          cleanup: {
            queueCleaned,
            storageCleaned,
            logsCleaned,
          },
        });
      }

      case 'reset-metrics': {
        const metrics = getMetricsService();
        metrics.reset();

        return NextResponse.json({
          status: 'success',
          message: 'Metrics reset',
        });
      }

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[v0] Health check POST failed:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
