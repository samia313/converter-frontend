import { Redis } from '@upstash/redis';

/**
 * Comprehensive logging service for production-grade monitoring
 * Tracks all events, errors, and system metrics
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  conversionId?: string;
  traceId?: string;
}

class LoggingService {
  private redis: Redis | null = null;
  private readonly LOG_PREFIX = 'pdf-logs:';
  private readonly RETENTION_DAYS = 30;
  private readonly MAX_LOGS_PER_CONVERSION = 1000;
  private localLogs: LogEntry[] = [];

  constructor() {
    // This client accepts only Upstash's HTTPS REST endpoint. REDIS_URL is
    // reserved for the worker's TCP connection and must not be used here.
    const url = (process.env.KV_REST_API_URL || '').trim();
    const token = (process.env.KV_REST_API_TOKEN || '').trim();

    if (!url || !token) {
      console.warn('[v0] Upstash REST logging is not configured; using in-memory logs.');
      return;
    }

    try {
      const endpoint = new URL(url);
      if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) {
        console.warn('[v0] Upstash REST logging endpoint is invalid; using in-memory logs.');
        return;
      }
      this.redis = new Redis({ url: endpoint.toString(), token });
    } catch {
      console.warn('[v0] Upstash REST logging initialization failed; using in-memory logs.');
    }
  }

  /**
   * Log conversion event
   */
  async logConversion(
    conversionId: string,
    level: LogLevel,
    message: string,
    context?: Record<string, any>
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      context,
      conversionId,
    };

    await this.writeLog(entry);

    // Also log to console
    const logLevel = level.toUpperCase().padEnd(7);
    console.log(`[v0] [${logLevel}] ${message}`, context || '');
  }

  /**
   * Log error event
   */
  async logError(
    errorType: string,
    message: string,
    context?: Record<string, any>
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'error',
      message: `[${errorType}] ${message}`,
      context: {
        errorType,
        ...context,
      },
    };

    await this.writeLog(entry);
    console.error(`[v0] [ERROR] [${errorType}] ${message}`, context || '');
  }

  /**
   * Log system event
   */
  async logSystem(
    level: LogLevel,
    message: string,
    context?: Record<string, any>
  ): Promise<void> {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      context,
    };

    await this.writeLog(entry);
    console.log(`[v0] [SYSTEM] [${level.toUpperCase()}] ${message}`, context || '');
  }

  /**
   * Write log to storage
   */
  private async writeLog(entry: LogEntry): Promise<void> {
    try {
      // Store in memory for quick access
      this.localLogs.push(entry);

      // Keep only recent logs in memory
      if (this.localLogs.length > 10000) {
        this.localLogs = this.localLogs.slice(-5000);
      }

      // Store in Redis if configured
      if (this.redis) {
        const key = `${this.LOG_PREFIX}${entry.conversionId || 'system'}`;
        const ttl = this.RETENTION_DAYS * 24 * 60 * 60;

        try {
          await this.redis.lpush(key, JSON.stringify(entry));
          await this.redis.expire(key, ttl);
        } catch (error) {
          console.warn('[v0] Failed to write log to Redis:', error);
        }
      }
    } catch (error) {
      console.error('[v0] Logging failed:', error);
    }
  }

  /**
   * Retrieve logs for a conversion
   */
  async getConversionLogs(conversionId: string, limit: number = 100): Promise<LogEntry[]> {
    try {
      const key = `${this.LOG_PREFIX}${conversionId}`;

      if (!this.redis) {
        // Return from local cache
        return this.localLogs
          .filter((log) => log.conversionId === conversionId)
          .slice(-limit)
          .reverse();
      }

      const logs = await this.redis.lrange(key, 0, limit - 1);

      return logs
        .map((log) => {
          try {
            return JSON.parse(log as string) as LogEntry;
          } catch {
            return null;
          }
        })
        .filter((log) => log !== null) as LogEntry[];
    } catch (error) {
      console.error('[v0] Failed to retrieve logs:', error);
      return [];
    }
  }

  /**
   * Search logs
   */
  async searchLogs(
    query: string,
    options?: {
      level?: LogLevel;
      startTime?: number;
      endTime?: number;
      limit?: number;
    }
  ): Promise<LogEntry[]> {
    const limit = options?.limit || 100;
    const results: LogEntry[] = [];

    for (const log of this.localLogs) {
      if (results.length >= limit) break;

      if (options?.level && log.level !== options.level) continue;
      if (options?.startTime && log.timestamp < options.startTime) continue;
      if (options?.endTime && log.timestamp > options.endTime) continue;
      if (!log.message.toLowerCase().includes(query.toLowerCase())) continue;

      results.push(log);
    }

    return results;
  }

  /**
   * Get log statistics
   */
  getStats() {
    const stats = {
      totalLogs: this.localLogs.length,
      byLevel: {
        debug: 0,
        info: 0,
        warn: 0,
        error: 0,
        critical: 0,
      },
      byHour: {} as Record<number, number>,
    };

    for (const log of this.localLogs) {
      stats.byLevel[log.level]++;

      const hour = Math.floor(log.timestamp / (60 * 60 * 1000));
      stats.byHour[hour] = (stats.byHour[hour] || 0) + 1;
    }

    return stats;
  }

  /**
   * Clear old logs
   */
  async cleanup(): Promise<number> {
    try {
      const cutoffTime = Date.now() - this.RETENTION_DAYS * 24 * 60 * 60 * 1000;
      const initialLength = this.localLogs.length;

      this.localLogs = this.localLogs.filter((log) => log.timestamp > cutoffTime);

      console.log('[v0] Log cleanup completed:', {
        removed: initialLength - this.localLogs.length,
        remaining: this.localLogs.length,
      });

      return initialLength - this.localLogs.length;
    } catch (error) {
      console.error('[v0] Log cleanup failed:', error);
      return 0;
    }
  }
}

// Singleton instance
let loggingService: LoggingService;

export function getLoggingService(): LoggingService {
  if (!loggingService) {
    loggingService = new LoggingService();
  }
  return loggingService;
}
