import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

type TextItem = { x: number; y: number; text: string; width: number };

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
  // Use the same maintained text-extraction engine as PDF-to-Word. The prior
  // pdfjs-dist path failed on a valid pdf-lib-generated text PDF in CI.
  const { PDFParse } = await import('pdf-parse');
  const parser = new PDFParse({ data: pdfBuffer });

  try {
    const result = await parser.getText();
    const pages = result.text.split(/\f/);
    const rows: string[][] = [];

    for (const page of pages) {
      const lines = page
        .replace(/\r/g, '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      for (const line of lines) {
        // Preserve tabular spacing when the extractor exposes it; otherwise
        // keep the complete line in one cell rather than inventing columns.
        const cells = line.includes('\t')
          ? line.split('\t').map((cell) => cell.trim())
          : line.split(/ {2,}/).map((cell) => cell.trim());
        rows.push(cells.filter((cell) => cell.length > 0));
      }

      if (rows.length && page !== pages[pages.length - 1]) rows.push([]);
    }

    while (rows.length && rows[rows.length - 1].length === 0) rows.pop();
    return rows;
  } finally {
    await parser.destroy();
  }
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
  const maxColumns = Math.min(50, Math.max(1, ...rows.map((row) => row.length)));
  const normalized = rows.map((row) => Array.from({ length: maxColumns }, (_, i) => row[i] ?? '').slice(0, maxColumns));
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

async function validateXlsxStructure(buffer: Buffer): Promise<boolean> {
  try {
    const archive = await JSZip.loadAsync(buffer, { checkCRC32: true });
    const requiredFiles = [
      '[Content_Types].xml',
      '_rels/.rels',
      'xl/workbook.xml',
      'xl/_rels/workbook.xml.rels',
      'xl/worksheets/sheet1.xml',
    ];

    for (const path of requiredFiles) {
      if (!archive.file(path)) return false;
    }

    const [contentTypes, rootRels, workbook, workbookRels, worksheet] = await Promise.all(
      requiredFiles.map(async (path) => archive.file(path)!.async('string')),
    );

    return (
      contentTypes.includes('spreadsheetml.sheet.main+xml') &&
      rootRels.includes('Target="xl/workbook.xml"') &&
      workbook.includes('<sheet name="PDF Data"') &&
      workbookRels.includes('Target="worksheets/sheet1.xml"') &&
      worksheet.includes('<sheetData>') &&
      worksheet.includes('</sheetData>') &&
      worksheet.includes('<row ')
    );
  } catch {
    return false;
  }
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
    if (
      xlsxBuffer.length < 4 ||
      xlsxBuffer[0] !== 0x50 ||
      xlsxBuffer[1] !== 0x4b ||
      xlsxBuffer[2] !== 0x03 ||
      xlsxBuffer[3] !== 0x04
    ) {
      console.error('[pdf-to-excel] Generated XLSX failed ZIP signature validation.');
      return NextResponse.json({ error: 'Conversion output failed file integrity validation.' }, { status: 500 });
    }
    const baseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/\r\n"]/g, '_').slice(0, 150) || 'document';
    const fileName = baseName + '.xlsx';
    if (!(await validateXlsxStructure(xlsxBuffer))) {
      console.error('[pdf-to-excel] Generated XLSX failed internal workbook validation.');
      return NextResponse.json({ error: 'The generated Excel workbook failed structural validation.' }, { status: 500 });
    }

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
