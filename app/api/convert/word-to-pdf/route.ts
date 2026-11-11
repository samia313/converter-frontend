import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const PDF_SIGNATURE = Buffer.from('%PDF-');

function safeDownloadUrl(value: unknown, baseUrl: string): URL | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, baseUrl);
    const base = new URL(baseUrl);
    // The converter must serve its own output; do not fetch arbitrary URLs
    // returned by the backend.
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (url.origin !== base.origin || url.username || url.password) return null;
    return url;
  } catch {
    return null;
  }
}

function safePdfFilename(originalName: string): string {
  const stem = originalName.replace(/\.(docx?|odt)$/i, '').replace(/[\r\n"\\/]/g, '_').trim();
  return `${stem || 'converted-document'}.pdf`;
}

export async function POST(request: Request) {
  const configuredUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!configuredUrl || !apiKey) {
    return NextResponse.json(
      { error: 'Word to PDF conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' },
      { status: 503 },
    );
  }

  let baseUrl: URL;
  try {
    baseUrl = new URL(configuredUrl);
    if (baseUrl.protocol !== 'https:' && baseUrl.protocol !== 'http:') throw new Error('Unsupported protocol');
  } catch {
    return NextResponse.json(
      { error: 'Word to PDF conversion service configuration is invalid.', code: 'INVALID_CONVERTER_URL' },
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
    const response = await fetch(new URL('/convert/word-to-pdf', baseUrl), {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const status = response.status >= 400 && response.status < 500 ? response.status : 502;
      return NextResponse.json(
        {
          error: typeof data?.error === 'string' ? data.error : 'Word to PDF conversion failed.',
          code: typeof data?.code === 'string' ? data.code : 'CONVERSION_FAILED',
        },
        { status },
      );
    }

    const downloadUrl = safeDownloadUrl(data?.downloadUrl, baseUrl.toString());
    if (!downloadUrl) {
      return NextResponse.json(
        { error: 'Conversion returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' },
        { status: 502 },
      );
    }

    const output = await fetch(downloadUrl, {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    });
    if (!output.ok) {
      return NextResponse.json(
        { error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' },
        { status: 502 },
      );
    }

    const bytes = Buffer.from(await output.arrayBuffer());
    if (bytes.length < PDF_SIGNATURE.length || !bytes.subarray(0, PDF_SIGNATURE.length).equals(PDF_SIGNATURE)) {
      return NextResponse.json(
        { error: 'The conversion service returned an invalid PDF file. Please try again.', code: 'INVALID_PDF_OUTPUT' },
        { status: 502 },
      );
    }

    return new NextResponse(bytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(bytes.length),
        'Content-Disposition': `attachment; filename="${safePdfFilename(file.name)}"`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'TimeoutError';
    return NextResponse.json(
      {
        error: isTimeout
          ? 'Word to PDF conversion timed out. Try a smaller document.'
          : 'Word to PDF conversion is temporarily unavailable. Please try again.',
        code: isTimeout ? 'CONVERTER_TIMEOUT' : 'CONVERTER_UNAVAILABLE',
      },
      { status: 502 },
    );
  }
}
