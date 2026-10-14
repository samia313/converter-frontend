import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: 'Word to PDF conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' },
      { status: 503 },
    );
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No Word file provided.', code: 'NO_FILE' }, { status: 400 });
    }
    if (!file.size) {
      return NextResponse.json({ error: 'The Word file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Word file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    }

    const lower = file.name.toLowerCase();
    if (!lower.endsWith('.doc') && !lower.endsWith('.docx')) {
      return NextResponse.json({ error: 'Only DOC and DOCX files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });
    }

    const body = new FormData();
    body.append('file', file, file.name);
    const response = await fetch(baseUrl + '/convert/word-to-pdf', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { error: typeof data?.error === 'string' ? data.error : 'Word to PDF conversion failed.', code: data?.code || 'CONVERSION_FAILED' },
        { status: response.status },
      );
    }
    if (typeof data?.downloadUrl !== 'string' || !data.downloadUrl) {
      return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });
    }

    // Restrict output retrieval to the configured converter origin to prevent SSRF via an upstream URL.
    let downloadUrl: URL;
    try {
      downloadUrl = new URL(data.downloadUrl, baseUrl);
      const configuredOrigin = new URL(baseUrl).origin;
      if (
        downloadUrl.origin !== configuredOrigin ||
        downloadUrl.username ||
        downloadUrl.password ||
        !['http:', 'https:'].includes(downloadUrl.protocol)
      ) {
        return NextResponse.json({ error: 'Converter returned an invalid output location.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ error: 'Converter returned an invalid output location.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });
    }

    const output = await fetch(downloadUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(30000),
    });
    if (!output.ok) {
      return NextResponse.json({ error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });
    }

    const outputBytes = Buffer.from(await output.arrayBuffer());
    if (outputBytes.length < 5 || outputBytes.subarray(0, 5).toString('ascii') !== '%PDF-') {
      return NextResponse.json({ error: 'Converter returned an invalid PDF output.', code: 'INVALID_OUTPUT' }, { status: 502 });
    }

    const safeBaseName = file.name
      .replace(/\.(docx?)$/i, '')
      .replace(/[\\/\r\n"\x00-\x1f]/g, '_')
      .trim()
      .slice(0, 150) || 'converted-document';

    return new NextResponse(outputBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeBaseName}.pdf"`,
        'Content-Length': String(outputBytes.length),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[word-to-pdf] Conversion request failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Word to PDF conversion failed. Please try again later.', code: 'CONVERTER_UNAVAILABLE' },
      { status: 502 },
    );
  }
}
