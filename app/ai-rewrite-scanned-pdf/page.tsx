import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Rewrite Scanned PDF - OCR + Rewriting | ConvertHub',
  description: 'Rewrite scanned PDFs with built-in OCR. Extract and enhance text automatically.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Rewrite Scanned PDF"
      toolSlug="ai-rewrite-scanned-pdf"
      description="Rewrite scanned documents instantly. Built-in OCR extracts text, AI enhances automatically."
      mainContent={`Transform scanned documents. OCR extracts text automatically. AI rewrites intelligently. Complete process instantly.

Complete OCR + Rewriting:
Scanned PDFs, handwritten documents, printed pages—everything converts to text. Then AI rewrites for clarity and quality.

Perfect For Archives:
Old documents, historical materials, archived records—make them searchable, readable, and enhanced.`}
      useCase={{
        'Scanned document rewriting': 'OCR extraction',
        'Handwritten document conversion': 'Text extraction',
        'Archive material improvement': 'Historical content',
        'Document digitization': 'Digital transformation',
        'Historical record enhancement': 'Archive improvement',
        'Printed page rewriting': 'Physical to digital',
        'Book page digitization': 'Content extraction',
        'Multi-page document conversion': 'Batch processing',
      }}
      testimonials={{
        'Dr. Elena Rossi': 'Historian - Scanned documents become text instantly. OCR plus rewriting revolutionizes archive research.',
        'Klaus Hoffman': 'Library Director - Our archived collections finally accessible. Scanned materials readable and enhanced.',
      }}
      features={{
        'Advanced OCR': 'Handwriting recognition',
        'Image text extraction': 'Multi-language OCR',
        'Accurate extraction': 'High precision',
        'Instant rewriting': 'Automatic enhancement',
        'Format independence': 'Any scan type',
        'Complete automation': 'No manual work',
        'Quality assured': 'Accuracy verified',
        'Easy processing': 'Simple workflow',
      }}
      benefits={{
        'Scanned docs work': 'No manual entry',
        'Automatic text extraction': 'Complete automation',
        'Handwriting support': 'Flexible input',
        'Archive accessible': 'Digital ready',
        'Improved content': 'Enhanced quality',
        'Searchable results': 'Digital archive',
        'Time efficient': 'Instant processing',
        'Seamless workflow': 'Complete solution',
      }}
      faqs={{
        'Works with scanned?': 'Yes. OCR automatically converts scanned images to text then rewrites.',
        'Handwriting support?': 'Yes. Handwriting recognition included.',
        'Quality?': 'Excellent. High-accuracy OCR with intelligent rewriting.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'AI Document Rewriter', slug: 'ai-document-rewriter' },
      ]}
      primaryKeyword="ai rewrite scanned pdf"
      secondaryKeywords={['scanned document rewriting', 'ocr rewriting']}
    />
  );
}
