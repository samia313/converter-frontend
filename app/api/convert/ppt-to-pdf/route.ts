import { enforceRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_OUTPUT_SIZE = 100 * 1024 * 1024;
const ALLOWED_DOWNLOAD_HOST =
  'pdfilio-files.dac4efd64eb5dc7db6b2d19d971c99c5.r2.cloudflarestorage.com';

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
      {
        error: 'PowerPoint conversion service is not configured yet.',
        code: 'CONVERTER_NOT_CONFIGURED',
      },
      { status: 503 }
    );
  }

  let incoming: FormData;

  try {
    incoming = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Invalid multipart request.', code: 'INVALID_FORM_DATA' },
      { status: 400 }
    );
  }

  const file = incoming.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'No PowerPoint file provided.', code: 'NO_FILE' },
      { status: 400 }
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { error: 'The uploaded file is empty.', code: 'EMPTY_FILE' },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'PowerPoint file exceeds the 100 MB limit.', code: 'FILE_TOO_LARGE' },
      { status: 413 }
    );
  }

  const ext = file.name.toLowerCase().endsWith('.pptx')
    ? '.pptx'
    : file.name.toLowerCase().endsWith('.ppt')
      ? '.ppt'
      : '';

  if (!ext) {
    return NextResponse.json(
      { error: 'Only PPT and PPTX files are supported.', code: 'UNSUPPORTED_FORMAT' },
      { status: 415 }
    );
  }

  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const response = await fetch(baseUrl + '/convert/ppt-to-pdf', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body: formData,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            typeof data?.error === 'string'
              ? data.error
              : 'PowerPoint conversion failed.',
          code: data?.code || 'CONVERSION_FAILED',
        },
        { status: response.status }
      );
    }

    if (typeof data?.downloadUrl !== 'string') {
      return NextResponse.json(
        { error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' },
        { status: 502 }
      );
    }

    let downloadUrl: URL;

    try {
      downloadUrl = new URL(data.downloadUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid conversion download URL.', code: 'INVALID_OUTPUT_URL' },
        { status: 502 }
      );
    }

    if (
      downloadUrl.protocol !== 'https:' ||
      downloadUrl.hostname !== ALLOWED_DOWNLOAD_HOST ||
      downloadUrl.username !== '' ||
      downloadUrl.password !== '' ||
      (downloadUrl.port !== '' && downloadUrl.port !== '443')
    ) {
      return NextResponse.json(
        { error: 'Conversion returned an untrusted download URL.', code: 'UNTRUSTED_OUTPUT_URL' },
        { status: 502 }
      );
    }

    const output = await fetch(downloadUrl.toString(), {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    });

    if (!output.ok) {
      return NextResponse.json(
        { error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' },
        { status: 502 }
      );
    }

    const outputType = output.headers
      .get('content-type')
      ?.split(';', 1)[0]
      .trim()
      .toLowerCase();

    if (outputType !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Conversion service returned an invalid file type.', code: 'INVALID_OUTPUT_TYPE' },
        { status: 502 }
      );
    }

    const contentLength = output.headers.get('content-length');

    if (contentLength && /^\d+$/.test(contentLength) &&
        Number(contentLength) > MAX_OUTPUT_SIZE) {
      return NextResponse.json(
        { error: 'Converted PDF exceeds the 100 MB output limit.', code: 'OUTPUT_TOO_LARGE' },
        { status: 502 }
      );
    }

    if (!output.body) {
      return NextResponse.json(
        { error: 'Conversion returned an empty PDF.', code: 'EMPTY_OUTPUT' },
        { status: 502 }
      );
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
            { error: 'Converted PDF exceeds the 100 MB output limit.', code: 'OUTPUT_TOO_LARGE' },
            { status: 502 }
          );
        }

        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    if (totalBytes === 0) {
      return NextResponse.json(
        { error: 'Conversion returned an empty PDF.', code: 'EMPTY_OUTPUT' },
        { status: 502 }
      );
    }

    const outputBuffer = new Uint8Array(totalBytes);
    let offset = 0;

    for (const chunk of chunks) {
      outputBuffer.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const safeBaseName =
      file.name
        .replace(/\.pptx?$/i, '')
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .slice(0, 120) || 'converted-presentation';

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeBaseName}.pdf"`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'PowerPoint conversion service is unavailable.', code: 'CONVERTER_UNAVAILABLE' },
      { status: 502 }
    );
  }
}
