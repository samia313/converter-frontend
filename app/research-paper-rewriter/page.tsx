import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Paper Rewriter - Academic Research Enhancement | ConvertHub',
  description: 'Rewrite research papers professionally. Maintain scientific integrity with AI enhancement.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Research Paper Rewriter"
      toolSlug="research-paper-rewriter"
      description="Specialized for research papers. Professional rewriting with maintained scientific integrity and academic rigor."
      mainContent={`Research-focused enhancement. Technical terminology preserved. Methodology accuracy maintained. Findings clarity improved. Research integrity protected.

Research Optimized:
Technical precision. Scientific accuracy. Methodology protection. Finding accuracy. Citation integrity. Research standards.

For Researchers:
Perfect for academics, graduate students, researchers conducting international research and publication preparation.`}
      useCase={{
        'Research paper clarity': 'Academic enhancement',
        'Methodology explanation': 'Technical accuracy',
        'Finding presentation': 'Results clarity',
        'Publication preparation': 'Manuscript readiness',
        'International publication': 'Academic quality',
        'Literature review': 'Scholarly excellence',
        'Dissertation improvement': 'Professional polish',
        'Academic publication': 'Expert standard',
      }}
      testimonials={{
        'Dr. Heinrich Mueller': 'Research Director - Paper rewrites enhance clarity while protecting methodology accuracy.',
        'Olivia Martinez': 'Doctoral Researcher - Helps prepare manuscripts for international publication. Scientific integrity maintained.',
      }}
      features={{
        'Technical terminology': 'Precise language',
        'Methodology accuracy': 'Science protected',
        'Finding clarity': 'Results improved',
        'Citation integrity': 'Reference maintained',
        'Scientific structure': 'Proper organization',
        'Academic rigor': 'Scholarly standard',
        'Publication ready': 'Manuscript quality',
        'Research protection': 'Science preserved',
      }}
      benefits={{
        'Research clarity': 'Better understanding',
        'Technical accuracy': 'Science maintained',
        'Methodology preserved': 'Science integrity',
        'Finding clarity': 'Results improved',
        'Publication ready': 'Manuscript quality',
        'Academic credibility': 'Scholarly tone',
        'Time efficient': 'Quick processing',
        'International quality': 'Professional standard',
      }}
      faqs={{
        'Preserves methodology?': 'Yes. Technical accuracy and scientific integrity maintained completely.',
        'Citation compatible?': 'Yes. All citations and references preserved exactly.',
        'Publication ready?': 'Yes. Professional quality for international publication.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Academic PDF Rewriter', slug: 'academic-pdf-rewriter' },
      ]}
      primaryKeyword="research paper rewriter"
      secondaryKeywords={['academic enhancement', 'paper improvement']}
    />
  );
}
