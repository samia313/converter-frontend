import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_ROWS = 2000;
const MAX_COLS = 30;

function decodeXml(value: string): string {
  return value
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'").replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function cellRef(ref: string): { row: number; col: number } {
  const match = /^([A-Z]+)(\d+)$/i.exec(ref);
  if (!match) return { row: 0, col: 0 };
  let col = 0;
  for (const char of match[1].toUpperCase()) col = col * 26 + char.charCodeAt(0) - 64;
  return { row: Number(match[2]) - 1, col: col - 1 };
}

function xmlText(block: string): string {
  return [...block.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)]
    .map((m) => decodeXml(m[1])).join('');
}

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
    if (next.length > max && line) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

async function parseXlsx(buffer: Buffer): Promise<string[][][]> {
  const zip = await JSZip.loadAsync(buffer);
  const workbookXml = await zip.file('xl/workbook.xml')?.async('string');
  const relsXml = await zip.file('xl/_rels/workbook.xml.rels')?.async('string');
  if (!workbookXml || !relsXml) throw new Error('Invalid XLSX workbook structure.');

  const relationships = new Map<string, string>();
  for (const m of relsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"[^>]*\/>/g)) {
    relationships.set(m[1], m[2].replace(/^\//, ''));
  }

  const sharedStrings: string[] = [];
  const sharedXml = await zip.file('xl/sharedStrings.xml')?.async('string');
  if (sharedXml) {
    for (const m of sharedXml.matchAll(/<si>([\s\S]*?)<\/si>/g)) sharedStrings.push(xmlText(m[1]));
  }

  const sheets: string[][][] = [];
  for (const m of workbookXml.matchAll(/<sheet\b([^>]*)\/>/g)) {
    const attrs = m[1];
    const nameMatch = /name="([^"]*)"/.exec(attrs);
    const ridMatch = /r:id="([^"]*)"/.exec(attrs);
    if (!ridMatch) continue;
    let target = relationships.get(ridMatch[1]);
    if (!target) continue;
    if (!target.startsWith('xl/')) target = `xl/${target.replace(/^.*\//, '')}`;
    const xml = await zip.file(target)?.async('string');
    if (!xml) continue;

    const rows = new Map<number, string[]>();
    for (const cell of xml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = cell[1];
      const body = cell[2];
      const ref = /r="([^"]+)"/.exec(attrs)?.[1];
      if (!ref) continue;
      const { row, col } = cellRef(ref);
      if (row >= MAX_ROWS || col >= MAX_COLS) continue;
      const type = /t="([^"]+)"/.exec(attrs)?.[1];
      const formula = /<f[^>]*>([\s\S]*?)<\/f>/.exec(body)?.[1];
      const value = /<v[^>]*>([\s\S]*?)<\/v>/.exec(body)?.[1] ?? '';
      const inline = /<is>([\s\S]*?)<\/is>/.exec(body)?.[1];

      let result = '';
      if (type === 's') result = sharedStrings[Number(value)] ?? '';
      else if (type === 'inlineStr') result = inline ? xmlText(inline) : '';
      else if (type === 'b') result = value === '1' ? 'TRUE' : 'FALSE';
      else result = decodeXml(value);
      if (formula && !result) result = decodeXml(formula);
      const current = rows.get(row) ?? [];
      current[col] = result;
      rows.set(row, current);
    }

    const output: string[][] = [];
    for (let i = 0; i < Math.min(MAX_ROWS, Math.max(-1, ...rows.keys()) + 1); i++) {
      output.push((rows.get(i) ?? []).slice(0, MAX_COLS).map(text));
    }
    sheets.push(output);
  }
  return sheets;
}

async function workbookToPdf(buffer: Buffer): Promise<Buffer> {
  const sheets = await parseXlsx(buffer);
  if (!sheets.length) throw new Error('Workbook contains no sheets.');

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  for (let sheetIndex = 0; sheetIndex < sheets.length; sheetIndex++) {
    const limited = sheets[sheetIndex];
    if (!limited.length) continue;
    const colCount = Math.max(1, ...limited.map((r) => r.length));
    const pageWidth = 842, pageHeight = 595, margin = 28;
    const usableWidth = pageWidth - margin * 2;
    const colWidth = Math.max(34, Math.min(130, usableWidth / colCount));
    const fontSize = Math.max(6, Math.min(9, 9 - Math.max(0, colCount - 8) * 0.25));
    let page = pdf.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;
    const newPage = () => { page = pdf.addPage([pageWidth, pageHeight]); y = pageHeight - margin; };

    page.drawText(`Sheet ${sheetIndex + 1}`, { x: margin, y, size: 13, font: bold, color: rgb(0,0,0) });
    y -= 22;

    limited.forEach((row, index) => {
      const wrapped = row.map((cell) => wrap(cell, Math.max(5, Math.floor(colWidth / (fontSize * 0.55)))));
      const height = Math.max(18, ...wrapped.map((lines) => lines.length * 10 + 6));
      if (y - height < margin) newPage();
      const actualY = y;
      for (let col = 0; col < colCount; col++) {
        const x = margin + col * colWidth;
        page.drawRectangle({ x, y: actualY - height, width: colWidth, height, borderWidth: 0.5, borderColor: rgb(0.75,0.75,0.75) });
        (wrapped[col] ?? ['']).slice(0, 12).forEach((line, i) => {
          page.drawText(line.slice(0, 80), { x: x + 3, y: actualY - 11 - i * 10, size: fontSize, font: index === 0 ? bold : font, color: rgb(0,0,0) });
        });
      }
      y = actualY - height;
    });
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
    if (!name.endsWith('.xlsx')) return NextResponse.json({ error: 'Only .xlsx Excel workbooks are supported.' }, { status: 415 });
    if (file.size === 0) return NextResponse.json({ error: 'The Excel file is empty.' }, { status: 400 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Excel file exceeds the 100MB limit.' }, { status: 413 });

    const pdf = await workbookToPdf(Buffer.from(await file.arrayBuffer()));
    const output = file.name.replace(/\.xlsx$/i, '.pdf');
    return new NextResponse(pdf, {
      headers: { 'Content-Disposition': `attachment; filename="${output}"`, 'Content-Type': 'application/pdf', 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Content-Length': String(pdf.length) },
    });
  } catch (error) {
    console.error('[excel-to-pdf] Conversion failed:', error);
    return NextResponse.json({ error: 'Excel to PDF conversion failed. Please upload a valid .xlsx workbook.' }, { status: 422 });
  }
}