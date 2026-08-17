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

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (Date.now() - startTime > timeout) {
      return NextResponse.json({ error: 'Processing timeout. File may be too large.' }, { status: 504 });
    }

    const inputBytes = new Uint8Array(await file.arrayBuffer());
    const sourcePdf = await PDFDocument.load(inputBytes, { ignoreEncryption: true });
    const pageCount = sourcePdf.getPageCount();

    if (pageCount < 2) {
      return NextResponse.json(
        { error: 'A PDF must contain at least 2 pages to split.' },
        { status: 400 },
      );
    }

    const parsedSplitPage = splitPageValue ? Number(splitPageValue) : Math.ceil(pageCount / 2);
    if (!Number.isInteger(parsedSplitPage) || parsedSplitPage < 1 || parsedSplitPage >= pageCount) {
      return NextResponse.json(
        { error: `Split page must be an integer from 1 to ${pageCount - 1}.` },
        { status: 400 },
      );
    }

    const part1 = await PDFDocument.create();
    const part2 = await PDFDocument.create();

    const firstPageIndices = Array.from({ length: parsedSplitPage }, (_, index) => index);
    const secondPageIndices = Array.from(
      { length: pageCount - parsedSplitPage },
      (_, index) => parsedSplitPage + index,
    );

    const firstPages = await part1.copyPages(sourcePdf, firstPageIndices);
    firstPages.forEach((page) => part1.addPage(page));

    const secondPages = await part2.copyPages(sourcePdf, secondPageIndices);
    secondPages.forEach((page) => part2.addPage(page));

    const [part1Bytes, part2Bytes] = await Promise.all([part1.save(), part2.save()]);
    const part1Buffer = Buffer.from(part1Bytes);
    const part2Buffer = Buffer.from(part2Bytes);

    const part1Validation = validateOutputBuffer(part1Buffer, 'split-pdf part 1');
    const part2Validation = validateOutputBuffer(part2Buffer, 'split-pdf part 2');
    if (!part1Validation.valid || !part2Validation.valid) {
      return NextResponse.json(
        { error: part1Validation.error || part2Validation.error || 'Split produced invalid output.' },
        { status: 500 },
      );
    }

    if (Date.now() - startTime > timeout) {
      return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });
    }

    const baseName = file.name
      .replace(/\.pdf$/i, '')
      .replace(/[\\/\r\n"]/g, '_');
    const zip = new JSZip();
    zip.file(`${baseName}-part1.pdf`, part1Buffer);
    zip.file(`${baseName}-part2.pdf`, part2Buffer);

    const zipBytes = await zip.generateAsync({
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });
    const processingTime = Date.now() - startTime;
    const filename = `${baseName}-split.zip`;

    return new NextResponse(zipBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(zipBytes.length),
        'Cache-Control': 'no-store',
        'X-Pages-Part1': String(parsedSplitPage),
        'X-Pages-Part2': String(pageCount - parsedSplitPage),
        'X-Processing-Time': String(processingTime),
      },
    });
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('[split-pdf] Processing failed after', processingTime, 'ms:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Split failed' },
      { status: 500 },
    );
  }
}
