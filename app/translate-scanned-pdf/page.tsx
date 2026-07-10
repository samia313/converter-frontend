import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Translate Scanned PDF - OCR + AI Translation | TranslateHub',
  description: 'Translate scanned PDFs and images. Built-in OCR extracts text automatically.',
  keywords: 'translate scanned pdf, scanned document translation, ocr translation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Translate Scanned PDF"
      toolSlug="translate-scanned-pdf"
      description="Translate scanned documents instantly. Built-in OCR extracts text, then AI translates automatically."
      mainContent={`Scanned documents come alive. OCR extracts text automatically, then AI translates into any language instantly.

Scanned Document Magic:
- Automatic OCR processing
- Handwriting recognition
- Image text extraction
- Document image support
- Automatic translation
- Transparent workflow
- No manual steps
- Complete automation

Works With Anything:
Scanned books, old documents, printed pages, handwritten notes, document photos—any scanned format works.

Perfect For Archives:
Transform old documents into searchable, translatable resources instantly.`}
      features={[
        'Automatic OCR',
        'Handwriting recognition',
        'Image processing',
        'Text extraction',
        'Document image support',
        'Transparent workflow',
        'AI translation',
        'Complete automation',
      ]}
      benefits={[
        'Scanned documents work',
        'Automatic extraction',
        'Handwriting support',
        'Archive friendly',
        'No manual processing',
        'Complete automation',
        'Easy translation',
        'Seamless workflow',
      ]}
      useCase={[
        'Scanned documents',
        'Handwritten content',
        'Document photos',
        'Archive materials',
        'Old papers',
        'Image PDFs',
        'Printed documents',
        'Historical documents',
        'Document collections',
        'Archive translation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Professor Eleanor Rodriguez',
          role: 'Historian',
          text: 'Historical documents instantly become translatable. OCR plus translation revolutionizes archive research.',
        },
        {
          name: 'Anna Schmidt',
          role: 'Library Manager',
          text: 'Our scanned collections are now accessible for translation. Archive materials finally useful.',
        },
      ]}
      faqs={[
        {
          q: 'Works with scanned documents?',
          a: 'Yes. OCR automatically converts scanned images to text for translation.',
        },
        {
          q: 'Handwriting support?',
          a: 'Yes, includes handwriting recognition for handwritten documents.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'AI OCR PDF Translator', slug: 'ai-ocr-pdf-translator' },
      ]}
      primaryKeyword="translate scanned pdf"
      secondaryKeywords={['scanned document translation', 'ocr translation']}
    />
  );
}
