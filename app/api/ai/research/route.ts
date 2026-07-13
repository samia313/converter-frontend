import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Research API is not configured. This feature requires OPENAI_API_KEY environment variable.' },
    { status: 503 }
  )
}
