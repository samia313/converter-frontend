import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_TEXT_LENGTH = 500;

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const text = String(formData.get('text') ?? '').trim();
    const pageNumber = Number(formData.get('pageNumber') ?? '1');
    const x = Number(formData.get('x') ?? '50');
    const y = Number(formData.get('y') ?? '50');
    const fontSize = Number(formData.get('fontSize') ?? '18');

    if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 });
    const validation = await validatePdfFile(file);
    if (!validation.valid) return NextResponse.json({ error: validation.error || 'Invalid PDF file.' }, { status: 400 });
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
    const output = Buffer.from(await pdf.save());
    const outputValidation = validateOutputBuffer(output, 'Edit PDF');
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error || 'Generated PDF is invalid.' }, { status: 500 });
    const filename = sanitizePdfDownloadFilename(file.name, '_edited.pdf');
    return new NextResponse(output, { headers: getDownloadHeaders(filename, output.length) });
  } catch (error) {
    console.error('Edit PDF failed:', error);
    return NextResponse.json({ error: 'Could not edit this PDF. The file may be damaged, encrypted, or unsupported.' }, { status: 500 });
  }
}