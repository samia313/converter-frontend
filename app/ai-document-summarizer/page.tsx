import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Summarizer - Universal Document Summary Tool | PDFilio',
  description: 'Summarize any document type with AI. PDFs, Word docs, images - one tool for all document formats.',
  keywords: 'document summarizer AI, universal summarizer, multi-format summarization, document summary',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Summarizer"
      toolSlug="ai-document-summarizer"
      description="Summarize any document type. PDFs, Word documents, images, scans - one AI tool handles all formats."
      mainContent={`Universal document summarization. Not just PDFs. Summarize Word documents, images, scanned files, and any document format.

Multi-Format Support:
- PDF documents
- Word documents
- Text files
- Scanned images
- Photos of documents
- Mixed format documents
- Any document you have
- All in one tool

One Tool for Everything:
No format switching. No separate tools for different file types. Upload any document and get a summary.

Perfect for:
Anyone managing diverse document types. Simplify your workflow with one universal summarization tool.`}
      features={[
        'Multi-format support',
        'Universal compatibility',
        'Any document type',
        'Format auto-detection',
        'Consistent output',
        'One-tool solution',
        'Seamless conversion',
        'Complete flexibility',
      ]}
      benefits={[
        'One tool for all',
        'Simplified workflow',
        'No format limits',
        'Universal access',
        'Time efficient',
        'Unified solution',
        'Easy conversion',
        'Complete coverage',
      ]}
      useCase={[
        'Mixed document types',
        'Diverse file formats',
        'Scanned documents',
        'Email attachments',
        'Photo documents',
        'Legacy formats',
        'Format flexibility',
        'Universal summarization',
      ].join('\n')}
      testimonials={[
        {
          name: 'Sandra Lopez',
          role: 'Office Manager',
          text: 'Finally one tool that handles all our documents. PDFs, Word docs, scans - everything works. Simplified our entire document workflow.',
        },
      ]}
      faqs={[
        {
          q: 'What formats are supported?',
          a: 'PDFs, Word, text files, images, scans - virtually any document format.',
        },
        {
          q: 'Works with scanned documents?',
          a: 'Yes! Includes OCR for scanned images and documents.',
        },
      ]}
      relatedTools={[
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
        { name: 'AI Document Chat', slug: 'ai-document-chat' },
      ]}
      primaryKeyword="AI document summarizer"
      secondaryKeywords={['universal summarizer', 'multi-format summarization']}
    />
  );
}
