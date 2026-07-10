import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import CropPdfTool from '@/components/tools/crop-pdf-tool';

export const metadata: Metadata = {
  title: 'Crop PDF | PDFilio',
  description: 'Crop PDF online for free. Fast, secure, and easy to use.',
  keywords: ['crop-pdf', 'Crop PDF'],
};

export default function CropPdfToolPage() {
  return (
    <>
      <CropPdfTool />
      <ToolLandingLayout
        toolName="Crop PDF"
        toolSlug="crop-pdf"
        description="Powerful online Crop PDF tool. Fast, secure, and completely free."
        heroImage="/tool-images/crop-pdf-hero.png"
        mainContent="Crop PDF helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="Crop PDF is perfect for professionals who need reliable document processing."
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
        primaryKeyword="crop-pdf"
        secondaryKeywords={['Crop PDF', 'crop-pdf online', 'free Crop PDF']}
      />
    </>
  );
}
