import { NextRequest, NextResponse } from 'next/server';
import { getDigitalOceanConfig } from '@/lib/digitalocean-config';
import { getQueueService } from '@/lib/services/queue';
import { getStorageService } from '@/lib/services/storage-service';
import { getLoggingService } from '@/lib/services/logging-service';
import { getMetricsService } from '@/lib/services/metrics-service';

/** Health check endpoint. It reports configuration and verified service status only. */
export async function GET(_request: NextRequest) {
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
      const response = await fetch(`${converterConfig.baseUrl}/health`, {
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

    const queueHealth = await queue.healthCheck();
    const storageStats = storage.getStats();
    const loggingStats = logging.getStats();
    const systemMetrics = metrics.getSystemMetrics();
    const performanceSummary = metrics.getPerformanceSummary();
    const alerts = metrics.checkAlertConditions();

    const storageConfigured = storageStats.configured === true;
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (queueHealth.status === 'unhealthy') {
      overallStatus = 'unhealthy';
    } else if (
      queueHealth.status === 'degraded' ||
      alerts.some((a) => a.level === 'critical') ||
      !storageConfigured ||
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
          // Queue errors may contain connection strings or credentials.
          message: queueHealth.status === 'unhealthy' ? 'Queue health check failed.' : queueHealth.message,
          metrics: queueHealth.metrics,
        },
        storage: {
          ...storageStats,
          status: storageConfigured ? 'unknown' : 'not_configured',
          message: storageConfigured
            ? 'Storage connectivity is not checked by this endpoint.'
            : 'Persistent storage is not configured.',
        },
        logging: {
          ...loggingStats,
          status: 'unknown',
          message: 'Logging backend connectivity is not checked by this endpoint.',
        },
        conversionWorker: {
          status: !conversionWorkerConfigured ? 'not_configured' : conversionWorkerReachable ? 'reachable' : 'unreachable',
        },
        aiProvider: {
          status: aiProviderConfigured ? 'configured' : 'not_configured',
        },
        database: {
          status: 'unknown',
          message: 'Database connectivity is not checked by this endpoint.',
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
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch {
    // Infrastructure exceptions can contain secrets; do not log raw errors.
    console.error('[v0] Health check failed.');
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed.',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  }
}

/** POST endpoint for manual health checks and cleanup */
export async function POST(request: NextRequest) {
  let action: unknown;
  try {
    const body = await request.json();
    action = body?.action;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } });
  }

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
          cleanup: { queueCleaned, storageCleaned, logsCleaned },
        }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
      }
      case 'reset-metrics': {
        const metrics = getMetricsService();
        metrics.reset();
        return NextResponse.json({ status: 'success', message: 'Metrics reset' }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }
  } catch {
    // Infrastructure exceptions can contain secrets; do not log raw errors.
    console.error('[v0] Health check POST failed.');
    return NextResponse.json({ error: 'Health check action failed.' }, { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } });
  }
}
