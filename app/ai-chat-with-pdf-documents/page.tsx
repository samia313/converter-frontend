import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat with PDF Documents - Smart Document Interaction | PDFilio',
  description: 'Chat with PDF documents using advanced AI. Multi-document analysis and comprehensive document understanding.',
  keywords: 'chat pdf documents, document chat, multiple pdf analysis, document interaction',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Chat with PDF Documents"
      toolSlug="ai-chat-with-pdf-documents"
      description="Analyze multiple PDF documents through AI conversation. Compare, contrast, and understand your complete document collection."
      mainContent={`Work with multiple documents at once. Compare reports, analyze collections, and understand relationships between documents through smart conversation.

Multi-Document Analysis:
- Upload multiple PDFs
- Chat about all documents
- Cross-document comparison
- Relationship analysis
- Complete collection understanding
- Integrated conversations
- Comprehensive analysis
- Collection intelligence

Compare and Contrast:
Ask questions that span multiple documents. "Compare these reports" or "What's different between these documents" - the AI understands all of them.

Document Collections:
Perfect for managing related documents. Annual reports, research collections, contract files - chat with the entire collection as one integrated system.`}
      features={[
        'Multi-document support',
        'Cross-document chat',
        'Comparison analysis',
        'Collection understanding',
        'Integrated conversations',
        'Relationship analysis',
        'Group document analysis',
        'Comprehensive collection chat',
      ]}
      benefits={[
        'Compare documents easily',
        'Understand relationships',
        'Comprehensive analysis',
        'Efficient collaboration',
        'Collection insights',
        'Time efficient',
        'Better understanding',
        'Integrated analysis',
      ]}
      useCase={[
        'Multi-report analysis',
        'Document comparison',
        'Research collection analysis',
        'Contract review',
        'Document relationships',
        'Collection intelligence',
        'Integrated workflows',
        'Comprehensive understanding',
        'Multiple document projects',
        'Collection management',
      ].join('\n')}
      testimonials={[
        {
          name: 'Jennifer Lee',
          role: 'Legal Analyst',
          text: 'Comparing multiple contracts used to be tedious. Now I chat with all of them at once. Relationships and differences are obvious.',
        },
        {
          name: 'Prof. David Hansen',
          role: 'Research Professor',
          text: 'Analyzing related papers together is powerful. The AI understands the collection as a whole.',
        },
      ]}
      faqs={[
        {
          q: 'Can I upload multiple PDFs?',
          a: 'Yes! Upload as many as you need and chat with the entire collection.',
        },
        {
          q: 'Does it compare documents?',
          a: 'Absolutely. Ask it to compare, contrast, or analyze relationships between documents.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Chat with Large PDF', slug: 'chat-large-pdf' },
      ]}
      primaryKeyword="AI chat with PDF documents"
      secondaryKeywords={['document chat', 'multiple pdf analysis']}
    />
  );
}
