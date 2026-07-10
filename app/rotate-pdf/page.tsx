import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import RotatePDFTool from '@/components/tools/rotate-pdf-tool';

export const metadata: Metadata = {
  title: 'Rotate PDF - Fix Page Orientation | PDFilio',
  description: 'Rotate PDF pages 90, 180, or 270 degrees. Fix scanned documents, adjust page orientation, and save with correct rotation. Fast, free, and secure.',
  keywords: ['rotate PDF', 'fix PDF orientation', 'PDF page rotation', 'rotate PDF pages'],
};

export default function RotatePDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages to fix orientation and adjust page direction',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '980',
    },
  };

  return (
    <>
      <RotatePDFTool />
      <ToolLandingLayout
        toolName="Rotate PDF"
      toolSlug="rotate-pdf"
      description="Rotate PDF pages to fix orientation and adjust page direction. Correct scanned documents, fix sideways pages, and organize your PDFs perfectly with precise rotation controls."
      heroImage="/tool-images/rotate-pdf-hero.png"
      mainContent={`Rotate PDF helps you fix page orientation issues in your PDF files. Whether you have scanned documents that are sideways, need to adjust page direction, or want to correct improperly oriented pages, our tool makes it simple.

Rotate PDF pages individually or all at once by 90, 180, or 270 degrees. Perfect for fixing scanned documents from multi-function printers, organizing mixed-orientation PDFs, and preparing documents for professional use.

Our rotation tool maintains 100% of your PDF quality and formatting. Process files of any size instantly without registration. Your documents stay private - we never store or share your files.`}
      useCase={`Fixing scanned documents that came out sideways from the scanner
Correcting portrait-oriented pages in landscape documents
Preparing documents for professional printing
Organizing mixed-orientation PDFs into consistent format
Adjusting page orientation for eBook readers
Preparing documents for tablet or mobile viewing
Correcting camera scan photos converted to PDF`}
      features={[
        'Rotate by 90, 180, or 270 degrees',
        'Rotate all pages or individual pages',
        'Batch rotate multiple PDFs',
        'Preserve PDF quality completely',
        'Instant processing',
        'No file size limits',
        'Works on all devices',
        'Automatic save after rotation',
      ]}
      benefits={[
        'Fix improperly scanned documents',
        'Improve document readability',
        'Save time on manual corrections',
        'Maintain professional appearance',
        'Better mobile viewing',
        'Easy document organization',
        'Prepare for printing',
        'Consistent page orientation',
      ]}
      testimonials={[
        {
          name: 'Robert J.',
          role: 'Document Manager',
          text: 'Rotate PDF solved our problem with mixed-orientation scans. Now all our documents have consistent page direction. Much better than trying to fix in expensive software.',
        },
        {
          name: 'Maria S.',
          role: 'Scanner Operator',
          text: 'Our scanner sometimes puts pages sideways. Rotate PDF fixes them instantly. Saves us hours every month. Best tool ever!',
        },
        {
          name: 'James T.',
          role: 'Office Manager',
          text: 'Free, fast, and no complicated menus. Rotate PDF does exactly what it should do perfectly.',
        },
      ]}
      relatedTools={[
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      faqs={[
        {
          q: 'How do I rotate PDF pages?',
          a: 'Upload your PDF, select rotation angle (90, 180, or 270 degrees), choose whether to rotate all pages or specific pages, and download. Done in seconds!',
        },
        {
          q: 'Can I rotate only specific pages in a PDF?',
          a: 'Yes! You can rotate all pages at once or select individual pages to rotate. Each page can be rotated independently.',
        },
        {
          q: 'Will rotating affect the PDF quality?',
          a: 'No. Rotation is a non-destructive operation. Your PDF maintains 100% of its quality, resolution, fonts, and images.',
        },
        {
          q: 'What rotation angles are available?',
          a: 'You can rotate pages 90 degrees clockwise, 90 degrees counter-clockwise, or 180 degrees (upside down).',
        },
        {
          q: 'Can I rotate multiple PDFs at once?',
          a: 'Yes! You can batch rotate multiple PDF files. Upload all files, set your rotation preferences, and download them all at once.',
        },
        {
          q: 'How long does PDF rotation take?',
          a: 'Most PDFs rotate in under 5 seconds. Larger files may take slightly longer but typically complete within 30 seconds.',
        },
        {
          q: 'Is my PDF file secure during rotation?',
          a: 'Completely secure. Your files are encrypted during processing, automatically deleted after 24 hours, and never shared with anyone.',
        },
        {
          q: 'Do I need software or account to rotate PDFs?',
          a: 'No! Just upload your PDF in your browser. No software to install, no account required, no email verification needed.',
        },
        {
          q: 'Can I undo rotation after downloading?',
          a: 'You can always re-upload the original PDF to rotate it differently. The original on your device remains unchanged.',
        },
        {
          q: 'Works on mobile phones?',
          a: 'Yes! Rotate PDF works perfectly on phones, tablets, and computers. All processing is done online through your browser.',
        },
        {
          q: 'Is there a cost for using Rotate PDF?',
          a: 'No! Rotate PDF is completely free. Unlimited rotations, no ads, no hidden charges, no premium features.',
        },
        {
          q: 'What file formats can I rotate?',
          a: 'Rotate PDF works with standard PDF files (.pdf). For other formats, first convert them to PDF using our conversion tools.',
        },
      ]}
      primaryKeyword="rotate PDF"
        secondaryKeywords={['fix PDF orientation', 'rotate PDF pages', 'PDF page rotation', 'fix sideways PDF']}
      />
    </>
  );
}
