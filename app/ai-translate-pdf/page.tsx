import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Translate PDF - Multi-Language PDF Translation | PDFilio',
  description: 'Translate PDF documents to any language with AI-powered translation. Maintain formatting and accuracy across 100+ languages.',
  keywords: 'translate PDF, PDF translation, document translation, AI translator',
};

export default function AITranslatePDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Translate PDF',
    description: 'Professional PDF translation powered by advanced AI',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2800' },
  };

  return (
    <ToolLandingLayout
      toolName="AI Translate PDF"
      toolSlug="ai-translate-pdf"
      description="Translate PDF documents to any language instantly. Professional AI translation maintaining formatting, style, and accuracy."
      heroImage="/tool-images/ai-translate-pdf-hero.png"
      mainContent={`AI Translate PDF breaks language barriers by instantly translating your documents to over 100 languages. Professional-quality translations powered by advanced neural AI technology.

Our AI understands context and cultural nuances to provide accurate translations. Maintain all formatting, images, and layout - the translated PDF looks exactly like the original.

Upload any language PDF and translate it instantly. Perfect for international business, academic research, or personal documents. Get professional translations in seconds without hiring expensive translators.`}
      useCase={`Translating business documents for international partners
Converting academic papers to different languages
Expanding products to international markets
Making documents accessible to diverse audiences
Legal document translation
Medical report translation
Student research in foreign languages
International collaboration and communication`}
      testimonials={[
        {
          name: 'Anna Kowalski',
          role: 'International Business Owner',
          text: 'AI Translate PDF is incredible! Translates contracts perfectly while maintaining formatting. Saved thousands on professional translators.',
        },
        {
          name: 'Carlos Rodriguez',
          role: 'Academic Researcher',
          text: 'Perfect for translating research papers. Supports 100+ languages and maintains academic formatting perfectly.',
        },
        {
          name: 'Yuki Tanaka',
          role: 'Student',
          text: 'Makes international research accessible. Translates PDFs accurately and keeps original layout intact. Highly recommend.',
        },
      ]}
      features={[
        '100+ language support',
        'AI-powered neural translation',
        'Perfect formatting preservation',
        'Context-aware translation',
        'Professional quality output',
        'Fast processing',
        'No file size limits',
        'Batch translation available',
      ]}
      benefits={[
        'Expand to international markets',
        'Break language barriers',
        'Save on professional translation costs',
        'Communicate globally easily',
        'Access international research',
        'Maintain document formatting',
        'Professional quality instantly',
        'Quick turnaround time',
      ]}
      faqs={[
        {
          q: 'How many languages are supported?',
          a: 'Over 100 languages! From Spanish and French to Mandarin, Japanese, and Arabic.',
        },
        {
          q: 'Is formatting preserved?',
          a: 'Perfectly! All formatting, images, tables, and layout remain exactly as in the original.',
        },
        {
          q: 'How accurate is the translation?',
          a: 'Professional-grade accuracy. Our AI is trained on millions of documents for precision.',
        },
        {
          q: 'Can I translate PDFs back to original language?',
          a: 'Yes! Translate to any language and back. Full bidirectional support.',
        },
        {
          q: 'Works with scanned PDFs?',
          a: 'Best with digital PDFs. For scanned documents, use AI OCR first then translate.',
        },
        {
          q: 'Maintain technical terminology?',
          a: 'Yes! AI understands technical, legal, and specialized vocabulary perfectly.',
        },
        {
          q: 'Is translation secure?',
          a: 'Completely secure and private. Documents are encrypted and deleted within 24 hours.',
        },
        {
          q: 'Can I translate multiple PDFs?',
          a: 'Yes! Batch translate multiple documents at once to save time.',
        },
        {
          q: 'Is AI Translate PDF free?',
          a: 'Completely free! Unlimited translations, no registration required.',
        },
        {
          q: 'Best for business documents?',
          a: 'Perfect for contracts, proposals, reports, and international business communication.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'AI OCR', slug: 'ai-ocr' },
      ]}
      primaryKeyword="AI translate PDF"
      secondaryKeywords={['PDF translation', 'translate document', 'multi-language PDF']}
    />
  );
}
