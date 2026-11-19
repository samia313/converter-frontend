export type InputValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; error: string };

export async function readJsonObject(
  request: Request,
  maxBytes = 1_000_000
): Promise<InputValidationResult<Record<string, unknown>>> {
  const contentLength = request.headers.get('content-length');

  if (contentLength !== null) {
    const parsedLength = Number(contentLength);

    if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) {
      return { valid: false, error: 'Invalid Content-Length header.' };
    }

    if (parsedLength > maxBytes) {
      return { valid: false, error: 'Request body is too large.' };
    }
  }

  const contentType = request.headers.get('content-type') || '';
  const mediaType = contentType.split(';', 1)[0].trim().toLowerCase();

  if (mediaType !== 'application/json') {
    return { valid: false, error: 'Content-Type must be application/json.' };
  }

  if (!request.body) {
    return { valid: false, error: 'Request body is required.' };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { valid: false, error: 'Request body is too large.' };
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;

    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const rawBody = new TextDecoder().decode(bytes);
    const parsed: unknown = JSON.parse(rawBody);

    if (
      parsed === null ||
      typeof parsed !== 'object' ||
      Array.isArray(parsed)
    ) {
      return { valid: false, error: 'Request body must be a JSON object.' };
    }

    return { valid: true, data: parsed as Record<string, unknown> };
  } catch {
    return { valid: false, error: 'Invalid JSON request body.' };
  } finally {
    reader.releaseLock();
  }
}

export function validateStringField(
  value: unknown,
  fieldName: string,
  maxLength: number,
  options: { required?: boolean; minLength?: number } = {}
): InputValidationResult<string> {
  const required = options.required ?? true;
  const minLength = options.minLength ?? 1;

  if (value === undefined || value === null) {
    if (!required) {
      return { valid: true, data: '' };
    }

    return { valid: false, error: `${fieldName} is required.` };
  }

  if (typeof value !== 'string') {
    return { valid: false, error: `${fieldName} must be a string.` };
  }

  const normalized = value.trim();

  if (required && normalized.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} must contain at least ${minLength} characters.`,
    };
  }

  if (normalized.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} must not exceed ${maxLength} characters.`,
    };
  }

  return { valid: true, data: normalized };
}
