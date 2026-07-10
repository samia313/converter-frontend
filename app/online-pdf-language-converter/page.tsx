import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online PDF Language Converter - Web-Based Translation | TranslateHub',
  description: 'Convert PDF languages online. Fast, easy, browser-based language conversion.',
  keywords: 'pdf language converter, online converter, language conversion',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Online PDF Language Converter"
      toolSlug="online-pdf-language-converter"
      description="Browser-based language converter for PDFs. Convert between any languages instantly online."
      mainContent={`Convert document languages instantly online. Upload your PDF in one language, get it back in another—all in your browser.

Conversion Excellence:
- Language conversion
- Instant processing
- Browser-based
- Multiple languages
- Automatic detection
- One-click conversion
- Instant results
- Complete conversion

Simple Conversion Process:
Upload PDF, select target language, convert. Three simple steps to document translation.

Complete Language Support:
Convert from any language to any language. All major languages and 100+ combinations supported.`}
      features={[
        'Language conversion',
        'Instant processing',
        'Auto-detection',
        'Multi-language support',
        'One-click conversion',
        'Browser-based',
        'No installation',
        'Immediate results',
      ]}
      benefits={[
        'Easy conversion',
        'Instant results',
        'No installation',
        'Any language pair',
        'Simple process',
        'Quick conversion',
        'Accessible anywhere',
        'Complete support',
      ]}
      useCase={[
        'Language switching',
        'Multilingual content',
        'Document conversion',
        'Quick translation',
        'International work',
        'Content adaptation',
        'Language diversity',
        'Cross-language work',
        'Document exchange',
        'Language conversion',
      ].join('\n')}
      testimonials={[
        {
          name: 'Klaus Schmidt',
          role: 'Content Creator',
          text: 'Simple and effective. Convert documents to any language instantly. No complicated steps.',
        },
        {
          name: 'Yuki Tanaka',
          role: 'Publishing Manager',
          text: 'Perfect for converting documents between our multilingual content teams.',
        },
      ]}
      faqs={[
        {
          q: 'How does conversion work?',
          a: 'Upload PDF, select target language, click convert. Get translated PDF instantly.',
        },
        {
          q: 'What languages available?',
          a: '100+ languages supported for conversion.',
        },
      ]}
      relatedTools={[
        { name: 'PDF Language Translator', slug: 'pdf-language-translator' },
        { name: 'Multilingual Translator', slug: 'ai-multilingual-pdf-translator' },
      ]}
      primaryKeyword="pdf language converter"
      secondaryKeywords={['language conversion', 'online converter']}
    />
  );
}
