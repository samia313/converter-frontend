import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

function safeDownloadName(name: string): string {
  const withoutExtension = name.replace(/\.docx?$/i, '');
  const safe = withoutExtension
    .replace(/[\r\n"]/g, '')
    .replace(/[\\/]/g, '-')
    .replace(/[^a-zA-Z0-9 _.-]/g, '-')
    .replace(/^\.+/, '')
    .trim()
    .slice(0, 100);
  return safe || 'converted-document';
}

export async function POST(request: Request) {
  const configuredBaseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!configuredBaseUrl || !apiKey) return NextResponse.json({ error: 'Word to PDF conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });

  try {
    const baseUrl = new URL(configuredBaseUrl);
    if (baseUrl.protocol !== 'https:' && baseUrl.hostname !== 'localhost' && baseUrl.hostname !== '127.0.0.1') {
      return NextResponse.json({ error: 'Word to PDF conversion service URL must use HTTPS.', code: 'INVALID_CONVERTER_URL' }, { status: 503 });
    }

    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No Word file provided.', code: 'NO_FILE' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The Word file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Word file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    const lower = file.name.toLowerCase();
    if (!lower.endsWith('.doc') && !lower.endsWith('.docx')) return NextResponse.json({ error: 'Only DOC and DOCX files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });

    const body = new FormData();
    body.append('file', file, safeDownloadName(file.name) + (lower.endsWith('.docx') ? '.docx' : '.doc'));
    const response = await fetch(new URL('/convert/word-to-pdf', baseUrl), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'Word to PDF conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    if (typeof data?.downloadUrl !== 'string' || !data.downloadUrl) return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });

    let downloadUrl: URL;
    try {
      downloadUrl = new URL(data.downloadUrl, baseUrl);
    } catch {
      return NextResponse.json({ error: 'Conversion service returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });
    }
    if (downloadUrl.origin !== baseUrl.origin || downloadUrl.username || downloadUrl.password) {
      return NextResponse.json({ error: 'Conversion service returned an untrusted download URL.', code: 'UNTRUSTED_OUTPUT_URL' }, { status: 502 });
    }

    const output = await fetch(downloadUrl, { cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000) });
    if (!output.ok) return NextResponse.json({ error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });
    const outputBuffer = await output.arrayBuffer();
    const signature = new TextDecoder().decode(new Uint8Array(outputBuffer).slice(0, 5));
    if (outputBuffer.byteLength < 5 || signature !== '%PDF-') {
      return NextResponse.json({ error: 'Conversion service did not return a valid PDF file.', code: 'INVALID_PDF_OUTPUT' }, { status: 502 });
    }

    const filename = safeDownloadName(file.name) + '.pdf';
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="' + filename + '"',
        'Content-Length': String(outputBuffer.byteLength),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    // Do not expose fetch, URL, or upstream error details to public clients.
    console.error('[word-to-pdf] Conversion request failed.');
    return NextResponse.json({ error: 'Word to PDF conversion failed. Please try again later.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 });
  }
}
