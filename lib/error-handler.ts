import { NextResponse } from 'next/server';

export interface ErrorResponse {
  error: string;
  code: string;
  details?: string;
  timestamp: string;
}

export class ConversionError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: string
  ) {
    super(message);
    this.name = 'ConversionError';
  }
}

export const ERROR_MESSAGES = {
  // File errors
  NO_FILE: { code: 'NO_FILE', message: 'No file provided', status: 400 },
  INVALID_FILE_TYPE: { code: 'INVALID_FILE_TYPE', message: 'Invalid file type', status: 400 },
  FILE_TOO_LARGE: { code: 'FILE_TOO_LARGE', message: 'File size exceeds limit', status: 413 },
  CORRUPTED_FILE: { code: 'CORRUPTED_FILE', message: 'File is corrupted or invalid', status: 400 },
  
  // Processing errors
  PROCESSING_FAILED: { code: 'PROCESSING_FAILED', message: 'File processing failed', status: 500 },
  CONVERSION_TIMEOUT: { code: 'CONVERSION_TIMEOUT', message: 'Processing took too long', status: 408 },
  UNSUPPORTED_FORMAT: { code: 'UNSUPPORTED_FORMAT', message: 'Format not supported', status: 400 },
  
  // Validation errors
  INVALID_REQUEST: { code: 'INVALID_REQUEST', message: 'Invalid request parameters', status: 400 },
  MISSING_PARAMETER: { code: 'MISSING_PARAMETER', message: 'Required parameter missing', status: 400 },
  
  // Rate limiting
  RATE_LIMITED: { code: 'RATE_LIMITED', message: 'Too many requests, please try again later', status: 429 },
  
  // Server errors
  INTERNAL_ERROR: { code: 'INTERNAL_ERROR', message: 'An error occurred, please try again', status: 500 },
};

export function createErrorResponse(
  error: Error | ConversionError | string,
  statusCode: number = 500
): ErrorResponse {
  let errorCode = 'UNKNOWN_ERROR';
  let errorMessage = 'An unexpected error occurred';
  let details: string | undefined;

  if (error instanceof ConversionError) {
    errorCode = error.code;
    errorMessage = error.message;
    statusCode = error.statusCode;
    details = error.details;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    details = error.stack;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return {
    error: errorMessage,
    code: errorCode,
    details: process.env.NODE_ENV === 'development' ? details : undefined,
    timestamp: new Date().toISOString(),
  };
}

export function sendErrorResponse(
  error: Error | ConversionError | string,
  statusCode: number = 500
) {
  const errorResponse = createErrorResponse(error, statusCode);
  
  if (error instanceof ConversionError) {
    statusCode = error.statusCode;
  }

  console.error('[PDF_CONVERSION_ERROR]', {
    code: errorResponse.code,
    message: errorResponse.error,
    timestamp: errorResponse.timestamp,
  });

  return NextResponse.json(errorResponse, { status: statusCode });
}

export function validateFile(
  file: File | null | undefined,
  acceptedTypes: string[],
  maxSizeMB: number = 100
): { valid: boolean; error?: ConversionError } {
  if (!file) {
    return {
      valid: false,
      error: new ConversionError(
        ERROR_MESSAGES.NO_FILE.code,
        ERROR_MESSAGES.NO_FILE.message,
        ERROR_MESSAGES.NO_FILE.status
      ),
    };
  }

  const fileType = file.type.toLowerCase();
  const isValidType = acceptedTypes.some(type => fileType.includes(type));

  if (!isValidType) {
    return {
      valid: false,
      error: new ConversionError(
        ERROR_MESSAGES.INVALID_FILE_TYPE.code,
        `Invalid file type. Accepted: ${acceptedTypes.join(', ')}`,
        ERROR_MESSAGES.INVALID_FILE_TYPE.status
      ),
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: new ConversionError(
        ERROR_MESSAGES.FILE_TOO_LARGE.code,
        `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds limit of ${maxSizeMB}MB`,
        ERROR_MESSAGES.FILE_TOO_LARGE.status
      ),
    };
  }

  return { valid: true };
}
