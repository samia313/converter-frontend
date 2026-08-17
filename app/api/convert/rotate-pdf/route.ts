import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, degrees } from 'pdf-lib';

export const maxDuration = 120;
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ALLOWED_ROTATIONS = new Set([90, 180, 270]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const rotationValue = formData.get('rotation');

    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File exceeds the 100MB limit' }, { status: 400 });
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Invalid PDF file' }, { status: 400 });

    const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (String.fromCharCode(...header) !== '%PDF-') return NextResponse.json({ error: 'The uploaded file is not a valid PDF' }, { status: 400 });

    const rotation = Number(rotationValue ?? 90);
    if (!ALLOWED_ROTATIONS.has(rotation)) return NextResponse.json({ error: 'Rotation must be 90, 180, or 270 degrees' }, { status: 400 });

    const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const pages = pdf.getPages();
    if (pages.length === 0) return NextResponse.json({ error: 'PDF has no pages' }, { status: 400 });

    pages.forEach((page) => page.setRotation(degrees((page.getRotation().angle + rotation) % 360)));
    const pdfBytes = await pdf.save();
    const output = Buffer.from(pdfBytes);
    if (output.length < 9 || String.fromCharCode(...output.subarray(0, 5)) !== '%PDF-') {
      return NextResponse.json({ error: 'Rotation produced an invalid PDF' }, { status: 500 });
    }

    const safeBaseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/\r\n"]/g, '_').slice(0, 160);
    return new NextResponse(output, {
      headers: {
        'Content-Disposition': `attachment; filename="${encodeURIComponent(`${safeBaseName}_rotated.pdf`)}"`,
        'Content-Type': 'application/pdf',
        'Content-Length': String(output.length),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[PDFilio] rotate-pdf failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Rotation failed. Please try another PDF.' }, { status: 500 });
  }
}
