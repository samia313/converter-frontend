import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Paper Translator - Academic Document Translation | TranslateHub',
  description: 'Translate research papers with academic expertise. Technical terminology and academic precision.',
  keywords: 'research paper translator, academic translation, technical document translation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Paper Translator"
      toolSlug="research-paper-pdf-translator"
      description="Specialized for research papers. Translate academic PDFs with precision, protecting terminology and scientific accuracy."
      mainContent={`Research-focused translation. Understand academic papers better in any language. Expertise with methodology, findings, terminology.

Research Optimized:
- Technical terminology
- Academic accuracy
- Methodology preservation
- Finding accuracy
- Citation handling
- Research precision
- Academic focus
- Scholarly translation

Research Efficiency:
Literature review faster. Paper analysis deeper. Research productivity improved with expert translation.

For Academics:
Perfect for researchers, graduate students, and faculty conducting international research and literature reviews.`}
      features={[
        'Technical terminology',
        'Academic precision',
        'Methodology accuracy',
        'Finding preservation',
        'Citation handling',
        'Academic structure',
        'Scholarly translation',
        'Research expertise',
      ]}
      benefits={[
        'Research efficiency',
        'Technical accuracy',
        'Better understanding',
        'Terminology preservation',
        'Methodology clarity',
        'Academic integrity',
        'Time efficient',
        'Quality output',
      ]}
      useCase={[
        'Literature review',
        'Paper translation',
        'Methodology study',
        'Finding comparison',
        'Citation tracking',
        'International research',
        'Academic writing',
        'Thesis support',
        'Research projects',
        'Paper comprehension',
      ].join('\n')}
      testimonials={[
        {
          name: 'Dr. Heinrich Mueller',
          role: 'PhD Researcher',
          text: 'Perfect for international research. Technical accuracy for methodology and findings. Literature review efficiency doubled.',
        },
        {
          name: 'Olivia Martinez',
          role: 'Graduate Student',
          text: 'Understanding research papers in different languages is now accurate and precise. Technical terminology preserved.',
        },
      ]}
      faqs={[
        {
          q: 'Research-specific?',
          a: 'Yes, understands research structure and academic formats with technical precision.',
        },
        {
          q: 'Preserves terminology?',
          a: 'Yes, maintains technical and scientific terminology accurately.',
        },
      ]}
      relatedTools={[
        { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
        { name: 'Smart PDF Translator', slug: 'smart-pdf-translator' },
      ]}
      primaryKeyword="research paper pdf translator"
      secondaryKeywords={['academic translation', 'technical document translation']}
    />
  );
}
