import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

export const maxDuration = 60

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface TranslateRequest {
  documentContent: string
  targetLanguage: string
  sourceLanguage?: string
}

const SUPPORTED_LANGUAGES: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'zh': 'Chinese (Simplified)',
  'ja': 'Japanese',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'ko': 'Korean',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'tr': 'Turkish',
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TranslateRequest
    const { documentContent, targetLanguage, sourceLanguage = 'en' } = body

    if (!documentContent || !targetLanguage) {
      return NextResponse.json(
        { error: 'Document content and target language required' },
        { status: 400 }
      )
    }

    if (!SUPPORTED_LANGUAGES[targetLanguage]) {
      return NextResponse.json(
        {
          error: 'Unsupported language',
          supportedLanguages: SUPPORTED_LANGUAGES,
        },
        { status: 400 }
      )
    }

    console.log(`[v0] Translator - Translating to ${targetLanguage} with OpenAI`)

    const translation = await generateTranslationWithOpenAI(documentContent, targetLanguage, sourceLanguage)

    return NextResponse.json({
      success: true,
      translation,
      sourceLanguage,
      targetLanguage,
      targetLanguageName: SUPPORTED_LANGUAGES[targetLanguage],
      originalLength: documentContent.length,
      translationLength: translation.length,
      tokensUsed: estimateTokens(documentContent + translation),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Translate API error:', error)
    return NextResponse.json(
      {
        error: 'Translation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * OpenAI integration for document translation
 * Supports 15+ languages with context preservation
 */
async function generateTranslationWithOpenAI(
  content: string,
  targetLanguage: string,
  sourceLanguage: string
): Promise<string> {
  try {
    const targetLangName = SUPPORTED_LANGUAGES[targetLanguage]
    const sourceLangName = SUPPORTED_LANGUAGES[sourceLanguage]

    const prompt = `Please translate the following document from ${sourceLangName} to ${targetLangName}. 
Preserve all formatting, structure, and technical terms.
Provide only the translation without any explanations or meta-commentary.

Document to translate:

${content.substring(0, 3500)}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: Math.min(content.length, 4000),
    })

    const translation = completion.choices[0].message.content || 'Unable to generate translation'
    console.log('[v0] OpenAI translation completed successfully')
    return translation
  } catch (error) {
    console.error('[v0] OpenAI API error:', error)
    throw error
  }
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}
