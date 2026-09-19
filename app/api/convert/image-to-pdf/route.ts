import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_FILES = 30;
const MAX_TOTAL_SIZE = 500 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png']);
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function getExtension(name: string) {
  const index = name.lastIndexOf('.');
  return index >= 0 ? name.slice(index).toLowerCase() : '';
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const entries = formData.getAll('files');
    const single = formData.get('file');
    const files = entries.length > 0 ? entries : single ? [single] : [];

    if (files.length === 0) {
      return NextResponse.json({ error: 'No image files provided.' }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `You can convert up to ${MAX_FILES} images at once.` }, { status: 400 });
    }

    const totalSize = files.reduce((sum, entry) => sum + (entry instanceof File ? entry.size : 0), 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json({ error: 'Total image size exceeds the 500MB limit.' }, { status: 413 });
    }

    const pdfDoc = await PDFDocument.create();

    for (const entry of files) {
      if (!(entry instanceof File)) {
        return NextResponse.json({ error: 'Invalid image upload.' }, { status: 400 });
      }

      if (entry.size === 0) {
        return NextResponse.json({ error: `The file "${entry.name}" is empty.` }, { status: 400 });
      }

      if (entry.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `The file "${entry.name}" exceeds the 100MB limit.` }, { status: 413 });
      }

      const extension = getExtension(entry.name);
      if (!ALLOWED_TYPES.has(entry.type) || !ALLOWED_EXTENSIONS.has(extension)) {
        return NextResponse.json({ error: `Unsupported image "${entry.name}". Use JPG or PNG files.` }, { status: 415 });
      }

      const bytes = new Uint8Array(await entry.arrayBuffer());
      const image = extension === '.png'
        ? await pdfDoc.embedPng(bytes)
        : await pdfDoc.embedJpg(bytes);

      const metadata = await sharp(bytes).metadata();
      const pixelWidth = metadata.width ?? image.width;
      const pixelHeight = metadata.height ?? image.height;
      const maxPageWidth = 842;
      const maxPageHeight = 842;
      const minPageSize = 300;
      const pointsPerPixel = Math.min(1, 600 / Math.max(pixelWidth, pixelHeight));
      const pageWidth = Math.max(minPageSize, Math.min(maxPageWidth, pixelWidth * pointsPerPixel));
      const pageHeight = Math.max(minPageSize, Math.min(maxPageHeight, pixelHeight * pointsPerPixel));
      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      const margin = 18;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;
      const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
      const width = image.width * scale;
      const height = image.height * scale;

      page.drawImage(image, {
        x: (pageWidth - width) / 2,
        y: (pageHeight - height) / 2,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const baseName = files.length === 1 && files[0] instanceof File
      ? files[0].name.replace(/\.[^.]+$/, '')
      : 'images';

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="${baseName}.pdf"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Image to PDF conversion failed:', error);
    return NextResponse.json({ error: 'Image to PDF conversion failed. Please use valid JPG or PNG files.' }, { status: 500 });
  }
}
