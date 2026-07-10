import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Text Summarizer - Smart Text Condensing | PDFilio',
  description: 'Summarize text in PDFs intelligently. Extract and condense text while preserving meaning.',
  keywords: 'PDF text summarizer, text summarization, content condensing, smart extraction',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Text Summarizer"
      toolSlug="pdf-text-summarizer"
      description="Intelligent text summarization from PDFs. Condense and extract text intelligently while preserving all meaning."
      mainContent="Text-focused summarization. Extracts text content intelligently and condenses to essential information. Perfect for text-heavy documents."
      features={['Text extraction', 'Smart condensing', 'Meaning preservation', 'Content focus', 'Text analysis', 'Intelligent filtering', 'Clean extraction', 'Quality output']}
      benefits={['Text clarity', 'Condensed content', 'Preserved meaning', 'Easy reading', 'Quick extraction', 'Clean output', 'Text focus', 'Information dense']}
      useCase={['Text-heavy documents', 'Content extraction', 'Text condensing', 'Article summarization', 'Blog condensing', 'Content focus', 'Text analysis', 'Reading reduction'].join('\n')}
      testimonials={[{name: 'Michael Scott', role: 'Content Manager', text: 'Perfect for condensing text-heavy documents. Smart extraction without losing meaning.'}]}
      faqs={[{q: 'Preserves meaning?', a: 'Yes, intelligently condenses while keeping all important information.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="PDF text summarizer"
      secondaryKeywords={['text summarization', 'content condensing']}
    />
  );
}
