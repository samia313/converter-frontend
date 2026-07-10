import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI OCR PDF Translator - Image to Translation in Seconds | TranslateHub',
  description: 'Translate PDFs with advanced OCR and AI. Extract and translate images and scanned documents.',
  keywords: 'ai ocr pdf translator, ocr translation, image translation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI OCR PDF Translator"
      toolSlug="ai-ocr-pdf-translator"
      description="Advanced OCR meets AI translation. Extract text from images and translate instantly with professional accuracy."
      mainContent={`Image to translation in seconds. Advanced OCR recognizes text from any image, then AI translates perfectly.

OCR + Translation:
- Advanced OCR technology
- Handwriting recognition
- Multi-language OCR
- Accurate extraction
- Instant translation
- High accuracy
- Complex layouts
- Table recognition

Perfect For Image Documents:
Photos of documents, scanned images, printed pages—OCR extracts everything, AI translates it.

Professional Accuracy:
Handles complex layouts, tables, multiple columns, mixed languages—all extracted and translated correctly.`}
      features={[
        'Advanced OCR',
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
      useCase={[
        'Image documents',
        'Scanned PDFs',
        'Photo translation',
        'Handwritten content',
        'Complex layouts',
        'Table documents',
        'Mixed content',
        'Archive scanning',
        'Document photography',
        'Image extraction',
      ].join('\n')}
      testimonials={[
        {
          name: 'Michael Chang',
          role: 'Document Digitization Manager',
          text: 'OCR accuracy is outstanding. Translates complex layouts and tables perfectly.',
        },
        {
          name: 'Lucia Romano',
          role: 'Archive Specialist',
          text: 'Handles our scanned historical documents beautifully. Accurate extraction and translation.',
        },
      ]}
      faqs={[
        {
          q: 'How accurate is OCR?',
          a: 'Very accurate, especially with standard printing. Handles handwriting too.',
        },
        {
          q: 'Complex layouts?',
          a: 'Yes, understands tables, columns, and complex document structures.',
        },
      ]}
      relatedTools={[
        { name: 'Translate Scanned PDF', slug: 'translate-scanned-pdf' },
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
      ]}
      primaryKeyword="ai ocr pdf translator"
      secondaryKeywords={['ocr translation', 'image translation']}
    />
  );
}
