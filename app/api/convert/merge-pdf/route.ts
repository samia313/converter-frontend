import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { extractFormFiles, createDownloadHeaders } from '@/lib/file-upload-handler';
import { sendErrorResponse, ConversionError, ERROR_MESSAGES } from '@/lib/error-handler';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const uploadedFiles = await extractFormFiles(request, 'files', {
      acceptedTypes: ['pdf'],
      maxSizeMB: 100,
      maxFiles: 20,
    });

    if (uploadedFiles.length < 2) {
      throw new ConversionError(
        ERROR_MESSAGES.INVALID_REQUEST.code,
        'Please provide at least 2 PDF files to merge',
        ERROR_MESSAGES.INVALID_REQUEST.status
      );
    }

    const totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);
    const maxTotalSize = 500 * 1024 * 1024; // 500MB total
    
    if (totalSize > maxTotalSize) {
      throw new ConversionError(
        ERROR_MESSAGES.FILE_TOO_LARGE.code,
        `Total file size ${(totalSize / 1024 / 1024).toFixed(2)}MB exceeds limit of 500MB`,
        ERROR_MESSAGES.FILE_TOO_LARGE.status
      );
    }

    try {
      const mergedPdf = await PDFDocument.create();
      let totalPages = 0;
      const processedFiles: string[] = [];

      for (const uploadedFile of uploadedFiles) {
        try {
          const pdf = await PDFDocument.load(uploadedFile.arrayBuffer, { ignoreEncryption: true });
          const pageCount = pdf.getPageCount();

          if (pageCount === 0) {
            throw new Error('PDF has no pages');
          }

          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));

          totalPages += pageCount;
          processedFiles.push(uploadedFile.file.name);
        } catch (err) {
          throw new ConversionError(
            ERROR_MESSAGES.PROCESSING_FAILED.code,
            `Failed to process file "${uploadedFile.file.name}": ${err instanceof Error ? err.message : 'Unknown error'}`,
            ERROR_MESSAGES.PROCESSING_FAILED.status
          );
        }
      }

      const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
      const buffer = Buffer.from(pdfBytes);

      return new NextResponse(buffer, {
        headers: createDownloadHeaders(
          `merged-${Date.now()}.pdf`,
          'application/pdf',
          buffer.length
        ),
        status: 200,
      });
    } catch (error) {
      if (error instanceof ConversionError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new ConversionError(
          ERROR_MESSAGES.PROCESSING_FAILED.code,
          `Merge failed: ${error.message}`,
          ERROR_MESSAGES.PROCESSING_FAILED.status,
          error.message
        );
      }
      throw error;
    }
  } catch (error) {
    return sendErrorResponse(error);
  }
}
