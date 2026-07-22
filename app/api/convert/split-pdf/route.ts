import { NextRequest, NextResponse } from 'next/server';
import { validatePdfFile, splitPdf, getDownloadHeaders, validateOutputBuffer } from '@/lib/pdf-utils';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const timeout = 110 * 1000; // 110 seconds timeout
  
  try {
    console.log('[v0] Split PDF request received');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const splitPageStr = formData.get('splitPage') as string;

    // CRITICAL FIX: Check if file exists
    if (!file) {
      console.error('[v0] No file provided in request');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file
    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      console.warn('[v0] File validation failed:', validation.error);
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    console.log('[v0] File validated:', file.name, 'Size:', file.size);

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const splitPage = splitPageStr ? parseInt(splitPageStr, 10) : undefined;

    // Check timeout
    if (Date.now() - startTime > timeout) {
      console.error('[v0] Request timeout during file conversion');
      return NextResponse.json({ error: 'Processing timeout. File may be too large.' }, { status: 504 });
    }

    // Split
    const result = await splitPdf(buffer, splitPage);
    if (!result.success) {
      console.error('[v0] Split operation failed:', result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // CRITICAL FIX: Validate output has content
    if (!result.data || result.data.length === 0) {
      console.error('[v0] Split produced empty output');
      return NextResponse.json({ 
        error: 'Split failed: Output PDF is empty. The input file may be corrupted.' 
      }, { status: 400 });
    }

    // Additional validation
    const outputValidation = validateOutputBuffer(result.data, 'split-pdf');
    if (!outputValidation.valid) {
      console.error('[v0] Output validation failed:', outputValidation.error);
      return NextResponse.json({ error: outputValidation.error }, { status: 400 });
    }

    // Check timeout before returning
    if (Date.now() - startTime > timeout) {
      console.error('[v0] Request timeout before download');
      return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });
    }

    const fileName = file.name.replace(/\.pdf$/i, '');
    const filename = `${fileName}-part1-${Date.now()}.pdf`;
    const processingTime = Date.now() - startTime;

    console.log('[v0] Split successful. Output pages:', result.metadata?.pages, 'Processing time:', processingTime, 'ms. Output:', result.data.length, 'bytes');

    return new NextResponse(result.data, {
      headers: {
        ...getDownloadHeaders(filename, result.data.length),
        'X-Pages': String(result.metadata?.pages || 0),
        'X-Processing-Time': String(processingTime),
      },
      status: 200,
    });
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('[v0] Split PDF error after', processingTime, 'ms:', error);
    return NextResponse.json(
      { 
        error: 'Split failed. ' + (error instanceof Error ? error.message : 'Unknown error'),
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
