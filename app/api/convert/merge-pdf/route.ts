import { NextRequest, NextResponse } from 'next/server';
import { mergePdfs, getDownloadHeaders, validateOutputBuffer } from '@/lib/pdf-utils';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const timeout = 110 * 1000;

  try {
    const formData = await request.formData();
    const files = formData.getAll('files').filter((value): value is File => value instanceof File);

    if (files.length < 2) return NextResponse.json({ error: 'Please provide at least 2 PDF files' }, { status: 400 });
    if (Date.now() - startTime > timeout) return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });

    const result = await mergePdfs(files);
    if (!result.success || !result.data) return NextResponse.json({ error: result.error || 'Merge failed' }, { status: 400 });

    const outputValidation = validateOutputBuffer(result.data, 'merge-pdf');
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error }, { status: 500 });
    if (Date.now() - startTime > timeout) return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });

    const safeName = `merged-${Date.now()}.pdf`;
    const processingTime = Date.now() - startTime;
    return new NextResponse(result.data, {
      status: 200,
      headers: {
        ...getDownloadHeaders(safeName, result.data.length),
        'X-Pages': String(result.metadata?.pages || 0),
        'X-Processing-Time': String(processingTime),
      },
    });
  } catch (error) {
    console.error('[PDFilio] merge-pdf failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Merging failed. Please check the PDFs and try again.' }, { status: 500 });
  }
}
