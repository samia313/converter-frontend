const ALLOWED_R2_HOST =
  'pdfilio-files.dac4efd64eb5dc7db6b2d19d971c99c5.r2.cloudflarestorage.com';

export function validateR2DownloadUrl(value: unknown): URL | null {
  if (typeof value !== 'string' || value.length > 8192) return null;

  try {
    const url = new URL(value);

    if (url.protocol !== 'https:') return null;
    if (url.hostname !== ALLOWED_R2_HOST) return null;
    if (url.username || url.password || url.hash) return null;
    if (url.port && url.port !== '443') return null;
    if (!url.pathname.startsWith('/conversions/')) return null;

    const algorithm = url.searchParams.get('X-Amz-Algorithm');
    const signature = url.searchParams.get('X-Amz-Signature');
    const credential = url.searchParams.get('X-Amz-Credential');
    const date = url.searchParams.get('X-Amz-Date');
    const expires = Number(url.searchParams.get('X-Amz-Expires'));

    if (algorithm !== 'AWS4-HMAC-SHA256') return null;
    if (!signature || !/^[a-f0-9]{64}$/i.test(signature)) return null;
    if (!credential || !date) return null;
    if (!Number.isInteger(expires) || expires < 1 || expires > 3600) return null;

    return url;
  } catch {
    return null;
  }
}
