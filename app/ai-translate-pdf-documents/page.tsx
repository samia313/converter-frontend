import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Translate PDF Documents - Multi-Format Support | ConvertHub',
  description: 'Translate any document format. PDFs, Word docs, images, and more with AI precision.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Translate PDF Documents"
      toolSlug="ai-translate-pdf-documents"
      description="Universal document translation. Translate PDFs, Word documents, images, and other formats seamlessly."
      mainContent={`One tool for all document types. PDF, Word, PowerPoint, images—any document format translates perfectly.

Universal Compatibility:
Don't worry about file formats. Upload whatever you have. Automatic format detection. Instant translation. Results maintain original formatting perfectly.

Simplified Workflow:
No format conversion needed. No separate tools. Just upload and translate. Works with everything.`}
      useCase={[
        'Multi-format document translation',
        'Mixed document collections',
        'Workflow simplification',
        'Document format flexibility',
        'Cross-format projects',
        'Unified translation solution',
        'All document types',
        'Format-agnostic translation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Michelle Lee',
          role: 'Document Manager',
          text: 'Works with all our document types. Word, PDF, PowerPoint—everything translates perfectly. Simplified our workflow completely.',
        },
        {
          name: 'Antonio Garcia',
          role: 'Project Coordinator',
          text: 'No format switching needed. One tool handles all document formats we need. Very efficient.',
        },
      ]}
      features={[
        'Multi-format support',
        'PDF translation',
        'Word document support',
        'PowerPoint support',
        'Image translation',
        'Format auto-detection',
        'Universal translation',
        'Format preservation',
      ]}
      benefits={[
        'One tool all formats',
        'Simplified workflow',
        'No conversion needed',
        'Complete coverage',
        'Time efficient',
        'Cost effective',
        'Easy integration',
        'Format flexibility',
      ]}
      faqs={[
        {
          q: 'What formats work?',
          a: 'PDFs, Word documents, PowerPoints, images, and more. Virtually any document format.',
        },
        {
          q: 'Auto-detect format?',
          a: 'Yes. Automatically detects and translates any document format correctly.',
        },
      ]}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI Document Translation Tool', slug: 'ai-document-translation-tool' },
      ]}
      primaryKeyword="ai translate pdf documents"
      secondaryKeywords={['multi-format translation', 'document translator']}
    />
  );
}
