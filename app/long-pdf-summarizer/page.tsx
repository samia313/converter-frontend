import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Long PDF Summarizer - Large Document Summary Tool | PDFilio',
  description: 'Summarize long PDFs efficiently. Handles 100+ page documents and creates concise summaries.',
  keywords: 'long PDF summarizer, large document summary, 100-page PDF, lengthy document processing',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Long PDF Summarizer"
      toolSlug="long-pdf-summarizer"
      description="Specialized for long documents. Efficiently summarizes 100+ page PDFs while maintaining key information throughout."
      mainContent="Long document specialist. Designed for lengthy PDFs, reports, and documents. Processes large files efficiently without losing important details."
      features={['Large file support', 'Multi-section handling', 'Maintains structure', 'Long doc processing', 'Section summarization', 'Hierarchy preservation', 'Efficient processing', 'Quality maintained']}
      benefits={['Handles length', 'Large file support', 'Maintains quality', 'Efficient processing', 'Complete coverage', 'No length limits', 'All details covered', 'Professional output']}
      useCase={['Long reports', 'Multi-chapter books', 'Extended documents', '100+ page PDFs', 'Comprehensive documents', 'Full-length papers', 'Complete books', 'Large projects'].join('\n')}
      testimonials={[{name: 'Patricia Harrison', role: 'Document Specialist', text: 'Finally a tool that handles 100+ page documents well. Creates comprehensive summaries of long files.'}]}
      faqs={[{q: 'How many pages?', a: 'Handles any length, from single page to 500+ page documents.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="long PDF summarizer"
      secondaryKeywords={['large document summary', 'lengthy PDF processing']}
    />
  );
}
