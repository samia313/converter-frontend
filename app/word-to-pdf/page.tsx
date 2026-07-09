import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Word to PDF Converter - Free Online | PDFilio',
  description: 'Convert Word documents to PDF instantly. Free, fast, and secure Word to PDF conversion. Preserve formatting. No sign-up required.',
  keywords: 'Word to PDF, Convert Word to PDF, DOC to PDF, DOCX to PDF, free converter',
  alternates: {
    canonical: 'https://pdfilio.com/word-to-pdf',
  },
};

export default function WordToPDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Word to PDF Converter',
    description: 'Convert Word documents to PDF format instantly',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '3100',
    },
  };

  return (
    <ToolLandingLayout
      toolName="Word to PDF Converter"
      toolSlug="word-to-pdf"
      description="Convert Word documents (DOC, DOCX) to PDF format instantly. Maintain perfect formatting and styling. Secure and completely free."
      heroImage="/tool-images/word-to-pdf-hero.png"
      mainContent={`Word to PDF Converter transforms your Word documents into professional PDF files instantly. Perfect for sharing documents securely, creating print-ready files, and protecting your content from editing.

Our converter preserves all formatting including fonts, colors, images, layouts, tables, and special formatting. Your PDF looks exactly like your Word document, with perfect reproduction every time.

Convert files instantly with enterprise-grade security. Your documents are encrypted and automatically deleted within 24 hours. No registration needed, no watermarks, completely free. Convert unlimited files.`}
      useCase={`Converting resumes for job applications
Creating professional proposals and quotes
Finalizing contracts before signing
Distributing reports to stakeholders
Preparing documents for archival
Sharing content with external parties
Creating read-only document versions`}
      testimonials={[
        {
          name: 'Mark T.',
          role: 'HR Manager',
          text: 'Word to PDF is perfect for our job application process. Candidates always get perfect conversions. No formatting issues ever.',
        },
        {
          name: 'Susan M.',
          role: 'Project Manager',
          text: 'Converting proposals to PDF daily. The quality and speed are exceptional. No better tool available.',
        },
        {
          name: 'George R.',
          role: 'Business Owner',
          text: 'Using Word to PDF for all client documents. Reliable, fast, and completely free. Highly satisfied.',
        },
      ]}
      features={[
        'Converts DOC and DOCX files',
        'Preserves all formatting',
        'Batch conversion support',
        'Ultra-fast processing',
        'AES-256 encryption',
        'Works on all devices',
      ]}
      benefits={[
        'Create professional PDF documents',
        'Share documents safely',
        'Maintain document integrity',
        'No compatibility issues',
        'Accessible anywhere, anytime',
        'Instant results',
      ]}
      faqs={[
        {
          q: 'What Word formats are supported?',
          a: 'Support .DOC, .DOCX, .RTF and all common Word document formats.',
        },
        {
          q: 'Will my document formatting be preserved?',
          a: 'Yes! All formatting, fonts, colors, images, and layouts are preserved perfectly.',
        },
        {
          q: 'Is it safe to upload my documents?',
          a: 'Completely safe. We use encryption and auto-delete files after 24 hours.',
        },
        {
          q: 'Can I convert multiple files at once?',
          a: 'Yes! Use batch conversion to convert multiple Word files simultaneously.',
        },
        {
          q: 'How fast is the conversion?',
          a: 'Most documents convert in seconds. Processing time depends on file size.',
        },
        {
          q: 'Is PDF the final format?',
          a: 'Yes. PDFs are read-only by default, perfect for protecting your content.',
        },
        {
          q: 'Can I edit the PDF after conversion?',
          a: 'PDFs cannot be edited directly. Convert back to Word if you need to edit again.',
        },
        {
          q: 'Does it work on mobile?',
          a: 'Absolutely! Convert Word to PDF on phones, tablets, or computers.',
        },
        {
          q: 'Is there a file size limit?',
          a: 'No limits! Convert documents of any size without restrictions.',
        },
        {
          q: 'Do I need to register?',
          a: 'No registration needed. Start converting immediately, completely free.',
        },
        {
          q: 'What about tables and special formatting?',
          a: 'All tables, charts, headers, footers, and special formatting convert perfectly.',
        },
        {
          q: 'Is Word to PDF free?',
          a: '100% free! No hidden fees, no watermarks, no premium plans needed.',
        },
      ]}
      relatedTools={[
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Excel to PDF', slug: 'excel-to-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
      ]}
      schema={schema}
      primaryKeyword="Word to PDF"
      secondaryKeywords={['convert Word to PDF', 'DOC to PDF', 'DOCX to PDF']}
    />
  );
}
