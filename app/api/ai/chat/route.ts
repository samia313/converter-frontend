import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentText, generateAIText } from '@/lib/document-text';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // The initial upload request extracts text and returns it to the browser session.
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const file = form.get('file');
      if (!(file instanceof File)) {
        return NextResponse.json({ success: false, error: 'Please upload a PDF, DOCX, or TXT file.' }, { status: 400 });
      }
      const documentContent = await extractDocumentText(file);
      return NextResponse.json({
        success: true,
        fileName: file.name,
        fileSize: file.size,
        documentContent,
        ready: true,
        message: 'Document text extracted and is ready for questions.',
      });
    }

    const body = await request.json() as { query?: string; documentContent?: string; context?: string };
    const query = body.query?.trim();
    const documentContent = body.documentContent?.trim();
    if (!query || !documentContent) {
      return NextResponse.json(
        { success: false, error: 'Load a document first, then enter a question.' },
        { status: 400 },
      );
    }
    if (query.length > 4000) {
      return NextResponse.json({ success: false, error: 'Please keep your question under 4,000 characters.' }, { status: 413 });
    }

    const response = await generateAIText(
      'You answer questions using the provided document as the primary source. Be accurate, concise, and transparent when the document does not contain the answer. Do not invent quotations, page numbers, or facts. If context is missing, say so.',
      `Document text:\n\n${documentContent.slice(0, 100_000)}\n\nUser question:\n${query}${body.context ? `\n\nAdditional context: ${body.context.slice(0, 2000)}` : ''}`,
      1000,
    );
    return NextResponse.json({ success: true, response, timestamp: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chat processing failed.';
    const status = /not configured/i.test(message) ? 503 : /temporarily busy/i.test(message) ? 429 : /could not process|empty result/i.test(message) ? 502 : 422;
    console.error('[PDFilio AI] chat failed:', message);
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
