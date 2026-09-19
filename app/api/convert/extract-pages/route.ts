import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const runtime = 'nodejs';
export const maxDuration = 120;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const pages = String(formData.get('pages') || '').trim();

    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    if (file.size === 0) return NextResponse.json({ error: 'The uploaded PDF is empty.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'PDF must be 100 MB or smaller.' }, { status: 413 });

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') {
      return NextResponse.json({ error: 'The uploaded file is not a valid PDF.' }, { status: 415 });
    }

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
    const output = await outputDoc.save();
    const baseName = file.name.replace(/\.pdf$/i, '') || 'document';

    return new NextResponse(output as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${baseName}_extracted.pdf"`,
        'Content-Length': String(output.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to extract PDF pages.';
    const status = message.startsWith('Pages ') || message.startsWith('Page numbers') ? 400 : 500;
    console.error('Extract pages PDF error:', error);
    return NextResponse.json({ error: message }, { status });
  }
}
