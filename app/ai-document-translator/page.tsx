import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Translator - Multi-Format Translation | TranslateHub',
  description: 'Translate any document type with AI. PDFs, Word docs, images, and more.',
  keywords: 'ai document translator, document translation, multi-format translator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Translator"
      toolSlug="ai-document-translator"
      description="Universal AI document translation. PDFs, Word documents, images, scans—translate any format."
      mainContent={`One tool for all document types. PDF, Word, image, scan—upload any format and get professional translation instantly.

Universal Format Support:
- PDF documents
- Word documents
- PowerPoint presentations
- Text files
- Images with text
- Scanned documents
- Excel spreadsheets
- Mixed format support

Simplified Workflow:
No format conversion needed. No separate tools. Upload any document and translate immediately.

Complete Compatibility:
Whatever document format you work with, this AI translator handles it seamlessly with automatic format detection.`}
      features={[
        'Multi-format support',
        'PDF and Word',
        'PowerPoint support',
        'Image translation',
        'Scanned documents',
        'Format auto-detection',
        'Universal translation',
        'Complete compatibility',
      ]}
      benefits={[
        'One tool all formats',
        'Simplified workflow',
        'No conversion needed',
        'Complete coverage',
        'Easy integration',
        'Time efficient',
        'Cost effective',
        'Unified solution',
      ]}
      useCase={[
        'Mixed document types',
        'Diverse collections',
        'Workflow simplification',
        'Cross-format needs',
        'Complete projects',
        'Format flexibility',
        'Integrated translation',
        'Unified handling',
        'Multi-format projects',
        'Complete translation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Sophie Leclerc',
          role: 'Document Manager',
          text: 'Works with all our document types. Word docs, PDFs, PowerPoints—everything translates perfectly.',
        },
        {
          name: 'Ming Chen',
          role: 'Project Lead',
          text: 'No format switching needed. One tool translates everything we need.',
        },
      ]}
      faqs={[
        {
          q: 'What formats work?',
          a: 'PDFs, Word docs, PowerPoints, images, scans—virtually any format.',
        },
        {
          q: 'Automatic format detection?',
          a: 'Yes, automatically detects and translates any document format.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'Online PDF Language Converter', slug: 'online-pdf-language-converter' },
      ]}
      primaryKeyword="ai document translator"
      secondaryKeywords={['document translation', 'multi-format translator']}
    />
  );
}
