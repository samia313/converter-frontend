import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_ROWS = 2000;
const MAX_COLS = 30;

function text(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\r?\n/g, ' ');
}

function wrap(value: string, max: number): string[] {
  if (!value) return [''];
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

async function workbookToPdf(buffer: Buffer): Promise<Buffer> {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  if (!workbook.SheetNames.length) throw new Error('Workbook contains no sheets.');

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' }) as unknown[][];
    const limited = rows.slice(0, MAX_ROWS).map((row) => row.slice(0, MAX_COLS).map(text));
    if (!limited.length) continue;

    const colCount = Math.max(1, ...limited.map((r) => r.length));
    const pageWidth = 842;
    const pageHeight = 595;
    const margin = 28;
    const usableWidth = pageWidth - margin * 2;
    const colWidth = Math.max(34, Math.min(130, usableWidth / colCount));
    const rowHeight = 18;
    const fontSize = Math.max(6, Math.min(9, 9 - Math.max(0, colCount - 8) * 0.25));

    let page = pdf.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    const newPage = () => {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    };

    const drawRow = (row: string[], header: boolean) => {
      const wrapped = row.map((cell) => wrap(cell, Math.max(5, Math.floor(colWidth / (fontSize * 0.55)))));
      const height = Math.max(rowHeight, ...wrapped.map((lines) => lines.length * 10 + 6));
      if (y - height < margin) newPage();
      const actualY = y;
      for (let col = 0; col < colCount; col++) {
        const x = margin + col * colWidth;
        page.drawRectangle({ x, y: actualY - height, width: colWidth, height, borderWidth: 0.5, borderColor: rgb(0.75,0.75,0.75) });
        const lines = wrapped[col] ?? [''];
        lines.slice(0, 12).forEach((line, i) => {
          page.drawText(line.slice(0, 80), { x: x + 3, y: actualY - 11 - i * 10, size: fontSize, font: header ? bold : font, color: rgb(0,0,0) });
        });
      }
      y = actualY - height;
    };

    page.drawText(sheetName.slice(0, 80), { x: margin, y, size: 13, font: bold, color: rgb(0,0,0) });
    y -= 22;
    limited.forEach((row, i) => drawRow(row, i === 0));
  }

  if (pdf.getPageCount() === 0) throw new Error('Workbook contains no printable data.');
  return Buffer.from(await pdf.save());
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No Excel file provided.' }, { status: 400 });

    const name = file.name.toLowerCase();
    if (!name.endsWith('.xlsx') && !name.endsWith('.xls')) {
      return NextResponse.json({ error: 'File must be an Excel workbook (.xlsx or .xls).' }, { status: 415 });
    }
    if (file.size === 0) return NextResponse.json({ error: 'The Excel file is empty.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Excel file exceeds the 100MB limit.' }, { status: 413 });

    const pdf = await workbookToPdf(Buffer.from(await file.arrayBuffer()));
    const output = file.name.replace(/\.(xlsx|xls)$/i, '.pdf');

    return new NextResponse(pdf, {
      headers: {
        'Content-Disposition': `attachment; filename="${output}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(pdf.length),
      },
    });
  } catch (error) {
    console.error('[excel-to-pdf] Conversion failed:', error);
    return NextResponse.json({ error: 'Excel to PDF conversion failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 422 });
  }
}