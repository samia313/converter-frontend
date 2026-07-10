import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Translator - Intelligent Document Translation | TranslateHub',
  description: 'Translate PDFs using advanced AI. Accurate translations that preserve formatting and context.',
  keywords: 'ai pdf translator, pdf translation, document translator, ai translator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Translator"
      toolSlug="ai-pdf-translator"
      description="Advanced AI-powered PDF translation. Translate documents instantly while maintaining formatting and context accuracy."
      mainContent={`Break language barriers instantly. Upload your PDF and get professional-quality translation powered by cutting-edge AI technology.

AI Translation Excellence:
- Advanced language models
- Context-aware translation
- Accurate terminology
- Semantic understanding
- Nuanced expressions
- Idiomatic accuracy
- Cultural adaptation
- Professional quality

Beyond Word-for-Word Translation:
Traditional translators work word-by-word. Advanced AI understands context, meaning, and nuance. Your translation is accurate, not literal.

Perfect For Global Communication:
Business documents, academic papers, customer communications - any document that needs accurate translation across languages.`}
      features={[
        'Advanced AI models',
        'Context understanding',
        'Accurate terminology',
        'Semantic translation',
        'Idiomatic expressions',
        'Cultural nuance',
        'Professional output',
        'Real-time processing',
      ]}
      benefits={[
        'Accurate translation',
        'Saves time',
        'Professional quality',
        'Global reach',
        'Cost effective',
        'Instant delivery',
        'Consistent voice',
        'Cultural relevance',
      ]}
      useCase={[
        'Business documents',
        'International communication',
        'Global expansion',
        'Multilingual support',
        'Document translation',
        'Cross-cultural communication',
        'International contracts',
        'Global marketing',
        'Academic translation',
        'Professional communication',
      ].join('\n')}
      testimonials={[
        {
          name: 'Elena Rossi',
          role: 'International Business Manager',
          text: 'Translation quality is outstanding. Not just accurate—it preserves tone and business context perfectly.',
        },
        {
          name: 'David Kumar',
          role: 'Document Specialist',
          text: 'Professional translations that would take hours manually completed in minutes with perfect quality.',
        },
      ]}
      faqs={[
        {
          q: 'How accurate is the translation?',
          a: 'Very accurate. AI understands context, terminology, and nuance for professional-quality output.',
        },
        {
          q: 'What languages are supported?',
          a: 'All major languages including English, Spanish, French, German, Chinese, Japanese, and 100+ more.',
        },
      ]}
      relatedTools={[
        { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
        { name: 'AI Document Translator', slug: 'ai-document-translator' },
      ]}
      primaryKeyword="ai pdf translator"
      secondaryKeywords={['pdf translation', 'document translator']}
    />
  );
}
