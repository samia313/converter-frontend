import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI OCR - Optical Character Recognition | PDFilio',
  description: 'Convert supported scanned documents and images to editable text with AI-powered OCR.',
  keywords: 'OCR, optical character recognition, text extraction, scan to text',
  alternates: { canonical: 'https://pdfilio.com/ai-ocr' },
};

export default function AIOCRPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI OCR',
    description: 'Optical character recognition for supported documents and images.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <ToolLandingLayout
      toolName="AI OCR"
      toolSlug="ai-ocr"
      description="Convert supported scanned documents and images into editable text with OCR."
      heroImage="/tool-images/ai-ocr-hero.png"
      mainContent={`AI OCR can help extract text from supported scanned documents and images for editing, searching, and reuse. Results can vary with scan quality, layout, language, handwriting, and other document characteristics.

Use the tool to digitize supported documents, extract text from images, and make scanned content easier to work with.`}
      useCase={[
        'Digitizing paper documents',
        'Extracting text from photos and screenshots',
        'Making scanned PDFs searchable',
        'Extracting text from receipts and invoices',
        'Digitizing supported handwritten content',
        'Converting images to editable text',
      ].join('\n')}
      features={[
        'OCR text extraction',
        'Supported document and image inputs',
        'Editable text output',
        'Text extraction for scanned content',
      ]}
      benefits={[
        'Reduce manual text entry',
        'Make scanned content easier to search',
        'Reuse extracted text',
        'Digitize supported documents',
      ]}
      faqs={[
        { q: 'How accurate is AI OCR?', a: 'Accuracy depends on scan quality, language, layout, and other document characteristics. Review extracted text before relying on it.' },
        { q: 'Can it recognize handwriting?', a: 'Handwriting support depends on the current OCR implementation and the quality of the source.' },
        { q: 'What files can I use?', a: 'Use the formats accepted by the AI OCR uploader. The available input formats are shown in the tool interface.' },
        { q: 'Does OCR work on low-quality scans?', a: 'It may work, but lower-quality or complex scans can produce less accurate results.' },
        { q: 'Is OCR free?', a: 'The page is available without a paid claim here; any usage limits shown by the product should be followed.' },
      ]}
      relatedTools={[
        { name: 'PDF Chat', slug: 'pdf-chat' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      primaryKeyword="AI OCR"
      secondaryKeywords={['optical character recognition', 'text extraction', 'scan to text']}
      schema={schema}
    />
  );
}
