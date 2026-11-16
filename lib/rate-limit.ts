import 'server-only';

import { createHash } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { NextResponse } from 'next/server';

type RateLimitWindow = `${number} ${'s' | 'm' | 'h'}`;

interface RateLimitOptions {
  namespace: string;
  limit: number;
  window: RateLimitWindow;
}

let redis: Redis | undefined;
const limiters = new Map<string, Ratelimit>();

function getRedis(): Redis {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Upstash Redis environment variables are missing');
  }

  redis = new Redis({ url, token });
  return redis;
}

function getLimiter(options: RateLimitOptions): Ratelimit {
  const key = `${options.namespace}:${options.limit}:${options.window}`;
  const existing = limiters.get(key);
  if (existing) return existing;

  const limiter = new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(options.limit, options.window),
    prefix: `pdfilio:ratelimit:${options.namespace}`,
    analytics: false,
  });

  limiters.set(key, limiter);
  return limiter;
}

function getClientIp(request: Request): string {
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  return 'unknown';
}

export async function enforceRateLimit(
  request: Request,
  options: RateLimitOptions,
): Promise<NextResponse | null> {
  try {
    const ipHash = createHash('sha256')
      .update(getClientIp(request))
      .digest('hex');

    const limiter = getLimiter(options);
    const result = await limiter.limit(ipHash);

    const headers = {
      'Cache-Control': 'no-store',
      'X-RateLimit-Limit': String(result.limit),
      'X-RateLimit-Remaining': String(result.remaining),
      'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000)),
    };

    if (!result.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((result.reset - Date.now()) / 1000),
      );

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
        {
          status: 429,
          headers: {
            ...headers,
            'Retry-After': String(retryAfter),
          },
        },
      );
    }

    return null;
  } catch (error) {
    console.error(
      '[PDFilio] Redis rate limiter unavailable:',
      error instanceof Error ? error.message : 'Unknown error',
    );

    return NextResponse.json(
      {
        error: 'Request protection is temporarily unavailable. Please try again shortly.',
        code: 'RATE_LIMIT_UNAVAILABLE',
      },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
}
