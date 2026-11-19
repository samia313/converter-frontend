import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { validateR2DownloadUrl } from '@/lib/conversion-url-validation';

type ConversionTool = 'pdf-to-word' | 'word-to-pdf';

type Config = {
  url: string;
  apiKey: string;
  secret: string;
};

function getConfig(): Config {
  const url = process.env.CONVERSION_API_URL?.trim();
  const apiKey = process.env.CONVERSION_API_KEY?.trim();
  const secret = process.env.CONVERSION_JOB_SECRET?.trim();

  if (!url || !apiKey || !secret) {
    throw new Error('Conversion service configuration is incomplete');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error('Conversion service URL is invalid');
  }

  if (parsedUrl.protocol !== 'https:') {
    throw new Error('Conversion service must use HTTPS');
  }

  return { url: url.replace(/\/+$/, ''), apiKey, secret };
}

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function createJobToken(jobId: string, tool: ConversionTool): string {
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(jobId)) {
    throw new Error('Invalid conversion job ID');
  }

  const config = getConfig();
  const payload = Buffer.from(JSON.stringify({
    jobId,
    tool,
    expiresAt: Date.now() + 60 * 60 * 1000,
  })).toString('base64url');

  return `${payload}.${sign(payload, config.secret)}`;
}

export function verifyJobToken(
  token: string,
  expectedTool: ConversionTool
): string | null {
  try {
    const config = getConfig();
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payload, signature] = parts;
    const expected = sign(payload, config.secret);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);

    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());

    if (
      data.tool !== expectedTool ||
      typeof data.jobId !== 'string' ||
      !/^[a-zA-Z0-9_-]{1,128}$/.test(data.jobId) ||
      typeof data.expiresAt !== 'number' ||
      data.expiresAt < Date.now()
    ) return null;

    return data.jobId;
  } catch {
    return null;
  }
}

export async function submitConversion(
  file: File,
  tool: ConversionTool
) {
  const config = getConfig();
  const form = new FormData();

  form.append('file', file, file.name);
  form.append('tool', tool);

  const response = await fetch(`${config.url}/convert/jobs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.apiKey}` },
    body: form,
    signal: AbortSignal.timeout(120000),
    cache: 'no-store',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success || !data?.jobId) {
    throw new Error(data?.error || 'Conversion job could not be submitted');
  }

  if (typeof data.jobId !== 'string' || !/^[a-zA-Z0-9_-]{1,128}$/.test(data.jobId)) {
    throw new Error('Conversion service returned an invalid job ID');
  }

  return {
    jobId: data.jobId,
    accessToken: createJobToken(data.jobId, tool),
  };
}

export async function getConversionStatus(jobId: string) {
  const config = getConfig();

  const response = await fetch(
    `${config.url}/convert/jobs/${encodeURIComponent(jobId)}`,
    {
      headers: { Authorization: `Bearer ${config.apiKey}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'Could not retrieve conversion status');
  }

  return data;
}

export async function downloadConversion(
  jobId: string,
  tool: ConversionTool
) {
  const status = await getConversionStatus(jobId);

  if (status.state !== 'completed' || !status.result?.downloadUrl) {
    throw new Error('Conversion is not complete yet');
  }

  const downloadUrl = validateR2DownloadUrl(status.result.downloadUrl);
  if (!downloadUrl) {
    throw new Error('Conversion service returned an invalid download URL');
  }

  const response = await fetch(downloadUrl, {
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(60000),
  });

  if (!response.ok || !response.body) {
    throw new Error('Converted file could not be downloaded');
  }

  const maxOutputSize = 100 * 1024 * 1024;
  const contentLengthHeader = response.headers.get('content-length');

  if (contentLengthHeader !== null) {
    const contentLength = Number(contentLengthHeader);
    if (
      !Number.isSafeInteger(contentLength) ||
      contentLength < 0 ||
      contentLength > maxOutputSize
    ) {
      await response.body.cancel();
      throw new Error('Converted file exceeds the 100MB output limit');
    }
  }

  const extension = tool === 'pdf-to-word' ? 'docx' : 'pdf';
  const mimeType = tool === 'pdf-to-word'
    ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    : 'application/pdf';

  const expectedSignature = tool === 'pdf-to-word'
    ? [0x50, 0x4b, 0x03, 0x04]
    : [0x25, 0x50, 0x44, 0x46, 0x2d];

  const reader = response.body.getReader();
  let prefix = new Uint8Array(0);
  let totalBytes = 0;

  try {
    while (prefix.length < expectedSignature.length) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxOutputSize) {
        throw new Error('Converted file exceeds the 100MB output limit');
      }

      const combined = new Uint8Array(prefix.length + value.length);
      combined.set(prefix);
      combined.set(value, prefix.length);
      prefix = combined;
    }

    if (
      prefix.length < expectedSignature.length ||
      !expectedSignature.every((byte, index) => prefix[index] === byte)
    ) {
      throw new Error('Converted file has an invalid file signature');
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  }

  const rawFilename = typeof status.result.filename === 'string'
    ? status.result.filename
    : 'converted-file';

  const baseName = rawFilename
    .replace(/\\/g, '/')
    .split('/')
    .pop()!
    .replace(/\.[^.]*$/, '')
    .replace(/[^a-zA-Z0-9._ -]/g, '_')
    .replace(/[. ]+$/g, '')
    .slice(0, 140);

  let prefixPending = true;

  const limitedBody = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (prefixPending) {
        prefixPending = false;
        controller.enqueue(prefix);
        return;
      }

      try {
        const { done, value } = await reader.read();

        if (done) {
          controller.close();
          return;
        }

        totalBytes += value.byteLength;

        if (totalBytes > maxOutputSize) {
          await reader.cancel().catch(() => {});
          controller.error(new Error('Converted file exceeds the 100MB output limit'));
          return;
        }

        controller.enqueue(value);
      } catch (error) {
        controller.error(error);
      }
    },
    async cancel(reason) {
      await reader.cancel(reason).catch(() => {});
    },
  });

  return {
    body: limitedBody,
    filename: `${baseName || 'converted-file'}.${extension}`,
    mimeType,
  };
}
