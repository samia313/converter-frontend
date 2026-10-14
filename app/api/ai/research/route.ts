import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentText, generateAIText } from '@/lib/document-text';

export const runtime = 'nodejs';
export const maxDuration = 60;

const RESEARCH_INSTRUCTIONS: Record<string, string> = {
  insights: 'Identify the key insights, findings, evidence, and open questions. Separate facts stated in the source from your interpretation.',
  summary: 'Create an executive summary covering purpose, major findings, implications, and recommended next steps.',
  methodology: 'Analyze the methodology described in the source, including methods, assumptions, sample/data if stated, strengths, limitations, and unanswered questions. Do not invent missing details.',
  conclusion: 'Explain the source conclusions and implications, cite the reasoning given in the source, and distinguish explicit conclusions from possible interpretations.',
};

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const type = form.get('type');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF, DOCX, or TXT file.' }, { status: 400 });
    }
    const instruction = typeof type === 'string' ? RESEARCH_INSTRUCTIONS[type] : undefined;
    if (!instruction) {
      return NextResponse.json({ error: 'Please select a supported research analysis type.' }, { status: 400 });
    }
    const content = await extractDocumentText(file);
    const analysis = await generateAIText(
      'You are a careful research assistant. Base your analysis on the supplied document only. Never fabricate citations, statistics, methods, or conclusions. Clearly flag uncertainty and missing information.',
      `${instruction}\n\nAnalyze this document:\n\n${content}`,
      1800,
    );
    return NextResponse.json({ success: true, analysis, researchType: type, sourceCharacters: content.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Research analysis failed.';
    const status = /not configured/i.test(message) ? 503 : /temporarily busy/i.test(message) ? 429 : /could not process|empty result/i.test(message) ? 502 : 422;
    console.error('[PDFilio AI] research failed:', message);
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
