import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI OCR Online – Convert Scans & Images to Text | PDFilio',
  description: 'Extract text from supported scanned PDFs, images, receipts, and documents with AI OCR. Turn image-based content into editable, searchable text online.',
  keywords: ['AI OCR', 'OCR online', 'optical character recognition', 'image to text', 'scan to text', 'PDF OCR', 'OCR PDF', 'text extraction'],
  alternates: { canonical: 'https://pdfilio.com/ai-ocr' },
  openGraph: {
    title: 'AI OCR Online – Scan to Text | PDFilio',
    description: 'Extract editable text from supported scanned documents and images with OCR.',
    url: 'https://pdfilio.com/ai-ocr',
    type: 'website',
  },
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
      description="Convert supported scanned documents and images into editable, searchable text with AI-powered OCR."
      heroImage="/tool-images/ai-ocr-hero.png"
      mainContent={`AI OCR helps turn supported image-based documents into text that you can search, edit, copy, and reuse. It is useful when a PDF or image contains scanned pages instead of selectable text.

Common OCR use cases include scanned PDFs, paper documents, receipts, invoices, screenshots, photos of documents, and supported handwritten material. OCR accuracy depends on image quality, language, handwriting, layout, fonts, and other document characteristics, so important extracted information should always be checked against the original.

A simple workflow is to upload a supported file, let OCR analyze the document, review the extracted text, correct any recognition errors, and then reuse the verified result. For image-based PDFs that you want to explore conversationally, PDFilio also provides Chat with Scanned PDF.`}
      useCase={[
        'Digitizing paper documents',
        'Extracting text from document photos',
        'Making scanned PDFs searchable',
        'Extracting text from receipts and invoices',
        'Converting screenshots into editable text',
        'Digitizing supported handwriting',
        'Extracting text from image-based PDFs',
        'Preparing scanned material for further editing',
      ].join('\n')}
      features={[
        'AI-powered OCR text extraction',
        'Supported scanned PDF processing',
        'Image-to-text extraction',
        'Searchable text from scanned content',
        'Editable text output',
        'Support for suitable document photos',
        'Browser-based workflow',
        'Useful for digitization workflows',
      ]}
      benefits={[
        'Reduce repetitive manual typing',
        'Make scanned content easier to search',
        'Reuse extracted document text',
        'Digitize supported paper records',
        'Prepare image-based documents for editing',
        'Speed up initial document transcription',
      ]}
      faqs={[
        { q: 'What is AI OCR?', a: 'AI OCR uses optical character recognition technology to identify text in supported scanned documents and images and turn it into usable digital text.' },
        { q: 'Can I convert a scanned PDF to text?', a: 'Yes, supported scanned PDFs can be processed to extract text from their page images.' },
        { q: 'Can I convert an image to text?', a: 'Yes. Supported document images can be analyzed and their readable text extracted.' },
        { q: 'How accurate is AI OCR?', a: 'Accuracy depends on scan quality, language, layout, font, handwriting, and other factors. Review extracted text before relying on it.' },
        { q: 'Can OCR recognize handwriting?', a: 'Supported handwriting may be recognized, but results vary significantly with handwriting clarity, language, and image quality.' },
        { q: 'Does OCR work on low-quality scans?', a: 'It may work on lower-quality scans, but blur, fading, skew, noise, and compression can reduce recognition accuracy.' },
        { q: 'Can OCR make a scanned PDF searchable?', a: 'OCR can extract text from image-based pages, which can help make scanned document content searchable when the resulting text is retained in the workflow.' },
        { q: 'Can I extract text from receipts and invoices?', a: 'Yes, receipts and invoices are common OCR use cases, although unusual layouts and poor image quality can affect results.' },
        { q: 'Can I use OCR on screenshots?', a: 'Yes, supported screenshots can be processed when the text is clear enough for recognition.' },
        { q: 'Does OCR preserve the original layout?', a: 'Text extraction may not reproduce complex tables, columns, fonts, spacing, or page layouts exactly. Review the output when layout matters.' },
        { q: 'What languages does OCR support?', a: 'Available languages depend on the current OCR engine and product configuration. Use the language options shown by the tool rather than assuming every language is supported.' },
        { q: 'Is AI OCR free?', a: 'PDFilio provides the AI OCR page as an online tool; any current usage limits or account requirements shown in the product interface apply.' },
        { q: 'Should I verify extracted OCR text?', a: 'Yes. OCR can misread characters or formatting, so important legal, financial, academic, or business information should be checked against the original document.' },
      ]}
      relatedTools={[
        { name: 'Chat with Scanned PDF', slug: 'chat-with-scanned-pdf' },
        { name: 'PDF Chat', slug: 'pdf-chat' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
        { name: 'AI Document Summarizer', slug: 'ai-document-summarizer' },
      ]}
      primaryKeyword="AI OCR"
      secondaryKeywords={['OCR online', 'optical character recognition', 'image to text', 'scan to text', 'PDF OCR', 'OCR PDF', 'text extraction']}
      schema={schema}
    />
  );
}
