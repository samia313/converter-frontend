import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

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

    console.log('[v0] PDF Summarizer - Generating summary')

    const summary = generateSummary(documentContent, summaryLength)

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
 * Framework implementation for summarization
 * In production, use extractive/abstractive summarization
 */
function generateSummary(
  content: string,
  length: 'short' | 'medium' | 'long'
): string {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)

  let summaryLength: number
  switch (length) {
    case 'short':
      summaryLength = Math.ceil(sentences.length * 0.2)
      break
    case 'long':
      summaryLength = Math.ceil(sentences.length * 0.6)
      break
    case 'medium':
    default:
      summaryLength = Math.ceil(sentences.length * 0.4)
  }

  const summary = sentences
    .slice(0, Math.min(summaryLength, sentences.length))
    .map(s => s.trim())
    .filter(s => s.length > 10)
    .join('. ')

  return `DOCUMENT SUMMARY
${'='.repeat(50)}

Original Length: ${content.length} characters
Summarization Level: ${length}
Sentences Selected: ${Math.min(summaryLength, sentences.length)} of ${sentences.length}

SUMMARY:
${summary || 'Content summary framework ready for LLM integration'}

For Production Enhancement:
1. Use OpenAI Completions API for abstractive summaries
2. Claude API for better context understanding
3. Google PaLM for multilingual summaries
4. Implement extractive + abstractive hybrid

Current Status: Framework ready with sentence extraction`
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}
