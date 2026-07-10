import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI OCR - Optical Character Recognition | PDFilio',
  description: 'Convert scanned documents and images to editable text with AI-powered OCR. Extract text from any image instantly.',
  keywords: 'OCR, optical character recognition, text extraction, scan to text',
};

export default function AIOCRPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI OCR',
    description: 'Advanced optical character recognition powered by AI',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '3500' },
  };

  return (
    <ToolLandingLayout
      toolName="AI OCR"
      toolSlug="ai-ocr"
      description="Advanced optical character recognition that converts scanned documents, images, and handwriting to editable digital text."
      heroImage="/tool-images/ai-ocr-hero.png"
      mainContent={`AI OCR uses cutting-edge optical character recognition technology to convert any image or scanned document into editable text. Perfect for digitizing old documents, extracting text from photos, or making scanned PDFs searchable.

Our advanced AI recognizes text with exceptional accuracy, even in challenging conditions. Handles multiple languages, different fonts, handwriting, and complex layouts perfectly.

Upload any image or scanned PDF and instantly get editable text. Preserve formatting, recognize tables, and extract structured data automatically. Make your entire document library searchable and manageable.`}
      useCase={[
        'Digitizing old paper documents',
        'Extracting text from photos and screenshots',
        'Making scanned PDFs searchable',
        'Converting receipts and invoices',
        'Digitizing handwritten notes',
        'Extracting data from business cards',
        'Converting images to editable documents',
        'Batch processing large document collections',
      ].join('\n')}
      testimonials={[
        {
          name: 'Patricia Adams',
          role: 'Document Manager',
          text: 'AI OCR digitized our entire paper archive in days! Highly accurate text recognition. Best investment for document management.',
        },
        {
          name: 'Robert Chang',
          role: 'Accountant',
          text: 'Perfect for invoice and receipt extraction. Converts images to editable text instantly. Saves hours of manual data entry.',
        },
        {
          name: 'Maria Santos',
          role: 'Archivist',
          text: 'Exceptional OCR accuracy on historical documents. Handles old prints beautifully. Professional-grade text recognition.',
        },
      ]}
      features={[
        'Multi-language OCR support',
        'Handwriting recognition',
        'Table and layout detection',
        'Automatic formatting preservation',
        'High accuracy recognition',
        'Batch processing',
        'Editable text extraction',
        'Searchable document conversion',
      ]}
      benefits={[
        'Digitize paper documents easily',
        'Make documents searchable',
        'Reduce manual data entry',
        'Improve document organization',
        'Save storage space',
        'Enable document sharing digitally',
        'Increase productivity',
        'Professional text quality',
      ]}
      faqs={[
        {
          q: 'How accurate is AI OCR?',
          a: '99%+ accuracy on clear documents. Even complex layouts and multiple languages are recognized precisely.',
        },
        {
          q: 'Can it recognize handwriting?',
          a: 'Yes! Advanced handwriting recognition works on handwritten notes and signatures.',
        },
        {
          q: 'What image formats work?',
          a: 'All formats supported: JPG, PNG, GIF, TIFF, BMP, PDF, and more.',
        },
        {
          q: 'How many languages supported?',
          a: '130+ languages! Perfect for international documents and multilingual text.',
        },
        {
          q: 'Recognizes tables?',
          a: 'Yes! Tables and structured data are recognized and formatted correctly.',
        },
        {
          q: 'Can I batch process documents?',
          a: 'Absolutely! Process hundreds of documents automatically.',
        },
        {
          q: 'Output format options?',
          a: 'Text, Word, PDF, Excel - choose any format you need.',
        },
        {
          q: 'Works on low quality scans?',
          a: 'Yes! AI handles poor quality scans and unclear images intelligently.',
        },
        {
          q: 'Is OCR data secure?',
          a: 'Completely secure. All processing is encrypted and deleted within 24 hours.',
        },
        {
          q: 'Is AI OCR free?',
          a: 'Completely free with unlimited OCR processing, no registration needed.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      primaryKeyword="AI OCR"
      secondaryKeywords={['optical character recognition', 'text extraction', 'scan to text']}
    />
  );
}
