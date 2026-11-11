import { NextResponse } from 'next/server';
import JSZip from 'jszip';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

async function validatePptxStructure(buffer: Buffer): Promise<boolean> {
  try {
    const archive = await JSZip.loadAsync(buffer, { checkCRC32: true });
    const requiredFiles = [
      '[Content_Types].xml',
      '_rels/.rels',
      'ppt/presentation.xml',
      'ppt/_rels/presentation.xml.rels',
    ];

    for (const path of requiredFiles) {
      if (!archive.file(path)) return false;
    }

    const slidePaths = Object.keys(archive.files).filter(
      (path) => /^ppt\/slides\/slide\d+\.xml$/.test(path) && !archive.files[path].dir,
    );
    if (slidePaths.length === 0) return false;

    const [contentTypes, rootRels, presentation, presentationRels, firstSlide] = await Promise.all([
      ...requiredFiles.map(async (path) => archive.file(path)!.async('string')),
      archive.file(slidePaths.sort((a, b) => {
        const ai = Number(a.match(/slide(\d+)\.xml$/)?.[1] || 0);
        const bi = Number(b.match(/slide(\d+)\.xml$/)?.[1] || 0);
        return ai - bi;
      })[0])!.async('string'),
    ]);

    return (
      contentTypes.includes('presentationml.presentation.main+xml') &&
      rootRels.includes('Target="ppt/presentation.xml"') &&
      presentation.includes('<p:presentation') &&
      presentationRels.includes('/slide') &&
      firstSlide.includes('<p:sld')
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) {
    return NextResponse.json({ error: 'PDF to PowerPoint conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });
  }

  const incoming = await request.formData();
  const file = incoming.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'No PDF file provided.', code: 'NO_FILE' }, { status: 400 });
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'PDF exceeds the 100 MB limit.', code: 'FILE_TOO_LARGE' }, { status: 413 });
  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });
  }

  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
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
    if (typeof data?.downloadUrl !== 'string' || !data.downloadUrl.trim()) {
      return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });
    }

    // Only fetch output from the configured converter origin; never let an upstream
    // response turn this endpoint into a server-side request forgery proxy.
    let downloadUrl: URL;
    let converterUrl: URL;
    try {
      converterUrl = new URL(baseUrl);
      downloadUrl = new URL(data.downloadUrl, converterUrl);
    } catch {
      return NextResponse.json({ error: 'The converter returned an invalid download URL.', code: 'INVALID_OUTPUT_URL' }, { status: 502 });
    }
    if (
      downloadUrl.origin !== converterUrl.origin ||
      downloadUrl.username ||
      downloadUrl.password ||
      !['http:', 'https:'].includes(downloadUrl.protocol)
    ) {
      return NextResponse.json({ error: 'The converter returned an untrusted download URL.', code: 'UNTRUSTED_OUTPUT_URL' }, { status: 502 });
    }

    const output = await fetch(downloadUrl, {
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(30000),
    });
    if (output.status >= 300 && output.status < 400) {
      return NextResponse.json({ error: 'The converter output URL redirected unexpectedly.', code: 'OUTPUT_REDIRECT_REJECTED' }, { status: 502 });
    }
    if (!output.ok) return NextResponse.json({ error: 'Converted PowerPoint could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });

    const outputBuffer = Buffer.from(await output.arrayBuffer());
    if (outputBuffer.length < 4 || outputBuffer[0] !== 0x50 || outputBuffer[1] !== 0x4b ||
        outputBuffer[2] !== 0x03 || outputBuffer[3] !== 0x04) {
      return NextResponse.json({ error: 'The converter returned an invalid PowerPoint file.', code: 'INVALID_OUTPUT' }, { status: 502 });
    }
    if (!(await validatePptxStructure(outputBuffer))) {
      return NextResponse.json({ error: 'The generated PowerPoint failed internal file validation.', code: 'INVALID_PPTX_STRUCTURE' }, { status: 502 });
    }

    const baseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/\r\n"]/g, '_').slice(0, 150) || 'presentation';
    return new NextResponse(outputBuffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="' + baseName + '.pptx"',
        'Content-Length': String(outputBuffer.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'PDF to PowerPoint conversion failed.',
      code: 'CONVERTER_UNAVAILABLE',
    }, { status: 502 });
  }
}
