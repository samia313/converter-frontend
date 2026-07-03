import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'PDF to Word Converter - Free Online | PDFilio',
  description: 'Convert PDF to Word documents instantly. Free, fast, and secure PDF to Word conversion online. No sign-up required.',
  keywords: 'PDF to Word, Convert PDF to Word, PDF to DOC, PDF to DOCX, free PDF converter',
  canonical: 'https://pdfilio.com/pdf-to-word',
  openGraph: {
    title: 'PDF to Word Converter - Free Online | PDFilio',
    description: 'Convert PDF to Word documents instantly without losing formatting.',
    url: 'https://pdfilio.com/pdf-to-word',
    type: 'website',
  },
};

export default function PDFToWordPage() {
  return (
    <ToolLandingLayout
      toolName="PDF to Word Converter"
      toolSlug="pdf-to-word"
      description="Convert PDF documents to editable Word files in seconds. Maintain formatting, fonts, and layout. No sign-up required."
      features={[
        'Instant PDF to Word conversion',
        'Preserves formatting and layout',
        'Supports batch conversion',
        'Fast processing speed',
        'Secure file handling',
        'No software installation needed',
      ]}
      benefits={[
        'Edit PDF content easily in Word',
        'Maintain professional formatting',
        'Support for all PDF types',
        'Keep original styling intact',
        'Compatible with all Word versions',
        'Download your files immediately',
      ]}
      faqs={[
        {
          q: 'Can I convert large PDF files?',
          a: 'Yes, PDFilio supports conversion of large PDF files up to 500MB without any limitations.',
        },
        {
          q: 'Is my data secure?',
          a: 'Yes, all conversions are processed securely using SSL encryption. Files are deleted after 24 hours.',
        },
        {
          q: 'Do I need to sign up?',
          a: 'No, PDFilio is completely free and requires no sign-up. Use it immediately.',
        },
        {
          q: 'What Word format is supported?',
          a: 'We support both .DOC and .DOCX formats. You can choose your preferred format.',
        },
        {
          q: 'How long does conversion take?',
          a: 'Most conversions complete in seconds, depending on file size and complexity.',
        },
      ]}
      relatedTools={[
        { name: 'Word to PDF', slug: 'word-to-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'PDF Editor', slug: 'pdf-editor' },
        { name: 'OCR PDF', slug: 'ocr-pdf' },
      ]}
      primaryKeyword="PDF to Word"
      secondaryKeywords={['convert PDF to Word', 'PDF to DOC', 'PDF to DOCX']}
    />
  );
}
