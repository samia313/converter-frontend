import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

export const maxDuration = 60

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ChatRequest {
  query: string
  documentContent: string
  context?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequest
    const { query, documentContent, context } = body

    if (!query || !documentContent) {
      return NextResponse.json(
        { error: 'Query and document content required' },
        { status: 400 }
      )
    }

    console.log('[v0] PDF Chat - Processing query with OpenAI:', query.substring(0, 50) + '...')

    // Call OpenAI API
    const response = await generateChatResponseWithOpenAI(query, documentContent, context)

    return NextResponse.json({
      success: true,
      response,
      tokensUsed: estimateTokens(query + documentContent + response),
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    return NextResponse.json(
      {
        error: 'Chat processing failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
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
    console.error('[v0] OpenAI API error:', error)
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
