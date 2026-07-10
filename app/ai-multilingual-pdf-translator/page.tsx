import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Multilingual PDF Translator - Multi-Language Translation | TranslateHub',
  description: 'Translate PDFs to multiple languages simultaneously. Batch multilingual translation made easy.',
  keywords: 'multilingual pdf translator, multi-language translation, batch translation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Multilingual PDF Translator"
      toolSlug="ai-multilingual-pdf-translator"
      description="Translate to multiple languages instantly. Create multilingual documents in one step."
      mainContent={`One document, multiple languages. Translate to English, Spanish, French, Chinese, Japanese—all simultaneously.

Multilingual Power:
- Multiple languages
- Single upload
- Batch processing
- Simultaneous translation
- Consistent terminology
- Unified workflow
- Efficient process
- Complete coverage

Perfect For Global Organizations:
Release globally. Translate once, publish everywhere. One document becomes multilingual instantly.

Batch Efficiency:
Translate to 20 languages as easily as one. Batch processing handles volume efficiently.`}
      features={[
        'Multi-language support',
        'Batch processing',
        'Simultaneous translation',
        'Consistent terminology',
        'Unified workflow',
        'Multiple outputs',
        'Efficient processing',
        'Complete coverage',
      ]}
      benefits={[
        'Global reach',
        'Single workflow',
        'Time efficient',
        'Consistent messaging',
        'Easy scaling',
        'Batch efficiency',
        'Multiple languages',
        'Complete coverage',
      ]}
      useCase={[
        'Global launch',
        'Multilingual organizations',
        'International content',
        'Global marketing',
        'Multilingual teams',
        'Document standardization',
        'Large projects',
        'International expansion',
        'Language diversity',
        'Global communication',
      ].join('\n')}
      testimonials={[
        {
          name: 'Yuki Yamamoto',
          role: 'Global Product Manager',
          text: 'Translate to 20 languages at once. Perfect for global product launches and international releases.',
        },
        {
          name: 'Stefan Müller',
          role: 'International Director',
          text: 'One upload, multiple languages. Workflow simplified, translation scaled efficiently.',
        },
      ]}
      faqs={[
        {
          q: 'How many languages simultaneously?',
          a: 'Any number. Translate to 2, 10, or 20+ languages in one batch.',
        },
        {
          q: 'Terminology consistent?',
          a: 'Yes, maintains terminology consistency across all language versions.',
        },
      ]}
      relatedTools={[
        { name: 'PDF Language Translator', slug: 'pdf-language-translator' },
        { name: 'Online PDF Language Converter', slug: 'online-pdf-language-converter' },
      ]}
      primaryKeyword="multilingual pdf translator"
      secondaryKeywords={['multi-language translation', 'batch translation']}
    />
  );
}
