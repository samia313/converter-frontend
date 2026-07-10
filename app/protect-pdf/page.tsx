import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ProtectPdfTool from '@/components/tools/protect-pdf-tool';

export const metadata: Metadata = {
  title: 'Protect PDF | PDFilio',
  description: 'Protect PDF online for free. Fast, secure, and easy to use.',
  keywords: ['protect-pdf', 'Protect PDF'],
};

export default function ProtectPdfToolPage() {
  return (
    <>
      <ProtectPdfTool />
      <ToolLandingLayout
        toolName="Protect PDF"
        toolSlug="protect-pdf"
        description="Powerful online Protect PDF tool. Fast, secure, and completely free."
        heroImage="/tool-images/protect-pdf-hero.png"
        mainContent="Protect PDF helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="Protect PDF is perfect for professionals who need reliable document processing."
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
        primaryKeyword="protect-pdf"
        secondaryKeywords={['Protect PDF', 'protect-pdf online', 'free Protect PDF']}
      />
    </>
  );
}
