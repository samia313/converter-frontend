import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import WatermarkPdfTool from '@/components/tools/watermark-pdf-tool';

export const metadata: Metadata = {
  title: 'Watermark PDF | PDFilio',
  description: 'Watermark PDF online for free. Fast, secure, and easy to use.',
  keywords: ['watermark-pdf', 'Watermark PDF'],
};

export default function WatermarkPdfToolPage() {
  return (
    <>
      <WatermarkPdfTool />
      <ToolLandingLayout
        toolName="Watermark PDF"
        toolSlug="watermark-pdf"
        description="Powerful online Watermark PDF tool. Fast, secure, and completely free."
        heroImage="/tool-images/watermark-pdf-hero.png"
        mainContent="Watermark PDF helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="Watermark PDF is perfect for professionals who need reliable document processing."
        features={['Fast processing', 'High quality output', 'No registration needed', 'Secure encryption', 'Works on all devices']}
        benefits={['Save time', 'Professional results', 'Completely free', 'Works everywhere', 'Easy to use']}
        testimonials={[
          {
            name: 'John D.',
            role: 'Professional',
            text: 'This tool makes document processing incredibly easy. Highly recommended!',
          },
        ]}
        faqs={[
          {
            q: 'Is this tool free?',
            a: 'Yes, completely free with no hidden charges or registration required.',
          },
          {
            q: 'How long does processing take?',
            a: 'Most documents process within seconds depending on file size.',
          },
          {
            q: 'Is my data secure?',
            a: 'Yes, all files are encrypted and automatically deleted after processing.',
          },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        primaryKeyword="watermark-pdf"
        secondaryKeywords={['Watermark PDF', 'watermark-pdf online', 'free Watermark PDF']}
      />
    </>
  );
}
