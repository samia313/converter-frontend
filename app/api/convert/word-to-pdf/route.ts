import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import * as mammoth from 'mammoth';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

async function extractWordContent(arrayBuffer: ArrayBuffer): Promise<string> {
  const result = await mammoth.convertToHtml({ arrayBuffer }, {
    includeDefaultStyleMap: true,
  });
  if (result.messages?.length) {
    console.warn('[word-to-pdf] Mammoth messages:', result.messages);
  }
  return result.value || '';
}

function htmlToBlocks(html: string): Array<{ type: 'paragraph' | 'heading' | 'table'; text: string; rows?: string[][] }> {
  const blocks: Array<{ type: 'paragraph' | 'heading' | 'table'; text: string; rows?: string[][] }> = [];
  const source = html.replace(/<img\b[^>]*>/gi, '').replace(/\s+/g, ' ');
  const tokenRe = /<(h[1-6]|p|li|table)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = tokenRe.exec(source))) {
    const tag = match[1].toLowerCase();
    const inner = match[2];
    if (tag === 'table') {
      const rows = Array.from(inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)).map((row) =>
        Array.from(row[1].matchAll(/<(td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi))
          .map((cell) => cell[2].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim())
          .filter(Boolean),
      ).filter((row) => row.length);
      if (rows.length) blocks.push({ type: 'table', text: '', rows });
      continue;
    }
    const text = inner
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .trim();
    if (!text) continue;
    blocks.push({ type: tag.startsWith('h') ? 'heading' : 'paragraph', text });
  }
  return blocks;
}

function wrapText(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\n+/)) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (!words.length) { lines.push(''); continue; }
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxChars && line) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
  }
  return lines;
}

async function createPDFFromContent(content: string, fileName: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const pageSize: [number, number] = [595, 842];
  const margin = 50;
  const fontSize = 11;
  const lineHeight = 15;
  let page = pdfDoc.addPage(pageSize);
  let y = pageSize[1] - margin;

  const addPage = () => {
    page = pdfDoc.addPage(pageSize);
    y = pageSize[1] - margin;
  };

  const ensureSpace = (needed = lineHeight) => {
    if (y < margin + needed) addPage();
  };

  const drawLines = (text: string, size = fontSize, gap = lineHeight) => {
    const maxChars = size >= 14 ? 72 : 92;
    for (const line of wrapText(text, maxChars)) {
      if (!line) { y -= gap; continue; }
      ensureSpace(gap);
      page.drawText(line, { x: margin, y, size, color: rgb(0, 0, 0) });
      y -= gap;
    }
  };

  const blocks = htmlToBlocks(content);
  if (!blocks.length) throw new Error('No readable content found in Word document');

  for (const block of blocks) {
    if (block.type === 'heading') {
      ensureSpace(28);
      drawLines(block.text, 16, 20);
      y -= 5;
    } else if (block.type === 'table' && block.rows) {
      for (const row of block.rows) {
        ensureSpace(18);
        drawLines(row.join(' | '), 9, 13);
      }
      y -= 8;
    } else {
      drawLines(block.text);
      y -= 6;
    }
  }

  return Buffer.from(await pdfDoc.save());
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
    const isDocx = file.type.includes('officedocument') || fileName.endsWith('.docx');

    if (!isDocx) {
      return NextResponse.json(
        { error: 'File must be a supported Word document (.docx)' },
        { status: 400 }
      );
    }

    console.log('[v0] Converting Word to PDF for file:', file.name);

    const arrayBuffer = await file.arrayBuffer();

    if (arrayBuffer.byteLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 100MB limit.' },
        { status: 413 }
      );
    }

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

    const outputFileName = file.name.replace(/\.docx$/i, '.pdf');

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
