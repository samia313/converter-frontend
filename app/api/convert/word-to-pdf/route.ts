import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) return NextResponse.json({ error: 'Word to PDF conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });
  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No Word file provided.', code: 'NO_FILE' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The Word file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Word file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    const lower = file.name.toLowerCase();
    if (!lower.endsWith('.doc') && !lower.endsWith('.docx')) return NextResponse.json({ error: 'Only DOC and DOCX files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });
    const body = new FormData();
    body.append('file', file, file.name);
    const response = await fetch(baseUrl + '/convert/word-to-pdf', { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey }, body, cache: 'no-store', signal: AbortSignal.timeout(60000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'Word to PDF conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    if (!data?.downloadUrl) return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });
    const output = await fetch(data.downloadUrl, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    if (!output.ok) return NextResponse.json({ error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });
    return new NextResponse(await output.arrayBuffer(), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="' + file.name.replace(/\.(docx?|DOCX?)$/, '') + '.pdf"', 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Word to PDF conversion failed.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 });
  }
}