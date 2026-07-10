import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

export function rateLimit(
  request: NextRequest,
  options: {
    interval?: number; // milliseconds
    maxRequests?: number;
  } = {}
) {
  const { interval = 60000, maxRequests = 30 } = options;

  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const key = `${ip}`;

  if (!store[key]) {
    store[key] = { count: 0, resetTime: now + interval };
  }

  const record = store[key];

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + interval;
  }

  record.count++;

  if (record.count > maxRequests) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((record.resetTime - now) / 1000)),
        },
      }
    );
  }

  return null;
}

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}, 3600000);
