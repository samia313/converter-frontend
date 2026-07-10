import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart PDF Summary AI - Intelligent Document Understanding | PDFilio',
  description: 'Smart AI that understands documents. Creates intelligent summaries with true comprehension, not just text cutting.',
  keywords: 'smart PDF summary, intelligent summarizer, AI comprehension, smart analysis',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Smart PDF Summary AI"
      toolSlug="smart-pdf-summary"
      description="Intelligent AI that truly understands documents. Smart summarization with comprehension, not just text reduction."
      mainContent="Smart comprehension. AI understands document meaning and creates intelligent summaries. Not cutting text, but extracting true meaning."
      features={['True comprehension', 'Context understanding', 'Meaning extraction', 'Smart prioritization', 'Intelligent analysis', 'Concept mapping', 'Smart formatting', 'Adaptive summarization']}
      benefits={['Better understanding', 'Smarter summaries', 'True insights', 'Accurate extraction', 'Meaningful output', 'Better retention', 'Intelligent results', 'Professional quality']}
      useCase={['Complex documents', 'Technical analysis', 'Business intelligence', 'Smart review', 'Comprehensive understanding', 'Advanced analysis', 'Meaningful insights', 'Professional use'].join('\n')}
      testimonials={[{name: 'Dr. Victor Martinez', role: 'Research Director', text: 'Actually understands documents. Creates summaries with true insight, not just shortened text.'}]}
      faqs={[{q: 'How smart is it?', a: 'Uses advanced NLP to understand context and create truly intelligent summaries.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="smart PDF summary AI"
      secondaryKeywords={['intelligent summarizer', 'AI comprehension']}
    />
  );
}
