/**
 * AI Tool Framework - Unified interface for all AI-powered tools
 * Supports: Chat, Summarization, Translation, Analysis, Generation
 */

export type AIToolType = 
  | 'chat'
  | 'summarize'
  | 'translate'
  | 'extract'
  | 'analyze'
  | 'generate'
  | 'research'
  | 'write'
  | 'ocr'

export interface AIToolRequest {
  type: AIToolType
  fileContent: string
  userInput?: string
  language?: string
  options?: Record<string, any>
}

export interface AIToolResponse {
  success: boolean
  result?: string
  error?: string
  tokens?: number
  processingTime?: number
}

export interface AIToolConfig {
  name: string
  description: string
  type: AIToolType
  supportedFormats: string[]
  maxFileSize: number // in bytes
  requiresUserInput: boolean
  supportedLanguages?: string[]
}

// Standard AI tool configurations
export const AI_TOOLS_CONFIG: Record<string, AIToolConfig> = {
  'pdf-chat': {
    name: 'PDF Chat',
    description: 'Ask questions about your PDF documents',
    type: 'chat',
    supportedFormats: ['pdf', 'docx', 'txt'],
    maxFileSize: 50 * 1024 * 1024, // 50MB
    requiresUserInput: true,
  },
  'pdf-summarizer': {
    name: 'PDF Summarizer',
    description: 'Generate concise summaries of long documents',
    type: 'summarize',
    supportedFormats: ['pdf', 'docx', 'txt'],
    maxFileSize: 50 * 1024 * 1024,
    requiresUserInput: false,
  },
  'pdf-translator': {
    name: 'PDF Translator',
    description: 'Translate documents to multiple languages',
    type: 'translate',
    supportedFormats: ['pdf', 'docx', 'txt'],
    maxFileSize: 30 * 1024 * 1024, // 30MB
    requiresUserInput: true,
    supportedLanguages: ['es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'],
  },
  'pdf-research-assistant': {
    name: 'Research Assistant',
    description: 'Extract and analyze research from PDFs',
    type: 'research',
    supportedFormats: ['pdf', 'docx'],
    maxFileSize: 50 * 1024 * 1024,
    requiresUserInput: true,
  },
  'text-extractor': {
    name: 'Text Extractor',
    description: 'Extract text and metadata from documents',
    type: 'extract',
    supportedFormats: ['pdf', 'docx', 'xlsx', 'pptx'],
    maxFileSize: 100 * 1024 * 1024,
    requiresUserInput: false,
  },
}

/**
 * Validate file for AI processing
 */
export function validateAIFile(
  file: File,
  toolType: AIToolType
): { valid: boolean; error?: string } {
  const config = Object.values(AI_TOOLS_CONFIG).find(c => c.type === toolType)
  
  if (!config) {
    return { valid: false, error: 'Tool not configured' }
  }

  // Check file size
  if (file.size > config.maxFileSize) {
    return {
      valid: false,
      error: `File size exceeds ${config.maxFileSize / (1024 * 1024)}MB limit`,
    }
  }

  // Check file format
  const ext = file.name.split('.').pop()?.toLowerCase()
  const supportedExt = config.supportedFormats
  
  if (!supportedExt.includes(ext || '')) {
    return {
      valid: false,
      error: `File format not supported. Supported: ${supportedExt.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Extract file content based on type
 * In production, use specialized libraries:
 * - PDF: pdf-parse, pdfjs-dist
 * - DOCX: mammoth, docx
 * - XLSX: xlsx
 * - PPTX: pptxjs
 */
export async function extractFileContent(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase()

  try {
    if (ext === 'txt') {
      return await file.text()
    } else if (ext === 'pdf') {
      // In production, use proper PDF parsing
      return `[PDF Document: ${file.name}]\n[Content would be extracted here with pdf-parse or similar library]\n[File size: ${(file.size / 1024).toFixed(2)} KB]`
    } else if (ext === 'docx') {
      // In production, use mammoth or similar
      return `[Word Document: ${file.name}]\n[Content would be extracted here with mammoth library]\n[File size: ${(file.size / 1024).toFixed(2)} KB]`
    } else {
      return `[Document: ${file.name}]\n[File size: ${(file.size / 1024).toFixed(2)} KB]`
    }
  } catch (err) {
    throw new Error(`Failed to extract content: ${err instanceof Error ? err.message : 'Unknown error'}`)
  }
}

/**
 * Format AI response for display
 */
export function formatAIResponse(response: string): string {
  return response
    .trim()
    .split('\n')
    .filter(line => line.trim())
    .join('\n\n')
}

/**
 * Estimate tokens for AI API (rough estimate: 1 token ≈ 4 chars)
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * Log AI tool usage for analytics
 */
export interface AIToolUsageLog {
  toolType: AIToolType
  fileName: string
  fileSize: number
  tokens: number
  timestamp: Date
  status: 'success' | 'error'
  errorMessage?: string
}

export function logAIToolUsage(log: AIToolUsageLog): void {
  console.log('[v0] AI Tool Usage:', {
    tool: log.toolType,
    file: log.fileName,
    size: `${(log.fileSize / 1024).toFixed(2)} KB`,
    tokens: log.tokens,
    status: log.status,
    error: log.errorMessage,
    time: log.timestamp.toISOString(),
  })
}
