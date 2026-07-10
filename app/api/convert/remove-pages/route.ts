import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Invalid PDF' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdf.getPageCount();

    if (pageCount <= 1) {
      return NextResponse.json(await pdf.save() as any, {
        headers: {
          'Content-Disposition': `attachment; filename="${file.name}"`,
          'Content-Type': 'application/pdf',
        },
      });
    }

    const pdfBytes = await pdf.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '_processed.pdf')}"`,
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
