import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PageNumbersTool from '@/components/tools/page-numbers-tool';

export const metadata: Metadata = {
  title: 'Page Numbers | PDFilio',
  description: 'Page Numbers online for free. Fast, secure, and easy to use.',
  keywords: ['page-numbers', 'Page Numbers'],
};

export default function PageNumbersToolPage() {
  return (
    <>
      <PageNumbersTool />
      <ToolLandingLayout
        toolName="Page Numbers"
        toolSlug="page-numbers"
        description="Powerful online Page Numbers tool. Fast, secure, and completely free."
        heroImage="/tool-images/page-numbers-hero.png"
        mainContent="Page Numbers helps you process PDF files online instantly. Professional quality with zero compromise."
        useCase="Page Numbers is perfect for professionals who need reliable document processing."
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
        primaryKeyword="page-numbers"
        secondaryKeywords={['Page Numbers', 'page-numbers online', 'free Page Numbers']}
      />
    </>
  );
}
