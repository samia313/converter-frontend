import { enforceRateLimit } from '@/lib/rate-limit';
import { readJsonObject, validateStringField } from '@/lib/api-input-validation';
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

let openai: any = null

// Initialize OpenAI client only if API key is available
if (process.env.OPENAI_API_KEY) {
  const { OpenAI } = require('openai')
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

interface ChatRequest {
  query: string
  documentContent: string
  context?: string
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'ai', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API is not configured' },
        { status: 503 }
      )
    }

    const bodyResult = await readJsonObject(request, 1_000_000)

    if (!bodyResult.valid) {
      return NextResponse.json(
        { error: bodyResult.error },
        { status: bodyResult.error.includes('too large') ? 413 : 400 }
      )
    }

    const queryResult = validateStringField(
      bodyResult.data.query,
      'Query',
      5_000
    )

    const documentResult = validateStringField(
      bodyResult.data.documentContent,
      'Document content',
      200_000
    )

    const contextResult = validateStringField(
      bodyResult.data.context,
      'Context',
      5_000,
      { required: false }
    )

    if (!queryResult.valid) {
      return NextResponse.json(
        { error: queryResult.error },
        { status: 400 }
      )
    }

    if (!documentResult.valid) {
      return NextResponse.json(
        { error: documentResult.error },
        { status: 400 }
      )
    }

    if (!contextResult.valid) {
      return NextResponse.json(
        { error: contextResult.error },
        { status: 400 }
      )
    }

    const query = queryResult.data
    const documentContent = documentResult.data
    const context = contextResult.data

    // Call OpenAI API
    const response = await generateChatResponseWithOpenAI(query, documentContent, context)

    return NextResponse.json({
      success: true,
      response,
      tokensUsed: estimateTokens(query + documentContent + response),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[AI] Chat request failed')
    return NextResponse.json(
      { error: 'Chat processing failed. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * OpenAI integration for PDF Chat
 * Uses GPT-3.5-turbo for document analysis and Q&A
 */
async function generateChatResponseWithOpenAI(
  query: string,
  documentContent: string,
  context?: string
): Promise<string> {
  try {
    const systemPrompt = `You are a helpful AI assistant specialized in analyzing PDF documents. 
Your task is to answer questions about the provided document content accurately and helpfully.
Keep your responses concise and relevant to the query.
${context ? `Additional context: ${context}` : ''}`

    const userMessage = `Document Content:
${documentContent.substring(0, 3000)}

Question: ${query}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0].message.content || 'Unable to generate response'
    console.log('[v0] OpenAI response generated successfully')
    return response
  } catch (error) {
    console.error('[AI] OpenAI request failed')
    throw error
  }
}

function extractDocumentContext(content: string): string {
  const lines = content.split('\n').filter(l => l.trim())
  const summary = lines.slice(0, 5).join('\n')
  return summary || 'Document content processed'
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4) // Rough estimate
}
