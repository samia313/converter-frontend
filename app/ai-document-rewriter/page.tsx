import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Rewriter - Multi-Format Document Enhancement | ConvertHub',
  description: 'Rewrite any document format with AI. PDFs, Word docs, images—all supported.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Rewriter"
      toolSlug="ai-document-rewriter"
      description="Universal document rewriting. Handle PDFs, Word documents, and more with professional-grade AI enhancement."
      mainContent={`One tool for all document types. PDF, Word, PowerPoint, images—every format handled perfectly with consistent quality.

Universal Compatibility:
Format doesn&apos;t matter. Upload any document. AI rewrites intelligently. Results maintain original format beautifully. One unified workflow.

Complete Document Solution:
No format switching. No separate tools. Single interface for all your rewriting needs. Simplified workflow. Professional results always.`}
      useCase={{
        'Mixed document formats': 'PDF and Word documents',
        'Multi-format projects': 'Diverse file types',
        'Workflow simplification': 'Single tool approach',
        'Document variety': 'All formats supported',
        'Universal rewriting': 'Any document type',
        'Format flexibility': 'Complete coverage',
        'Enterprise documents': 'All types handled',
        'Unified management': 'Single solution',
      }}
      testimonials={{
        'Jennifer Martinez': 'Document Manager - Handles all our formats perfectly. Word, PDF, images—everything works. Simplified our entire workflow.',
        'Carlos Rodriguez': 'Operations Director - One tool for all document types. Eliminated need for multiple services. Cost effective and efficient.',
      }}
      features={{
        'Multi-format support': 'PDF, Word, PowerPoint',
        'Image document handling': 'All types included',
        'Format auto-detection': 'Automatic identification',
        'Format preservation': 'Original maintained',
        'Single interface': 'Unified workflow',
        'Batch processing': 'Multiple documents',
        'Quality consistency': 'All formats equal',
        'Export flexibility': 'Multiple outputs',
      }}
      benefits={{
        'One tool everything': 'Complete solution',
        'Simplified workflow': 'No format switching',
        'Time efficient': 'Unified process',
        'Cost effective': 'Single tool',
        'No complications': 'Format independence',
        'Consistent quality': 'All formats equal',
        'Enterprise ready': 'Scalable solution',
        'Professional results': 'Quality guaranteed',
      }}
      faqs={{
        'What formats work?': 'PDFs, Word docs, PowerPoints, images, and more. Virtually any document format.',
        'Same quality?': 'Yes. Identical AI quality regardless of format.',
        'Format stays?': 'Completely preserved. Downloads in original format.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Rewrite PDF with AI', slug: 'rewrite-pdf-with-ai' },
      ]}
      primaryKeyword="ai document rewriter"
      secondaryKeywords={['multi-format rewriter', 'universal document tool']}
    />
  );
}
