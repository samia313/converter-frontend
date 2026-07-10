import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: 'Please upload at least 2 PDF files' },
        { status: 400 }
      );
    }

    // Verify all files are PDFs
    for (const file of files) {
      if (!file.type.includes('pdf')) {
        return NextResponse.json(
          { error: 'All files must be PDFs' },
          { status: 400 }
        );
      }
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Add pages from all PDFs
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="merged.pdf"',
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('[v0] Merge PDF error:', error);
    return NextResponse.json(
      { error: 'Merge failed' },
      { status: 500 }
    );
  }
}
