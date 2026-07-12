import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Lazy load components for better performance
const AIChatPdfTool = dynamic(() => import('@/components/tools/ai-chat-pdf-tool'));

const AISummaryTool = dynamic(() => import('@/components/tools/ai-summary-tool'));

const AITranslateTool = dynamic(() => import('@/components/tools/ai-translate-tool'));

const AIResearchTool = dynamic(() => import('@/components/tools/ai-research-tool'));

const AIRewriteTool = dynamic(() => import('@/components/tools/ai-rewrite-tool'));

export interface AIToolConfig {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'chat' | 'translation' | 'summarization' | 'research' | 'rewriting' | 'extraction';
  component: ComponentType;
  keywords: string[];
  featured: boolean;
}

// Comprehensive AI Tools Mapping
export const AI_TOOLS_MAPPING: AIToolConfig[] = [
  // Chat Tools
  {
    id: 'ai-chat-pdf',
    slug: 'ai-chat-pdf',
    name: 'AI Chat PDF',
    description: 'Have intelligent conversations with your PDFs. Ask questions and get instant answers.',
    category: 'chat',
    component: AIChatPdfTool,
    keywords: ['chat', 'pdf', 'conversation', 'questions', 'ai'],
    featured: true,
  },
  {
    id: 'ai-document-chat',
    slug: 'ai-document-chat',
    name: 'AI Document Chat',
    description: 'Chat with any document format. Extract information through natural conversation.',
    category: 'chat',
    component: AIChatPdfTool,
    keywords: ['document', 'chat', 'conversation', 'extraction'],
    featured: true,
  },
  {
    id: 'ai-chat-large-pdf',
    slug: 'ai-chat-large-pdf',
    name: 'AI Chat Large PDF',
    description: 'Handle large PDF files with advanced AI chat capabilities.',
    category: 'chat',
    component: AIChatPdfTool,
    keywords: ['large', 'pdf', 'chat', 'big files'],
    featured: false,
  },
  {
    id: 'ai-chat-scanned-pdf',
    slug: 'ai-chat-scanned-pdf',
    name: 'AI Chat Scanned PDF',
    description: 'Chat with scanned PDFs using OCR and AI understanding.',
    category: 'chat',
    component: AIChatPdfTool,
    keywords: ['scanned', 'ocr', 'pdf', 'chat'],
    featured: false,
  },
  {
    id: 'ai-chat-pdf-without-login',
    slug: 'ai-chat-pdf-without-login',
    name: 'AI Chat PDF - No Login',
    description: 'Start chatting with PDFs instantly without creating an account.',
    category: 'chat',
    component: AIChatPdfTool,
    keywords: ['chat', 'pdf', 'no login', 'free', 'instant'],
    featured: true,
  },

  // Translation Tools
  {
    id: 'ai-document-translation-tool',
    slug: 'ai-document-translation-tool',
    name: 'AI Document Translator',
    description: 'Translate documents into multiple languages with AI precision.',
    category: 'translation',
    component: AITranslateTool,
    keywords: ['translate', 'translation', 'language', 'document'],
    featured: true,
  },
  {
    id: 'ai-ocr-pdf-translator',
    slug: 'ai-ocr-pdf-translator',
    name: 'AI OCR PDF Translator',
    description: 'Extract text from scanned PDFs and translate to any language.',
    category: 'translation',
    component: AITranslateTool,
    keywords: ['ocr', 'translate', 'scanned', 'pdf'],
    featured: false,
  },
  {
    id: 'ai-document-translator',
    slug: 'ai-document-translator',
    name: 'AI Document Translator Pro',
    description: 'Professional document translation with formatting preservation.',
    category: 'translation',
    component: AITranslateTool,
    keywords: ['translation', 'professional', 'document', 'format'],
    featured: false,
  },

  // Summarization Tools
  {
    id: 'ai-document-summarizer',
    slug: 'ai-document-summarizer',
    name: 'AI Document Summarizer',
    description: 'Generate intelligent summaries of your documents in seconds.',
    category: 'summarization',
    component: AISummaryTool,
    keywords: ['summary', 'summarization', 'document', 'condense'],
    featured: true,
  },
  {
    id: 'ai-file-summarizer',
    slug: 'ai-file-summarizer',
    name: 'AI File Summarizer',
    description: 'Quickly summarize any file type with advanced AI algorithms.',
    category: 'summarization',
    component: AISummaryTool,
    keywords: ['summarize', 'file', 'summary', 'quick'],
    featured: false,
  },

  // Research Tools
  {
    id: 'ai-academic-research-assistant',
    slug: 'ai-academic-research-assistant',
    name: 'AI Academic Research Assistant',
    description: 'Analyze academic papers and research documents with AI.',
    category: 'research',
    component: AIResearchTool,
    keywords: ['research', 'academic', 'analysis', 'paper'],
    featured: true,
  },
  {
    id: 'ai-dissertation-assistant',
    slug: 'ai-dissertation-assistant',
    name: 'AI Dissertation Assistant',
    description: 'AI-powered support for dissertation research and analysis.',
    category: 'research',
    component: AIResearchTool,
    keywords: ['dissertation', 'research', 'academic', 'thesis'],
    featured: false,
  },
  {
    id: 'ai-document-research-assistant',
    slug: 'ai-document-research-assistant',
    name: 'AI Document Research Assistant',
    description: 'Extract research insights from any document quickly.',
    category: 'research',
    component: AIResearchTool,
    keywords: ['research', 'document', 'analysis', 'insights'],
    featured: false,
  },
  {
    id: 'ai-journal-research-assistant',
    slug: 'ai-journal-research-assistant',
    name: 'AI Journal Research Assistant',
    description: 'Analyze journal articles and extract key research findings.',
    category: 'research',
    component: AIResearchTool,
    keywords: ['journal', 'research', 'article', 'findings'],
    featured: false,
  },

  // Rewriting Tools
  {
    id: 'ai-document-rewriter',
    slug: 'ai-document-rewriter',
    name: 'AI Document Rewriter',
    description: 'Rewrite documents in different tones and styles using AI.',
    category: 'rewriting',
    component: AIRewriteTool,
    keywords: ['rewrite', 'document', 'style', 'tone'],
    featured: true,
  },

  // OCR Tools
  {
    id: 'ai-ocr',
    slug: 'ai-ocr',
    name: 'AI OCR Tool',
    description: 'Extract text from scanned documents and images with AI.',
    category: 'extraction',
    component: AIChatPdfTool,
    keywords: ['ocr', 'text extraction', 'scanned', 'image'],
    featured: false,
  },
];

