import { enforceRateLimit } from '@/lib/rate-limit';
import { validatePdfFile } from '@/lib/pdf-utils';
import { validateR2DownloadUrl } from '@/lib/conversion-url-validation';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceRateLimit(request, {
    namespace: 'conversion',
    limit: 10,
    window: '1 m',
  });
  if (rateLimitResponse) return rateLimitResponse;

  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'The maximum file size is 100MB.' }, { status: 413 });
    }

    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!baseUrl || !apiKey) {
      return NextResponse.json(
        { error: 'OCR conversion service is not configured for this deployment.' },
        { status: 503 }
      );
    }

    const body = new FormData();
    body.append('file', file, file.name);
    body.append('language', 'eng');

    const response = await fetch(baseUrl + '/convert/pdf-ocr', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(75000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: typeof data?.error === 'string' ? data.error : 'OCR conversion failed.',
          code: typeof data?.code === 'string' ? data.code : 'OCR_FAILED',
        },
        { status: response.status }
      );
    }

    if (typeof data?.textExtracted !== 'string') {
      return NextResponse.json(
        { error: 'OCR completed without extracted text.', code: 'MISSING_TEXT' },
        { status: 502 }
      );
    }

    let downloadUrl: string | null = null;

    if (data.downloadUrl !== null && data.downloadUrl !== undefined) {
      const validatedUrl = validateR2DownloadUrl(data.downloadUrl);

      if (!validatedUrl) {
        return NextResponse.json(
          { error: 'OCR returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' },
          { status: 502 }
        );
      }

      downloadUrl = validatedUrl.toString();
    }

    return NextResponse.json({
      success: true,
      text: data.textExtracted,
      downloadUrl,
    });
  } catch {
    return NextResponse.json(
      { error: 'OCR processing failed. Please try again.', code: 'OCR_UNAVAILABLE' },
      { status: 502 }
    );
  }
}
