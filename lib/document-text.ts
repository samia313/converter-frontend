import 'server-only';

const MAX_AI_FILE_BYTES = 50 * 1024 * 1024;
const MAX_EXTRACTED_CHARS = 100_000;

export async function extractDocumentText(file: File): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('Please upload a non-empty document.');
  }
  if (file.size > MAX_AI_FILE_BYTES) {
    throw new Error('This AI tool supports files up to 50MB.');
  }

  const name = file.name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());
  let text = '';

  if (name.endsWith('.pdf') || file.type === 'application/pdf') {
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      text = result.text || '';
    } finally {
      await parser.destroy();
    }
    if (!text.trim()) {
      throw new Error('No selectable text was found. This may be a scanned PDF; run OCR first.');
    }
  } else if (name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    text = result.value || '';
  } else if (name.endsWith('.txt') || file.type.startsWith('text/')) {
    text = buffer.toString('utf8');
  } else if (name.endsWith('.doc')) {
    throw new Error('Legacy .doc files are not supported by this AI tool yet. Please save the file as .docx or PDF.');
  } else {
    throw new Error('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
  }

  const cleaned = text.replace(/\u0000/g, '').trim();
  if (!cleaned) {
    throw new Error('No readable text was found in this document.');
  }
  return cleaned.slice(0, MAX_EXTRACTED_CHARS);
}

export async function generateAIText(systemPrompt: string, userPrompt: string, maxTokens = 1200): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_2 || process.env.OPENAI_API_KEY_3 || process.env.OPENAI_API_KEY_4;
  if (!apiKey) {
    throw new Error('AI service is temporarily unavailable because the provider is not configured.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(50_000),
  });

  const payload = await response.json().catch(() => null) as {
    choices?: Array<{ message?: { content?: string | null } }>;
    error?: { message?: string };
  } | null;

  if (!response.ok) {
    console.error('[PDFilio AI] Provider request failed:', response.status, payload?.error?.message || 'unknown provider error');
    if (response.status === 429) throw new Error('AI usage is temporarily busy. Please wait a moment and try again.');
    if (response.status === 401 || response.status === 403) throw new Error('AI service configuration needs attention. Please try again later.');
    throw new Error('AI could not process this request right now. Please try again.');
  }

  const result = payload?.choices?.[0]?.message?.content?.trim();
  if (!result) throw new Error('AI returned an empty result. Please try again with a shorter document.');
  return result;
}
