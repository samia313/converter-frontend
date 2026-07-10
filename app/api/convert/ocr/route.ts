import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const maxDuration = 30;
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // For image files, pass through; for PDFs, load and save
    if (file.type.includes('pdf')) {
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pdfBytes = await pdf.save();
      return new NextResponse(Buffer.from(pdfBytes), {
        headers: {
          'Content-Disposition': `attachment; filename="${file.name}"`,
          'Content-Type': 'application/pdf',
        },
      });
    }

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Type': file.type,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
