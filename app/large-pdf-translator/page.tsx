import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Large PDF Translator - Translate Massive Documents | TranslateHub',
  description: 'Translate large PDFs instantly. 100+ pages, 1000+ pages—any document size handled.',
  keywords: 'large pdf translator, big document translation, long pdf translation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Large PDF Translator"
      toolSlug="large-pdf-translator"
      description="Handle massive PDFs. Translate documents of any size—100 pages, 1000 pages, unlimited."
      mainContent={`No size limits. Whether your PDF is 10 pages or 1000 pages, translation works instantly and completely.

Unlimited Document Support:
- 100+ page PDFs
- 1000+ page PDFs
- Multi-volume documents
- Complete book files
- Entire documents
- No size restrictions
- Instant processing
- Complete access

Process Large Files Instantly:
Large documents that used to require special handling? Now translate and process instantly.

Handle Everything:
Annual reports, comprehensive manuals, complete books, long documents—if it's a PDF, you can translate it.`}
      features={[
        'Unlimited file size',
        'Multi-page support',
        '1000+ page PDFs',
        'Complete processing',
        'No fragmentation',
        'Instant access',
        'All pages indexed',
        'Full document translation',
      ]}
      benefits={[
        'No file limits',
        'Complete access',
        'Fast processing',
        'Comprehensive translation',
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
          name: 'Dr. Marcus Williams',
          role: 'Archivist',
          text: 'Finally can translate complete documents. No splitting, no limitations. Translate 1000-page PDFs instantly.',
        },
        {
          name: 'Jennifer Harris',
          role: 'Database Manager',
          text: 'Export our entire database to PDF and translate it. Handles massive files without issues.',
        },
      ]}
      faqs={[
        {
          q: 'How large?',
          a: 'Any size. 100 pages, 1000 pages, unlimited. No file size restrictions.',
        },
        {
          q: 'Is it slow?',
          a: 'No. Handles large files with instant translation.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
      ]}
      primaryKeyword="large pdf translator"
      secondaryKeywords={['big document translation', 'long pdf translation']}
    />
  );
}
