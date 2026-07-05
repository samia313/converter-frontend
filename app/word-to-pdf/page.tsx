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
  return (
    <ToolLandingLayout
      toolName="Word to PDF Converter"
      toolSlug="word-to-pdf"
      description="Convert Word documents (DOC, DOCX) to PDF format instantly. Maintain perfect formatting and styling. Secure and completely free."
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
          a: 'We support .DOC, .DOCX, .RTF and other common Word document formats.',
        },
        {
          q: 'Will my document formatting be preserved?',
          a: 'Yes, all formatting, fonts, colors, and images are preserved perfectly in the PDF output.',
        },
        {
          q: 'Is it safe to upload my documents?',
          a: 'Absolutely. We use SSL encryption and delete all files after 24 hours automatically.',
        },
        {
          q: 'Can I convert multiple files at once?',
          a: 'Yes, our batch conversion feature allows you to convert multiple Word files to PDF simultaneously.',
        },
        {
          q: 'Do you offer an API?',
          a: 'Yes, check our Developers page for API documentation and integration options.',
        },
      ]}
      relatedTools={[
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'PDF Editor', slug: 'pdf-editor' },
        { name: 'Protect PDF', slug: 'protect-pdf' },
      ]}
      primaryKeyword="Word to PDF"
      secondaryKeywords={['convert Word to PDF', 'DOC to PDF', 'DOCX to PDF']}
    />
  );
}
