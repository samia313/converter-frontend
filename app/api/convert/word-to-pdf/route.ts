import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const maxDuration = 30;

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

    // For Word to PDF conversion, we need a more advanced approach
    // Using pdf-lib to create a PDF from extracted content
    const arrayBuffer = await file.arrayBuffer();
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    
    // Add placeholder text indicating Word to PDF conversion
    const { width, height } = page.getSize();
    page.drawText('Word to PDF Conversion', {
      x: 50,
      y: height - 50,
      size: 24,
    });

    page.drawText('Note: For production, integrate with a Word parser library like docx2pdf', {
      x: 50,
      y: height - 100,
      size: 12,
    });

    const pdfBytes = await pdfDoc.save();
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name.replace(/\.(doc|docx)$/i, '.pdf')}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(buffer.length),
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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name}"`,
        'Content-Type': file.type || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
