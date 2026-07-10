import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { rateLimit } from '@/lib/rate-limit';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = rateLimit(request, { interval: 60000, maxRequests: 30 });
    if (rateLimitResponse) return rateLimitResponse;

    const formData = await request.formData();
    const files = (formData.getAll('files') as File[]) || [];

    // Validation
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

    // Filter and validate PDFs
    const validFiles = files.filter(file => file.type.includes('pdf'));
    if (validFiles.length === 0) {
      return NextResponse.json(
        { error: 'No valid PDF files found' },
        { status: 400 }
      );
    }

    if (validFiles.length < 2) {
      return NextResponse.json(
        { error: 'Please provide at least 2 valid PDF files' },
        { status: 400 }
      );
    }

    // Check file size limit (50MB total)
    const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
    const maxTotalSize = 50 * 1024 * 1024;
    if (totalSize > maxTotalSize) {
      return NextResponse.json(
        { error: 'Total file size exceeds 50MB limit' },
        { status: 413 }
      );
    }

    // Merge PDFs
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;
    
    for (const file of validFiles) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const pageCount = pdf.getPageCount();
        
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        
        totalPages += pageCount;
      } catch (err) {
        console.error(`[merge-pdf] Error processing file ${file.name}:`, err);
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
        'Content-Length': String(buffer.length),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Merged-Files': String(validFiles.length),
        'X-Total-Pages': String(totalPages),
        'X-Output-Size': String(buffer.length),
      },
    });
  } catch (error) {
    console.error('[merge-pdf] Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        return NextResponse.json(
          { error: 'One or more PDFs are corrupted or invalid' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Merging failed. Please try again.' },
      { status: 500 }
    );
  }
}
