import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const numPages = pdf.getPageCount();

    if (numPages < 2) {
      return NextResponse.json(
        { error: 'PDF must have at least 2 pages' },
        { status: 400 }
      );
    }

    // Create a ZIP file with individual pages
    const zip = new JSZip();

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);

      const pdfBytes = await newPdf.save();
      zip.file(`page-${i + 1}.pdf`, pdfBytes);
    }

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });
    const buffer = Buffer.from(zipBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="split-pages.zip"',
        'Content-Type': 'application/zip',
      },
    });
  } catch (error) {
    console.error('[v0] Split PDF error:', error);
    return NextResponse.json(
      { error: 'Split failed' },
      { status: 500 }
    );
  }
}
