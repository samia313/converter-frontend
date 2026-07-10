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
      useCase={`Mixed document formats
Multi-format projects
Workflow simplification
Document variety
Universal rewriting
Format flexibility
Enterprise documents
Unified management`}
      testimonials={[
        {
          name: 'Jennifer Martinez',
          role: 'Document Manager',
          text: 'Handles all our formats perfectly. Word, PDF, images—everything works. Simplified our entire workflow.',
        },
        {
          name: 'Carlos Rodriguez',
          role: 'Operations Director',
          text: 'One tool for all document types. Eliminated need for multiple services. Cost effective and efficient.',
        },
      ]}
      features={[
        'Multi-format support',
        'Image document handling',
        'Format auto-detection',
        'Format preservation',
        'Single interface',
        'Batch processing',
        'Quality consistency',
        'Export flexibility',
      ]}
      benefits={[
        'One tool everything',
        'Simplified workflow',
        'Time efficient',
        'Cost effective',
        'No complications',
        'Consistent quality',
        'Enterprise ready',
        'Professional results',
      ]}
      faqs={[
        {
          q: 'What formats work?',
          a: 'PDFs, Word docs, PowerPoints, images, and more. Virtually any document format.',
        },
        {
          q: 'Same quality?',
          a: 'Yes. Identical AI quality regardless of format.',
        },
        {
          q: 'Format stays?',
          a: 'Completely preserved. Downloads in original format.',
        },
      ]}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Rewrite PDF with AI', slug: 'rewrite-pdf-with-ai' },
      ]}
      primaryKeyword="ai document rewriter"
      secondaryKeywords={['multi-format rewriter', 'universal document tool']}
    />
  );
}
