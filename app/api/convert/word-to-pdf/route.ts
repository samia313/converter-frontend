import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import * as mammoth from 'mammoth';

export const maxDuration = 30;

async function extractWordContent(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Use mammoth to extract text from DOCX
    const result = await mammoth.extractRawText({ arrayBuffer });
    console.log('[v0] Extracted text from Word file');
    return result.value || 'Content extracted but appears empty';
  } catch (error) {
    console.error('[v0] Text extraction error:', error);
    throw new Error('Failed to extract content from Word file');
  }
}

function wrapText(text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const words = text.split(' ');
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function createPDFFromContent(content: string, fileName: string): Promise<Buffer> {
  try {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4 size (210mm x 297mm)
    
    const { height } = page.getSize();
    const margins = 50;
    const pageWidth = 595 - 2 * margins;
    const lineHeight = 14;
    const fontSize = 11;
    
    let currentY = height - margins;

    // Add title
    page.drawText('Word Document Content', {
      x: margins,
      y: currentY,
      size: 16,
      color: rgb(0, 0, 0),
    });
    currentY -= 30;

    // Add file info
    page.drawText(`Source: ${fileName}`, {
      x: margins,
      y: currentY,
      size: 9,
      color: rgb(0.5, 0.5, 0.5),
    });
    currentY -= 20;

    // Add divider
    page.drawLine({
      start: { x: margins, y: currentY },
      end: { x: 595 - margins, y: currentY },
      color: rgb(0.8, 0.8, 0.8),
    });
    currentY -= 15;

    // Wrap and add content
    const lines = wrapText(content, 85);

    for (const line of lines) {
      if (currentY < margins + 20) {
        // Add new page if near bottom
        page = pdfDoc.addPage([595, 842]);
        currentY = height - margins;
      }

      page.drawText(line, {
        x: margins,
        y: currentY,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('[v0] PDF creation error:', error);
    throw new Error('Failed to create PDF');
  }
}

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

    const fileName = file.name.toLowerCase();
    const isWord = file.type.includes('word') || 
                   file.type.includes('officedocument') ||
                   fileName.endsWith('.doc') ||
                   fileName.endsWith('.docx');

    if (!isWord) {
      return NextResponse.json(
        { error: 'File must be a Word document (.doc or .docx)' },
        { status: 400 }
      );
    }

    console.log('[v0] Converting Word to PDF for file:', file.name);

    const arrayBuffer = await file.arrayBuffer();

    // Validate file size
    if (arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: 'File is empty' },
        { status: 400 }
      );
    }

    // Extract content from Word file
    const content = await extractWordContent(arrayBuffer);

    // Validate extracted content
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'No content found in Word document' },
        { status: 400 }
      );
    }

    console.log('[v0] Extracted content length:', content.length);

    // Create PDF with extracted content
    const pdfBuffer = await createPDFFromContent(content, file.name);

    // Validate PDF size
    if (pdfBuffer.length === 0) {
      return NextResponse.json(
        { error: 'PDF creation resulted in empty file' },
        { status: 500 }
      );
    }

    const outputFileName = file.name.replace(/\.(doc|docx)$/i, '.pdf');

    console.log('[v0] PDF created successfully, size:', pdfBuffer.length, 'bytes');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${outputFileName}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(pdfBuffer.length),
      },
    });
  } catch (error) {
    console.error('[v0] Word to PDF error:', error);
    return NextResponse.json(
      {
        error: 'Conversion failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
