import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    
    // Split the first half and second half
    const pageCount = pdf.getPageCount();
    const firstHalf = await PDFDocument.create();
    const secondHalf = await PDFDocument.create();

    for (let i = 0; i < pageCount; i++) {
      const [copiedPage] = await (i < pageCount / 2 ? firstHalf : secondHalf).copyPages(pdf, [i]);
      (i < pageCount / 2 ? firstHalf : secondHalf).addPage(copiedPage);
    }

    const firstBytes = await firstHalf.save();
    const fileName = file.name.replace('.pdf', '');

    return new NextResponse(Buffer.from(firstBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}_part1.pdf"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
