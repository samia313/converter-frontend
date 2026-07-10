import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'PowerPoint To PDF | PDFilio',
  description: 'PowerPoint To PDF - Free online PowerPoint To PDF tool. Convert and process PDFs instantly.',
  keywords: 'powerpoint-to-pdf, PowerPoint to PDF, free online converter',
};

export default function ToolPage() {
  return (
    <ToolLandingLayout
      toolName="PowerPoint To PDF"
      toolSlug="powerpoint-to-pdf"
      description="Free online PowerPoint To PDF tool. Fast, secure, and no sign-up required."
      mainContent="PowerPoint To PDF is a powerful online tool that helps you process and convert PDF documents instantly. With advanced technology and an intuitive interface, you can complete your tasks in just a few clicks. All conversions are secure and files are automatically deleted within 24 hours."
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
        { q: 'Is it free?', a: 'Yes, PowerPoint To PDF is completely free with no hidden charges or premium features.' },
        { q: 'How secure is my data?', a: 'All files are encrypted during processing and automatically deleted within 24 hours.' },
        { q: 'Do I need to sign up?', a: 'No sign-up required! Use PowerPoint To PDF immediately without creating an account.' },
        { q: 'What file sizes are supported?', a: 'We support files of any size. No limits on file size whatsoever.' },
        { q: 'Can I use on mobile?', a: 'Yes! PowerPoint To PDF works perfectly on smartphones, tablets, and computers.' },
      ]}
      relatedTools={[
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
      ]}
      primaryKeyword="PowerPoint To PDF"
      secondaryKeywords={["convert PowerPoint To PDF", "online PowerPoint To PDF"]}
    />
  );
}
