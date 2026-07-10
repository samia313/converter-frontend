import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intelligent PDF Summarizer - Advanced AI Tool | PDFilio',
  description: 'Intelligent summarization with advanced AI. Understands complex documents and creates meaningful summaries.',
  keywords: 'intelligent PDF summarizer, advanced AI, complex document analysis, sophisticated summarization',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Intelligent PDF Summarizer"
      toolSlug="intelligent-pdf-summarizer"
      description="Advanced intelligent summarization. Sophisticated AI that understands complex documents and creates meaningful, insightful summaries."
      mainContent="Intelligent and sophisticated. Handles complex documents with intelligence. Not basic summarization, but advanced document understanding and analysis."
      features={['Advanced AI', 'Complex handling', 'Intelligent analysis', 'Sophisticated processing', 'Deep understanding', 'Advanced algorithms', 'Professional results', 'Expert-level output']}
      benefits={['Advanced capability', 'Complex documents', 'Professional quality', 'Deep insights', 'Accurate analysis', 'Sophisticated output', 'Expert results', 'Premium quality']}
      useCase={['Complex documents', 'Advanced analysis', 'Sophisticated needs', 'Professional requirements', 'Technical documents', 'Legal analysis', 'Business intelligence', 'Expert users'].join('\n')}
      testimonials={[{name: 'Dr. Alexander Knight', role: 'Chief Analyst', text: 'Advanced AI that handles complexity. Perfect for sophisticated document analysis.'}]}
      faqs={[{q: 'Handles complex documents?', a: 'Yes, designed for complex and sophisticated document types.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="intelligent PDF summarizer"
      secondaryKeywords={['advanced AI', 'sophisticated summarization']}
    />
  );
}
