import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const MAX_IMAGE_BYTES = 50 * 1024 * 1024;

function isImageSignature(bytes: Uint8Array) {
  const png = bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
  const jpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const webp = bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  return png || jpeg || webp;
}

export async function GET(request: Request) {
  const baseUrl = process.env.DIGITALOCEAN_CONVERTER_URL?.replace(/\/$/, '');
  const apiKey = process.env.DIGITALOCEAN_CONVERTER_API_KEY;
  if (!baseUrl) return NextResponse.json({ error: 'Image download service is not configured.' }, { status: 503 });

  let converterOrigin: string;
  try {
    const configured = new URL(baseUrl);
    if (!['http:', 'https:'].includes(configured.protocol) || configured.username || configured.password) throw new Error('invalid converter URL');
    converterOrigin = configured.origin;
  } catch {
    return NextResponse.json({ error: 'Image download service is misconfigured.' }, { status: 503 });
  }

  const params = new URL(request.url).searchParams;
  const value = params.get('url');
  const signature = params.get('sig');
  const expiresValue = params.get('exp');
  if (!value || value.length > 4096 || !expiresValue || !/^\\d{10}$/.test(expiresValue) || !signature || !/^[a-f0-9]{64}$/.test(signature)) return NextResponse.json({ error: 'A valid image URL is required.' }, { status: 400 });
  const expiresAt = Number(expiresValue);
  const now = Math.floor(Date.now() / 1000);
  if (expiresAt < now || expiresAt > now + 15 * 60 + 30) return NextResponse.json({ error: 'Image download link has expired or is invalid.' }, { status: 403 });

  let imageUrl: URL;
  try {
    imageUrl = new URL(value);
  } catch {
    return NextResponse.json({ error: 'Invalid image URL.' }, { status: 400 });
  }
  if (!['http:', 'https:'].includes(imageUrl.protocol) || imageUrl.username || imageUrl.password || imageUrl.origin !== converterOrigin) {
    return NextResponse.json({ error: 'Image URL is not allowed.' }, { status: 403 });
  }
  if (!apiKey) return NextResponse.json({ error: 'Image download signing is not configured.' }, { status: 503 });
  const expectedSignature = createHmac('sha256', apiKey).update(value + '\\n' + expiresValue).digest();
  const suppliedSignature = Buffer.from(signature, 'hex');
  if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) {
    return NextResponse.json({ error: 'Image download signature is invalid.' }, { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, { headers: apiKey ? { Authorization: 'Bearer ' + apiKey } : {}, cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(20000) });
    if (response.status >= 300 && response.status < 400) return NextResponse.json({ error: 'Image redirects are not allowed.' }, { status: 502 });
    if (!response.ok || !response.body) return NextResponse.json({ error: 'Could not retrieve converted image.' }, { status: 502 });
    const declaredLength = Number(response.headers.get('content-length') || 0);
    if (declaredLength > MAX_IMAGE_BYTES) return NextResponse.json({ error: 'Converted image exceeds the 50MB limit.' }, { status: 413 });

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      total += chunk.byteLength;
      if (total > MAX_IMAGE_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: 'Converted image exceeds the 50MB limit.' }, { status: 413 });
      }
      chunks.push(chunk);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    if (!isImageSignature(bytes)) return NextResponse.json({ error: 'Converter returned an invalid image file.' }, { status: 502 });

    const contentType = bytes[0] === 0x89 ? 'image/png' : bytes[0] === 0xff ? 'image/jpeg' : 'image/webp';
    return new Response(bytes, { status: 200, headers: { 'Content-Type': contentType, 'Content-Length': String(bytes.byteLength), 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch {
    return NextResponse.json({ error: 'Image download is temporarily unavailable.' }, { status: 502 });
  }
}
