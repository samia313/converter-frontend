import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Compress PDF Online - Reduce File Size Free | PDFilio',
  description: 'Compress PDF files online and reduce file size without losing quality. Free PDF compressor. Compress to any size instantly.',
  keywords: 'compress PDF, reduce PDF size, compress PDF online, free PDF compressor',
  alternates: {
    canonical: 'https://pdfilio.com/compress-pdf',
  },
};

export default function CompressPDFPage() {
  return (
    <ToolLandingLayout
      toolName="Compress PDF"
      toolSlug="compress-pdf"
      description="Reduce PDF file size instantly without compromising quality. Compress large PDFs to email-friendly sizes in seconds. Completely free."
      features={[
        'Compress to any size',
        'Multiple quality levels',
        'Batch compression',
        'Lightning-fast processing',
        'Zero quality loss option',
        'No file size restrictions',
      ]}
      benefits={[
        'Reduce storage space',
        'Email smaller files',
        'Faster file transfers',
        'Share documents easily',
        'Save bandwidth',
        'Maintain readability',
      ]}
      faqs={[
        {
          q: 'How much can I compress a PDF?',
          a: 'Compression depends on content. Images are compressed more than text. Most PDFs can be reduced by 50-80%.',
        },
        {
          q: 'Will quality be affected?',
          a: 'Our smart compression preserves text clarity while optimizing images. You can choose compression level.',
        },
        {
          q: 'Can I compress to specific sizes?',
          a: 'Yes, we offer presets (e.g., compress to 100KB, 200KB) and custom compression levels.',
        },
        {
          q: 'What is the maximum file size?',
          a: 'There is no limit. We can compress files of any size up to several GB.',
        },
        {
          q: 'How do I choose compression quality?',
          a: 'Select from low, medium, or high quality options based on your needs and desired file size.',
        },
      ]}
      relatedTools={[
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'OCR PDF', slug: 'ocr-pdf' },
        { name: 'PDF Editor', slug: 'pdf-editor' },
        { name: 'Rotate PDF', slug: 'rotate-pdf' },
      ]}
      primaryKeyword="Compress PDF"
      secondaryKeywords={['reduce PDF size', 'compress PDF online', 'shrink PDF']}
    />
  );
}
