import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 792]);
    
    let image;
    if (file.type.includes('jpeg') || file.type.includes('jpg')) {
      image = await pdf.embedJpg(bytes);
    } else if (file.type.includes('png')) {
      image = await pdf.embedPng(bytes);
    }

    if (image) page.drawImage(image, { x: 50, y: 50, width: 512, height: 692 });

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
