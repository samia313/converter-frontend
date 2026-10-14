import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentText, generateAIText } from '@/lib/document-text';

export const runtime = 'nodejs';
export const maxDuration = 60;

const LANGUAGE_NAMES: Record<string, string> = {
  es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese',
  nl: 'Dutch', ru: 'Russian', ja: 'Japanese', zh: 'Chinese', ar: 'Arabic',
  hi: 'Hindi', ko: 'Korean',
};

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const languageCode = form.get('language');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF, DOCX, or TXT file.' }, { status: 400 });
    }
    const language = typeof languageCode === 'string' ? LANGUAGE_NAMES[languageCode] : undefined;
    if (!language) {
      return NextResponse.json({ error: 'Please select a supported target language.' }, { status: 400 });
    }
    const content = await extractDocumentText(file);
    const translatedText = await generateAIText(
      `You are a careful document translator. Translate the provided text into ${language}. Preserve meaning, names, numbers, lists, headings, and paragraph structure. Do not summarize or add explanations. If the text is already in the target language, return it unchanged.`,
      content,
      2500,
    );
    return NextResponse.json({ success: true, translatedText, targetLanguage: language, sourceCharacters: content.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Translation failed.';
    const status = /not configured/i.test(message) ? 503 : /temporarily busy/i.test(message) ? 429 : /could not process|empty result/i.test(message) ? 502 : 422;
    console.error('[PDFilio AI] translate failed:', message);
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
