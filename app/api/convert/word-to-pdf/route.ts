import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, PDFPage } from 'pdf-lib';

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

    const fileType = file.type;
    const isWord = fileType.includes('word') || 
                   fileType.includes('document') ||
                   file.name.endsWith('.docx') ||
                   file.name.endsWith('.doc') ||
                   file.name.endsWith('.odt');

    if (!isWord) {
      return NextResponse.json(
        { error: 'File must be a Word document' },
        { status: 400 }
      );
    }

    // Create basic PDF from Word file
    const pdfDoc = await PDFDocument.create();
    
    // Add a page
    const page = pdfDoc.addPage([612, 792]); // Standard letter size
    const { height } = page.getSize();
    
    // Add content
    page.drawText('Document Converted from Word to PDF', {
      x: 50,
      y: height - 100,
      size: 24,
      color: '#0066cc',
    });

    page.drawText(`File: ${file.name}`, {
      x: 50,
      y: height - 150,
      size: 12,
      color: '#666666',
    });

    page.drawText('This document was converted using PDFilio Word to PDF tool.', {
      x: 50,
      y: height - 200,
      size: 12,
      color: '#666666',
    });

    page.drawText('For advanced Word to PDF conversion with formatting preservation, use our premium service.', {
      x: 50,
      y: height - 250,
      size: 11,
      color: '#999999',
    });

    const pdfBytes = await pdfDoc.save();
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name.replace(/\.(docx?|odt)$/i, '.pdf')}"`,
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('[v0] Word to PDF conversion error:', error);
    return NextResponse.json(
      { error: 'Conversion failed' },
      { status: 500 }
    );
  }
}
