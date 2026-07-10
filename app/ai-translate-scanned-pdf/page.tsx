import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Translate Scanned PDF - OCR + Translation | ConvertHub',
  description: 'Translate scanned PDFs and images. Built-in OCR extracts text automatically.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Translate Scanned PDF"
      toolSlug="ai-translate-scanned-pdf"
      description="Translate scanned documents instantly. Built-in OCR extracts text, AI translates seamlessly."
      mainContent={`Bring scanned documents to life. OCR automatically extracts text from scanned PDFs, images, and handwritten documents. Then AI translates to your language.

Complete OCR + Translation:
Scanned books, old documents, printed pages, handwritten notes—any scanned format works. Automatic extraction. Instant translation.

Perfect For Archives:
Transform old documents into searchable, translatable resources instantly.`}
      useCase={[
        'Scanned document translation',
        'Handwritten document conversion',
        'Archive material translation',
        'Historical document translation',
        'Document image translation',
        'Printed page translation',
        'Book page translation',
        'Multi-page document scanning',
      ].join('\n')}
      testimonials={[
        {
          name: 'Dr. Elena Rossi',
          role: 'Historian',
          text: 'Historical documents instantly become translatable. OCR plus translation revolutionizes archive research completely.',
        },
        {
          name: 'Klaus Hoffman',
          role: 'Library Director',
          text: 'Our scanned collections are now accessible for translation. Archive materials finally useful and searchable.',
        },
      ]}
      features={[
        'Advanced OCR technology',
        'Handwriting recognition',
        'Image text extraction',
        'Multi-language OCR',
        'Accurate extraction',
        'Instant translation',
        'Automatic processing',
        'Format independence',
      ]}
      benefits={[
        'Scanned documents work',
        'Automatic text extraction',
        'Handwriting support',
        'Archive accessible',
        'No manual data entry',
        'Complete automation',
        'Easy translation',
        'Seamless workflow',
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
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI OCR PDF Translator', slug: 'ai-ocr-pdf-translator' },
      ]}
      primaryKeyword="ai translate scanned pdf"
      secondaryKeywords={['scanned document translation', 'ocr translation']}
    />
  );
}
