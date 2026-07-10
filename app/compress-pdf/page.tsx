import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import CompressPDFTool from '@/components/tools/compress-pdf-tool';

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
    <>
      <CompressPDFTool />
      <ToolLandingLayout
      toolName="Compress PDF"
      toolSlug="compress-pdf"
      description="Reduce PDF file size instantly without compromising quality. Compress large PDFs to email-friendly sizes in seconds. Completely free."
      heroImage="/tool-images/compress-pdf-hero.png"
      mainContent={`Compress PDF is the easiest way to reduce your PDF file size without losing any quality. Whether you need to email large documents, upload files with size restrictions, or save storage space, our tool handles everything instantly.

Our advanced compression algorithm analyzes your PDF structure and removes unnecessary data while preserving all text, images, and formatting. Most PDFs can be reduced by 50-80% without any visible quality loss.

The compression process is completely secure. Your files are processed on encrypted servers and automatically deleted after 24 hours. No registration required, no email verification, and completely free. Compress as many PDFs as you need.`}
      useCase={`Reducing attachment size for email
Meeting file upload size limits
Saving cloud storage space
Preparing documents for slow connections
Archiving large PDF files
Sharing documents with file size restrictions
Improving website performance by reducing PDF sizes`}
      testimonials={[
        {
          name: 'Jonathan M.',
          role: 'Business Professional',
          text: 'Compress PDF is amazing! Reduced my 50MB files to under 10MB without quality loss. Now I can email large documents without issues.',
        },
        {
          name: 'Rachel S.',
          role: 'Teacher',
          text: 'Perfect for compressing student submissions. Saves so much cloud storage space and everything works seamlessly.',
        },
        {
          name: 'Michael T.',
          role: 'IT Manager',
          text: 'Best PDF compression tool available. We use it company-wide to reduce storage costs. No complaints, highly reliable.',
        },
      ]}
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
        { name: 'Rotate PDF', slug: 'rotate-pdf' },
      ]}
      primaryKeyword="compress PDF"
      secondaryKeywords={['reduce PDF size', 'compress PDF online', 'shrink PDF']}
      />
    </>
  );
}
