import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PowerpointToPdfTool from '@/components/tools/powerpoint-to-pdf-tool';

export const metadata: Metadata = {
  title: 'PowerPoint to PDF | PDFilio',
  description: 'PowerPoint to PDF online for free. Fast, secure, and easy to use.',
  keywords: ['powerpoint-to-pdf', 'PowerPoint to PDF'],
};

export default function PowerpointToPdfToolPage() {
  return (
    <>
      <PowerpointToPdfTool />
      <ToolLandingLayout
        toolName="PowerPoint to PDF"
        toolSlug="powerpoint-to-pdf"
        description="Powerful online PowerPoint to PDF tool. Fast, secure, and completely free."
        heroImage="/tool-images/powerpoint-to-pdf-hero.png"
        mainContent="PowerPoint to PDF helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="PowerPoint to PDF is perfect for professionals who need reliable document processing."
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
        primaryKeyword="powerpoint-to-pdf"
        secondaryKeywords={['PowerPoint to PDF', 'powerpoint-to-pdf online', 'free PowerPoint to PDF']}
      />
    </>
  );
}
