import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) return NextResponse.json({ error: 'PDF to images service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The PDF file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'PDF file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    if (!file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Please upload a PDF file.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });

    const body = new FormData();
    body.append('file', file, file.name);
    const response = await fetch(baseUrl + '/convert/pdf-to-images', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(90000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'PDF to images conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    if (!Array.isArray(data?.downloadUrls) || data.downloadUrls.length === 0) return NextResponse.json({ error: 'Conversion completed without image outputs.', code: 'MISSING_OUTPUT' }, { status: 502 });

    return NextResponse.json({ success: true, count: data.downloadUrls.length, downloadUrls: data.downloadUrls });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'PDF to images conversion failed.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 });
  }
}
