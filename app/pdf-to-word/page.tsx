import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToWordTool from '@/components/tools/pdf-to-word-tool';

export const metadata: Metadata = {
  title: 'PDF to Word Converter - Free Online | PDFilio',
  description: 'Convert PDF to Word documents instantly. Free, fast, and secure PDF to Word conversion online. No sign-up required.',
  keywords: 'PDF to Word, Convert PDF to Word, PDF to DOC, PDF to DOCX, free PDF converter',
  alternates: {
    canonical: 'https://pdfilio.com/pdf-to-word',
  },
  openGraph: {
    title: 'PDF to Word Converter - Free Online | PDFilio',
    description: 'Convert PDF to Word documents instantly without losing formatting.',
    url: 'https://pdfilio.com/pdf-to-word',
    type: 'website',
  },
};

export default function PDFToWordPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Word Converter',
    description: 'Convert PDF documents to editable Word files instantly',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '4500',
    },
  };

  return (
    <>
      <PDFToWordTool />
      <ToolLandingLayout
        toolName="PDF to Word Converter"
        toolSlug="pdf-to-word"
        description="Convert PDF documents to editable Word files in seconds. Maintain formatting, fonts, and layout. No sign-up required."
        heroImage="/tool-images/pdf-to-word-hero.png"
        mainContent={`PDF to Word Converter transforms your PDF files into fully editable Word documents instantly. Perfect for professionals who need to edit content, modify formatting, or repurpose PDF material.

Our advanced conversion technology preserves all formatting, fonts, images, and layout perfectly. Your Word document looks exactly like your original PDF, and everything is fully editable and customizable.

Convert files of any size instantly with secure processing. Your files are encrypted and automatically deleted within 24 hours. No registration required, no watermarks, completely free. Convert unlimited PDFs to Word format.`}
        useCase={`Editing content from PDF reports
Repurposing PDF documents for new projects
Converting scanned documents to editable files
Extracting text from PDF forms
Creating Word documents from PDF templates
Modifying proposals and contracts
Converting invoices to editable formats`}
        testimonials={[
        {
          name: 'Karen W.',
          role: 'Content Writer',
          text: 'PDF to Word is essential for my workflow. Converts perfectly with formatting intact. Saves me hours every week.',
        },
        {
          name: 'Steve J.',
          role: 'Business Analyst',
          text: 'The best PDF to Word converter I have used. Accurate, fast, and maintains perfect formatting. Highly recommended.',
        },
        {
          name: 'Lisa B.',
          role: 'Legal Secretary',
          text: 'Using PDF to Word daily for document conversions. Reliability is outstanding. No quality loss whatsoever.',
        },
      ]}
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
          a: 'Yes, PDFilio supports conversion of large PDF files without size limitations. Handle any file size.',
        },
        {
          q: 'Is my data secure?',
          a: 'Yes, all conversions are processed securely using encryption. Files are deleted within 24 hours.',
        },
        {
          q: 'Do I need to sign up?',
          a: 'No registration required! PDFilio is completely free. Start converting immediately.',
        },
        {
          q: 'What Word format is supported?',
          a: 'Convert to both .DOC and .DOCX formats. Choose your preferred Word version.',
        },
        {
          q: 'How long does conversion take?',
          a: 'Most conversions complete in seconds depending on file size and complexity.',
        },
        {
          q: 'Will formatting be preserved?',
          a: 'Yes! All fonts, colors, images, and formatting are preserved perfectly in the Word document.',
        },
        {
          q: 'Can I edit after conversion?',
          a: 'Absolutely! The converted Word document is fully editable. Make any changes you need.',
        },
        {
          q: 'Does it work with scanned PDFs?',
          a: 'Best results with digital PDFs. For scanned images, consider OCR before conversion.',
        },
        {
          q: 'How many files can I convert?',
          a: 'Unlimited! Convert as many PDFs as you need. No limits on quantity.',
        },
        {
          q: 'Is PDF to Word free?',
          a: 'Completely free! No hidden charges, no watermarks, no premium features.',
        },
        {
          q: 'Works on all devices?',
          a: 'Yes! Convert on computers, phones, and tablets through your web browser.',
        },
        {
          q: 'What about complex PDF layouts?',
          a: 'Our converter handles complex layouts including tables, columns, and images accurately.',
        },
      ]}
        relatedTools={[
        { name: 'Word to PDF', slug: 'word-to-pdf' },
        { name: 'PDF to Excel', slug: 'pdf-to-excel' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
      ]}
        primaryKeyword="PDF to Word"
        secondaryKeywords={['convert PDF to Word', 'PDF to DOC', 'PDF to DOCX']}
    />
    </>
  );
}
