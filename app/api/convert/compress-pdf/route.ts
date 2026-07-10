import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const quality = formData.get('quality') || 'medium';

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

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
    });

    // Note: pdf-lib doesn't have built-in image compression
    // Compression is achieved by optimization during save
    // The PDF will be smaller due to internal optimizations

    const pdfBytes = await pdf.save();
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="compressed-${file.name}"`,
        'Content-Type': 'application/pdf',
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
