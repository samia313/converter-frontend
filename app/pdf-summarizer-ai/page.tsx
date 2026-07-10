import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Summarizer AI - Smart Document Analysis | PDFilio',
  description: 'Advanced AI PDF summarizer that understands context and extracts meaningful summaries. Perfect for professionals who need intelligent document analysis.',
  keywords: 'PDF summarizer AI, smart summarizer, intelligent analysis, document intelligence',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Summarizer AI"
      toolSlug="pdf-summarizer-ai"
      description="Advanced AI-powered PDF summarizer with intelligent context understanding. Extracts not just key points, but meaningful insights from complex documents."
      mainContent={`PDF Summarizer AI goes beyond simple text extraction. It understands document context, identifies relationships between ideas, and creates truly intelligent summaries.

Smart Analysis Features:
- Context-aware summarization
- Relationship identification between concepts
- Theme extraction and organization
- Key insight prioritization
- Argument structure understanding
- Data point identification
- Logical flow preservation

Perfect for complex documents where standard summarization falls short. Legal briefs, technical specifications, research papers - all analyzed intelligently.

Not just shorter text, but smarter understanding. The AI comprehends document purpose and creates summaries that match your needs.`}
      features={[
        'Context-aware analysis',
        'Concept relationship mapping',
        'Theme identification',
        'Intelligent prioritization',
        'Structured output formats',
        'Multiple perspective summaries',
        'Technical term preservation',
        'Custom summary styles',
      ]}
      benefits={[
        'Understand document purpose',
        'Grasp complex relationships',
        'Identify key insights',
        'Save analysis time',
        'Better decision making',
        'Professional efficiency',
        'Deeper understanding',
        'Actionable intelligence',
      ]}
      useCase={[
        'Legal document analysis',
        'Technical specification review',
        'Academic research synthesis',
        'Business intelligence gathering',
        'Contract understanding',
        'Policy document comprehension',
        'Competitive analysis',
        'Market research compilation',
      ].join('\n')}
      testimonials={[
        {
          name: 'James Peterson',
          role: 'Legal Consultant',
          text: 'This AI actually understands legal documents. Not just summarizing text, but identifying key clauses and obligations. Game changer for contract review.',
        },
      ]}
      faqs={[
        {
          q: 'How is this different from basic summarizers?',
          a: 'Understands context, relationships, and document purpose. Creates intelligent summaries, not just shortened text.',
        },
        {
          q: 'Works with technical documents?',
          a: 'Excellent for technical specs. Preserves terminology while extracting technical insights.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Summary', slug: 'ai-pdf-summary' },
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
      ]}
      primaryKeyword="PDF summarizer AI"
      secondaryKeywords={['smart summarizer', 'intelligent analysis']}
    />
  );
}
