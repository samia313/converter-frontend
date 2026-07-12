/**
 * Comprehensive validation and error handling for AI tools
 */

export enum ValidationErrorCode {
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  UNSUPPORTED_FILE_TYPE = 'UNSUPPORTED_FILE_TYPE',
  NO_FILE_SELECTED = 'NO_FILE_SELECTED',
  INVALID_QUERY = 'INVALID_QUERY',
  EMPTY_DOCUMENT = 'EMPTY_DOCUMENT',
  PROCESSING_TIMEOUT = 'PROCESSING_TIMEOUT',
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_LANGUAGE = 'INVALID_LANGUAGE',
}

export interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  details?: Record<string, any>;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// File validation constants
export const FILE_CONFIG = {
  maxSize: 50 * 1024 * 1024, // 50MB
  maxSizeInMB: 50,
  supportedMimeTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/html',
  ],
  supportedExtensions: ['.pdf', '.docx', '.doc', '.txt', '.html'],
};

export const QUERY_CONFIG = {
  minLength: 3,
  maxLength: 5000,
};

/**
 * Validate file
 */
export function validateFile(file: File | null): ValidationResult {
  const errors: ValidationError[] = [];

  if (!file) {
    errors.push({
      code: ValidationErrorCode.NO_FILE_SELECTED,
      message: 'Please select a file to upload.',
    });
    return { valid: false, errors };
  }

  // Check file size
  if (file.size > FILE_CONFIG.maxSize) {
    errors.push({
      code: ValidationErrorCode.FILE_TOO_LARGE,
      message: `File size must be less than ${FILE_CONFIG.maxSizeInMB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
      details: {
        fileSize: file.size,
        maxSize: FILE_CONFIG.maxSize,
      },
    });
  }

  // Check file type
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!FILE_CONFIG.supportedExtensions.includes(extension)) {
    errors.push({
      code: ValidationErrorCode.UNSUPPORTED_FILE_TYPE,
      message: `Unsupported file type. Supported formats: ${FILE_CONFIG.supportedExtensions.join(', ')}`,
      details: {
        fileType: file.type,
        fileName: file.name,
        extension,
      },
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate query/input
 */
export function validateQuery(query: string | null): ValidationResult {
  const errors: ValidationError[] = [];

  if (!query || !query.trim()) {
    errors.push({
      code: ValidationErrorCode.INVALID_QUERY,
      message: 'Please enter a question or query.',
    });
    return { valid: false, errors };
  }

  if (query.length < QUERY_CONFIG.minLength) {
    errors.push({
      code: ValidationErrorCode.INVALID_QUERY,
      message: `Query must be at least ${QUERY_CONFIG.minLength} characters.`,
      details: {
        length: query.length,
        minLength: QUERY_CONFIG.minLength,
      },
    });
  }

  if (query.length > QUERY_CONFIG.maxLength) {
    errors.push({
      code: ValidationErrorCode.INVALID_QUERY,
      message: `Query must be no more than ${QUERY_CONFIG.maxLength} characters.`,
      details: {
        length: query.length,
        maxLength: QUERY_CONFIG.maxLength,
      },
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate language code
 */
export function validateLanguage(lang: string, supportedLanguages: string[]): ValidationResult {
  const errors: ValidationError[] = [];

  if (!supportedLanguages.includes(lang)) {
    errors.push({
      code: ValidationErrorCode.INVALID_LANGUAGE,
      message: `Unsupported language. Supported languages: ${supportedLanguages.join(', ')}`,
      details: {
        language: lang,
        supportedLanguages,
      },
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate file and query together
 */
export function validateFileAndQuery(
  file: File | null,
  query: string | null
): ValidationResult {
  const fileValidation = validateFile(file);
  const queryValidation = validateQuery(query);

  return {
    valid: fileValidation.valid && queryValidation.valid,
    errors: [...fileValidation.errors, ...queryValidation.errors],
  };
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(code: ValidationErrorCode): string {
  const messages: Record<ValidationErrorCode, string> = {
    [ValidationErrorCode.FILE_TOO_LARGE]: 'The file is too large. Please upload a file smaller than 50MB.',
    [ValidationErrorCode.UNSUPPORTED_FILE_TYPE]: 'This file type is not supported. Please upload a PDF, DOCX, or TXT file.',
    [ValidationErrorCode.NO_FILE_SELECTED]: 'Please select a file to upload.',
    [ValidationErrorCode.INVALID_QUERY]: 'Please enter a valid question or query.',
    [ValidationErrorCode.EMPTY_DOCUMENT]: 'The document appears to be empty. Please try a different file.',
    [ValidationErrorCode.PROCESSING_TIMEOUT]: 'Processing took too long. Please try again with a smaller file.',
    [ValidationErrorCode.API_ERROR]: 'An error occurred while processing your request. Please try again.',
    [ValidationErrorCode.NETWORK_ERROR]: 'Network error. Please check your connection and try again.',
    [ValidationErrorCode.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please wait a moment and try again.',
    [ValidationErrorCode.INVALID_LANGUAGE]: 'The selected language is not supported.',
  };

  return messages[code] || 'An unknown error occurred.';
}

/**
 * Parse API error response
 */
export function parseAPIError(error: any): ValidationError {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return {
      code: ValidationErrorCode.NETWORK_ERROR,
      message: getErrorMessage(ValidationErrorCode.NETWORK_ERROR),
    };
  }

  if (error?.status === 429) {
    return {
      code: ValidationErrorCode.RATE_LIMIT_EXCEEDED,
      message: getErrorMessage(ValidationErrorCode.RATE_LIMIT_EXCEEDED),
    };
  }

  if (error?.status === 413) {
    return {
      code: ValidationErrorCode.FILE_TOO_LARGE,
      message: getErrorMessage(ValidationErrorCode.FILE_TOO_LARGE),
    };
  }

  if (error?.status === 408 || error?.message?.includes('timeout')) {
    return {
      code: ValidationErrorCode.PROCESSING_TIMEOUT,
      message: getErrorMessage(ValidationErrorCode.PROCESSING_TIMEOUT),
    };
  }

  return {
    code: ValidationErrorCode.API_ERROR,
    message: error?.message || getErrorMessage(ValidationErrorCode.API_ERROR),
    details: error,
  };
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
};

/**
 * Execute function with retry logic
 */
export async function executeWithRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | null = null;
  let delay = config.initialDelayMs;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < config.maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * config.backoffMultiplier, config.maxDelayMs);
      }
    }
  }

  throw lastError;
}

/**
 * Validate and process file in one step
 */
export async function validateAndProcessFile(
  file: File,
  processor: (file: File) => Promise<any>,
  maxRetries: number = 3
): Promise<{ success: boolean; result?: any; error?: ValidationError }> {
  const validation = validateFile(file);

  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors[0],
    };
  }

  try {
    const result = await executeWithRetry(
      () => processor(file),
      {
        ...DEFAULT_RETRY_CONFIG,
        maxRetries,
      }
    );

    return { success: true, result };
  } catch (error) {
    return {
      success: false,
      error: parseAPIError(error),
    };
  }
}
