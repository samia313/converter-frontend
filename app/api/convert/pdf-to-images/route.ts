import { enforceRateLimit } from '@/lib/rate-limit';
import { validatePdfFile } from '@/lib/pdf-utils';
import { validateR2DownloadUrl } from '@/lib/conversion-url-validation';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_PAGES = 50;

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
      { error: 'PDF to images service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' },
      { status: 503 }
    );
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'PDF file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' },
        { status: 413 }
      );
    }

    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error, code: 'INVALID_PDF' },
        { status: 400 }
      );
    }

    let pageCount: number;

    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer(), {
        ignoreEncryption: true,
      });
      pageCount = pdf.getPageCount();
    } catch {
      return NextResponse.json(
        { error: 'Could not read this PDF. Please check that it is valid and supported.', code: 'INVALID_PDF' },
        { status: 400 }
      );
    }

    if (pageCount === 0) {
      return NextResponse.json(
        { error: 'PDF contains no pages.', code: 'EMPTY_PDF' },
        { status: 400 }
      );
    }

    if (pageCount > MAX_PAGES) {
      return NextResponse.json(
        { error: `PDF contains ${pageCount} pages. The maximum allowed is ${MAX_PAGES} pages.`, code: 'TOO_MANY_PAGES' },
        { status: 400 }
      );
    }

    const body = new FormData();
    body.append('file', file, file.name);

    const response = await fetch(baseUrl + '/convert/pdf-to-images', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(90000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: typeof data?.error === 'string' ? data.error : 'PDF to images conversion failed.',
          code: typeof data?.code === 'string' ? data.code : 'CONVERSION_FAILED',
        },
        { status: response.status }
      );
    }

    if (
      !Array.isArray(data?.downloadUrls) ||
      data.downloadUrls.length === 0 ||
      data.downloadUrls.length > MAX_PAGES ||
      !Number.isInteger(data?.count) ||
      data.count !== data.downloadUrls.length
    ) {
      return NextResponse.json(
        { error: 'Conversion returned an invalid image list.', code: 'MISSING_OUTPUT' },
        { status: 502 }
      );
    }

    const validatedUrls: string[] = [];

    for (const value of data.downloadUrls) {
      const validatedUrl = validateR2DownloadUrl(value);

      if (!validatedUrl) {
        return NextResponse.json(
          { error: 'Conversion returned an invalid image URL.', code: 'INVALID_OUTPUT_URL' },
          { status: 502 }
        );
      }

      validatedUrls.push(validatedUrl.toString());
    }

    return NextResponse.json({
      success: true,
      count: validatedUrls.length,
      downloadUrls: validatedUrls,
    });
  } catch {
    return NextResponse.json(
      { error: 'PDF to images conversion failed. Please try again.', code: 'CONVERTER_UNAVAILABLE' },
      { status: 502 }
    );
  }
}
