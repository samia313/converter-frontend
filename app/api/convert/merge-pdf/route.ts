import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = (formData.getAll('files') as File[]) || [];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No PDF files provided' },
        { status: 400 }
      );
    }

    if (files.length < 2) {
      return NextResponse.json(
        { error: 'Please provide at least 2 PDF files to merge' },
        { status: 400 }
      );
    }

    const validFiles = files.filter(file => file.type.includes('pdf'));
    if (validFiles.length < 2) {
      return NextResponse.json(
        { error: 'Please provide at least 2 valid PDF files' },
        { status: 400 }
      );
    }

    const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
    const maxTotalSize = 500 * 1024 * 1024;
    if (totalSize > maxTotalSize) {
      return NextResponse.json(
        { error: 'Total file size exceeds 500MB limit' },
        { status: 413 }
      );
    }

    const mergedPdf = await PDFDocument.create();
    
    for (const file of validFiles) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      } catch (err) {
        return NextResponse.json(
          { error: `Failed to process file: ${file.name}` },
          { status: 400 }
        );
      }
    }

    const pdfBytes = await mergedPdf.save();
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="merged.pdf"',
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[v0] Merge PDF error:', error);
    return NextResponse.json(
      { error: 'Merging failed' },
      { status: 500 }
    );
  }
}
