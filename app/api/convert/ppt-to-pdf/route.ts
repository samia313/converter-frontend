import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl || !apiKey) return NextResponse.json({ error: 'PowerPoint conversion service is not configured yet.', code: 'CONVERTER_NOT_CONFIGURED' }, { status: 503 });
  const incoming = await request.formData();
  const file = incoming.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'No PowerPoint file provided.', code: 'NO_FILE' }, { status: 400 });
  const ext = file.name.toLowerCase().endsWith('.pptx') ? '.pptx' : file.name.toLowerCase().endsWith('.ppt') ? '.ppt' : '';
  if (!ext) return NextResponse.json({ error: 'Only PPT and PPTX files are supported.', code: 'UNSUPPORTED_FORMAT' }, { status: 415 });
  const formData = new FormData(); formData.append('file', file, file.name);
  try {
    const response = await fetch(baseUrl + '/convert/ppt-to-pdf', { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey }, body: formData, cache: 'no-store', signal: AbortSignal.timeout(60000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json({ error: typeof data?.error === 'string' ? data.error : 'PowerPoint conversion failed.', code: data?.code || 'CONVERSION_FAILED' }, { status: response.status });
    if (!data?.downloadUrl) return NextResponse.json({ error: 'Conversion completed without a download URL.', code: 'MISSING_OUTPUT' }, { status: 502 });
    const output = await fetch(data.downloadUrl, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    if (!output.ok) return NextResponse.json({ error: 'Converted PDF could not be retrieved.', code: 'OUTPUT_FETCH_FAILED' }, { status: 502 });
    return new NextResponse(await output.arrayBuffer(), { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="' + file.name.replace(/\.(pptx?|PPTX?)$/, '') + '.pdf"', 'Cache-Control': 'no-store' } });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'PowerPoint conversion failed.', code: 'CONVERTER_UNAVAILABLE' }, { status: 502 }); }
}
