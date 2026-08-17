import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, degrees } from 'pdf-lib';

export const maxDuration = 30;

const ALLOWED_ROTATIONS = new Set([90, 180, 270]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const rotationValue = formData.get('rotation');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Invalid PDF file' }, { status: 400 });
    }

    const rotation = Number(rotationValue ?? 90);
    if (!ALLOWED_ROTATIONS.has(rotation)) {
      return NextResponse.json(
        { error: 'Rotation must be 90, 180, or 270 degrees' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    const pages = pdf.getPages();
    pages.forEach((page) => {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + rotation) % 360));
    });

    const pdfBytes = await pdf.save();
    const safeBaseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/\r\n"]/g, '_');
    const filename = `${safeBaseName}_rotated.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdfBytes.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('[rotate-pdf] Processing failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 },
    );
  }
}
