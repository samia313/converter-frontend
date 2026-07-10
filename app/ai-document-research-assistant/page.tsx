import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Research Assistant - Multi-Format Analysis | ConvertHub',
  description: 'Comprehensive document research platform. Analyze any document format, extract insights, support research.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Document Research Assistant"
      toolSlug="ai-document-research-assistant"
      description="Universal document analysis platform. Research any document format comprehensively. Extract insights, analyze content, organize findings."
      mainContent={`Research any document. PDFs, Word documents, text files, images—all formats supported intelligently.

Universal Document Analysis:
One tool handles all document types. Format auto-detection. Intelligent analysis regardless of source. Complete compatibility.

Comprehensive Research:
Analyze diverse documents unified. Extract insights systematically. Support research synthesis efficiently.`}
      useCase={`Multi-format document analysis
Diverse document research
Format-agnostic analysis
Document comparison
Research synthesis
Content extraction
Finding organization
Universal research support`}
      testimonials={[
        {
          name: 'Victoria Chang',
          role: 'Document Specialist',
          text: 'All document formats analyzed seamlessly. No conversion needed. Research efficiency dramatically improved.',
        },
        {
          name: 'Richard Moore',
          role: 'Research Analyst',
          text: 'Universal platform simplifies research process. Document diversity handled intelligently. Research capacity expanded.',
        },
        {
          name: 'Marie Fontaine',
          role: 'Information Manager',
          text: 'Document collection research suddenly manageable. Format diversity no longer barrier. Research excellence achieved.',
        },
      ]}
      features={{
        'Multi-format support': 'All document types',
        'Format detection': 'Automatic identification',
        'Universal analysis': 'Format independence',
        'Content extraction': 'Intelligent reading',
        'Synthesis support': 'Finding organization',
        'Comparison analysis': 'Document comparison',
        'Research support': 'Comprehensive assistance',
        'Finding compilation': 'Systematic organization',
      }}
      benefits={{
        'No conversion': 'Direct analysis',
        'Format freedom': 'Any document type',
        'Research efficiency': 'Unified platform',
        'Capability': 'Complete support',
      }}
      faqs={[
        {
          q: 'All formats supported?',
          a: 'Yes. PDFs, Word documents, images, text files—all document formats analyzed seamlessly.',
        },
        {
          q: 'No format conversion needed?',
          a: 'Correct. Analyze documents in original formats without conversion.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI PDF Research Assistant', slug: 'ai-pdf-research-assistant' },
      ]}
      primaryKeyword="ai document research assistant"
      secondaryKeywords={['document analysis', 'multi-format research', 'universal analysis']}
    />
  );
}
