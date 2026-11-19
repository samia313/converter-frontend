import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils';

export const runtime = 'nodejs';
export const maxDuration = 120;

function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function clean(value: FormDataEntryValue | null, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim();
  return v ? v.slice(0, max) : undefined;
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return error('No PDF file provided.');
    const validation = await validatePdfFile(file);
    if (!validation.valid) return error(validation.error || 'Invalid PDF file.');

    const input = Buffer.from(await file.arrayBuffer());

    const pdf = await PDFDocument.load(input, { ignoreEncryption: false });
    const title = clean(formData.get('title'), 500);
    const author = clean(formData.get('author'), 200);
    const subject = clean(formData.get('subject'), 500);
    const keywords = clean(formData.get('keywords'), 1000);
    const creator = clean(formData.get('creator'), 200);
    const producer = clean(formData.get('producer'), 200);

    if (title !== undefined) pdf.setTitle(title); else pdf.setTitle('');
    if (author !== undefined) pdf.setAuthor(author); else pdf.setAuthor('');
    if (subject !== undefined) pdf.setSubject(subject); else pdf.setSubject('');
    if (keywords !== undefined) pdf.setKeywords(keywords.split(',').map((k) => k.trim()).filter(Boolean));
    else pdf.setKeywords([]);
    if (creator !== undefined) pdf.setCreator(creator); else pdf.setCreator('');
    if (producer !== undefined) pdf.setProducer(producer); else pdf.setProducer('');

    const output = Buffer.from(await pdf.save());
    const outputValidation = validateOutputBuffer(output, 'PDF Metadata');
    if (!outputValidation.valid) return error(outputValidation.error || 'Generated PDF is invalid.', 500);
    const filename = sanitizePdfDownloadFilename(file.name, '_metadata.pdf');
    return new NextResponse(output, {
      headers: getDownloadHeaders(filename, output.length),
    });
  } catch {
    return error('Unable to edit this PDF. Encrypted or unsupported PDFs may require different processing.', 422);
  }
}
