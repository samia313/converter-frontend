import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, degrees } from 'pdf-lib';
import {
  getDownloadHeaders,
  sanitizePdfDownloadFilename,
  validateOutputBuffer,
  validatePdfFile,
} from '@/lib/pdf-utils';

export const runtime = 'nodejs';
export const maxDuration = 120;
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ALLOWED_ROTATIONS = new Set([90, 180, 270]);

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const rotationValue = formData.get('rotation');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || 'Invalid PDF file' },
        { status: file.size > MAX_FILE_SIZE ? 413 : 400 }
      );
    }

    const rotation = Number(rotationValue ?? 90);
    if (!ALLOWED_ROTATIONS.has(rotation)) return NextResponse.json({ error: 'Rotation must be 90, 180, or 270 degrees' }, { status: 400 });

    const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const pages = pdf.getPages();
    if (pages.length === 0) return NextResponse.json({ error: 'PDF has no pages' }, { status: 400 });

    pages.forEach((page) => page.setRotation(degrees((page.getRotation().angle + rotation) % 360)));
    const pdfBytes = await pdf.save();
    const output = Buffer.from(pdfBytes);
    const outputValidation = validateOutputBuffer(output, 'PDF rotation');

    if (!outputValidation.valid) {
      return NextResponse.json(
        { error: outputValidation.error || 'Rotation produced an invalid PDF' },
        { status: 500 }
      );
    }

    const filename = sanitizePdfDownloadFilename(file.name, '_rotated.pdf');

    return new NextResponse(output, {
      headers: getDownloadHeaders(filename, output.length),
    });
  } catch (error) {
    console.error('[PDFilio] rotate-pdf failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Rotation failed. Please try another PDF.' }, { status: 500 });
  }
}
