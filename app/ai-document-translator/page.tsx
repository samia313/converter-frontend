import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Translator Online – Translate PDFs & Documents | PDFilio',
  description: 'Translate supported PDF and document content with AI assistance. Explore document translation workflows while reviewing important translations against the source.',
  keywords: ['AI document translator', 'document translation', 'PDF translator', 'AI translation'],
  alternates: { canonical: 'https://pdfilio.com/ai-document-translator' },
  openGraph: {
    title: 'AI Document Translator Online | PDFilio',
    description: 'Translate supported PDF and document content with AI assistance.',
    url: 'https://pdfilio.com/ai-document-translator',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Translator"
      toolSlug="ai-document-translator"
      description="Translate supported document content with AI assistance and review the result against the original source."
      mainContent={`AI Document Translator helps you translate supported document content through an AI-assisted workflow. It is designed for users who need to understand documents in another language without manually copying every section into a separate translator.

Supported formats and language coverage depend on the current PDFilio processing workflow. Translation quality can vary with document structure, extracted text, formatting, terminology, and language pair.

For legal, financial, medical, academic, or other high-stakes material, treat AI translation as a review aid and verify important wording against the original document or a qualified human translator.`}
      features={[
        'AI-assisted document translation',
        'PDF translation workflow',
        'Natural-language translation support',
        'Document text extraction',
        'Browser-based workflow',
        'Source-versus-translation review',
        'Support for longer documents where available',
        'Translation review guidance',
      ]}
      benefits={[
        'Translate document content without repetitive copy and paste',
        'Get a useful first-pass translation quickly',
        'Review translated content in the context of the source',
        'Speed up multilingual document understanding',
        'Use one workflow for supported document translation tasks',
        'Keep important terminology and claims subject to human review',
      ]}
      useCase={[
        'Students reading documents in another language',
        'Researchers reviewing multilingual source material',
        'Professionals understanding international documents',
        'Teams preparing first-pass translations',
        'Readers reviewing supported PDF content',
        'Users comparing translated wording with the source',
      ].join('\n')}
      testimonials={[]}
      faqs={[
        {q: 'What is AI Document Translator?', a: 'It is an AI-assisted workflow for translating supported document content into another language.'},
        {q: 'Can I translate a PDF?', a: 'Supported PDFs can be translated through the available PDFilio document-processing workflow.'},
        {q: 'Are AI translations always accurate?', a: 'No. Translation quality can vary. Verify important terminology, numbers, names, quotations, and conclusions against the original source.'},
        {q: 'Can I use it for legal or medical documents?', a: 'It may assist with initial understanding, but important legal or medical translations should be reviewed against the original by an appropriate qualified professional.'},
        {q: 'What file formats are supported?', a: 'Supported formats depend on the current PDFilio processing workflow and the file type you provide.'},
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'AI Document Chat', slug: 'ai-document-chat' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      primaryKeyword="AI document translator"
      secondaryKeywords={['document translation', 'PDF translator', 'AI translation']}
    />
  );
}
