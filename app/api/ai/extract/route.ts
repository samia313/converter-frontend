import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { text, extractionType } = await request.json()

    if (!text || !extractionType) {
      return NextResponse.json(
        { error: 'Missing required fields: text, extractionType' },
        { status: 400 }
      )
    }

    const extracted = await extractInformation(text, extractionType)

    return NextResponse.json({
      success: true,
      extracted,
      extractionType,
      textLength: text.length,
    })
  } catch (error) {
    console.error('[v0] Extract API error:', error)
    return NextResponse.json(
      { error: 'Extraction failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function extractInformation(text: string, type: string): Promise<Record<string, any>> {
  switch (type) {
    case 'entities':
      return extractEntities(text)
    case 'keywords':
      return extractKeywords(text)
    case 'summary':
      return extractSummary(text)
    case 'metadata':
      return extractMetadata(text)
    default:
      return extractEntities(text)
  }
}

function extractEntities(text: string) {
  // Basic entity extraction
  const emails = text.match(/[\w\.-]+@[\w\.-]+\.\w+/g) || []
  const urls = text.match(/https?:\/\/[^\s]+/g) || []
  const numbers = text.match(/\d+/g) || []

  return {
    emails: [...new Set(emails)],
    urls: [...new Set(urls)],
    numbers: [...new Set(numbers)].slice(0, 10),
  }
}

function extractKeywords(text: string) {
  // Extract common words (basic keyword extraction)
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 4)

  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }))
}

function extractSummary(text: string) {
  // Extract sentences for summary
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  return {
    originalLength: text.length,
    sentenceCount: sentences.length,
    averageSentenceLength: Math.round(text.length / Math.max(sentences.length, 1)),
    firstSentence: sentences[0]?.trim() || '',
  }
}

function extractMetadata(text: string) {
  return {
    characterCount: text.length,
    wordCount: text.split(/\s+/).filter(w => w.length > 0).length,
    lineCount: text.split('\n').length,
    paragraphCount: text.split('\n\n').length,
    estimatedReadingTime: Math.ceil(text.split(/\s+/).length / 200), // words per minute
  }
}
