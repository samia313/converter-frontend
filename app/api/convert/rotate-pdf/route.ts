import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, degrees } from 'pdf-lib';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Invalid PDF' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    // Rotate all pages 90 degrees
    const pages = pdf.getPages();
    pages.forEach(page => {
      page.setRotation(degrees(90));
    });

    const pdfBytes = await pdf.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '_rotated.pdf')}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
