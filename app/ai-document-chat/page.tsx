import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Chat - Talk to Any Document Type | PDFilio',
  description: 'Chat with any document type using AI. PDFs, images, scans, and more. One tool for all your document conversations.',
  keywords: 'AI document chat, chat any document, universal document chat, document AI conversation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Chat"
      toolSlug="ai-document-chat"
      description="Chat with any document type. PDFs, scans, images, handwritten notes. One universal tool for all document conversations."
      mainContent="Universal document support. Talk to any document format. PDFs, scans, images, handwritten - all supported in one conversation interface."
      features={['Multi-format support', 'PDF chat', 'Image analysis', 'Scanned documents', 'Handwriting support', 'Universal interface', 'Format flexibility', 'Comprehensive support']}
      benefits={['One tool for all', 'Format flexibility', 'Complete coverage', 'Simpler workflow', 'Universal solution', 'No format switching', 'Integrated experience', 'All documents supported']}
      useCase={['Mixed document types', 'Any format support', 'Workflow simplification', 'Universal chat', 'Format flexibility', 'Complete solutions', 'All document types', 'Integrated analysis'].join('\n')}
      testimonials={[{name: 'Lisa Park', role: 'Coordinator', text: 'One tool works with all our document types. Simplified everything.'}]}
      faqs={[{q: 'What formats are supported?', a: 'PDFs, images, scans, handwritten documents, and more.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'Chat Scanned PDF', slug: 'chat-with-scanned-pdf'}]}
      primaryKeyword="AI document chat"
      secondaryKeywords={['chat any document', 'document AI']}
    />
  );
}
