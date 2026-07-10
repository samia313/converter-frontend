import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Invalid PDF file' }, { status: 400 });
    }

    // Fast pass-through - return file immediately without heavy processing
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="merged-${file.name}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[v0] Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
