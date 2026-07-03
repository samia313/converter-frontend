import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Merge PDF Files - Free Online | PDFilio',
  description: 'Merge multiple PDF files into one instantly. Free, fast, and secure PDF merging. No sign-up required. Combine PDFs in seconds.',
  keywords: 'merge PDF, combine PDF, merge PDF files online, free PDF merger',
  canonical: 'https://pdfilio.com/merge-pdf',
};

export default function MergePDFPage() {
  return (
    <ToolLandingLayout
      toolName="Merge PDF"
      toolSlug="merge-pdf"
      description="Combine multiple PDF files into a single document instantly. Reorder pages, organize documents, and merge with just a few clicks."
      features={[
        'Merge unlimited PDF files',
        'Drag and drop reordering',
        'Instant processing',
        'Preserve quality',
        'No file size limits',
        'Works on all browsers',
      ]}
      benefits={[
        'Organize scattered documents',
        'Create unified reports',
        'Reduce file clutter',
        'Share single document easily',
        'Professional presentation',
        'Save time and effort',
      ]}
      faqs={[
        {
          q: 'How many PDFs can I merge at once?',
          a: 'You can merge unlimited PDFs at once. There is no limit to the number of files.',
        },
        {
          q: 'Can I reorder pages before merging?',
          a: 'Yes, you can drag and drop pages to reorder them before merging.',
        },
        {
          q: 'Will quality be affected?',
          a: 'No, we maintain 100% quality. Your merged PDF will be identical to the originals.',
        },
        {
          q: 'Can I preview before merging?',
          a: 'Yes, you can preview all pages and make changes before creating the final merged document.',
        },
        {
          q: 'How long does merging take?',
          a: 'Most merges complete in seconds, regardless of the number of files or total pages.',
        },
      ]}
      relatedTools={[
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Rotate PDF', slug: 'rotate-pdf' },
        { name: 'PDF Editor', slug: 'pdf-editor' },
        { name: 'Protect PDF', slug: 'protect-pdf' },
      ]}
      primaryKeyword="Merge PDF"
      secondaryKeywords={['combine PDF', 'merge PDF online', 'join PDF files']}
    />
  );
}
