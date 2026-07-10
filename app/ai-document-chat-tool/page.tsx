import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Chat Tool - Universal Document Conversation | PDFilio',
  description: 'Chat with any document type. PDFs, Word docs, images, scans - one universal tool.',
  keywords: 'document chat tool, universal document chat, multi-format chat, ai document tool',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Chat Tool"
      toolSlug="ai-document-chat-tool"
      description="Universal document chat. PDFs, Word documents, images, scans - one integrated tool for all document types."
      mainContent={`One tool for all documents. PDF, Word, image, scan - upload any document type and start chatting instantly.

Universal Support:
- PDF documents
- Word documents
- Text files
- Images
- Scanned files
- Mixed formats
- Any document type
- Complete compatibility

Simplified Workflow:
No format switching, no separate tools. Upload any document and chat immediately.

Complete File Support:
Whatever documents you work with, this tool handles them all seamlessly.`}
      features={[
        'Multi-format support',
        'PDF and Word',
        'Image support',
        'Scanned files',
        'Format auto-detection',
        'Universal chat',
        'One integrated tool',
        'Complete compatibility',
      ]}
      benefits={[
        'One tool all formats',
        'Simplified workflow',
        'No format conversion',
        'Complete coverage',
        'Easy integration',
        'Time efficient',
        'Cost effective',
        'Unified solution',
      ]}
      useCase={[
        'Mixed document types',
        'Format diversity',
        'Workflow simplification',
        'Universal needs',
        'Diverse collections',
        'Format flexibility',
        'Integrated workflows',
        'Complete solutions',
        'Multi-format projects',
        'Unified chat',
      ].join('\n')}
      testimonials={[
        {
          name: 'Lisa Garcia',
          role: 'Document Manager',
          text: 'Works with all our document types. PDFs, Word docs, scans - everything works seamlessly.',
        },
        {
          name: 'James Wilson',
          role: 'Project Coordinator',
          text: 'No format switching. One tool for all documents. Simplified our entire workflow.',
        },
      ]}
      faqs={[
        {
          q: 'What formats work?',
          a: 'PDFs, Word documents, text files, images, scans - virtually any document format.',
        },
        {
          q: 'Automatic detection?',
          a: 'Yes, automatically detects and processes any document format.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'AI Document Chat', slug: 'ai-document-chat' },
      ]}
      primaryKeyword="AI document chat tool"
      secondaryKeywords={['universal document chat', 'multi-format tool']}
    />
  );
}
