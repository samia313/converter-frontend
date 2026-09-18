import { Metadata } from 'next';
import AISummaryTool from '@/components/tools/ai-summary-tool';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'AI PDF Summarizer – Summarize PDF Documents Online | PDFilio',
  description: 'Summarize supported PDF documents with AI. Get a concise overview of key points and verify important details against the original document.',
  keywords: ['AI PDF summarizer', 'PDF summarizer', 'summarize PDF', 'AI document summary', 'PDF summary'],
  alternates: { canonical: 'https://pdfilio.com/ai-summary' },
  openGraph: {
    title: 'AI PDF Summarizer – Summarize PDF Documents Online | PDFilio',
    description: 'Summarize supported PDF documents with AI and review key points against the original.',
    url: 'https://pdfilio.com/ai-summary',
    type: 'website',
  },
};

export default function AISummaryPage() {
  return (
    <>
      <AISummaryTool />
      <ToolLandingLayout
        toolName="AI PDF Summarizer"
        toolSlug="ai-summary"
        description="Summarize supported PDF documents with AI to get a quicker overview of key points, sections, and important ideas."
        mainContent={`AI PDF summarization can help you get an initial overview of a supported document before reading it in full.

## How to Summarize a PDF with AI

Upload a supported PDF and run the summarization workflow. Use the generated summary as a reading aid, then return to the original document for important details, citations, numbers, and context.

## What AI PDF Summarization Is Useful For

Summaries can help with long reports, research papers, study material, meeting documents, and other text-based PDFs. The usefulness of the result depends on source quality, document structure, extraction quality, and the AI workflow.

## Verify Important Information

AI-generated summaries can omit context or contain mistakes. For legal, medical, financial, academic, contractual, or other high-stakes information, verify important claims against the original PDF.`}
        useCase={[
          'Getting a quick overview of long PDF reports',
          'Reviewing research papers before detailed reading',
          'Studying course and reference material',
          'Extracting key themes from business documents',
          'Preparing notes for further document review',
        ].join('\\n')}
        features={[
          'AI-assisted PDF summarization',
          'Document-focused summaries',
          'Browser-based workflow',
          'Useful for supported text-based PDFs',
          'Quick overview before detailed reading',
        ]}
        benefits={[
          'Understand long documents faster',
          'Create a starting point for detailed review',
          'Reduce time spent finding major themes',
          'Prepare notes and follow-up questions',
        ]}
        faqs={[
          { q: 'Can AI summarize a PDF?', a: 'Yes. Supported PDF documents can be processed through the PDFilio AI summary workflow.' },
          { q: 'Is an AI PDF summary always accurate?', a: 'No. AI summaries can omit context or contain errors, so important information should be checked against the original document.' },
          { q: 'Can I summarize a long PDF?', a: 'Long documents can be useful candidates for summarization, subject to the current tool limits and document-processing capabilities.' },
          { q: 'Can students use an AI PDF summarizer?', a: 'Yes. It can help students get an initial overview of study material and research papers, but original sources should be reviewed for academic work.' },
          { q: 'Can I summarize a scanned PDF?', a: 'Scanned or image-only PDFs may require OCR or text extraction before AI summarization can work effectively.' },
          { q: 'Can I use an AI summary for legal or medical decisions?', a: 'AI summaries should not replace qualified professional review. Verify important information against the original source.' },
        ]}
        relatedTools={[
          { name: 'PDF Chat', slug: 'pdf-chat' },
          { name: 'OCR PDF', slug: 'ocr' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
        ]}
        primaryKeyword="AI PDF summarizer"
        secondaryKeywords={['PDF summarizer', 'summarize PDF', 'AI document summary', 'PDF summary']}
      />
    </>
  );
}
