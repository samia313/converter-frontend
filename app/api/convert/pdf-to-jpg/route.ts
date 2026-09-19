import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) return NextResponse.json({ error: 'PDF to JPG conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });
  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The PDF file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'PDF file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    if (!file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Please upload a PDF file.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });
    const body = new FormData();
    body.append('file', file, file.name);
    const response = await fetch(baseUrl + '/convert/pdf-to-jpg', { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey }, body, cache: 'no-store', signal: AbortSignal.timeout(75000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'PDF to JPG conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    if (!data?.downloadUrl) return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });
    const output = await fetch(data.downloadUrl, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    if (!output.ok) return NextResponse.json({ error: 'Converted image could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });
    const contentType = data.format === 'zip' ? 'application/zip' : 'image/jpeg';
    const ext = data.format === 'zip' ? 'zip' : 'jpg';
    return new NextResponse(await output.arrayBuffer(), { headers: { 'Content-Type': contentType, 'Content-Disposition': 'attachment; filename="' + file.name.replace(/\.pdf$/i, '-jpg.' + ext) + '"', 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'PDF to JPG conversion failed.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 });
  }
}