import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'ai', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  return NextResponse.json(
    { error: 'Translation API is not configured. This feature requires OPENAI_API_KEY environment variable.' },
    { status: 503 }
  )
}
