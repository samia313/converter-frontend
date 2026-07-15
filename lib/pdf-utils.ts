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
  try {
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    const { pdf, error: loadError } = await loadPdf(arrayBuffer);
    if (loadError) {
      return { success: false, error: loadError };
    }

    const compressedBytes = await pdf.save({ useObjectStreams: true });
    const outputBuffer = Buffer.from(compressedBytes);
    const compressionRatio = Math.round((1 - outputBuffer.length / buffer.length) * 100);

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
    return {
      success: false,
      error: `Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function mergePdfs(files: File[]): Promise<ProcessingResult> {
  const startTime = Date.now();
  try {
    const validation = await validatePdfFiles(files);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const validFiles = files.filter((f) => f.type.includes('pdf') || f.name.toLowerCase().endsWith('.pdf'));
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;

    for (const file of validFiles) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const { pdf, error: loadError } = await loadPdf(arrayBuffer);
        if (loadError) {
          return { success: false, error: `Error in ${file.name}: ${loadError}` };
        }

        const pageCount = pdf.getPageCount();
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        totalPages += pageCount;
      } catch (err) {
        return {
          success: false,
          error: `Failed to process ${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`,
        };
      }
    }

    const mergedBytes = await mergedPdf.save();
    const outputBuffer = Buffer.from(mergedBytes);

    return {
      success: true,
      data: outputBuffer,
      metadata: {
        originalSize: validFiles.reduce((sum, f) => sum + f.size, 0),
        outputSize: outputBuffer.length,
        pages: totalPages,
        duration: Date.now() - startTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: `Merge failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function splitPdf(buffer: Buffer, splitPage?: number): Promise<ProcessingResult> {
  const startTime = Date.now();
  try {
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    const { pdf, error: loadError } = await loadPdf(arrayBuffer);
    if (loadError) {
      return { success: false, error: loadError };
    }

    const pageCount = pdf.getPageCount();
    const splitAt = splitPage ? Math.max(1, Math.min(splitPage, pageCount - 1)) : Math.ceil(pageCount / 2);

    const part1 = await PDFDocument.create();
    for (let i = 0; i < splitAt; i++) {
      const [copiedPage] = await part1.copyPages(pdf, [i]);
      part1.addPage(copiedPage);
    }

    const part1Bytes = await part1.save();
    const outputBuffer = Buffer.from(part1Bytes);

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
    return {
      success: false,
      error: `Split failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
