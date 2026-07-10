import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToPngTool from '@/components/tools/pdf-to-png-tool';

export const metadata: Metadata = {
  title: 'PDF to PNG | PDFilio',
  description: 'PDF to PNG online for free. Fast, secure, and easy to use.',
  keywords: ['pdf-to-png', 'PDF to PNG'],
};

export default function PDFToPngToolPage() {
  return (
    <>
      <PDFToPngTool />
      <ToolLandingLayout
        toolName="PDF to PNG"
        toolSlug="pdf-to-png"
        description="Powerful online PDF to PNG tool. Fast, secure, and completely free."
        heroImage="/tool-images/pdf-to-png-hero.png"
        mainContent="PDF to PNG helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="PDF to PNG is perfect for professionals who need reliable document processing."
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
        primaryKeyword="pdf-to-png"
        secondaryKeywords={['PDF to PNG', 'pdf-to-png online', 'free PDF to PNG']}
      />
    </>
  );
}
