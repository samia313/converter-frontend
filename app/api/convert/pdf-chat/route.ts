import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ message: 'Chat functionality available' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
