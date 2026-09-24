import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import OCRTool from '@/components/tools/ocr-tool';

export const metadata: Metadata = {
  title: 'OCR PDF Online – Extract Text from Scanned PDFs & Images',
  description: 'Extract text from supported scanned PDFs and images with PDFilio OCR. Convert image-based document content into machine-readable text for editing, searching, and reuse.',
  keywords: ['OCR PDF', 'OCR online', 'OCR PDF online', 'scanned PDF OCR', 'PDF to text OCR', 'image to text', 'extract text from image', 'OCR text extraction'],
  alternates: { canonical: 'https://pdfilio.com/ocr' },
  openGraph: {
    title: 'OCR PDF Online – Extract Text from Scanned PDFs & Images | PDFilio',
    description: 'Extract text from supported scanned PDFs and images with PDFilio OCR.',
    url: 'https://pdfilio.com/ocr',
    type: 'website',
  },
};

export default function OCRPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDFilio OCR',
    description: 'OCR text extraction workflow for supported scanned PDFs and images.',
    applicationCategory: 'Utility',
  };

  return (
    <>
      <OCRTool />
      <ToolLandingLayout
        toolName="OCR PDF Online"
        toolSlug="ocr"
        description="Extract text from supported scanned PDFs and images with OCR. Turn image-based document content into machine-readable text for editing, searching, copying, and downstream document workflows."
        mainContent={`OCR (Optical Character Recognition) identifies text contained in scanned PDF pages and supported images and converts recognized content into machine-readable text.

OCR is useful for scanned forms, receipts, invoices, printed notes, screenshots, archived documents, study material, and other image-based files where normal text selection is not available. Recognition quality depends on scan resolution, image quality, language, font, page layout, skew, noise, and other characteristics of the source file.

Always review important names, numbers, dates, totals, addresses, and other critical information against the original document. OCR should be treated as a practical text-extraction workflow rather than a guarantee of perfect transcription or original formatting.`}
        primaryKeyword="OCR PDF"
        secondaryKeywords={['OCR online', 'OCR PDF online', 'scanned PDF OCR', 'PDF to text OCR', 'image to text', 'extract text from image', 'OCR text extraction']}
        features={[
          'OCR text extraction from supported scanned PDFs',
          'Text recognition from supported images',
          'Machine-readable text output',
          'Browser-based OCR workflow',
          'Copy extracted text for reuse',
          'Save extracted text as TXT',
          'English printed-text recognition',
          'No separate desktop OCR application required',
        ]}
        benefits={[
          'Reduce manual retyping of scanned documents',
          'Make image-based text easier to reuse',
          'Create editable text from supported scans',
          'Speed up initial document review',
          'Digitize printed forms, notes, and records',
          'Reuse recognized text in other document workflows',
        ]}
        useCase={[
          'Extracting text from scanned PDFs',
          'Converting receipts and invoices into editable text',
          'Digitizing printed notes and forms',
          'Extracting text from screenshots and images',
          'Preparing scanned study material for editing',
          'Making archived document content machine-readable',
          'Capturing text from image-based reports',
          'Reducing manual transcription work',
        ].join('\n')}
        faqs={[
          { q: 'What is OCR?', a: 'OCR stands for Optical Character Recognition. It identifies text inside scanned pages or images and converts recognized content into machine-readable text.' },
          { q: 'Can I OCR a scanned PDF online?', a: 'Yes, supported scanned PDFs can be submitted through the PDFilio OCR workflow. Recognition quality depends on the source document and current processing capabilities.' },
          { q: 'Can OCR extract text from an image?', a: 'Yes. Supported image files can be processed to recognize visible printed text.' },
          { q: 'Is OCR 100% accurate?', a: 'No. OCR accuracy varies with scan quality, language, font, layout, image noise, skew, and other document characteristics.' },
          { q: 'Can OCR recognize handwriting?', a: 'Handwriting is generally harder to recognize than clear printed text. Results depend on the handwriting, image quality, language support, and available OCR capabilities.' },
          { q: 'Which language does this OCR tool support?', a: 'The current browser OCR workflow uses the English (eng) Tesseract model. Non-English documents may produce poor or incorrect results.' },
          { q: 'Can OCR extract text from receipts and invoices?', a: 'Yes, supported receipts and invoices are common OCR use cases. Verify totals, dates, invoice numbers, and amounts against the original.' },
          { q: 'Can OCR make a scanned PDF searchable?', a: 'OCR can turn recognized image text into machine-readable text. Whether the final output is a searchable PDF depends on the specific workflow and output format.' },
          { q: 'Does OCR preserve the original formatting?', a: 'Not necessarily. OCR focuses on text recognition, while complex tables, columns, fonts, spacing, and page layouts may require cleanup.' },
          { q: 'Can I copy the extracted OCR text?', a: 'Yes. The PDFilio OCR interface provides extracted text that can be copied and saved as a text file.' },
          { q: 'Can I use OCR on my phone?', a: 'Yes. The browser-based OCR workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install OCR software?', a: 'No separate desktop OCR application is required for the browser-based workflow.' },
          { q: 'Is OCR free?', a: 'Current usage limits and availability are determined by the product configuration shown in the PDFilio OCR interface.' },
        ]}
        relatedTools={[
          { name: 'AI OCR', slug: 'ai-ocr' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'AI Chat with PDF', slug: 'ai-chat-pdf' },
          { name: 'PDF to PNG', slug: 'pdf-to-png' },
        ]}
        schema={schema}
      />
    </>
  );
}
