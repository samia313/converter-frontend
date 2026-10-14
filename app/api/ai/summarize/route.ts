import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentText, generateAIText } from '@/lib/document-text';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const length = form.get('length');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF, DOCX, or TXT file.' }, { status: 400 });
    }
    const content = await extractDocumentText(file);
    const lengthInstruction = length === 'short'
      ? 'Write a concise summary in 3–5 bullet points.'
      : length === 'long'
        ? 'Write a detailed, structured summary with key points, important details, and conclusions.'
        : 'Write a clear medium-length summary with the main ideas and important details.';
    const summary = await generateAIText(
      'You summarize user-provided documents faithfully. Do not invent facts. Preserve important names, numbers, caveats, and conclusions. If the source is unclear, say so.',
      `${lengthInstruction}\n\nSummarize this document:\n\n${content}`,
      length === 'long' ? 1800 : 1000,
    );
    return NextResponse.json({ success: true, summary, sourceCharacters: content.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Summary generation failed.';
    const status = /not configured/i.test(message) ? 503 : /temporarily busy/i.test(message) ? 429 : /provider request|could not process|empty result/i.test(message) ? 502 : 422;
    console.error('[PDFilio AI] summarize failed:', message);
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
