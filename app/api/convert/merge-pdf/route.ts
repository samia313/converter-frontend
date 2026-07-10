import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    // Handle single file or multiple files
    if (!files || files.length === 0) {
      const singleFile = formData.get('file') as File;
      if (!singleFile || !singleFile.type.includes('pdf')) {
        return NextResponse.json({ error: 'Invalid PDF file' }, { status: 400 });
      }

      const arrayBuffer = await singleFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pdfBytes = await pdf.save();
      
      return new NextResponse(Buffer.from(pdfBytes), {
        headers: {
          'Content-Disposition': `attachment; filename="${singleFile.name}"`,
          'Content-Type': 'application/pdf',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Merge multiple PDFs
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      if (!file.type.includes('pdf')) continue;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': 'attachment; filename="merged.pdf"',
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[v0] Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
