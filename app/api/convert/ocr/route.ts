import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  let converterOrigin: string | null = null;
  if (baseUrl) {
    try {
      const configured = new URL(baseUrl);
      if (!['http:', 'https:'].includes(configured.protocol) || configured.username || configured.password) throw new Error('invalid converter URL');
      converterOrigin = configured.origin;
    } catch {
      return NextResponse.json({ error: 'OCR service is misconfigured.', code: 'INVALID_CONVERTER_URL' }, { status: 503 });
    }
  }
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    if (!file.size) return NextResponse.json({ error: 'The uploaded file is empty.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'The maximum file size is 100MB.' }, { status: 413 });
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (extension !== 'pdf') return NextResponse.json({ error: 'Server OCR currently accepts PDF files. JPG/PNG/WebP OCR remains available in the browser tool.' }, { status: 415 });
    if (!baseUrl || !apiKey) return NextResponse.json({ error: 'OCR conversion service is not configured for this deployment.' }, { status: 503 });

    const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (header.length !== 5 || String.fromCharCode(...header) !== '%PDF-') return NextResponse.json({ error: 'The uploaded file is not a valid PDF.', code: 'INVALID_PDF' }, { status: 415 });

    const body = new FormData();
    body.append('file', file, file.name);
    body.append('language', 'eng');
    const response = await fetch(baseUrl + '/convert/pdf-ocr', { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey }, body, cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(75000) });
    if (response.status >= 300 && response.status < 400) return NextResponse.json({ error: 'Converter redirects are not allowed.', code: 'UPSTREAM_REDIRECT_BLOCKED' }, { status: 502 });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'OCR conversion failed.', code: data?.code || 'OCR_FAILED' }, { status: response.status });
    if (typeof data?.textExtracted !== 'string' || data.textExtracted.length > 20_000_000) return NextResponse.json({ error: 'OCR returned missing or oversized text.', code: 'MISSING_OR_INVALID_TEXT' }, { status: 502 });
    let downloadUrl: string | null = null;
    if (data.downloadUrl != null) {
      if (typeof data.downloadUrl !== 'string' || data.downloadUrl.length > 4096 || !converterOrigin) return NextResponse.json({ error: 'OCR returned an invalid output URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });
      let outputUrl: URL;
      try { outputUrl = new URL(data.downloadUrl, baseUrl + '/'); } catch { return NextResponse.json({ error: 'OCR returned an invalid output URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 }); }
      if (!['http:', 'https:'].includes(outputUrl.protocol) || outputUrl.username || outputUrl.password || outputUrl.origin !== converterOrigin) return NextResponse.json({ error: 'OCR returned a disallowed output URL.', code: 'DISALLOWED_OUTPUT_URL' }, { status: 502 });
      downloadUrl = outputUrl.toString();
    }
    return NextResponse.json({ success: true, text: data.textExtracted, downloadUrl });
  } catch {
    return NextResponse.json({ error: 'OCR processing is temporarily unavailable.', code: 'OCR_UNAVAILABLE' }, { status: 502 });
  }
}