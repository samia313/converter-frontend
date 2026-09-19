import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function clean(value: FormDataEntryValue | null, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim();
  return v ? v.slice(0, max) : undefined;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return error('No PDF file provided.');
    if (file.size > MAX_FILE_SIZE) return error('File exceeds the 100MB limit.');
    if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return error('Please upload a PDF file.');
    }

    const input = Buffer.from(await file.arrayBuffer());
    if (input.length < 5 || input.subarray(0, 5).toString() !== '%PDF-') {
      return error('The uploaded file is not a valid PDF.');
    }

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

    const output = await pdf.save();
    const base = file.name.replace(/\.pdf$/i, '');
    return new NextResponse(Buffer.from(output), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${base}_metadata.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return error('Unable to edit this PDF. Encrypted or unsupported PDFs may require different processing.', 422);
  }
}
