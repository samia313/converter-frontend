import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import JSZip from 'jszip';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_PAGES = 50;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: 'The PDF file is empty.' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'PDF file exceeds the 100MB limit.' }, { status: 413 });
    }
    if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {
      return NextResponse.json({ error: 'Please upload a valid PDF file.' }, { status: 415 });
    }

    const input = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(input, { density: 150 }).metadata();
    const pages = metadata.pages ?? 1;

    if (pages > MAX_PAGES) {
      return NextResponse.json({ error: `This converter supports up to ${MAX_PAGES} PDF pages per request.` }, { status: 400 });
    }

    const baseName = file.name.replace(/\.[^.]+$/, '');
    if (pages === 1) {
      const jpg = await sharp(input, { density: 150, page: 0 })
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();

      return new NextResponse(jpg, {
        headers: {
          'Content-Disposition': `attachment; filename="${baseName}.jpg"`,
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const zip = new JSZip();
    for (let page = 0; page < pages; page++) {
      const jpg = await sharp(input, { density: 150, page })
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();
      zip.file(`${baseName}-page-${String(page + 1).padStart(3, '0')}.jpg`, jpg);
    }

    const archive = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    return new NextResponse(archive, {
      headers: {
        'Content-Disposition': `attachment; filename="${baseName}-jpg.zip"`,
        'Content-Type': 'application/zip',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('PDF to JPG conversion failed:', error);
    return NextResponse.json({
      error: 'PDF rendering is not available for this file on the current conversion runtime. Please try another PDF.',
    }, { status: 422 });
  }
}