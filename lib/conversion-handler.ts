export interface ConversionResponse {
  success: boolean;
  data?: Blob;
  error?: string;
  code?: string;
  message?: string;
}

interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffMultiplier?: number;
}

export async function performConversion(
  endpoint: string,
  formData: FormData,
  options: RetryOptions = {}
): Promise<ConversionResponse> {
  const { maxRetries = 3, delayMs = 1000, backoffMultiplier = 1.5 } = options;

  let lastError: Error | null = null;
  let delay = delayMs;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      // Check if response is OK
      if (!response.ok) {
        // Handle specific status codes
        if (response.status === 429) {
          // Rate limited - retry with backoff
          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= backoffMultiplier;
            continue;
          }
        }

        // Try to parse error response
        try {
          const errorData = await response.json();
          return {
            success: false,
            error: errorData.error || 'Conversion failed',
            code: errorData.code,
            message: errorData.message,
          };
        } catch {
          return {
            success: false,
            error: `Server error: ${response.statusText}`,
            code: `HTTP_${response.status}`,
          };
        }
      }

      // Success - get blob
      const blob = await response.blob();

      // Validate response
      if (!blob.size) {
        throw new Error('Empty response from server');
      }

      return {
        success: true,
        data: blob,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if it's a network error (retryable)
      const isNetworkError =
        lastError.message.includes('fetch') ||
        lastError.message.includes('network') ||
        lastError.message.includes('timeout');

      if (isNetworkError && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= backoffMultiplier;
        continue;
      }

      // Non-retryable error - return immediately
      return {
        success: false,
        error: lastError.message,
        code: 'CONVERSION_ERROR',
      };
    }
  }

  // All retries exhausted
  return {
    success: false,
    error: lastError?.message || 'Conversion failed after multiple attempts',
    code: 'MAX_RETRIES_EXCEEDED',
  };
}

export function downloadFile(blob: Blob, filename: string) {
  try {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Failed to download file');
  }
}

export function createFormData(
  file: File,
  additionalData?: Record<string, string | Blob>
): FormData {
  const formData = new FormData();
  formData.append('file', file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
  }

  return formData;
}

export function createMultiFileFormData(
  files: File[],
  additionalData?: Record<string, string | Blob>
): FormData {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
  }

  return formData;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}
