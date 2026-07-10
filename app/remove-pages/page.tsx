import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Remove Pages | PDFilio',
  description: 'Remove Pages - Free online Remove Pages tool. Convert and process PDFs instantly.',
  keywords: 'remove-pages, Remove Pages, free online converter',
};

export default function ToolPage() {
  return (
    <ToolLandingLayout
      toolName="Remove Pages"
      toolSlug="remove-pages"
      description="Free online Remove Pages tool. Fast, secure, and no sign-up required."
      mainContent="Remove Pages is a powerful online tool that helps you process and convert PDF documents instantly. With advanced technology and an intuitive interface, you can complete your tasks in just a few clicks. All conversions are secure and files are automatically deleted within 24 hours."
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
        { q: 'Is it free?', a: 'Yes, Remove Pages is completely free with no hidden charges or premium features.' },
        { q: 'How secure is my data?', a: 'All files are encrypted during processing and automatically deleted within 24 hours.' },
        { q: 'Do I need to sign up?', a: 'No sign-up required! Use Remove Pages immediately without creating an account.' },
        { q: 'What file sizes are supported?', a: 'We support files of any size. No limits on file size whatsoever.' },
        { q: 'Can I use on mobile?', a: 'Yes! Remove Pages works perfectly on smartphones, tablets, and computers.' },
      ]}
      relatedTools={[
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
      ]}
      primaryKeyword="Remove Pages"
      secondaryKeywords={["convert Remove Pages", "online Remove Pages"]}
    />
  );
}
