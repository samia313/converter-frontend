import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) return NextResponse.json({ error: 'PDF to images service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });
  let converterOrigin: string;
  try {
    const configured = new URL(baseUrl);
    if (!['http:', 'https:'].includes(configured.protocol) || configured.username || configured.password) throw new Error('invalid converter URL');
    converterOrigin = configured.origin;
  } catch {
    return NextResponse.json({ error: 'PDF to images service is misconfigured.', code: 'INVALID_CONVERTER_URL' }, { status: 503 });
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The PDF file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'PDF file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    if (!file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Please upload a PDF file.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });

    const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (header.length !== 5 || String.fromCharCode(...header) !== '%PDF-') return NextResponse.json({ error: 'The uploaded file is not a valid PDF.', code: 'INVALID_PDF' }, { status: 415 });

    const body = new FormData();
    body.append('file', file, file.name);
    const response = await fetch(baseUrl + '/convert/pdf-to-images', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(90000),
    });
    if (response.status >= 300 && response.status < 400) return NextResponse.json({ error: 'Converter redirects are not allowed.', code: 'UPSTREAM_REDIRECT_BLOCKED' }, { status: 502 });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'PDF to images conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    if (!Array.isArray(data?.downloadUrls) || data.downloadUrls.length === 0 || data.downloadUrls.length > 500) return NextResponse.json({ error: 'Converter returned an invalid image output list.', code: 'MISSING_OR_INVALID_OUTPUT' }, { status: 502 });
    const downloadUrls: string[] = [];
    for (const value of data.downloadUrls) {
      if (typeof value !== 'string' || value.length > 4096) return NextResponse.json({ error: 'Converter returned an invalid image URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });
      let outputUrl: URL;
      try { outputUrl = new URL(value, baseUrl + '/'); } catch { return NextResponse.json({ error: 'Converter returned an invalid image URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 }); }
      if (!['http:', 'https:'].includes(outputUrl.protocol) || outputUrl.username || outputUrl.password || outputUrl.origin !== converterOrigin) return NextResponse.json({ error: 'Converter returned a disallowed image URL.', code: 'DISALLOWED_OUTPUT_URL' }, { status: 502 });
      downloadUrls.push(outputUrl.toString());
    }

    const proxiedDownloadUrls = downloadUrls.map((url) => '/api/convert/pdf-to-images/download?url=' + encodeURIComponent(url));
    return NextResponse.json({ success: true, count: proxiedDownloadUrls.length, downloadUrls: proxiedDownloadUrls });
  } catch {
    return NextResponse.json({ error: 'PDF to images conversion is temporarily unavailable.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 });
  }
}
