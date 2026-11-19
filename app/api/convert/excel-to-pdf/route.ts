import { enforceRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer } from '@/lib/pdf-utils';
import { validateR2DownloadUrl } from '@/lib/conversion-url-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) return NextResponse.json({ error: 'Excel to PDF conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No Excel file provided.', code: 'NO_FILE' }, { status: 400 });
    if (file.size === 0) return NextResponse.json({ error: 'The Excel file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Excel file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    if (!file.name.toLowerCase().endsWith('.xlsx')) return NextResponse.json({ error: 'Only XLSX files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });

    const signature = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    if (signature.length !== 4 || signature[0] !== 0x50 || signature[1] !== 0x4b || signature[2] !== 0x03 || signature[3] !== 0x04) {
      return NextResponse.json({ error: 'The uploaded file is not a valid XLSX archive.', code: 'INVALID_XLSX' }, { status: 415 });
    }

    const body = new FormData();
    body.append('file', file, file.name);
    const response = await fetch(baseUrl + '/convert/excel-to-pdf', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'Excel to PDF conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    const downloadUrl = validateR2DownloadUrl(data?.downloadUrl);
    if (!downloadUrl) return NextResponse.json({ error: 'Converter returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });

    const output = await fetch(downloadUrl, {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    });
    if (!output.ok) return NextResponse.json({ error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });

    const contentType = output.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (contentType !== 'application/pdf') {
      return NextResponse.json({ error: 'Converter returned an unexpected file type.', code: 'INVALID_OUTPUT_TYPE' }, { status: 502 });
    }

    const declaredLength = Number(output.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_FILE_SIZE) {
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
    const outputValidation = validateOutputBuffer(outputBuffer, 'Excel to PDF');
    if (!outputValidation.valid) {
      return NextResponse.json({ error: outputValidation.error || 'Converted PDF is invalid.', code: 'INVALID_OUTPUT' }, { status: 502 });
    }

    const filename = sanitizePdfDownloadFilename(file.name.replace(/\.xlsx$/i, '.pdf'), '');
    return new NextResponse(outputBuffer, {
      headers: getDownloadHeaders(filename, outputBuffer.length),
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Excel to PDF conversion failed.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 });
  }
}