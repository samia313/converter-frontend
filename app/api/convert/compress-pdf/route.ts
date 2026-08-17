import { NextRequest, NextResponse } from 'next/server';
import { validatePdfFile, compressPdf, getDownloadHeaders, validateOutputBuffer } from '@/lib/pdf-utils';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const timeout = 110 * 1000;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    const validation = await validatePdfFile(file);
    if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });

    if (Date.now() - startTime > timeout) {
      return NextResponse.json({ error: 'Processing timeout. File may be too large.' }, { status: 504 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await compressPdf(buffer);

    if (!result.success || !result.data) {
      return NextResponse.json({ error: result.error || 'Compression failed' }, { status: 400 });
    }

    const outputValidation = validateOutputBuffer(result.data, 'compress-pdf');
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error }, { status: 500 });

    if (Date.now() - startTime > timeout) {
      return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });
    }

    const processingTime = Date.now() - startTime;
    const safeName = file.name.replace(/[\r\n"\\/]/g, '_').slice(0, 160);
    const filename = `compressed-${Date.now()}-${safeName}`;

    return new NextResponse(result.data, {
      status: 200,
      headers: { ...getDownloadHeaders(filename, result.data.length), 'X-Processing-Time': String(processingTime) },
    });
  } catch (error) {
    console.error('[PDFilio] compress-pdf failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Compression failed. Please try another PDF or a smaller file.' }, { status: 500 });
  }
}
