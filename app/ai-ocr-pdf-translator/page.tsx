import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI OCR PDF Translator - Extract & Translate | ConvertHub',
  description: 'Advanced OCR and AI translation. Extract text from images and translate instantly.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI OCR PDF Translator"
      toolSlug="ai-ocr-pdf-translator"
      description="Advanced OCR meets AI translation. Extract text from any image and translate to any language instantly."
      mainContent={`From image to translation in seconds. Advanced OCR recognizes text from any image, then AI translates it perfectly.

OCR Excellence:
Handles complex layouts, tables, multiple columns, mixed languages. Advanced AI understands document structure and translates appropriately.

Professional Accuracy:
Recognizes printed text, handwriting, and mixed content. Preserves document structure while translating perfectly.`}
      useCase={[
        'Image document translation',
        'Scanned PDF translation',
        'Photo document translation',
        'Handwritten content translation',
        'Complex layout translation',
        'Table extraction and translation',
        'Mixed language documents',
        'Archive material translation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Michael Chang',
          role: 'Digitization Manager',
          text: 'OCR accuracy is outstanding. Translates complex layouts and tables perfectly. Archive materials perfectly handled.',
        },
        {
          name: 'Lucia Romano',
          role: 'Archive Specialist',
          text: 'Handles our scanned historical documents beautifully. Accurate extraction and translation every time.',
        },
      ]}
      features={[
        'Advanced OCR technology',
        'Handwriting recognition',
        'Layout understanding',
        'Table extraction',
        'Multi-language OCR',
        'High accuracy',
        'Complex layouts',
        'Instant translation',
      ]}
      benefits={[
        'Extract images easily',
        'Translate photos',
        'Handwritten translation',
        'Layout preservation',
        'Table support',
        'Professional extraction',
        'Instant results',
        'Quality accuracy',
      ]}
      faqs={[
        {
          q: 'How accurate is OCR?',
          a: 'Very accurate, especially with standard printing. Includes handwriting recognition.',
        },
        {
          q: 'Complex layouts supported?',
          a: 'Yes. Understands tables, columns, and complex document structures.',
        },
      ]}
      relatedTools={[
        { name: 'AI Translate Scanned PDF', slug: 'ai-translate-scanned-pdf' },
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
      ]}
      primaryKeyword="ai ocr pdf translator"
      secondaryKeywords={['ocr translation', 'image translation']}
    />
  );
}
