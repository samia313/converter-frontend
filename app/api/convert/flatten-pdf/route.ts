import { enforceRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: Request) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    }
    const validation = await validatePdfFile(file);
    if (!validation.valid) return NextResponse.json({ error: validation.error || 'Invalid PDF file.' }, { status: 400 });

    const bytes = new Uint8Array(await file.arrayBuffer());

    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    if (fields.length > 0) {
      form.flatten();
    }

    const output = Buffer.from(await pdfDoc.save());
    const outputValidation = validateOutputBuffer(output, 'Flatten PDF');
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error || 'Generated PDF is invalid.' }, { status: 500 });
    const filename = sanitizePdfDownloadFilename(file.name, '_flattened.pdf');

    return new NextResponse(output, {
      status: 200,
      headers: getDownloadHeaders(filename, output.length),
    });
  } catch (error) {
    console.error('Flatten PDF error:', error);
    return NextResponse.json(
      { error: 'Unable to flatten this PDF. The file may be encrypted, malformed, or use unsupported form features.' },
      { status: 500 },
    );
  }
}
