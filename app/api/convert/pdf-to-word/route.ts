import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const runtime = 'nodejs';
export const maxDuration = 60;

function normalizeText(value: string): string {
  return value
    .replace(/\u0000/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim();
}

async function extractPdfText(pdfBuffer: Buffer): Promise<string> {
  const { PDFParse } = await import('pdf-parse');
  const parser = new PDFParse({ data: pdfBuffer });

  try {
    const result = await parser.getText();
    return result.text
      .split(/\f/)
      .map((page: string) => normalizeText(page))
      .filter(Boolean)
      .join('\n\n');
  } finally {
    await parser.destroy();
  }
}

async function createWordDocument(text: string): Promise<Buffer> {
  const paragraphs = text.split(/\r?\n/).map(
    (line) => new Paragraph({
      children: [new TextRun({ text: line })],
      spacing: { after: 100 },
    }),
  );

  const document = new Document({
    sections: [{ properties: {}, children: paragraphs.length ? paragraphs : [new Paragraph('')] }],
  });

  return Packer.toBuffer(document);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.pdf') && !file.type.includes('pdf')) {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    const maxSize = 100 * 1024 * 1024;
    // Check the multipart metadata before reading the entire upload into memory.
    // This avoids allocating a huge Buffer for files that already exceed our limit.
    if (file.size === 0) {
      return NextResponse.json({ error: 'File is empty' }, { status: 400 });
    }
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds the 100MB limit.' }, { status: 413 });
    }

    // Extension and MIME type can be spoofed; validate the signature before parsing.
    const header = Buffer.from(await file.slice(0, 5).arrayBuffer());
    if (header.length < 5 || header.toString('ascii') !== '%PDF-') {
      return NextResponse.json({ error: 'The uploaded file is not a valid PDF.' }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    // Recheck the actual buffer length as defense in depth.
    if (pdfBuffer.length === 0) {
      return NextResponse.json({ error: 'File is empty' }, { status: 400 });
    }
    if (pdfBuffer.length > maxSize) {
      return NextResponse.json({ error: 'File size exceeds the 100MB limit.' }, { status: 413 });
    }

    const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    if (pageCount < 1) {
      return NextResponse.json({ error: 'PDF contains no pages' }, { status: 400 });
    }

    let extractedText = '';
    try {
      extractedText = await extractPdfText(pdfBuffer);
    } catch (extractError) {
      console.error('[pdf-to-word] Text extraction failed:', extractError);
      return NextResponse.json(
        { error: 'Could not extract text from this PDF. It may be scanned/image-only or encrypted.' },
        { status: 422 },
      );
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: 'No selectable text was found in this PDF. This PDF may be scanned/image-only and requires OCR.' },
        { status: 422 },
      );
    }

    const wordBuffer = await createWordDocument(extractedText);
    if (!wordBuffer.length) {
      return NextResponse.json({ error: 'Word document creation failed' }, { status: 500 });
    }

    // DOCX is a ZIP package; validate its container signature before offering a download.
    if (
      wordBuffer.length < 4 ||
      wordBuffer[0] !== 0x50 ||
      wordBuffer[1] !== 0x4b ||
      wordBuffer[2] !== 0x03 ||
      wordBuffer[3] !== 0x04
    ) {
      console.error('[pdf-to-word] Generated DOCX failed container validation.');
      return NextResponse.json({ error: 'The Word output failed file integrity validation. Please try again.' }, { status: 500 });
    }
    if (wordBuffer.length > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'The generated Word document exceeds the 100MB download limit.' }, { status: 413 });
    }

    const safeBaseName = file.name
      .replace(/\.pdf$/i, '')
      .replace(/[\\\/\r\n"\x00-\x1f]/g, '_')
      .trim()
      .slice(0, 150) || 'converted-document';
    const fileName = `${safeBaseName}.docx`;

    return new NextResponse(wordBuffer as BodyInit, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(wordBuffer.length),
        'X-Converted-Pages': String(pageCount),
        'X-Conversion-Limitations': 'Text-only conversion; original layout, images, and tables may not be preserved.',
      },
    });
  } catch (error) {
    console.error('[pdf-to-word] Conversion error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Conversion failed. Please check that the PDF is valid and try again.' },
      { status: 500 },
    );
  }
}
