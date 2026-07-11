/**
 * AI Tools Mapping Configuration
 * Maps all 79+ AI tool pages to their corresponding components and categories
 */

export type AIToolCategory = 'chat' | 'translate' | 'summarize' | 'research' | 'extract' | 'enhance';

export interface AIToolConfig {
  slug: string;
  name: string;
  description: string;
  category: AIToolCategory;
  component: string;
  keywords: string[];
}

export const AI_TOOLS_MAPPING: AIToolConfig[] = [
  // Chat Tools (Query and Discuss PDF Content)
  {
    slug: 'ai-chat-pdf',
    name: 'AI Chat PDF',
    description: 'Chat with your PDF documents and get instant answers',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['chat', 'pdf', 'questions', 'discuss', 'ai assistant'],
  },
  {
    slug: 'ai-chat-large-pdf',
    name: 'Chat with Large PDF',
    description: 'Handle large PDF files with AI-powered conversation',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['large pdf', 'chat', 'big files'],
  },
  {
    slug: 'ai-chat-pdf-without-login',
    name: 'Chat PDF No Login',
    description: 'Chat with PDF without creating an account',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['chat', 'pdf', 'no login', 'free'],
  },
  {
    slug: 'ai-chat-pdf-without-signup',
    name: 'Chat PDF No Signup',
    description: 'Start chatting with your PDF immediately',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['chat', 'pdf', 'instant access'],
  },
  {
    slug: 'ai-chat-scanned-pdf',
    name: 'Chat Scanned PDF',
    description: 'Chat with scanned documents using OCR technology',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['scanned', 'ocr', 'chat', 'images'],
  },
  {
    slug: 'ai-chat-with-pdf-documents',
    name: 'Chat with PDF Documents',
    description: 'Interactive conversations with multiple PDF files',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['chat', 'multiple pdfs', 'documents'],
  },
  {
    slug: 'ai-document-chat',
    name: 'Document Chat AI',
    description: 'AI-powered document conversation tool',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['document', 'chat', 'ai'],
  },
  {
    slug: 'ai-document-chat-tool',
    name: 'Document Chat Tool',
    description: 'Advanced document chatting capabilities',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['document', 'chat', 'tool'],
  },
  {
    slug: 'ai-pdf-chat',
    name: 'PDF Chat',
    description: 'Simple and powerful PDF chat interface',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['pdf', 'chat', 'simple'],
  },
  {
    slug: 'ai-pdf-chat-assistant',
    name: 'PDF Chat Assistant',
    description: 'Your personal PDF assistant',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['pdf', 'assistant', 'chat'],
  },
  {
    slug: 'ai-pdf-question-answer',
    name: 'PDF Q&A',
    description: 'Ask questions and get answers from PDFs',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['pdf', 'questions', 'answers'],
  },
  {
    slug: 'ai-pdf-reader',
    name: 'AI PDF Reader',
    description: 'Intelligent PDF reading and analysis',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['pdf', 'reader', 'analysis'],
  },
  {
    slug: 'ai-pdf-reader-chat',
    name: 'PDF Reader Chat',
    description: 'Read and discuss PDF content',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['pdf', 'reader', 'chat'],
  },
  {
    slug: 'ai-research-pdf-chat',
    name: 'Research PDF Chat',
    description: 'Specialized for research paper analysis',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['research', 'papers', 'chat'],
  },
  {
    slug: 'talk-to-pdf',
    name: 'Talk to PDF',
    description: 'Conversational PDF interaction',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['talk', 'conversation', 'pdf'],
  },
  {
    slug: 'upload-pdf-and-chat',
    name: 'Upload PDF and Chat',
    description: 'Upload and instantly chat with your PDF',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['upload', 'chat', 'pdf'],
  },
  {
    slug: 'upload-pdf-chat-ai',
    name: 'Upload PDF Chat AI',
    description: 'Upload PDF and use AI for conversations',
    category: 'chat',
    component: 'PDFChatTool',
    keywords: ['upload', 'chat', 'ai'],
  },

  // Translation Tools
  {
    slug: 'ai-document-translation-tool',
    name: 'Document Translation Tool',
    description: 'Translate documents into multiple languages',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['translate', 'document', 'languages'],
  },
  {
    slug: 'ai-document-translator',
    name: 'Document Translator',
    description: 'Professional document translation',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['translate', 'document'],
  },
  {
    slug: 'ai-ocr-pdf-translator',
    name: 'OCR PDF Translator',
    description: 'Translate scanned PDFs with OCR',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['ocr', 'translate', 'scanned'],
  },
  {
    slug: 'ai-pdf-translation',
    name: 'PDF Translation',
    description: 'Fast and accurate PDF translation',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['pdf', 'translation'],
  },
  {
    slug: 'ai-pdf-translation-tool',
    name: 'PDF Translation Tool',
    description: 'Dedicated PDF translation solution',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['pdf', 'translation', 'tool'],
  },
  {
    slug: 'ai-pdf-translator',
    name: 'PDF Translator',
    description: 'Simple PDF to any language translator',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['pdf', 'translator'],
  },
  {
    slug: 'translate-pdf-online',
    name: 'Translate PDF Online',
    description: 'Online PDF translation service',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['translate', 'pdf', 'online'],
  },
  {
    slug: 'translate-pdf-with-ai',
    name: 'Translate PDF with AI',
    description: 'AI-powered PDF translation',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['translate', 'pdf', 'ai'],
  },
  {
    slug: 'translate-pdf-without-formatting-loss',
    name: 'Translate PDF (Format Preserved)',
    description: 'Translate while preserving formatting',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['translate', 'pdf', 'formatting'],
  },
  {
    slug: 'translate-scanned-pdf',
    name: 'Translate Scanned PDF',
    description: 'Translate scanned documents',
    category: 'translate',
    component: 'PDFTranslatorTool',
    keywords: ['translate', 'scanned', 'pdf'],
  },

  // Summarization Tools
  {
    slug: 'ai-document-summarizer',
    name: 'Document Summarizer',
    description: 'Summarize documents into key points',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['summarize', 'document', 'summary'],
  },
  {
    slug: 'ai-file-summarizer',
    name: 'File Summarizer',
    description: 'Summarize any file format',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['summarize', 'file'],
  },
  {
    slug: 'ai-pdf-summary',
    name: 'PDF Summary',
    description: 'Get quick summaries of PDF files',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['pdf', 'summary'],
  },
  {
    slug: 'ai-pdf-summary-tool',
    name: 'PDF Summary Tool',
    description: 'Advanced PDF summarization',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['pdf', 'summary', 'tool'],
  },
  {
    slug: 'ai-report-summarizer',
    name: 'Report Summarizer',
    description: 'Summarize business and research reports',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['report', 'summarize', 'business'],
  },
  {
    slug: 'ai-research-summary-assistant',
    name: 'Research Summary Assistant',
    description: 'Summarize research papers and documents',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['research', 'summary', 'papers'],
  },
  {
    slug: 'study-pdf-summarizer',
    name: 'Study PDF Summarizer',
    description: 'Summarize study materials and textbooks',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['study', 'summarize', 'textbook'],
  },
  {
    slug: 'summarize-pdf-online',
    name: 'Summarize PDF Online',
    description: 'Online PDF summarization service',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['summarize', 'pdf', 'online'],
  },

  // Research Tools
  {
    slug: 'ai-academic-research-assistant',
    name: 'Academic Research Assistant',
    description: 'Help with academic research and papers',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['research', 'academic', 'papers'],
  },
  {
    slug: 'ai-dissertation-assistant',
    name: 'Dissertation Assistant',
    description: 'Support for dissertation research',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['dissertation', 'research', 'academic'],
  },
  {
    slug: 'ai-document-research-assistant',
    name: 'Document Research Assistant',
    description: 'Research through documents',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['document', 'research', 'assistant'],
  },
  {
    slug: 'ai-journal-research-assistant',
    name: 'Journal Research Assistant',
    description: 'Analyze journal articles and papers',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['journal', 'research', 'articles'],
  },
  {
    slug: 'ai-research-analysis-tool',
    name: 'Research Analysis Tool',
    description: 'Comprehensive research analysis',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['research', 'analysis', 'tool'],
  },
  {
    slug: 'ai-research-assistant',
    name: 'Research Assistant',
    description: 'General research assistance',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['research', 'assistant'],
  },
  {
    slug: 'ai-research-assistant-without-login',
    name: 'Research Assistant (No Login)',
    description: 'Research assistant without login',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['research', 'assistant', 'no login'],
  },
  {
    slug: 'ai-research-assistant-without-signup',
    name: 'Research Assistant (Instant)',
    description: 'Instant research assistance',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['research', 'instant', 'free'],
  },
  {
    slug: 'ai-research-writing-assistant',
    name: 'Research Writing Assistant',
    description: 'Help with research writing and composition',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['research', 'writing', 'assistant'],
  },
  {
    slug: 'ai-study-research-assistant',
    name: 'Study Research Assistant',
    description: 'Support for study and research',
    category: 'research',
    component: 'ResearchAssistantTool',
    keywords: ['study', 'research', 'assistant'],
  },

  // OCR and Text Extraction
  {
    slug: 'ai-ocr',
    name: 'AI OCR Tool',
    description: 'Extract text from images and scanned documents',
    category: 'extract',
    component: 'PDFChatTool', // Uses chat for interaction
    keywords: ['ocr', 'text extraction', 'images'],
  },

  // Document Enhancement/Rewriting
  {
    slug: 'ai-document-rewriter',
    name: 'Document Rewriter',
    description: 'Rewrite and enhance document content',
    category: 'enhance',
    component: 'PDFChatTool',
    keywords: ['rewrite', 'enhance', 'document'],
  },

  // Resume Builder
  {
    slug: 'ai-resume-builder',
    name: 'AI Resume Builder',
    description: 'Build and optimize your resume with AI',
    category: 'enhance',
    component: 'PDFChatTool',
    keywords: ['resume', 'builder', 'ai'],
  },

  // General Summary
  {
    slug: 'ai-summary',
    name: 'AI Summary Tool',
    description: 'General purpose AI summarization',
    category: 'summarize',
    component: 'PDFSummarizerTool',
    keywords: ['summary', 'ai', 'general'],
  },

  // Test routes
  {
    slug: 'test-compress',
    name: 'Test Compress',
    description: 'Test compression tool',
    category: 'extract',
    component: 'PDFChatTool',
    keywords: ['test', 'compress'],
  },
];

export const AI_TOOLS_BY_CATEGORY = {
  chat: AI_TOOLS_MAPPING.filter(tool => tool.category === 'chat'),
  translate: AI_TOOLS_MAPPING.filter(tool => tool.category === 'translate'),
  summarize: AI_TOOLS_MAPPING.filter(tool => tool.category === 'summarize'),
  research: AI_TOOLS_MAPPING.filter(tool => tool.category === 'research'),
  extract: AI_TOOLS_MAPPING.filter(tool => tool.category === 'extract'),
  enhance: AI_TOOLS_MAPPING.filter(tool => tool.category === 'enhance'),
};

export function getToolConfig(slug: string): AIToolConfig | undefined {
  return AI_TOOLS_MAPPING.find(tool => tool.slug === slug);
}

export function getComponentForCategory(category: AIToolCategory) {
  switch (category) {
    case 'chat':
      return 'PDFChatTool';
    case 'translate':
      return 'PDFTranslatorTool';
    case 'summarize':
      return 'PDFSummarizerTool';
    case 'research':
      return 'ResearchAssistantTool';
    default:
      return 'PDFChatTool';
  }
}
