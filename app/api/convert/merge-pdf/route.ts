import { NextRequest, NextResponse } from 'next/server';
import { mergePdfs, getDownloadHeaders, validateOutputBuffer } from '@/lib/pdf-utils';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const timeout = 110 * 1000; // 110 seconds timeout
  
  try {
    console.log('[v0] Merge PDF request received');
    
    const formData = await request.formData();
    const files = (formData.getAll('files') as File[]) || [];

    // CRITICAL FIX: Check if files provided
    if (!files || files.length === 0) {
      console.error('[v0] No files provided');
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    console.log('[v0] Merge request with', files.length, 'files');

    // Check timeout
    if (Date.now() - startTime > timeout) {
      console.error('[v0] Request timeout during file preparation');
      return NextResponse.json({ error: 'Processing timeout. Files may be too large.' }, { status: 504 });
    }

    // Merge PDFs
    const result = await mergePdfs(files);
    if (!result.success) {
      console.error('[v0] Merge operation failed:', result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // CRITICAL FIX: Validate output has content
    if (!result.data || result.data.length === 0) {
      console.error('[v0] Merge produced empty output');
      return NextResponse.json({ 
        error: 'Merge failed: Output PDF is empty. Some input files may be corrupted.' 
      }, { status: 400 });
    }

    // Additional validation
    const outputValidation = validateOutputBuffer(result.data, 'merge-pdf');
    if (!outputValidation.valid) {
      console.error('[v0] Output validation failed:', outputValidation.error);
      return NextResponse.json({ error: outputValidation.error }, { status: 400 });
    }

    // Check timeout before returning
    if (Date.now() - startTime > timeout) {
      console.error('[v0] Request timeout before download');
      return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });
    }

    const filename = `merged-${Date.now()}.pdf`;
    const processingTime = Date.now() - startTime;
    
    console.log('[v0] Merge successful. Pages:', result.metadata?.pages, 'Processing time:', processingTime, 'ms. Output:', result.data.length, 'bytes');

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
    console.error('[v0] Merge PDF error after', processingTime, 'ms:', error);
    return NextResponse.json(
      { 
        error: 'Merging failed. ' + (error instanceof Error ? error.message : 'Unknown error'),
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
