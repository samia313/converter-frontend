import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import OCRTool from '@/components/tools/ocr-tool';

export const metadata: Metadata = {
  title: 'OCR Online – Extract Text from Images & Scanned PDFs | PDFilio',
  description: 'Extract text from supported images and scanned documents with OCR online. Turn image-based content into editable text for search, editing, and document workflows.',
  keywords: ['OCR', 'OCR online', 'image to text', 'extract text from image', 'OCR PDF', 'scanned PDF OCR', 'text extraction', 'image text extractor'],
  alternates: { canonical: 'https://pdfilio.com/ocr' },
  openGraph: {
    title: 'OCR Online – Extract Text from Images & Scanned PDFs | PDFilio',
    description: 'Extract text from supported images and scanned documents with browser-based OCR.',
    url: 'https://pdfilio.com/ocr',
    type: 'website',
  },
};

export default function OCRPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OCR Text Extraction',
    description: 'Extract text from supported images and scanned documents using OCR.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <OCRTool />
      <ToolLandingLayout
        toolName="OCR - Text Extraction"
        toolSlug="ocr"
        description="Extract text from supported scanned documents and images with OCR. Create editable, searchable text from image-based content for research, document editing, and everyday workflows."
        mainContent={`OCR, or Optical Character Recognition, converts text that appears inside images or scanned document pages into machine-readable text. This can help when a PDF or image contains text that cannot be selected or copied normally.

OCR is useful for scanned forms, receipts, invoices, notes, screenshots, archived documents, study material, and other image-based content. Recognition quality depends on factors such as image resolution, lighting, skew, handwriting, font style, language, page layout, and the quality of the original scan.

After extraction, review important names, numbers, dates, totals, addresses, and other critical information against the original document. OCR output is best treated as an editable starting point that may require correction, especially for low-quality scans or complex layouts.`}
        primaryKeyword="OCR"
        secondaryKeywords={['OCR online', 'image to text', 'extract text from image', 'OCR PDF', 'scanned PDF OCR', 'text extraction', 'image text extractor']}
        features={[
          'Text extraction from supported images',
          'OCR for image-based document content',
          'Scanned document text recognition',
          'Browser-based workflow',
          'Useful for searchable and editable text workflows',
          'Support for supported document languages',
          'Works with common image-based documents',
          'No separate OCR application required',
        ]}
        benefits={[
          'Reduce manual retyping of scanned content',
          'Make image-based text easier to reuse',
          'Create a starting point for editing and searching',
          'Help digitize paper-based document scans',
          'Extract text for downstream document workflows',
          'Speed up initial review of image-based documents',
        ]}
        useCase={[
          'Extracting text from scanned documents',
          'Converting receipts and invoices into editable text',
          'Digitizing printed notes and forms',
          'Extracting text from screenshots',
          'Preparing scanned study material for editing',
          'Making archived documents searchable',
          'Capturing text from image-based reports',
          'Reducing manual transcription work',
        ].join('\n')}
        faqs={[
          { q: 'What is OCR?', a: 'OCR stands for Optical Character Recognition. It identifies text within images or scanned document pages and converts it into machine-readable text.' },
          { q: 'Can OCR extract text from an image?', a: 'Yes. Supported images can be processed to recognize visible text and produce editable text output.' },
          { q: 'Can OCR extract text from a scanned PDF?', a: 'Yes, when the scanned document is supported by the current OCR workflow. OCR is useful because scanned pages often contain images rather than selectable text.' },
          { q: 'Is OCR 100% accurate?', a: 'No OCR system should be assumed to be perfect. Accuracy can vary with scan quality, language, font, layout, image noise, and other document characteristics.' },
          { q: 'Can OCR recognize handwriting?', a: 'Handwriting can be significantly harder to recognize than clear printed text. Results depend on the handwriting style, image quality, language support, and current OCR capabilities.' },
          { q: 'Which languages does OCR support?', a: 'Language availability depends on the OCR models and configuration used by the current PDFilio tool. Use the language options shown in the interface.' },
          { q: 'Can OCR extract text from receipts and invoices?', a: 'Yes. Receipts and invoices are common OCR use cases, but important totals, dates, invoice numbers, and amounts should be checked against the original.' },
          { q: 'Can OCR make a scanned document searchable?', a: 'OCR can convert recognized image text into machine-readable text. Whether a searchable PDF is created depends on the specific OCR workflow and output format.' },
          { q: 'Can I edit OCR text after extraction?', a: 'Yes. Extracted text can generally be copied into compatible editors for correction and further editing.' },
          { q: 'Does OCR preserve the original formatting?', a: 'Not necessarily. OCR focuses on recognizing text, and complex columns, tables, fonts, spacing, and page layouts may require manual cleanup.' },
          { q: 'Can I use OCR on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install OCR software?', a: 'No separate OCR application is required for the browser-based workflow.' },
          { q: 'Is the OCR tool free?', a: 'PDFilio provides the online OCR tool; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
        ]}
        relatedTools={[
          { name: 'AI OCR', slug: 'ai-ocr' },
          { name: 'PDF to Text', slug: 'pdf-to-text' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'AI Chat with PDF', slug: 'ai-chat-pdf' },
          { name: 'PDF to PNG', slug: 'pdf-to-png' },
        ]}
        schema={schema}
      />
    </>
  );
}
