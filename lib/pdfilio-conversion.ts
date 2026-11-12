import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

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

  return {
    jobId: String(data.jobId),
    accessToken: createJobToken(String(data.jobId), tool),
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

export async function downloadConversion(jobId: string) {
  const config = getConfig();
  const status = await getConversionStatus(jobId);

  if (status.state !== 'completed' || !status.result?.downloadUrl) {
    throw new Error('Conversion is not complete yet');
  }

  const response = await fetch(status.result.downloadUrl, {
    cache: 'no-store',
    signal: AbortSignal.timeout(60000),
  });

  if (!response.ok || !response.body) {
    throw new Error('Converted file could not be downloaded');
  }

  return {
    body: response.body,
    filename: String(status.result.filename || 'converted-file'),
    mimeType: String(status.result.mimeType || 'application/octet-stream'),
  };
}
