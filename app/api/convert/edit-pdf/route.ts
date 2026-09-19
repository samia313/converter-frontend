import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_TEXT_LENGTH = 500;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const text = String(formData.get('text') ?? '').trim();
    const pageNumber = Number(formData.get('pageNumber') ?? '1');
    const x = Number(formData.get('x') ?? '50');
    const y = Number(formData.get('y') ?? '50');
    const fontSize = Number(formData.get('fontSize') ?? '18');

    if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'PDF exceeds the 100 MB limit.' }, { status: 413 });
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 415 });
    if (!text) return NextResponse.json({ error: 'Enter text to add to the PDF.' }, { status: 400 });
    if (text.length > MAX_TEXT_LENGTH) return NextResponse.json({ error: 'Text is limited to 500 characters.' }, { status: 400 });
    if (!Number.isInteger(pageNumber) || pageNumber < 1) return NextResponse.json({ error: 'Page number must be 1 or greater.' }, { status: 400 });
    if (![x, y, fontSize].every(Number.isFinite) || fontSize < 6 || fontSize > 72) return NextResponse.json({ error: 'Use valid position values and a font size from 6 to 72.' }, { status: 400 });

    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pages = pdf.getPages();
    if (pageNumber > pages.length) return NextResponse.json({ error: `This PDF has ${pages.length} page(s). Choose a valid page number.` }, { status: 400 });

    const page = pages[pageNumber - 1];
    const { width, height } = page.getSize();
    const safeX = Math.max(0, Math.min(x, Math.max(0, width - 10)));
    const safeY = Math.max(0, Math.min(y, Math.max(0, height - fontSize)));
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    page.drawText(text, { x: safeX, y: safeY, size: fontSize, font, color: rgb(0, 0, 0), maxWidth: Math.max(10, width - safeX - 10) });
    const output = await pdf.save();

    const baseName = file.name.replace(/\.pdf$/i, '');
    return new NextResponse(Buffer.from(output), {
      headers: { 'Content-Disposition': `attachment; filename="${baseName}_edited.pdf"`, 'Content-Type': 'application/pdf', 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Edit PDF failed:', error);
    return NextResponse.json({ error: 'Could not edit this PDF. The file may be damaged, encrypted, or unsupported.' }, { status: 500 });
  }
}