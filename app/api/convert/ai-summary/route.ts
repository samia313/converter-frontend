import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentText, generateAIText } from '@/lib/document-text';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const length = form.get('length');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'This summary tool accepts PDF files only.' }, { status: 415 });
    }

    const text = await extractDocumentText(file);
    const instruction = length === 'short'
      ? 'Write a short summary in 3–5 bullet points.'
      : length === 'long'
        ? 'Write a detailed, structured summary including key points and conclusions.'
        : 'Write a clear medium-length summary with the main ideas and important details.';
    const summary = await generateAIText(
      'Summarize the source faithfully. Do not invent facts or remove important caveats. If the document is incomplete or ambiguous, say so.',
      `${instruction}\n\nSummarize the following document:\n\n${text}`,
      length === 'long' ? 1800 : 1000,
    );
    const content = `DOCUMENT SUMMARY\n\nFile: ${file.name.replace(/[\\r\\n"]/g, '_')}\n\n${summary}\n`;
    const baseName = file.name.replace(/\.pdf$/i, '').replace(/[\\/\\r\\n"]/g, '_').slice(0, 120) || 'document';
    return new NextResponse(Buffer.from(content, 'utf8'), {
      headers: {
        'Content-Disposition': `attachment; filename="${baseName}-summary.txt"`,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Summary generation failed.';
    const status = /not configured/i.test(message) ? 503 : /temporarily busy/i.test(message) ? 429 : /could not process|empty result/i.test(message) ? 502 : 422;
    console.error('[PDFilio AI] convert summary failed:', message);
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
