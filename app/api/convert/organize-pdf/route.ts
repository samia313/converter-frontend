import { enforceRateLimit } from '@/lib/rate-limit';
import { sanitizePdfDownloadFilename, validatePdfFile } from '@/lib/pdf-utils';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

function parsePageNumbers(
value: FormDataEntryValue | null,
pageCount: number,
allowBlank = true
): number[] {
if (typeof value !== 'string' || !value.trim()) {
if (allowBlank) {
return Array.from({ length: pageCount }, (_, index) => index + 1);
}
throw new Error('Page order is required.');
}

const pages = value.split(',').map((item) => Number(item.trim()));

if (
pages.some(
(page) => !Number.isInteger(page) || page < 1 || page > pageCount
) ||
new Set(pages).size !== pages.length
) {
throw new Error(
'Page numbers must be valid, unique, and within the PDF page range.'
);
}

return pages;
}

export async function POST(request: NextRequest) {
const rateLimitResponse = await enforceRateLimit(request, {
namespace: 'conversion',
limit: 10,
window: '1 m',
});

if (rateLimitResponse) return rateLimitResponse;

try {
const formData = await request.formData();
const file = formData.get('file');

if (!(file instanceof File)) {
return NextResponse.json(
{ error: 'No PDF file provided.' },
{ status: 400 }
);
}

if (file.size > MAX_FILE_SIZE) {
return NextResponse.json(
{ error: 'File exceeds the 100MB limit.' },
{ status: 413 }
);
}

const validation = await validatePdfFile(file);

if (!validation.valid) {
return NextResponse.json(
{ error: validation.error || 'Invalid PDF file.' },
{ status: 400 }
);
}

const sourcePdf = await PDFDocument.load(
new Uint8Array(await file.arrayBuffer()),
{ ignoreEncryption: true }
);

const pageCount = sourcePdf.getPageCount();

if (pageCount < 2) {
return NextResponse.json(
{ error: 'Organize PDF requires at least 2 pages.' },
{ status: 400 }
);
}

let order: number[];
let deletePages: number[];

try {
order = parsePageNumbers(formData.get('order'), pageCount);
deletePages = parsePageNumbers(
formData.get('deletePages'),
pageCount,
true
);
} catch (error) {
return NextResponse.json(
{
error:
error instanceof Error
? error.message
: 'Invalid page order or deletion list.',
},
{ status: 400 }
);
}

const deleteValue = formData.get('deletePages');
const deletedPages = new Set(
typeof deleteValue === 'string' && deleteValue.trim()
? deletePages
: []
);

const finalPages = order.filter((page) => !deletedPages.has(page));

if (finalPages.length === 0) {
return NextResponse.json(
{ error: 'You cannot delete every page.' },
{ status: 400 }
);
}

const outputPdf = await PDFDocument.create();
const copiedPages = await outputPdf.copyPages(
sourcePdf,
finalPages.map((page) => page - 1)
);

copiedPages.forEach((page) => outputPdf.addPage(page));

const outputBytes = await outputPdf.save();
const filename = sanitizePdfDownloadFilename(
file.name,
'_organized.pdf'
);

return new NextResponse(Buffer.from(outputBytes), {
status: 200,
headers: {
'Content-Type': 'application/pdf',
'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
'Content-Length': String(outputBytes.length),
'Cache-Control': 'no-store',
'X-Content-Type-Options': 'nosniff',
},
});
} catch (error) {
console.error(
'[PDFilio] organize-pdf failed:',
error instanceof Error ? error.message : 'Unknown error'
);

return NextResponse.json(
{
error:
'Could not organize this PDF. The file may be damaged, encrypted, or unsupported.',
},
{ status: 500 }
);
}
}
