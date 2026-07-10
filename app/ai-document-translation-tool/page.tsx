import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Translation Tool - Complete Translation Solution | ConvertHub',
  description: 'Complete document translation tool. PDFs, Word docs, images—translate any format with AI precision.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Translation Tool"
      toolSlug="ai-document-translation-tool"
      description="Universal document translation tool. Handle PDFs, Word documents, images, and more with professional-grade AI."
      mainContent={`The ultimate translation solution. Every document type. Every format. Every language. One unified tool.

Universal Coverage:
PDF, Word, PowerPoint, images, Excel, text—everything translates perfectly. One tool, all formats, all capabilities.

Complete Solution:
From upload to download. Everything handled. No conversions, no steps. Just pure translation.`}
      useCase={{
        'Diverse document types': 'All formats supported',
        'Mixed collections': 'Format flexibility',
        'Unified solution': 'Integrated translation',
        'Complete projects': 'Multi-format support',
        'Cross-format needs': 'All document types',
        'Workflow simplification': 'Single tool approach',
        'Enterprise translation': 'Complete coverage',
        'Global document management': 'Comprehensive solution',
      }}
      testimonials={{
        'Michelle Rodriguez': 'Operations Director - One tool handles all our document types. Word, PDF, images—everything translates perfectly.',
        'Antonio Garcia': 'Global Coordinator - Unified solution for all our translation needs. Simplified our workflow completely.',
      }}
      features={{
        'Multi-format support': 'PDF, Word, PowerPoint',
        'Image translation': 'Format auto-detection',
        'Universal translation': 'Format preservation',
        'Single interface': 'Unified workflow',
        'Batch capability': 'Multi-file support',
        'Advanced features': 'Professional tools',
        'Quality assurance': 'Consistency checks',
        'Complete documentation': 'Export options',
      }}
      benefits={{
        'One tool everything': 'Simplified workflow',
        'No conversion needed': 'Complete coverage',
        'Time efficient': 'Cost effective',
        'Easy integration': 'Format flexibility',
        'Professional quality': 'Unified solution',
        'Productivity boost': 'Workflow optimization',
        'Enterprise ready': 'Complete feature set',
        'Scalable solution': 'Grows with needs',
      }}
      faqs={{
        'What formats?': 'PDFs, Word docs, PowerPoints, images, Excel, and more. Virtually any document format.',
        'Auto-detect?': 'Yes. Automatically detects and translates any document format correctly.',
        'One workflow?': 'Yes. Single unified workflow for all document types.',
      }}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI Translate PDF Documents', slug: 'ai-translate-pdf-documents' },
      ]}
      primaryKeyword="ai document translation tool"
      secondaryKeywords={['multi-format translator', 'complete solution']}
    />
  );
}
