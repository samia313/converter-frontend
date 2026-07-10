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
      useCase={`Diverse document types
Mixed collections
Unified solution
Complete projects
Cross-format needs
Workflow simplification
Enterprise translation
Global document management`}
      testimonials={[
        {
          name: 'Michelle Rodriguez',
          role: 'Operations Director',
          text: 'One tool handles all our document types. Word, PDF, images—everything translates perfectly.',
        },
        {
          name: 'Antonio Garcia',
          role: 'Global Coordinator',
          text: 'Unified solution for all our translation needs. Simplified our workflow completely.',
        },
      ]}
      features={[
        'Multi-format support',
        'Image translation',
        'Universal translation',
        'Single interface',
        'Batch capability',
        'Advanced features',
        'Quality assurance',
        'Complete documentation',
      ]}
      benefits={[
        'One tool everything',
        'No conversion needed',
        'Time efficient',
        'Easy integration',
        'Professional quality',
        'Productivity boost',
        'Enterprise ready',
        'Scalable solution',
      ]}
      faqs={[
        {
          q: 'What formats?',
          a: 'PDFs, Word docs, PowerPoints, images, Excel, and more. Virtually any document format.',
        },
        {
          q: 'Auto-detect?',
          a: 'Yes. Automatically detects and translates any document format correctly.',
        },
        {
          q: 'One workflow?',
          a: 'Yes. Single unified workflow for all document types.',
        },
      ]}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI Translate PDF Documents', slug: 'ai-translate-pdf-documents' },
      ]}
      primaryKeyword="ai document translation tool"
      secondaryKeywords={['multi-format translator', 'complete solution']}
    />
  );
}
