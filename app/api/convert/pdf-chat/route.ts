import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'PDF Chat API is not configured. This feature requires OPENAI_API_KEY environment variable.' },
    { status: 503 }
  )
}
