import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { extractFormFile, createDownloadHeaders } from '@/lib/file-upload-handler';
import { sendErrorResponse, ConversionError, ERROR_MESSAGES } from '@/lib/error-handler';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const uploadedFile = await extractFormFile(request, 'file', {
      acceptedTypes: ['pdf'],
      maxSizeMB: 100,
    });

    const formData = await request.formData();
    const splitPage = formData.get('splitPage') as string;

    try {
      const pdf = await PDFDocument.load(uploadedFile.arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdf.getPageCount();

      if (pageCount === 0) {
        throw new ConversionError(
          ERROR_MESSAGES.CORRUPTED_FILE.code,
          'PDF has no pages',
          ERROR_MESSAGES.CORRUPTED_FILE.status
        );
      }

      const splitAt = splitPage ? Math.max(1, Math.min(parseInt(splitPage), pageCount - 1)) : Math.ceil(pageCount / 2);

      const part1 = await PDFDocument.create();
      const part2 = await PDFDocument.create();

      // Split PDF
      for (let i = 0; i < pageCount; i++) {
        const [copiedPage] = await (i < splitAt ? part1 : part2).copyPages(pdf, [i]);
        (i < splitAt ? part1 : part2).addPage(copiedPage);
      }

      const part1Bytes = await part1.save({ useObjectStreams: true });
      const buffer = Buffer.from(part1Bytes);

      const fileName = uploadedFile.file.name.replace(/\.pdf$/i, '');

      return new NextResponse(buffer, {
        headers: createDownloadHeaders(
          `${fileName}_part1.pdf`,
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
          'Failed to split PDF',
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
