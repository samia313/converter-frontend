import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

export const maxDuration = 60

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface SummarizeRequest {
  documentContent: string
  summaryLength?: 'short' | 'medium' | 'long'
  language?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SummarizeRequest
    const { documentContent, summaryLength = 'medium', language = 'en' } = body

    if (!documentContent) {
      return NextResponse.json(
        { error: 'Document content required' },
        { status: 400 }
      )
    }

    console.log('[v0] PDF Summarizer - Generating summary with OpenAI')

    const summary = await generateSummaryWithOpenAI(documentContent, summaryLength)

    return NextResponse.json({
      success: true,
      summary,
      originalLength: documentContent.length,
      summaryLength: summary.length,
      compressionRatio: `${((1 - summary.length / documentContent.length) * 100).toFixed(1)}%`,
      tokensUsed: estimateTokens(documentContent + summary),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Summarize API error:', error)
    return NextResponse.json(
      {
        error: 'Summarization failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * OpenAI integration for PDF Summarization
 * Uses GPT-3.5-turbo for abstractive summarization
 */
async function generateSummaryWithOpenAI(
  content: string,
  length: 'short' | 'medium' | 'long'
): Promise<string> {
  try {
    const lengthInstructions = {
      short: '100-150 words',
      medium: '200-300 words',
      long: '400-500 words',
    }

    const prompt = `Please provide a clear and concise ${length} summary (${lengthInstructions[length]}) of the following document:

${content.substring(0, 4000)}

Focus on the main points and key takeaways.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: length === 'short' ? 200 : length === 'medium' ? 400 : 600,
    })

    const summary = completion.choices[0].message.content || 'Unable to generate summary'
    console.log('[v0] OpenAI summary generated successfully')
    return summary
  } catch (error) {
    console.error('[v0] OpenAI API error:', error)
    throw error
  }
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}
