import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Language Translator - Multi-Language Document Translation | TranslateHub',
  description: 'Translate PDFs between any languages. Support for 100+ languages with accurate translation.',
  keywords: 'pdf language translator, language translation, multi-language translator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Language Translator"
      toolSlug="pdf-language-translator"
      description="Universal language translator for PDFs. Translate between 100+ languages with precision and accuracy."
      mainContent={`Translate into any language. From English to Mandarin, Spanish to Arabic, Japanese to Portuguese—all supported with equal quality.

Comprehensive Language Support:
- 100+ languages supported
- All major languages included
- Regional dialect support
- Language detection automatic
- Bidirectional translation
- All character sets supported
- Phonetic support included
- Complete coverage

Professional Language Expertise:
Not just dictionary translation. Professional linguists trained AI models for accurate translation across all languages.

For Global Teams:
International organizations need translation that works everywhere. This tool handles any language combination perfectly.`}
      features={[
        'Multi-language support',
        '100+ languages',
        'Auto-detection',
        'Bidirectional',
        'Dialect support',
        'Character set support',
        'Professional translation',
        'Consistent quality',
      ]}
      benefits={[
        'Global reach',
        'Universal translation',
        'Any language pair',
        'Professional quality',
        'Automatic detection',
        'Seamless switching',
        'Complete coverage',
        'International ready',
      ]}
      useCase={[
        'Global organizations',
        'Multi-language teams',
        'International documents',
        'Language learning',
        'Cross-border commerce',
        'Academic research',
        'International relations',
        'Multilingual support',
        'Language diversity',
        'Global communication',
      ].join('\n')}
      testimonials={[
        {
          name: 'Fatima Al-Rashid',
          role: 'Global Operations Manager',
          text: 'Supports all languages our teams use. Consistent quality across English, Arabic, Chinese, and everything else.',
        },
        {
          name: 'Roberto Garcia',
          role: 'International Coordinator',
          text: 'Works perfectly between any language combinations we need. Professional quality every translation.',
        },
      ]}
      faqs={[
        {
          q: 'How many languages?',
          a: '100+ languages including all major languages and many regional variants.',
        },
        {
          q: 'Equal quality in all languages?',
          a: 'Yes, AI trained on professional translations for consistent quality across all languages.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'Multilingual PDF Translator', slug: 'ai-multilingual-pdf-translator' },
      ]}
      primaryKeyword="pdf language translator"
      secondaryKeywords={['language translation', 'multi-language translator']}
    />
  );
}
