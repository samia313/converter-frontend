import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { extractFormFile, createDownloadHeaders } from '@/lib/file-upload-handler';
import { sendErrorResponse, ConversionError, ERROR_MESSAGES } from '@/lib/error-handler';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const uploadedFile = await extractFormFile(request, 'file', {
      acceptedTypes: ['pdf'],
      maxSizeMB: 100,
    });

    try {
      const pdf = await PDFDocument.load(uploadedFile.arrayBuffer, { ignoreEncryption: true });
      
      if (pdf.getPageCount() === 0) {
        throw new ConversionError(
          ERROR_MESSAGES.CORRUPTED_FILE.code,
          'PDF has no pages',
          ERROR_MESSAGES.CORRUPTED_FILE.status
        );
      }

      const pdfBytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      const buffer = Buffer.from(pdfBytes);

      const originalSizeMB = (uploadedFile.size / 1024 / 1024).toFixed(2);
      const compressedSizeMB = (buffer.length / 1024 / 1024).toFixed(2);
      const compressionRatio = Math.round((1 - buffer.length / uploadedFile.size) * 100);

      return new NextResponse(buffer, {
        headers: createDownloadHeaders(
          `compressed-${Date.now()}-${uploadedFile.file.name}`,
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
        if (error.message.includes('Invalid PDF')) {
          throw new ConversionError(
            ERROR_MESSAGES.CORRUPTED_FILE.code,
            'PDF is corrupted or invalid format',
            ERROR_MESSAGES.CORRUPTED_FILE.status,
            error.message
          );
        }
        throw new ConversionError(
          ERROR_MESSAGES.PROCESSING_FAILED.code,
          'Failed to compress PDF',
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
