import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToJpgTool from '@/components/tools/pdf-to-jpg-tool';

export const metadata: Metadata = {
  title: 'PDF to JPG | PDFilio',
  description: 'PDF to JPG online for free. Fast, secure, and easy to use.',
  keywords: ['pdf-to-jpg', 'PDF to JPG'],
};

export default function PDFToJpgToolPage() {
  return (
    <>
      <PDFToJpgTool />
      <ToolLandingLayout
        toolName="PDF to JPG"
        toolSlug="pdf-to-jpg"
        description="Powerful online PDF to JPG tool. Fast, secure, and completely free."
        heroImage="/tool-images/pdf-to-jpg-hero.png"
        mainContent="PDF to JPG helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="PDF to JPG is perfect for professionals who need reliable document processing."
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
        primaryKeyword="pdf-to-jpg"
        secondaryKeywords={['PDF to JPG', 'pdf-to-jpg online', 'free PDF to JPG']}
      />
    </>
  );
}
