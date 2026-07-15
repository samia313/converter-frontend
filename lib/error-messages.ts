export const ErrorMessages = {
  FILE: {
    NOT_PROVIDED: 'No file selected. Please choose a PDF file.',
    INVALID_TYPE: 'Invalid file type. Please upload a PDF file.',
    TOO_LARGE: (size: number, limit: number) =>
      `File is ${(size / 1024 / 1024).toFixed(2)}MB. Maximum allowed is ${limit}MB.`,
    CORRUPTED: 'PDF file is corrupted or cannot be read. Try another file.',
    NO_PAGES: 'PDF has no pages. Please use a valid PDF.',
    EMPTY: 'File is empty. Please choose a valid PDF.',
  },
  UPLOAD: {
    FAILED: 'Upload failed. Please check your connection and try again.',
    TIMEOUT: 'Upload took too long. Please try again.',
    NO_FILES: 'No files selected. Please choose at least one PDF.',
    MULTIPLE_REQUIRED: (count: number) =>
      `Please select at least ${count} files to merge.`,
    SIZE_EXCEEDED: (total: number, limit: number) =>
      `Total size ${(total / 1024 / 1024).toFixed(2)}MB exceeds limit of ${limit}MB.`,
  },
  CONVERSION: {
    FAILED: 'Conversion failed. Please try again.',
    TIMEOUT: 'Conversion took too long. Your file may be too large.',
    INVALID_SETTINGS: 'Invalid conversion settings. Please check your inputs.',
    UNSUPPORTED: 'This conversion type is not supported.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
  },
  NETWORK: {
    OFFLINE: 'No internet connection. Please check your network.',
    SERVER_UNREACHABLE: 'Cannot connect to server. Please try again later.',
    SLOW_CONNECTION: 'Connection is slow. This may take longer than usual.',
  },
  DOWNLOAD: {
    FAILED: 'Download failed. Please try again.',
    CANCELLED: 'Download was cancelled.',
  },
};

export class AppError extends Error {
  code: string;
  details?: string;
  statusCode: number;
  recoverable: boolean;

  constructor(
    code: string,
    message: string,
    details?: string,
    statusCode: number = 400
  ) {
    super(message);
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    this.recoverable = statusCode < 500;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function createError(
  code: string,
  message: string,
  details?: string,
  statusCode: number = 400
): AppError {
  return new AppError(code, message, details, statusCode);
}

export function parseErrorResponse(error: any): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error?.response?.data?.error) {
    return createError('API_ERROR', error.response.data.error, undefined, error.response.status);
  }

  if (error?.message) {
    const message = error.message as string;

    if (message.includes('timeout') || message.includes('timed out')) {
      return createError(
        'TIMEOUT',
        ErrorMessages.UPLOAD.TIMEOUT,
        message,
        408
      );
    }

    if (message.includes('network') || message.includes('offline')) {
      return createError(
        'NETWORK_ERROR',
        ErrorMessages.NETWORK.OFFLINE,
        message,
        0
      );
    }

    if (message.includes('corrupted') || message.includes('invalid')) {
      return createError('INVALID_PDF', ErrorMessages.FILE.CORRUPTED, message);
    }

    return createError('UNKNOWN_ERROR', 'An unexpected error occurred', message, 500);
  }

  return createError(
    'UNKNOWN_ERROR',
    'An unexpected error occurred',
    JSON.stringify(error),
    500
  );
}

export function getErrorAction(error: AppError): string {
  if (error.recoverable) {
    return 'Try again';
  }

  if (error.statusCode === 413) {
    return 'Compress the file and try again';
  }

  if (error.statusCode === 408 || error.code === 'TIMEOUT') {
    return 'Try with a smaller file';
  }

  if (error.code === 'NETWORK_ERROR') {
    return 'Check your internet connection';
  }

  return 'Contact support if problem persists';
}
