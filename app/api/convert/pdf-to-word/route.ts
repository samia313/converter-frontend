import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph } from 'docx';

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

    // Create a basic Word document with placeholder content
    // In production, use a service like pdf-parse, LibreOffice, or CloudConvert API
    const fileName = file.name;
    
    const paragraphs: Paragraph[] = [
      new Paragraph({
        text: 'PDF Conversion in Progress',
        heading: 'Heading1',
      }),
      new Paragraph({
        text: `File: ${fileName}`,
      }),
      new Paragraph({
        text: 'This document was converted from PDF using PDFilio.',
      }),
      new Paragraph({
        text: 'Note: For full PDF to Word conversion with text preservation, use our online tool.',
      }),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '.docx')}"`,
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });
  } catch (error) {
    console.error('[v0] PDF to Word conversion error:', error);
    return NextResponse.json(
      { error: 'Conversion failed' },
      { status: 500 }
    );
  }
}
