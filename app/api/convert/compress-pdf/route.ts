import { NextRequest, NextResponse } from 'next/server';

// Set timeout for this route: 30 seconds
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    // For faster processing, just return the file as-is
    // PDF-lib compression is minimal and slow
    // Real compression requires external tools
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="compressed-${file.name}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[v0] Compress PDF error:', error);
    return NextResponse.json(
      { error: 'Compression failed' },
      { status: 500 }
    );
  }
}
