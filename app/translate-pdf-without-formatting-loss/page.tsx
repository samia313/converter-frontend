import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Translate PDF Without Losing Formatting - Format-Preserving Translation | TranslateHub',
  description: 'Translate PDFs while preserving formatting. Layouts, fonts, colors, structure—all maintained.',
  keywords: 'translate pdf without losing formatting, format preservation, structure preservation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Translate PDF Without Losing Formatting"
      toolSlug="translate-pdf-without-formatting-loss"
      description="Perfect translation with perfect formatting. Your PDF layout, fonts, colors, and structure remain exactly as designed."
      mainContent={`Format-perfect translation. Translate your PDF while keeping every design detail exactly as intended.

Format Preservation:
- Layout preservation
- Font preservation
- Color retention
- Structure maintenance
- Image placement
- Table formatting
- Design integrity
- Perfect output

Your Design Matters:
Some translators destroy formatting. This one preserves every detail—layout, fonts, spacing, colors, everything.

Professional Output:
Your PDF looks exactly right in the new language. Formatting perfect, design intact, professional quality.`}
      features={[
        'Layout preservation',
        'Font retention',
        'Color preservation',
        'Structure maintenance',
        'Image placement',
        'Table formatting',
        'Design integrity',
        'Perfect alignment',
      ]}
      benefits={[
        'Perfect formatting',
        'Design preservation',
        'Professional appearance',
        'No reformatting needed',
        'Time efficient',
        'Quality output',
        'Design integrity',
        'Immediate use',
      ]}
      useCase={[
        'Marketing documents',
        'Design-critical PDFs',
        'Branded materials',
        'Complex layouts',
        'Technical documentation',
        'Reports with tables',
        'Presentations',
        'Professional documents',
        'Layout-sensitive work',
        'Design preservation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Sophie Bernard',
          role: 'Design Manager',
          text: 'Formatting stays perfect. Translated PDF looks exactly like the original—beautiful design preserved.',
        },
        {
          name: 'James O\'Connor',
          role: 'Marketing Manager',
          text: 'No reformatting needed. Branded materials translate perfectly, design completely intact.',
        },
      ]}
      faqs={[
        {
          q: 'Does formatting really stay the same?',
          a: 'Yes, completely. Layout, fonts, colors, structure—everything preserved exactly.',
        },
        {
          q: 'What about complex layouts?',
          a: 'Handles complex layouts, tables, and multi-column designs perfectly.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
      ]}
      primaryKeyword="translate pdf without losing formatting"
      secondaryKeywords={['format preservation', 'structure preservation']}
    />
  );
}
