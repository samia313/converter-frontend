import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import { validatePdfFile, validateOutputBuffer } from '@/lib/pdf-utils';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const timeout = 110 * 1000;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const splitPageValue = formData.get('splitPage');

    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });

    const validation = await validatePdfFile(file);
    if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });
    if (Date.now() - startTime > timeout) return NextResponse.json({ error: 'Processing timeout. File may be too large.' }, { status: 504 });

    const sourcePdf = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()), { ignoreEncryption: true });
    const pageCount = sourcePdf.getPageCount();
    if (pageCount < 2) return NextResponse.json({ error: 'A PDF must contain at least 2 pages to split.' }, { status: 400 });

    const parsedSplitPage = splitPageValue ? Number(splitPageValue) : Math.ceil(pageCount / 2);
    if (!Number.isInteger(parsedSplitPage) || parsedSplitPage < 1 || parsedSplitPage >= pageCount) {
      return NextResponse.json({ error: `Split page must be an integer from 1 to ${pageCount - 1}.` }, { status: 400 });
    }

    const part1 = await PDFDocument.create();
    const part2 = await PDFDocument.create();
    const firstPages = await part1.copyPages(sourcePdf, Array.from({ length: parsedSplitPage }, (_, index) => index));
    firstPages.forEach((page) => part1.addPage(page));
    const secondPages = await part2.copyPages(sourcePdf, Array.from({ length: pageCount - parsedSplitPage }, (_, index) => parsedSplitPage + index));
    secondPages.forEach((page) => part2.addPage(page));

    const [part1Bytes, part2Bytes] = await Promise.all([part1.save(), part2.save()]);
    const part1Buffer = Buffer.from(part1Bytes);
    const part2Buffer = Buffer.from(part2Bytes);
    const part1Validation = validateOutputBuffer(part1Buffer, 'split-pdf part 1');
    const part2Validation = validateOutputBuffer(part2Buffer, 'split-pdf part 2');
    if (!part1Validation.valid || !part2Validation.valid) return NextResponse.json({ error: 'Split produced invalid PDF output.' }, { status: 500 });

    if (Date.now() - startTime > timeout) return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });

    const baseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/\r\n"]/g, '_').slice(0, 160) || 'document';
    const zip = new JSZip();
    zip.file(`${baseName}-part1.pdf`, part1Buffer);
    zip.file(`${baseName}-part2.pdf`, part2Buffer);
    const zipBytes = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    const filename = `${baseName}-split.zip`;

    return new NextResponse(zipBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Content-Length': String(zipBytes.length),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Pages-Part1': String(parsedSplitPage),
        'X-Pages-Part2': String(pageCount - parsedSplitPage),
        'X-Processing-Time': String(Date.now() - startTime),
      },
    });
  } catch (error) {
    console.error('[PDFilio] split-pdf failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Split failed. Please try another PDF.' }, { status: 500 });
  }
}
