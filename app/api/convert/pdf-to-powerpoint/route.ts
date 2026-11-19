import { enforceRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';
import { validatePdfFile } from '@/lib/pdf-utils';
import { validateR2DownloadUrl } from '@/lib/conversion-url-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) {
    return NextResponse.json({ error: 'PDF to PowerPoint conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error || 'Invalid PDF file.', code: 'INVALID_FILE' }, { status: file.size > MAX_FILE_SIZE ? 413 : 400 });
    }

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await fetch(baseUrl + '/convert/pdf-to-ppt', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body: formData,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json({
        error: typeof data?.error === 'string' ? data.error : 'PDF to PowerPoint conversion failed.',
        code: data?.code || 'CONVERSION_FAILED',
      }, { status: response.status });
    }
    const downloadUrl = validateR2DownloadUrl(data?.downloadUrl);
    if (!downloadUrl) return NextResponse.json({ error: 'Converter returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });

    const output = await fetch(downloadUrl, {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    });
    if (!output.ok) return NextResponse.json({ error: 'Converted PowerPoint could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });

    const expectedType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    const contentType = output.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (contentType !== expectedType) {
      return NextResponse.json({ error: 'Converter returned an unexpected file type.', code: 'INVALID_OUTPUT_TYPE' }, { status: 502 });
    }

    const declaredLength = output.headers.get('content-length');
    if (declaredLength !== null && Number.isFinite(Number(declaredLength)) && Number(declaredLength) > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Converted output exceeds the 100MB limit.', code: 'OUTPUT_TOO_LARGE' }, { status: 502 });
    }
    if (!output.body) return NextResponse.json({ error: 'Converted output is empty.', code: 'EMPTY_OUTPUT' }, { status: 502 });

    const reader = output.body.getReader();
    const chunks: Buffer[] = [];
    let totalSize = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalSize += value.byteLength;
        if (totalSize > MAX_FILE_SIZE) {
          await reader.cancel();
          return NextResponse.json({ error: 'Converted output exceeds the 100MB limit.', code: 'OUTPUT_TOO_LARGE' }, { status: 502 });
        }
        chunks.push(Buffer.from(value));
      }
    } finally {
      reader.releaseLock();
    }

    const outputBuffer = Buffer.concat(chunks);
    if (outputBuffer.length < 4 || !outputBuffer.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]))) {
      return NextResponse.json({ error: 'Converter returned an invalid PowerPoint file.', code: 'INVALID_OUTPUT' }, { status: 502 });
    }

    const baseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, '_').replace(/[. ]+$/g, '').slice(0, 120) || 'document';
    const filename = baseName + '.pptx';
    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': expectedType,
        'Content-Length': String(outputBuffer.length),
        'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'PDF to PowerPoint conversion failed.',
      code: 'CONVERTER_UNAVAILABLE',
    }, { status: 502 });
  }
}
