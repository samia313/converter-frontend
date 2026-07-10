import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI File Summarizer - Universal File Summary Tool | PDFilio',
  description: 'Summarize any file type with AI. PDFs, documents, images - universal file summarization.',
  keywords: 'AI file summarizer, universal summarizer, multi-file support, any format summary',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI File Summarizer"
      toolSlug="ai-file-summarizer"
      description="Summarize any file type. PDFs, Word docs, images, text files - one universal AI tool for all files."
      mainContent="Universal file support. Summarize PDFs, Word documents, images, text files, and any digital file. One tool for complete file summarization."
      features={['Multi-format', 'Universal support', 'Any file type', 'Auto-detection', 'Seamless conversion', 'One-tool solution', 'Format flexibility', 'Complete coverage']}
      benefits={['One tool all files', 'Complete coverage', 'Format flexibility', 'Simplified workflow', 'No conversions', 'Universal solution', 'Easy integration', 'Total flexibility']}
      useCase={['Mixed file types', 'Format diversity', 'Universal need', 'Any format', 'File flexibility', 'Format independence', 'Complete solution', 'Unified workflow'].join('\n')}
      testimonials={[{name: 'David Kumar', role: 'IT Professional', text: 'One tool for all file types. Summarizes PDFs, Word docs, and images seamlessly.'}]}
      faqs={[{q: 'Works with all files?', a: 'Yes, supports PDFs, Word, images, text, and virtually any digital file.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="AI file summarizer"
      secondaryKeywords={['universal summarizer', 'multi-file support']}
    />
  );
}
