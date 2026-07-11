import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

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

    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    console.log('[v0] Loading PDF for chat:', file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);
      
      // Validate PDF
      const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      const pageCount = pdfDoc.getPageCount();

      // Return success with PDF metadata
      return NextResponse.json(
        {
          success: true,
          fileName: file.name,
          fileSize: file.size,
          pageCount: pageCount,
          fileId: `pdf_${Date.now()}`,
          message: `PDF loaded successfully: ${pageCount} pages`,
          ready: true,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error('[v0] PDF load error:', err);
      return NextResponse.json(
        { error: 'Invalid or corrupted PDF file' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('[v0] PDF Chat Load error:', error);
    return NextResponse.json(
      {
        error: 'File loading failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
