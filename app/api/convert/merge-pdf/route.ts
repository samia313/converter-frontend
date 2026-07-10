import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      const file = formData.get('file') as File;
      if (!file || !file.type.includes('pdf')) {
        return NextResponse.json({ error: 'Invalid PDF file' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true }).then(p => p.save());
      return new NextResponse(Buffer.from(pdfBytes), {
        headers: {
          'Content-Disposition': `attachment; filename="${file.name}"`,
          'Content-Type': 'application/pdf',
        },
      });
    }

    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="merged.pdf"`,
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('[v0] Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
