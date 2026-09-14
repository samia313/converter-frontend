import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const supported = ['pdf', 'jpg', 'jpeg', 'png', 'webp'];

    if (!supported.includes(extension)) {
      return NextResponse.json(
        { error: 'Supported files are PDF, JPG, JPEG, PNG, and WebP.' },
        { status: 400 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json({ error: 'The uploaded file is empty.' }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'The maximum file size is 50MB.' }, { status: 413 });
    }

    // Do not return fabricated OCR output. A real OCR engine must be connected
    // before image/scanned-PDF recognition is advertised as available.
    return NextResponse.json(
      {
        error: 'The OCR recognition engine is not currently configured for this deployment. Please try a PDF with selectable text using PDF to Text, or connect an OCR engine before enabling scanned-document OCR.',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('[OCR] processing error:', error);
    return NextResponse.json(
      { error: 'OCR processing failed. Please try again with a supported file.' },
      { status: 500 }
    );
  }
}
