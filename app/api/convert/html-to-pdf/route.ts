import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const content = await file.text();
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 792]);

    const pdfBytes = await pdf.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name.replace(/\.[^.]*$/, '.pdf')}"`,
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