// Get tool config by slug
export function getAIToolConfig(slug: string): AIToolConfig | undefined {
  return AI_TOOLS_MAPPING.find((tool) => tool.slug === slug);
}

// Get tools by category
export function getAIToolsByCategory(category: AIToolConfig['category']): AIToolConfig[] {
  return AI_TOOLS_MAPPING.filter((tool) => tool.category === category);
}

// Get featured tools
export function getFeaturedAITools(): AIToolConfig[] {
  return AI_TOOLS_MAPPING.filter((tool) => tool.featured);
}

// Get all slugs for static generation
export function getAllAIToolSlugs(): string[] {
  return AI_TOOLS_MAPPING.map((tool) => tool.slug);
}

// Search tools by keyword
export function searchAITools(query: string): AIToolConfig[] {
  const lowerQuery = query.toLowerCase();
  return AI_TOOLS_MAPPING.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  );
}

// Get related tools
export function getRelatedAITools(slug: string, limit: number = 3): AIToolConfig[] {
  const tool = getAIToolConfig(slug);
  if (!tool) return [];

  return AI_TOOLS_MAPPING.filter(
    (t) =>
      t.slug !== slug &&
      (t.category === tool.category || t.keywords.some((k) => tool.keywords.includes(k)))
  ).slice(0, limit);
}
