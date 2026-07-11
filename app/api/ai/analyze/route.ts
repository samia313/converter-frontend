import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { content, analysisType } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'Missing content field' },
        { status: 400 }
      )
    }

    const analysis = await analyzeContent(content, analysisType || 'general')

    return NextResponse.json({
      success: true,
      analysis,
      contentLength: content.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Analyze API error:', error)
    return NextResponse.json(
      { error: 'Analysis failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function analyzeContent(content: string, type: string) {
  switch (type) {
    case 'sentiment':
      return analyzeSentiment(content)
    case 'readability':
      return analyzeReadability(content)
    case 'structure':
      return analyzeStructure(content)
    case 'general':
    default:
      return analyzeGeneral(content)
  }
}

function analyzeSentiment(text: string) {
  // Simple sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'best', 'love', 'awesome']
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'poor', 'fail']

  const lowerText = text.toLowerCase()
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length

  let sentiment = 'neutral'
  if (positiveCount > negativeCount) sentiment = 'positive'
  if (negativeCount > positiveCount) sentiment = 'negative'

  return {
    sentiment,
    positiveWordCount: positiveCount,
    negativeWordCount: negativeCount,
    confidence: Math.min(100, (Math.max(positiveCount, negativeCount) / 10) * 100),
  }
}

function analyzeReadability(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const longWords = words.filter(w => w.length > 7).length

  const avgWordsPerSentence = Math.round(words.length / Math.max(sentences.length, 1))
  const fleschReadingEase = Math.max(0, Math.min(100, 206.835 - 1.015 * avgWordsPerSentence - 84.6 * (longWords / Math.max(words.length, 1))))

  let difficulty = 'Easy'
  if (fleschReadingEase < 30) difficulty = 'Very Difficult'
  else if (fleschReadingEase < 50) difficulty = 'Difficult'
  else if (fleschReadingEase < 60) difficulty = 'Moderate'
  else if (fleschReadingEase < 70) difficulty = 'Fairly Easy'
  else difficulty = 'Very Easy'

  return {
    fleschReadingEase: Math.round(fleschReadingEase),
    difficulty,
    averageWordsPerSentence: avgWordsPerSentence,
    longWordPercentage: Math.round((longWords / Math.max(words.length, 1)) * 100),
  }
}

function analyzeStructure(text: string) {
  const lines = text.split('\n')
  const headings = lines.filter(l => l.startsWith('#')).length
  const lists = lines.filter(l => l.match(/^[\-\*\+]\s/)).length
  const codeBlocks = (text.match(/```/g) || []).length / 2

  return {
    totalLines: lines.length,
    headings,
    listItems: lists,
    codeBlocks,
    hasStructure: headings > 0 || lists > 0,
  }
}

function analyzeGeneral(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0)
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const uniqueWords = new Set(words.map(w => w.toLowerCase()))

  return {
    textLength: text.length,
    wordCount: words.length,
    uniqueWords: uniqueWords.size,
    vocabularyDiversity: Math.round((uniqueWords.size / Math.max(words.length, 1)) * 100),
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    averageWordLength: Math.round(text.replace(/\s/g, '').length / Math.max(words.length, 1)),
    estimatedReadingTime: Math.ceil(words.length / 200),
  }
}
