import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Translate PDF Online – Translate PDF Documents | PDFilio',
  description: 'Translate supported PDF documents online with a browser-based PDFilio workflow. Review translated text and formatting against the original document.',
  keywords: ['translate PDF online', 'PDF translator', 'translate PDF document', 'online PDF translation', 'translate PDF to English'],
  alternates: { canonical: 'https://pdfilio.com/translate-pdf-online' },
  openGraph: {
    title: 'Translate PDF Online – Translate PDF Documents | PDFilio',
    description: 'Translate supported PDF documents online and review the translated result against the original.',
    url: 'https://pdfilio.com/translate-pdf-online',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Translate PDF Online"
      toolSlug="translate-pdf-online"
      description="Translate supported PDF documents online from your browser. Review translated text, page structure, and important terminology against the original document."
      mainContent={`Translate PDF documents when you need to understand or reuse content in another language.

## How to Translate a PDF Online

Upload a supported PDF, choose the available source and target languages, start the translation workflow, and review the result. Translation quality and formatting can vary with the document structure, language pair, fonts, tables, images, and scanned content.

## PDF Translation and Formatting

Translated text can be longer or shorter than the original, so page breaks, spacing, tables, and other layout elements may change. For important documents, compare the translated result with the source PDF.

## Scanned PDF Translation

Image-only or scanned PDFs may require OCR before their text can be translated. If the text cannot be selected or extracted, use OCR first where appropriate.

## Review Important Translations

For legal, medical, financial, contractual, academic, or official documents, verify names, dates, numbers, terminology, and critical statements against the original or a qualified human translator.`}
      useCase={[
        'Translating business PDF documents',
        'Understanding research papers in another language',
        'Translating study material and reports',
        'Reviewing travel and reference documents',
        'Creating a translated working copy of a PDF',
      ].join('\\n')}
      features={[
        'Browser-based PDF translation workflow',
        'Support for available language options',
        'Document-focused translation',
        'Works from supported modern browsers',
        'Useful for text-based PDF documents',
        'Review translated content against the original',
      ]}
      benefits={[
        'Understand PDF content in another language',
        'Reduce manual copying and retyping',
        'Create a translated working copy for review',
        'Access the workflow from supported devices',
      ]}
      faqs={[
        { q: 'Can I translate a PDF online?', a: 'Yes. PDFilio provides a browser-based workflow for supported PDF translation tasks.' },
        { q: 'Can I translate a PDF to English?', a: 'If English is available as a target language in the current translation workflow, you can select it and process a supported document.' },
        { q: 'Will PDF formatting stay exactly the same after translation?', a: 'Not necessarily. Translation can change text length and therefore affect page breaks, spacing, tables, and other layout elements.' },
        { q: 'Can I translate a scanned PDF?', a: 'Scanned PDFs may require OCR first because image-only pages do not contain normally selectable text.' },
        { q: 'Should I trust an AI or machine translation for legal documents?', a: 'Use automated translation as a working aid and verify important legal, medical, financial, contractual, or official content against the original and qualified human expertise.' },
        { q: 'Can I use PDF translation on my phone?', a: 'The workflow is designed for browser-based use on supported phones, tablets, and desktop browsers.' },
      ]}
      relatedTools={[
        { name: 'OCR PDF', slug: 'ocr' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'AI PDF Summary', slug: 'ai-summary' },
        { name: 'PDF Chat', slug: 'pdf-chat' },
      ]}
      primaryKeyword="translate PDF online"
      secondaryKeywords={['PDF translator', 'translate PDF document', 'online PDF translation', 'translate PDF to English']}
    />
  );
}
