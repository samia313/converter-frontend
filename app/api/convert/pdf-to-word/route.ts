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
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    useWorkerFetch: false,
    disableFontFace: true,
    verbosity: 0,
  });

  const pdf = await loadingTask.promise;
  const pages: string[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const items = content.items as Array<{
        str?: string;
        hasEOL?: boolean;
        transform?: number[];
      }>;

      let pageText = '';
      let previousY: number | null = null;

      for (const item of items) {
        const value = item.str ?? '';
        if (!value) continue;

        const y = item.transform?.[5] ?? null;
        if (previousY !== null && y !== null && Math.abs(previousY - y) > 3) {
          pageText += '\n';
        } else if (pageText && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
          pageText += ' ';
        }

        pageText += value;
        if (item.hasEOL) pageText += '\n';
        previousY = y;
      }

      pages.push(normalizeText(pageText));
    }
  } finally {
    await pdf.destroy();
  }

  return pages.filter(Boolean).join('\n\n');
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

    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    if (pdfBuffer.length === 0) {
      return NextResponse.json({ error: 'File is empty' }, { status: 400 });
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

    const fileName = file.name.replace(/\.pdf$/i, '') + '.docx';

    return new NextResponse(wordBuffer as BodyInit, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(wordBuffer.length),
        'X-Converted-Pages': String(pageCount),
      },
    });
  } catch (error) {
    console.error('[pdf-to-word] Conversion error:', error);
    return NextResponse.json(
      { error: 'Conversion failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
