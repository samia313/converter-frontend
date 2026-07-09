import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Rewrite PDF - Professional Content Rewriting | PDFilio',
  description: 'Rewrite and improve PDF content with AI. Enhance clarity, professionalism, and readability instantly.',
  keywords: 'rewrite PDF, AI rewriting, content improvement, professional writing',
};

export default function AIRewritePDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Rewrite PDF',
    description: 'Professional content rewriting powered by advanced AI',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2600' },
  };

  return (
    <ToolLandingLayout
      toolName="AI Rewrite PDF"
      toolSlug="ai-rewrite-pdf"
      description="Improve and rewrite PDF content with AI. Enhance clarity, professionalism, and engagement instantly."
      heroImage="/tool-images/ai-rewrite-pdf-hero.png"
      mainContent={`AI Rewrite PDF improves your document content while preserving the original meaning and intent. Perfect for enhancing clarity, improving professionalism, or changing the tone of your writing.

Our advanced AI understands context and adjusts writing style appropriately. Make content more engaging, professional, casual, or concise - choose the style that fits your needs.

Upload any PDF and select your preferred rewriting style. AI instantly generates improved versions while maintaining all formatting and structure. Compare original and rewritten versions easily.`}
      useCase={[
        'Improving business proposal clarity',
        'Enhancing academic paper quality',
        'Making technical documentation clearer',
        'Adjusting tone for different audiences',
        'Improving email and letter writing',
        'Enhancing blog post quality',
        'Refining presentation content',
        'Polishing professional documents',
      ].join('\n')}
      testimonials={[
        {
          name: 'Amanda Foster',
          role: 'Content Writer',
          text: 'AI Rewrite PDF makes my editing process 10x faster! Improves clarity and professionalism instantly.',
        },
        {
          name: 'Kevin Harris',
          role: 'Business Owner',
          text: 'Perfect for polishing proposals and business documents. AI suggestions are always on point.',
        },
        {
          name: 'Rebecca Lee',
          role: 'Academic Writer',
          text: 'Enhances academic writing quality without losing meaning. Game-changing tool for research papers.',
        },
      ]}
      features={[
        'Multiple rewriting styles',
        'Tone adjustment',
        'Clarity improvement',
        'Professional enhancement',
        'Original formatting preserved',
        'Side-by-side comparison',
        'Customizable rewriting rules',
        'Batch rewriting',
      ]}
      benefits={[
        'Improve document quality quickly',
        'Enhance professional image',
        'Better reader engagement',
        'Faster editing process',
        'Multiple style options',
        'Maintain original meaning',
        'Save time on revisions',
        'Consistent quality output',
      ]}
      faqs={[
        {
          q: 'What rewriting styles are available?',
          a: 'Professional, casual, formal, engaging, concise, and creative styles to fit any need.',
        },
        {
          q: 'Does AI preserve original meaning?',
          a: 'Absolutely! AI rewrites while maintaining all original information and intent.',
        },
        {
          q: 'Can I customize rewriting rules?',
          a: 'Yes! Specify tone, length, and style preferences for personalized rewrites.',
        },
        {
          q: 'Works with complex documents?',
          a: 'Yes! Handles technical documents, academic papers, business documents beautifully.',
        },
        {
          q: 'Formatting preserved?',
          a: 'All original formatting, structure, and layout remain unchanged.',
        },
        {
          q: 'Compare original and rewritten?',
          a: 'Yes! Side-by-side view lets you see changes and choose which version to keep.',
        },
        {
          q: 'Batch rewrite multiple documents?',
          a: 'Yes! Process multiple PDFs at once to save time.',
        },
        {
          q: 'Output options?',
          a: 'Download as PDF or Word, or get text for copying.',
        },
        {
          q: 'Is AI Rewrite PDF free?',
          a: 'Completely free with unlimited rewrites and no registration.',
        },
        {
          q: 'Best for professional writing?',
          a: 'Perfect! Makes business documents, proposals, and professional content shine.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      schema={schema}
      primaryKeyword="AI rewrite PDF"
      secondaryKeywords={['rewrite content', 'improve writing', 'professional writing']}
    />
  );
}
