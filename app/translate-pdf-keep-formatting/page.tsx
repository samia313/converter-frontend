import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Translate PDF Keep Formatting - Format-Preserving Translation | ConvertHub',
  description: 'Translate PDFs while preserving formatting. Layouts, fonts, colors, structure—all maintained.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Translate PDF Keep Formatting"
      toolSlug="translate-pdf-keep-formatting"
      description="Perfect translation with perfect formatting. Your PDF layout, fonts, colors, and structure remain exactly as designed."
      mainContent={`Format-perfect translation. Translate your PDF while keeping every design detail exactly as intended.

Perfect Preservation:
Layout preserved. Fonts preserved. Colors retained. Structure maintained. Images placed perfectly. Tables formatted correctly. Design integrity protected.

Your Design Matters:
Formatting stays perfect. Design intact. Professional quality maintained. Translated PDF looks exactly right.`}
      useCase={{
        'Marketing documents': 'Design-critical PDFs',
        'Branded materials': 'Complex layouts',
        'Technical documentation': 'Reports with tables',
        'Presentations': 'Professional documents',
        'Layout-sensitive work': 'Design preservation',
        'Corporate materials': 'Design consistency',
        'Publication materials': 'Format integrity',
        'Graphic-heavy documents': 'Visual preservation',
      }}
      testimonials={{
        'Sophie Bernard': 'Design Manager - Formatting stays perfect. Translated PDF looks exactly like the original—beautiful design preserved.',
        'James O\'Connor': 'Marketing Manager - No reformatting needed. Branded materials translate perfectly, design completely intact.',
      }}
      features={{
        'Layout preservation': 'Font retention',
        'Color preservation': 'Structure maintenance',
        'Image placement': 'Table formatting',
        'Design integrity': 'Perfect alignment',
        'Space preservation': 'Style retention',
        'Format consistency': 'Visual accuracy',
        'Complete fidelity': 'Perfect output',
        'No adjustment needed': 'Ready to use',
      }}
      benefits={{
        'Perfect formatting': 'Design preservation',
        'Professional appearance': 'No reformatting needed',
        'Time efficient': 'Quality output',
        'Design integrity': 'Immediate use',
        'Perfect alignment': 'Visual consistency',
        'Brand protection': 'Format consistency',
        'Professional quality': 'Ready deployment',
        'No fixes needed': 'Pure simplicity',
      }}
      faqs={{
        'Does formatting stay?': 'Yes, completely. Layout, fonts, colors, structure—everything preserved exactly.',
        'Complex layouts?': 'Handles complex layouts, tables, and multi-column designs perfectly.',
        'Time to reformat?': 'No reformatting needed. Use the translated PDF immediately.',
      }}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI PDF Translation', slug: 'ai-pdf-translation' },
      ]}
      primaryKeyword="translate pdf keep formatting"
      secondaryKeywords={['format preservation', 'structure preservation']}
    />
  );
}
