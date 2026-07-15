import { NextRequest } from 'next/server';
import { ConversionError, ERROR_MESSAGES, validateFile } from './error-handler';

export interface FileUploadOptions {
  acceptedTypes: string[];
  maxSizeMB?: number;
  maxFiles?: number;
}

export interface UploadedFile {
  file: File;
  arrayBuffer: ArrayBuffer;
  size: number;
  type: string;
  name: string;
}

export async function extractFormFile(
  request: NextRequest,
  fieldName: string = 'file',
  options: FileUploadOptions = {
    acceptedTypes: ['pdf'],
    maxSizeMB: 100,
  }
): Promise<UploadedFile> {
  try {
    const formData = await request.formData();
    const file = formData.get(fieldName) as File;

    // Validate file exists and type is correct
    const validation = validateFile(file, options.acceptedTypes, options.maxSizeMB);
    if (!validation.valid && validation.error) {
      throw validation.error;
    }

    const arrayBuffer = await file.arrayBuffer();

    return {
      file,
      arrayBuffer,
      size: file.size,
      type: file.type,
      name: file.name,
    };
  } catch (error) {
    if (error instanceof ConversionError) {
      throw error;
    }
    throw new ConversionError(
      ERROR_MESSAGES.INVALID_REQUEST.code,
      'Failed to process file upload',
      ERROR_MESSAGES.INVALID_REQUEST.status,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export async function extractFormFiles(
  request: NextRequest,
  fieldName: string = 'files',
  options: FileUploadOptions = {
    acceptedTypes: ['pdf'],
    maxSizeMB: 100,
    maxFiles: 10,
  }
): Promise<UploadedFile[]> {
  try {
    const formData = await request.formData();
    const files = (formData.getAll(fieldName) as File[]) || [];

    if (!files || files.length === 0) {
      throw new ConversionError(
        ERROR_MESSAGES.NO_FILE.code,
        'No files provided',
        ERROR_MESSAGES.NO_FILE.status
      );
    }

    if (options.maxFiles && files.length > options.maxFiles) {
      throw new ConversionError(
        ERROR_MESSAGES.INVALID_REQUEST.code,
        `Maximum ${options.maxFiles} files allowed`,
        ERROR_MESSAGES.INVALID_REQUEST.status
      );
    }

    const uploadedFiles: UploadedFile[] = [];
    const errors: string[] = [];

    for (const file of files) {
      const validation = validateFile(file, options.acceptedTypes, options.maxSizeMB);
      
      if (!validation.valid && validation.error) {
        errors.push(`${file.name}: ${validation.error.message}`);
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        uploadedFiles.push({
          file,
          arrayBuffer,
          size: file.size,
          type: file.type,
          name: file.name,
        });
      } catch (err) {
        errors.push(`${file.name}: Failed to read file`);
      }
    }

    if (uploadedFiles.length === 0) {
      throw new ConversionError(
        ERROR_MESSAGES.INVALID_REQUEST.code,
        errors.length > 0 ? errors[0] : 'No valid files could be processed',
        ERROR_MESSAGES.INVALID_REQUEST.status
      );
    }

    return uploadedFiles;
  } catch (error) {
    if (error instanceof ConversionError) {
      throw error;
    }
    throw new ConversionError(
      ERROR_MESSAGES.INVALID_REQUEST.code,
      'Failed to process file upload',
      ERROR_MESSAGES.INVALID_REQUEST.status,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export function createDownloadHeaders(
  filename: string,
  contentType: string = 'application/octet-stream',
  contentLength?: number
) {
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  return {
    'Content-Disposition': `attachment; filename="${sanitizedFilename}"`,
    'Content-Type': contentType,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    ...(contentLength && { 'Content-Length': String(contentLength) }),
  };
}
