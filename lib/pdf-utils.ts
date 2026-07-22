import { PDFDocument } from 'pdf-lib';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  details?: Record<string, any>;
}

export interface ProcessingResult {
  success: boolean;
  data?: Buffer;
  error?: string;
  metadata?: {
    originalSize: number;
    outputSize: number;
    pages?: number;
    duration: number;
    [key: string]: any;
  };
}

// File validation
export async function validatePdfFile(file: File): Promise<ValidationResult> {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'File must be a PDF' };
  }

  const maxSize = 100 * 1024 * 1024; // 100MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds limit of 100MB`,
    };
  }

  return { valid: true, details: { size: file.size, name: file.name } };
}

export async function validatePdfFiles(
  files: File[],
  minFiles = 2,
  maxTotalSize = 500 * 1024 * 1024
): Promise<ValidationResult> {
  if (!files || files.length === 0) {
    return { valid: false, error: 'No files provided' };
  }

  if (files.length < minFiles) {
    return { valid: false, error: `Please provide at least ${minFiles} PDF files` };
  }

  const validFiles = files.filter((f) => f.type.includes('pdf') || f.name.toLowerCase().endsWith('.pdf'));
  if (validFiles.length < minFiles) {
    return { valid: false, error: `Please provide at least ${minFiles} valid PDF files` };
  }

  const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > maxTotalSize) {
    return {
      valid: false,
      error: `Total size ${(totalSize / 1024 / 1024).toFixed(2)}MB exceeds limit of ${(maxTotalSize / 1024 / 1024).toFixed(0)}MB`,
    };
  }

  return {
    valid: true,
    details: {
      count: validFiles.length,
      totalSize,
      files: validFiles.map((f) => f.name),
    },
  };
}

// PDF operations with error handling
export async function loadPdf(data: ArrayBuffer | SharedArrayBuffer | Uint8Array | Buffer): Promise<{ pdf: PDFDocument; error?: string }> {
  try {
    let bytes: Uint8Array | Buffer;
    if (data instanceof ArrayBuffer || data instanceof SharedArrayBuffer) {
      bytes = new Uint8Array(data);
    } else {
      bytes = data;
    }
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pageCount = pdf.getPageCount();
    if (pageCount === 0) {
      return { pdf, error: 'PDF has no pages' };
    }
    return { pdf };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load PDF';
    return { pdf: null as any, error: `Invalid PDF: ${message}` };
  }
}

export async function compressPdf(buffer: Buffer): Promise<ProcessingResult> {
  const startTime = Date.now();
  const operation = 'compressPdf';
  
  try {
    console.log('[v0] Starting PDF compression. Input size:', buffer.length, 'bytes');
    
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    const { pdf, error: loadError } = await loadPdf(arrayBuffer);
    if (loadError) {
      logProcessingError(operation, loadError, buffer.length);
      return { success: false, error: loadError };
    }

    const compressedBytes = await pdf.save({ useObjectStreams: true });
    const outputBuffer = Buffer.from(compressedBytes);
    
    // CRITICAL FIX: Validate output buffer
    const validation = validateOutputBuffer(outputBuffer, operation);
    if (!validation.valid) {
      logProcessingError(operation, validation.error, buffer.length, outputBuffer.length);
      return { success: false, error: validation.error };
    }

    const compressionRatio = Math.round((1 - outputBuffer.length / buffer.length) * 100);
    console.log('[v0] Compression successful. Output size:', outputBuffer.length, 'bytes. Ratio:', compressionRatio + '%');

    return {
      success: true,
      data: outputBuffer,
      metadata: {
        originalSize: buffer.length,
        outputSize: outputBuffer.length,
        duration: Date.now() - startTime,
        details: { compressionRatio },
      },
    };
  } catch (error) {
    logProcessingError(operation, error, buffer.length);
    return {
      success: false,
      error: `Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}. The input PDF may be corrupted or in an unsupported format.`,
    };
  }
}

export async function mergePdfs(files: File[]): Promise<ProcessingResult> {
  const startTime = Date.now();
  const operation = 'mergePdfs';
  
  try {
    console.log('[v0] Starting PDF merge. Files count:', files.length);
    
    const validation = await validatePdfFiles(files);
    if (!validation.valid) {
      logProcessingError(operation, validation.error);
      return { success: false, error: validation.error };
    }

    const validFiles = files.filter((f) => f.type.includes('pdf') || f.name.toLowerCase().endsWith('.pdf'));
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;

    for (const file of validFiles) {
      try {
        console.log('[v0] Processing file:', file.name, 'Size:', file.size);
        const arrayBuffer = await file.arrayBuffer();
        const { pdf, error: loadError } = await loadPdf(arrayBuffer);
        if (loadError) {
          logProcessingError(operation, `Error in ${file.name}: ${loadError}`, file.size);
          return { success: false, error: `Error in ${file.name}: ${loadError}` };
        }

        const pageCount = pdf.getPageCount();
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        totalPages += pageCount;
      } catch (err) {
        logProcessingError(operation, `Failed to process ${file.name}`, file.size);
        return {
          success: false,
          error: `Failed to process ${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`,
        };
      }
    }

    const mergedBytes = await mergedPdf.save();
    const outputBuffer = Buffer.from(mergedBytes);
    
    // CRITICAL FIX: Validate output buffer
    const outputValidation = validateOutputBuffer(outputBuffer, operation);
    if (!outputValidation.valid) {
      logProcessingError(operation, outputValidation.error, validFiles.reduce((sum, f) => sum + f.size, 0), outputBuffer.length);
      return { success: false, error: outputValidation.error };
    }

    const totalInputSize = validFiles.reduce((sum, f) => sum + f.size, 0);
    console.log('[v0] Merge successful. Total pages:', totalPages, 'Output size:', outputBuffer.length, 'bytes');

    return {
      success: true,
      data: outputBuffer,
      metadata: {
        originalSize: totalInputSize,
        outputSize: outputBuffer.length,
        pages: totalPages,
        duration: Date.now() - startTime,
      },
    };
  } catch (error) {
    logProcessingError(operation, error);
    return {
      success: false,
      error: `Merge failed: ${error instanceof Error ? error.message : 'Unknown error'}. Some PDFs may be corrupted or in unsupported formats.`,
    };
  }
}

