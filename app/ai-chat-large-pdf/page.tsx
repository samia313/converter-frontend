import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat for Large PDF Files - Handle Any Document Size | PDFilio',
  description: 'Chat with large PDFs. 100+ pages, 1000+ pages - any size document handled instantly.',
  keywords: 'large pdf chat, big document chat, long pdf ai, massive file support',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Chat for Large PDF Files"
      toolSlug="ai-chat-large-pdf"
      description="Handle massive PDFs. Chat with documents of any size - 100 pages, 1000 pages, unlimited."
      mainContent={`No size limits. Whether your PDF is 5 pages or 5000 pages, chat works instantly and completely.

Unlimited File Support:
- 100+ page PDFs
- 1000+ page PDFs
- Multi-volume documents
- Complete book files
- Entire databases in PDF
- No size restrictions
- Instant processing
- Complete access

Process Large Files Instantly:
Large files that used to require special handling? Now process and chat instantly like any other PDF.

Handle Everything:
Annual reports, comprehensive manuals, complete books, doctoral theses - if it&apos;s a PDF, you can chat with it.`}
      features={[
        'Unlimited file size',
        'Multi-page support',
        '1000+ page PDFs',
        'Complete processing',
        'No fragmentation',
        'Instant access',
        'All pages indexed',
        'Full document chat',
      ]}
      benefits={[
        'No file limits',
        'Complete access',
        'Fast processing',
        'Comprehensive understanding',
        'Handle complexity',
        'Professional documents',
        'Large projects',
        'Enterprise support',
      ]}
      useCase={[
        'Large reports',
        'Multi-volume documents',
        'Complete books',
        'Comprehensive manuals',
        'Academic dissertations',
        'Database exports',
        'Long documents',
        'Complete archives',
        'Extensive files',
        'Large projects',
      ].join('\n')}
      testimonials={[
        {
          name: 'Dr. Jennifer Martinez',
          role: 'Archivist',
          text: 'Finally can chat with complete documents. No splitting, no limitations. Chat with 1000-page PDFs instantly.',
        },
        {
          name: 'Robert Johnson',
          role: 'Database Manager',
          text: 'Export our entire database to PDF and chat with it. Handles massive files without issues.',
        },
      ]}
      faqs={[
        {
          q: 'How large?',
          a: 'Any size. 100 pages, 1000 pages, unlimited. No file size restrictions.',
        },
        {
          q: 'Is it slow?',
          a: 'No. Handles large files with instant responses.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Chat Large PDF', slug: 'chat-large-pdf' },
      ]}
      primaryKeyword="AI chat large PDF files"
      secondaryKeywords={['big document chat', 'long pdf ai']}
    />
  );
}
