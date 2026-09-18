import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

type Cell = { x: number; text: string };

function xmlEscape(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[char] as string));
}

async function extractRows(pdfBuffer: Buffer): Promise<string[][]> {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    useWorkerFetch: false,
    disableFontFace: true,
    verbosity: 0,
  });
  const pdf = await loadingTask.promise;
  const rows: string[][] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const items = content.items as Array<{ str?: string; transform?: number[] }>;
      const pageRows: Array<{ y: number; cells: Cell[] }> = [];

      for (const item of items) {
        const text = (item.str ?? '').trim();
        if (!text) continue;
        const x = item.transform?.[4] ?? 0;
        const y = item.transform?.[5] ?? 0;
        let row = pageRows.find((candidate) => Math.abs(candidate.y - y) <= 3);
        if (!row) {
          row = { y, cells: [] };
          pageRows.push(row);
        }
        row.cells.push({ x, text });
      }

      pageRows.sort((a, b) => b.y - a.y);
      for (const row of pageRows) {
        row.cells.sort((a, b) => a.x - b.x);
        const cells: string[] = [];
        for (const cell of row.cells) {
          const previous = cells[cells.length - 1];
          if (previous && cell.x - row.cells[row.cells.indexOf(cell) - 1].x < 8) {
            cells[cells.length - 1] = previous + ' ' + cell.text;
          } else {
            cells.push(cell.text);
          }
        }
        if (cells.length) rows.push(cells);
      }
      rows.push([]);
    }
  } finally {
    await loadingTask.destroy();
  }

  while (rows.length && rows[rows.length - 1].length === 0) rows.pop();
  return rows;
}

function columnName(index: number): string {
  let n = index + 1;
  let name = '';
  while (n > 0) {
    const remainder = (n - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

async function createXlsx(rows: string[][]): Promise<Buffer> {
  const maxColumns = Math.max(1, ...rows.map((row) => row.length));
  const normalized = rows.map((row) => Array.from({ length: maxColumns }, (_, i) => row[i] ?? ''));
  const sheetRows = normalized.map((row, rowIndex) => {
    const cells = row.map((value, columnIndex) => {
      const ref = `${columnName(columnIndex)}${rowIndex + 1}`;
      return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
    }).join('');
    return `<row r="${rowIndex + 1}">${cells}</row>`;
  }).join('');

  const zip = new JSZip();
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`);
  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`);
  zip.file('xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="PDF Data" sheetId="1" r:id="rId1"/></sheets>
</workbook>`);
  zip.file('xl/_rels/workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`);
  zip.file('xl/worksheets/sheet1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetData>${sheetRows}</sheetData>
</worksheet>`);
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
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

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!buffer.length) return NextResponse.json({ error: 'File is empty' }, { status: 400 });
    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds the 100MB limit.' }, { status: 413 });
    }

    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    if (pageCount < 1) {
      return NextResponse.json({ error: 'PDF contains no pages' }, { status: 400 });
    }

    let rows: string[][];
    try {
      rows = await extractRows(buffer);
    } catch (error) {
      console.error('[pdf-to-excel] Text extraction failed:', error);
      return NextResponse.json(
        { error: 'Could not extract text from this PDF. It may be scanned/image-only or encrypted.' },
        { status: 422 },
      );
    }

    if (!rows.some((row) => row.length && row.some(Boolean))) {
      return NextResponse.json(
        { error: 'No selectable text was found in this PDF. Scanned/image-only PDFs require OCR first.' },
        { status: 422 },
      );
    }

    const xlsxBuffer = await createXlsx(rows);
    const fileName = file.name.replace(/\.pdf$/i, '') + '.xlsx';

    return new NextResponse(xlsxBuffer as BodyInit, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(xlsxBuffer.length),
        'X-Converted-Pages': String(pageCount),
      },
    });
  } catch (error) {
    console.error('[pdf-to-excel] Conversion error:', error);
    return NextResponse.json(
      { error: 'Conversion failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
