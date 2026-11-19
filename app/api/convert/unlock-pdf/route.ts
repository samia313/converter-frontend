import { enforceRateLimit } from '@/lib/rate-limit';
import { sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils';
import { validateR2DownloadUrl } from '@/lib/conversion-url-validation';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_OUTPUT_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceRateLimit(request, {
    namespace: 'conversion',
    limit: 10,
    window: '1 m',
  });
  if (rateLimitResponse) return rateLimitResponse;

  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: 'PDF unlocking service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' },
      { status: 503 }
    );
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    const passwordValue = incoming.get('password');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: 'The PDF file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'PDF exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    }

    const fileValidation = await validatePdfFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json(
        { error: fileValidation.error, code: 'INVALID_PDF' },
        { status: 400 }
      );
    }

    if (passwordValue !== null && typeof passwordValue !== 'string') {
      return NextResponse.json({ error: 'Invalid PDF password.', code: 'INVALID_PASSWORD' }, { status: 400 });
    }

    const password = typeof passwordValue === 'string' ? passwordValue : '';
    if (password.length > 1024) {
      return NextResponse.json({ error: 'Password is too long.', code: 'INVALID_PASSWORD' }, { status: 400 });
    }

    const body = new FormData();
    body.append('file', file, file.name);
    body.append('password', password);

    const response = await fetch(baseUrl + '/convert/unlock-pdf', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: typeof data?.error === 'string' ? data.error : 'PDF unlocking failed.',
          code: typeof data?.code === 'string' ? data.code : 'UNLOCK_FAILED',
        },
        { status: response.status }
      );
    }

    const downloadUrl = validateR2DownloadUrl(data?.downloadUrl);
    if (!downloadUrl) {
      return NextResponse.json(
        { error: 'Unlocking returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' },
        { status: 502 }
      );
    }

    const output = await fetch(downloadUrl, {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    });

    if (!output.ok) {
      return NextResponse.json(
        { error: 'Unlocked PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' },
        { status: 502 }
      );
    }

    const contentType = (output.headers.get('content-type') || '')
      .split(';', 1)[0]
      .trim()
      .toLowerCase();

    if (contentType !== 'application/pdf') {
      return NextResponse.json(
        { error: 'The conversion service returned an unexpected file type.', code: 'INVALID_OUTPUT_TYPE' },
        { status: 502 }
      );
    }

    const contentLength = output.headers.get('content-length');
    if (contentLength !== null) {
      const parsedLength = Number(contentLength);
      if (!Number.isSafeInteger(parsedLength) || parsedLength < 0 || parsedLength > MAX_OUTPUT_SIZE) {
        return NextResponse.json(
          { error: 'Unlocked PDF exceeds the 100MB output limit.', code: 'OUTPUT_TOO_LARGE' },
          { status: 502 }
        );
      }
    }

    if (!output.body) {
      return NextResponse.json({ error: 'Unlocked PDF output is empty.', code: 'EMPTY_OUTPUT' }, { status: 502 });
    }

    const reader = output.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        totalBytes += value.byteLength;

        if (totalBytes > MAX_OUTPUT_SIZE) {
          await reader.cancel().catch(() => undefined);
          return NextResponse.json(
            { error: 'Unlocked PDF exceeds the 100MB output limit.', code: 'OUTPUT_TOO_LARGE' },
            { status: 502 }
          );
        }

        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    const buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
    const validation = validateOutputBuffer(buffer, 'unlock-pdf');

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'The conversion service returned an invalid PDF.', code: 'INVALID_OUTPUT' },
        { status: 502 }
      );
    }

    const filename = sanitizePdfDownloadFilename(file.name, '-unlocked.pdf');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Content-Length': String(buffer.length),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'PDF unlocking failed. Please try again.', code: 'CONVERTER_UNAVAILABLE' },
      { status: 502 }
    );
  }
}
