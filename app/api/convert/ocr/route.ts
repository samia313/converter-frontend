import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The uploaded file is empty.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'The maximum file size is 100MB.' }, { status: 413 });
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (extension !== 'pdf') return NextResponse.json({ error: 'Server OCR currently accepts PDF files. JPG/PNG/WebP OCR remains available in the browser tool.' }, { status: 415 });
    if (!baseUrl || !apiKey) return NextResponse.json({ error: 'OCR conversion service is not configured for this deployment.' }, { status: 503 });

    const body = new FormData();
    body.append('file', file, file.name);
    body.append('language', 'eng');
    const response = await fetch(baseUrl + '/convert/pdf-ocr', { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey }, body, cache: 'no-store', signal: AbortSignal.timeout(75000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'OCR conversion failed.', code: data?.code || 'OCR_FAILED' }, { status: response.status });
    if (typeof data?.textExtracted !== 'string') return NextResponse.json({ error: 'OCR completed without extracted text.', code: 'MISSING_TEXT' }, { status: 502 });
    return NextResponse.json({ success: true, text: data.textExtracted, downloadUrl: data.downloadUrl || null });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'OCR processing failed.', code: 'OCR_UNAVAILABLE' }, { status: 502 });
  }
}