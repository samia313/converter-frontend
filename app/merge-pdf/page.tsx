import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Merge PDF Files - Free Online | PDFilio',
  description: 'Merge multiple PDF files into one instantly. Free, fast, and secure PDF merging. No sign-up required. Combine PDFs in seconds.',
  keywords: 'merge PDF, combine PDF, merge PDF files online, free PDF merger',
  alternates: {
    canonical: 'https://pdfilio.com/merge-pdf',
  },
};

export default function MergePDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2800',
    },
  };

  return (
    <ToolLandingLayout
      toolName="Merge PDF"
      toolSlug="merge-pdf"
      description="Combine multiple PDF files into a single document instantly. Reorder pages, organize documents, and merge with just a few clicks."
      heroImage="/tool-images/merge-pdf-hero.png"
      mainContent={`Merge PDF is the simplest way to combine multiple PDF files into a single document. Perfect for organizing scattered documents, combining reports, and creating unified files.

Upload multiple PDFs, arrange them in any order, and merge them instantly into one file. Drag and drop reordering lets you arrange pages exactly how you want them. All formatting and quality is preserved perfectly.

Our merge tool supports unlimited file sizes and quantities. Process files instantly on secure servers with automatic deletion after 24 hours. No registration needed, no watermarks, completely free.`}
      useCase={`Combining multiple reports into one document
Merging chapters from different sources into one book
Organizing scattered contract pages
Creating comprehensive proposal documents
Combining meeting notes from multiple files
Assembling project documentation
Unifying financial statements from multiple periods`}
      testimonials={[
        {
          name: 'David P.',
          role: 'Document Manager',
          text: 'Merge PDF is incredibly useful for organizing files. Combined 50+ documents into organized PDFs. The drag-and-drop reordering is a lifesaver.',
        },
        {
          name: 'Elena R.',
          role: 'Consultant',
          text: 'Perfect for combining client documents and proposals. Does exactly what it promises, no complications, completely free.',
        },
        {
          name: 'Frank J.',
          role: 'Project Manager',
          text: 'Using Merge PDF daily for project documentation. Saves hours compared to manual merging. Highly recommended.',
        },
      ]}
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
          a: 'Yes, you can drag and drop pages to reorder them before merging. Arrange them exactly how you want.',
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
        {
          q: 'Can I merge PDFs from different sources?',
          a: 'Yes! Merge any PDF files from any source. All formatting is preserved perfectly.',
        },
        {
          q: 'Is my data secure?',
          a: 'Completely secure. Your files are encrypted during processing and deleted within 24 hours.',
        },
        {
          q: 'Do I need to register?',
          a: 'No registration, no email verification, no sign-up required. Just upload and merge.',
        },
        {
          q: 'Is Merge PDF free?',
          a: 'Yes, completely free! Unlimited merges, no hidden fees, no premium features.',
        },
        {
          q: 'What about large files?',
          a: 'No file size limits! Merge PDFs of any size. Process as many as you need.',
        },
        {
          q: 'Can I undo after merging?',
          a: 'You can always re-upload the original files to merge differently.',
        },
        {
          q: 'Works on mobile?',
          a: 'Yes! Merge PDF works perfectly on phones, tablets, and computers.',
        },
      ]}
      relatedTools={[
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Rotate PDF', slug: 'rotate-pdf' },
      ]}
      schema={schema}
      primaryKeyword="merge PDF"
      secondaryKeywords={['combine PDF', 'merge PDF online', 'join PDF files']}
    />
  );
}
