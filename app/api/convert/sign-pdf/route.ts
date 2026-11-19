import { enforceRateLimit } from '@/lib/rate-limit';
import {
  sanitizePdfDownloadFilename,
  validateOutputBuffer,
  validatePdfFile,
} from '@/lib/pdf-utils';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_BYTES = 100 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, {
    namespace: 'conversion',
    limit: 10,
    window: '1 m',
  });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const form = await request.formData();
    const file = form.get('file');
    const signatureValue = form.get('signature');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'PDF exceeds the 100 MB limit.' }, { status: 413 });
    }

    const fileValidation = await validatePdfFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json({ error: fileValidation.error }, { status: 400 });
    }

    if (typeof signatureValue !== 'string') {
      return NextResponse.json({ error: 'Signature text is required.' }, { status: 400 });
    }

    const signature = signatureValue.trim();
    if (!signature || signature.length > 200) {
      return NextResponse.json(
        { error: 'Signature text must be 1 to 200 characters.' },
        { status: 400 }
      );
    }

    const readNumber = (name: string, fallback: number) => {
      const value = form.get(name);
      if (value === null) return fallback;
      if (typeof value !== 'string' || value.trim() === '') return Number.NaN;
      return Number(value);
    };

    const pageNumber = readNumber('page', 1);
    const x = readNumber('x', 72);
    const y = readNumber('y', 72);
    const fontSize = readNumber('fontSize', 24);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return NextResponse.json({ error: 'Page number must be a positive integer.' }, { status: 400 });
    }

    if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0) {
      return NextResponse.json({ error: 'Signature position is invalid.' }, { status: 400 });
    }

    if (!Number.isFinite(fontSize) || fontSize < 8 || fontSize > 72) {
      return NextResponse.json({ error: 'Font size must be between 8 and 72.' }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = await PDFDocument.load(bytes);
    const pages = doc.getPages();

    if (pageNumber > pages.length) {
      return NextResponse.json(
        { error: `Page number must be between 1 and ${pages.length}.` },
        { status: 400 }
      );
    }

    const page = pages[pageNumber - 1];
    const font = await doc.embedFont(StandardFonts.HelveticaOblique);
    const width = font.widthOfTextAtSize(signature, fontSize);
    const height = font.heightAtSize(fontSize);

    if (x + width > page.getWidth() || y + height > page.getHeight()) {
      return NextResponse.json(
        { error: 'Signature does not fit within the selected page. Reduce the font size or position it inside the page.' },
        { status: 400 }
      );
    }

    page.drawText(signature, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });

    const output = Buffer.from(await doc.save());
    const outputValidation = validateOutputBuffer(output, 'sign-pdf');

    if (!outputValidation.valid) {
      return NextResponse.json({ error: 'Signing produced an invalid PDF.' }, { status: 500 });
    }

    const filename = sanitizePdfDownloadFilename(file.name, '_signed.pdf');

    return new NextResponse(output, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Content-Length': String(output.length),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Unable to sign this PDF. Please check the file and try again.' }, { status: 500 });
  }
}
