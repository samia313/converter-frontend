import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

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
    if (!data?.downloadUrl) return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });

    const output = await fetch(data.downloadUrl, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    if (!output.ok) return NextResponse.json({ error: 'Converted PowerPoint could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });

    const baseName = file.name.replace(/\.pdf$/i, '');
    return new NextResponse(await output.arrayBuffer(), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="' + baseName + '.pptx"',
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
