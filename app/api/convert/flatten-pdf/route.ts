import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'PDF must be 100 MB or smaller.' }, { status: 413 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: 'The uploaded PDF is empty.' }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const header = new TextDecoder().decode(bytes.slice(0, 5));
    if (header !== '%PDF-') {
      return NextResponse.json({ error: 'The uploaded file is not a valid PDF.' }, { status: 415 });
    }

    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    if (fields.length > 0) {
      form.flatten();
    }

    const output = await pdfDoc.save();
    const baseName = file.name.replace(/\.pdf$/i, '') || 'document';
    const filename = `${baseName}_flattened.pdf`;

    return new NextResponse(output as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(output.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Flatten PDF error:', error);
    return NextResponse.json(
      { error: 'Unable to flatten this PDF. The file may be encrypted, malformed, or use unsupported form features.' },
      { status: 500 },
    );
  }
}
