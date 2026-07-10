import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'PDF To PowerPoint | PDFilio',
  description: 'PDF To PowerPoint - Free online PDF To PowerPoint tool. Convert and process PDFs instantly.',
  keywords: 'pdf-to-powerpoint, PDF to PowerPoint, free online converter',
};

export default function ToolPage() {
  return (
    <ToolLandingLayout
      toolName="PDF To PowerPoint"
      toolSlug="pdf-to-powerpoint"
      description="Free online PDF To PowerPoint tool. Fast, secure, and no sign-up required."
      mainContent="PDF To PowerPoint is a powerful online tool that helps you process and convert PDF documents instantly. With advanced technology and an intuitive interface, you can complete your tasks in just a few clicks. All conversions are secure and files are automatically deleted within 24 hours."
      features={[
        'Fast processing',
        'Secure encryption',
        'No installation required',
        'Free to use',
        'No file size limits',
        'Batch processing support',
      ]}
      benefits={[
        'Save time with instant processing',
        'Maintain document quality',
        'Works on all devices',
        'Easy to use interface',
        'Privacy-focused',
        'Zero learning curve',
      ]}
      faqs={[
        { q: 'How does it work?', a: 'Simply upload your file, click the convert button, and download your result. That is all!' },
        { q: 'Is it free?', a: 'Yes, PDF To PowerPoint is completely free with no hidden charges or premium features.' },
        { q: 'How secure is my data?', a: 'All files are encrypted during processing and automatically deleted within 24 hours.' },
        { q: 'Do I need to sign up?', a: 'No sign-up required! Use PDF To PowerPoint immediately without creating an account.' },
        { q: 'What file sizes are supported?', a: 'We support files of any size. No limits on file size whatsoever.' },
        { q: 'Can I use on mobile?', a: 'Yes! PDF To PowerPoint works perfectly on smartphones, tablets, and computers.' },
      ]}
      relatedTools={[
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
      ]}
      primaryKeyword="PDF To PowerPoint"
      secondaryKeywords={["convert PDF To PowerPoint", "online PDF To PowerPoint"]}
    />
  );
}
