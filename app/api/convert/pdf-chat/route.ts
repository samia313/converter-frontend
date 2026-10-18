import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentText, generateAIText } from '@/lib/document-text';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    if ((request.headers.get('content-type') || '').includes('multipart/form-data')) {
      const form = await request.formData();
      const file = form.get('file');
      if (!(file instanceof File)) return NextResponse.json({ success: false, error: 'Please upload a PDF, DOCX, or TXT file.' }, { status: 400 });
      const documentContent = await extractDocumentText(file);
      return NextResponse.json({ success: true, fileName: file.name, documentContent, ready: true });
    }

    const body = await request.json() as { query?: string; documentContent?: string };
    const query = body.query?.trim();
    const documentContent = body.documentContent?.trim();
    if (!query || !documentContent) return NextResponse.json({ success: false, error: 'Load a document and enter a question first.' }, { status: 400 });
    const response = await generateAIText(
      'Answer questions from the supplied document. Do not invent facts, quotations, or page numbers. If the document does not answer the question, say so.',
      `Document:\n\n${documentContent.slice(0, 100_000)}\n\nQuestion: ${query}`,
      1000,
    );
    return NextResponse.json({ success: true, response });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'PDF chat failed.';
    const status = /not configured/i.test(message) ? 503 : /temporarily busy/i.test(message) ? 429 : /could not process|empty result/i.test(message) ? 502 : 422;
    console.error('[PDFilio AI] legacy PDF chat failed:', message);
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
