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
      { error: 'PowerPoint conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' },
      { status: 503 },
    );
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No PowerPoint file provided.', code: 'NO_FILE' }, { status: 400 });
    }
    if (!file.size) {
      return NextResponse.json({ error: 'The PowerPoint file is empty.', code: 'EMPTY_FILE' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'PowerPoint file exceeds the 100MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
    }

    const lowerName = file.name.toLowerCase();
    const extension = lowerName.endsWith('.pptx') ? '.pptx' : lowerName.endsWith('.ppt') ? '.ppt' : '';
    if (!extension) {
      return NextResponse.json({ error: 'Only PPT and PPTX files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });
    }

    // Validate the configured upstream once; never allow credentials or non-HTTP(S) URLs.
    let configuredOrigin: string;
    try {
      const configuredUrl = new URL(baseUrl);
      if (!['http:', 'https:'].includes(configuredUrl.protocol) || configuredUrl.username || configuredUrl.password) {
        throw new Error('Invalid converter URL');
      }
      configuredOrigin = configuredUrl.origin;
    } catch {
      return NextResponse.json({ error: 'PowerPoint conversion service configuration is invalid.', code: 'INVALID_CONVERTER_CONFIG' }, { status: 503 });
    }

    const inputBytes = Buffer.from(await file.slice(0, 8).arrayBuffer());
    const isPptxZip = extension === '.pptx' &&
      inputBytes.length >= 4 &&
      inputBytes[0] === 0x50 && inputBytes[1] === 0x4b &&
      inputBytes[2] === 0x03 && inputBytes[3] === 0x04;
    const isLegacyPpt = extension === '.ppt' &&
      inputBytes.length >= 8 &&
      inputBytes.equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
    if (!isPptxZip && !isLegacyPpt) {
      return NextResponse.json({ error: 'The uploaded file does not match a supported PowerPoint file format.', code: 'INVALID_INPUT_FILE' }, { status: 400 });
    }

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await fetch(baseUrl + '/convert/ppt-to-pdf', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey },
      body: formData,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(60000),
    });

    if (response.status >= 300 && response.status < 400) {
      return NextResponse.json({ error: 'The conversion service redirected unexpectedly.', code: 'UPSTREAM_REDIRECT_REJECTED' }, { status: 502 });
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { error: typeof data?.error === 'string' ? data.error : 'PowerPoint conversion failed.', code: typeof data?.code === 'string' ? data.code : 'CONVERSION_FAILED' },
        { status: response.status >= 400 && response.status < 500 ? response.status : 502 },
      );
    }

    if (typeof data?.downloadUrl !== 'string' || !data.downloadUrl) {
      return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });
    }

    let downloadUrl: URL;
    try {
      downloadUrl = new URL(data.downloadUrl, baseUrl);
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
      redirect: 'manual',
      signal: AbortSignal.timeout(30000),
    });

    if (output.status >= 300 && output.status < 400) {
      return NextResponse.json({ error: 'The converter output URL redirected unexpectedly.', code: 'OUTPUT_REDIRECT_REJECTED' }, { status: 502 });
    }
    if (!output.ok) {
      return NextResponse.json({ error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });
    }

    const outputBytes = Buffer.from(await output.arrayBuffer());
    if (outputBytes.length < 5 || outputBytes.subarray(0, 5).toString('ascii') !== '%PDF-') {
      return NextResponse.json({ error: 'Converter returned an invalid PDF output.', code: 'INVALID_OUTPUT' }, { status: 502 });
    }

    const safeBaseName = file.name
      .replace(/\.(pptx?)$/i, '')
      .replace(/[\\/\r\n"\x00-\x1f]/g, '_')
      .trim()
      .slice(0, 150) || 'converted-presentation';

    return new NextResponse(outputBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeBaseName}.pdf"`,
        'Content-Length': String(outputBytes.length),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[ppt-to-pdf] Conversion request failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'PowerPoint conversion failed. Please try again later.', code: 'CONVERTER_UNAVAILABLE' },
      { status: 502 },
    );
  }
}
