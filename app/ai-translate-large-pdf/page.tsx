import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Translate Large PDF - Unlimited File Size | ConvertHub',
  description: 'Translate large PDFs instantly. 100+ pages, 1000+ pages—any document size handled.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Translate Large PDF"
      toolSlug="ai-translate-large-pdf"
      description="Handle massive PDFs. Translate documents of any size—100 pages, 1000 pages, unlimited."
      mainContent={`No size limits. Whether your PDF is 10 pages or 1000 pages, translation works instantly and completely.

Unlimited Support:
Process large files instantly. No fragmentation. No page limits. Complete document access. All pages translated.

Handle Everything:
Annual reports, comprehensive manuals, complete books—if it&apos;s a PDF, you can translate it.`}
      useCase={[
        'Large report translation',
        'Multi-volume document translation',
        'Complete book translation',
        'Comprehensive manual translation',
        'Academic dissertation translation',
        'Database export translation',
        'Long document translation',
        'Complete archive translation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Dr. Marcus Williams',
          role: 'Archivist',
          text: 'Finally can translate complete documents. No splitting. Translate 1000-page PDFs instantly.',
        },
        {
          name: 'Jennifer Harris',
          role: 'Database Manager',
          text: 'Export our entire database to PDF and translate it. Handles massive files without issues.',
        },
      ]}
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
      faqs={{
        'How large?': 'Any size. 100 pages, 1000 pages, unlimited. No file size restrictions.',
        'Is it slow?': 'No. Handles large files with instant translation.',
      }}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI PDF Translation', slug: 'ai-pdf-translation' },
      ]}
      primaryKeyword="ai translate large pdf"
      secondaryKeywords={['big document translation', 'long pdf translation']}
    />
  );
}