export async function splitPdf(buffer: Buffer, splitPage?: number): Promise<ProcessingResult> {
  const startTime = Date.now();
  const operation = 'splitPdf';
  
  try {
    console.log('[v0] Starting PDF split. Input size:', buffer.length, 'bytes. Split page:', splitPage);
    
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    const { pdf, error: loadError } = await loadPdf(arrayBuffer);
    if (loadError) {
      logProcessingError(operation, loadError, buffer.length);
      return { success: false, error: loadError };
    }

    const pageCount = pdf.getPageCount();
    const splitAt = splitPage ? Math.max(1, Math.min(splitPage, pageCount - 1)) : Math.ceil(pageCount / 2);
    
    console.log('[v0] PDF has', pageCount, 'pages. Splitting at page:', splitAt);

    const part1 = await PDFDocument.create();
    for (let i = 0; i < splitAt; i++) {
      const [copiedPage] = await part1.copyPages(pdf, [i]);
      part1.addPage(copiedPage);
    }

    const part1Bytes = await part1.save();
    const outputBuffer = Buffer.from(part1Bytes);
    
    // CRITICAL FIX: Validate output buffer
    const validation = validateOutputBuffer(outputBuffer, operation);
    if (!validation.valid) {
      logProcessingError(operation, validation.error, buffer.length, outputBuffer.length);
      return { success: false, error: validation.error };
    }

    console.log('[v0] Split successful. Output pages:', splitAt, 'Output size:', outputBuffer.length, 'bytes');

    return {
      success: true,
      data: outputBuffer,
      metadata: {
        originalSize: buffer.length,
        outputSize: outputBuffer.length,
        pages: splitAt,
        duration: Date.now() - startTime,
      },
    };
  } catch (error) {
    logProcessingError(operation, error, buffer.length);
    return {
      success: false,
      error: `Split failed: ${error instanceof Error ? error.message : 'Unknown error'}. The input PDF may be corrupted or in an unsupported format.`,
    };
  }
}

export function getDownloadHeaders(filename: string, size: number) {
  return {
    'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    'Content-Type': 'application/pdf',
    'Content-Length': String(size),
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  };
}

// ============================================================================
// CRITICAL FIX: Output Validation & Error Detection
// ============================================================================

// Validate output buffer is not empty and contains valid PDF data
export function validateOutputBuffer(buffer: Buffer | Uint8Array, operation: string): { valid: boolean; error?: string } {
  // Check if buffer exists
  if (!buffer) {
    return { valid: false, error: `${operation}: Output buffer is null or undefined` };
  }

  // Check if buffer has content
  const bufferLength = buffer instanceof Buffer ? buffer.length : buffer.byteLength;
  if (bufferLength === 0) {
    return { valid: false, error: `${operation}: Output PDF is empty (0 bytes). The input PDF may be corrupted or unsupported.` };
  }

  // Check minimum PDF size (valid PDF must be at least 9 bytes "%PDF-1.0")
  if (bufferLength < 9) {
    return { valid: false, error: `${operation}: Output PDF is too small (${bufferLength} bytes). Output may be corrupted.` };
  }

  // Check PDF header
  const bufferView = buffer instanceof Buffer ? new Uint8Array(buffer) : buffer;
  const headerStr = String.fromCharCode(...bufferView.slice(0, 5));
  if (headerStr !== '%PDF-') {
    console.error('[v0] Invalid PDF header:', headerStr, 'hex:', bufferView.slice(0, 5).toString());
    return { valid: false, error: `${operation}: Output is not a valid PDF file. Header: ${headerStr}` };
  }

  // Check PDF footer (valid PDF must end with "%%EOF")
  const footerStr = String.fromCharCode(...bufferView.slice(-5));
  if (!footerStr.includes('EOF')) {
    console.warn('[v0] Invalid PDF footer:', footerStr, 'Buffer ends with:', String.fromCharCode(...bufferView.slice(-20)));
  }

  return { valid: true };
}

// Detailed error handler for processing operations
export function logProcessingError(operation: string, error: any, inputSize?: number, outputSize?: number) {
  const errorMsg = error instanceof Error ? error.message : String(error);
  const details = {
    operation,
    errorMessage: errorMsg,
    inputSize,
    outputSize,
    timestamp: new Date().toISOString(),
  };
  console.error('[v0] Processing error:', JSON.stringify(details, null, 2));
  return details;
}
