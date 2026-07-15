import { NextRequest, NextResponse } from 'next/server';
import { validatePdfFile, compressPdf, getDownloadHeaders } from '@/lib/pdf-utils';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Validate file
    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compress
    const result = await compressPdf(buffer);
    if (!result.success) {
      console.error('[v0] Compress error:', result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const filename = `compressed-${Date.now()}-${file.name}`;
    return new NextResponse(result.data, {
      headers: getDownloadHeaders(filename, result.data!.length),
      status: 200,
    });
  } catch (error) {
    console.error('[v0] Compress PDF error:', error);
    return NextResponse.json(
      { error: 'Compression failed. Please try again.' },
      { status: 500 }
    );
  }
}
