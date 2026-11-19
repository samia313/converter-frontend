import { enforceRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const pages = String(formData.get('pages') || '').trim();

    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    const validation = await validatePdfFile(file);
    if (!validation.valid) return NextResponse.json({ error: validation.error || 'Invalid PDF file.' }, { status: 400 });

    const bytes = new Uint8Array(await file.arrayBuffer());

    const source = await PDFDocument.load(bytes);
    const pageCount = source.getPageCount();
    const values = pages.split(',').map(v => v.trim()).filter(Boolean);
    if (!values.length) return NextResponse.json({ error: 'Enter page numbers to extract, for example 1,3,5.' }, { status: 400 });

    const selected = [...new Set(values.map(v => {
      if (!/^\d+$/.test(v)) throw new Error('Pages must be positive integers separated by commas.');
      const n = Number(v);
      if (!Number.isSafeInteger(n) || n < 1 || n > pageCount) throw new Error(`Page numbers must be between 1 and ${pageCount}.`);
      return n - 1;
    }))];

    const outputDoc = await PDFDocument.create();
    const copied = await outputDoc.copyPages(source, selected);
    copied.forEach(page => outputDoc.addPage(page));
    const output = Buffer.from(await outputDoc.save());
    const outputValidation = validateOutputBuffer(output, 'Extract PDF Pages');
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error || 'Generated PDF is invalid.' }, { status: 500 });
    const filename = sanitizePdfDownloadFilename(file.name, '_extracted.pdf');

    return new NextResponse(output, { headers: getDownloadHeaders(filename, output.length) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to extract PDF pages.';
    const status = message.startsWith('Pages ') || message.startsWith('Page numbers') ? 400 : 500;
    console.error('Extract pages PDF error:', error);
    return NextResponse.json({ error: message }, { status });
  }
}
