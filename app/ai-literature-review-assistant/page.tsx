import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Literature Review Assistant - Automated Review Synthesis | ConvertHub',
  description: 'Intelligent tool for conducting comprehensive literature reviews. Synthesize multiple sources instantly.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Literature Review Assistant"
      toolSlug="ai-literature-review-assistant"
      description="Comprehensive literature review platform powered by AI. Synthesize multiple sources, identify themes, build research foundations."
      mainContent={`Literature reviews accelerated dramatically. Analyze multiple papers simultaneously. Identify themes automatically. Synthesize findings efficiently.

Review Synthesis Engine:
AI identifies common themes across papers. Maps research connections. Tracks methodological approaches. Synthesizes diverse findings.

Research Foundation Building:
Understand field comprehensively. Identify research trends. Spot consensus and disagreement. Build solid research foundation.`}
      useCase={`Comprehensive review compilation
Thematic synthesis
Methodological comparison
Research trend mapping
Field overview building
Gap identification
Publication analysis
Research evolution tracking`}
      testimonials={[
        {
          name: 'Dr. Olivia Reeves',
          role: 'Literature Review Specialist',
          text: 'Literature review process transformed. Multi-paper analysis synthesizes findings instantly. Professional quality output.',
        },
        {
          name: 'Marcus Johnson',
          role: 'Research Manager',
          text: 'Team literature review capacity expanded significantly. Quality synthesis rapid and comprehensive.',
        },
        {
          name: 'Isabella Santos',
          role: 'Research Student',
          text: 'Literature review became manageable and thorough. Comprehensive understanding developed quickly.',
        },
      ]}
      features={[
        'Multi-paper synthesis',
        'Theme identification',
        'Thematic mapping',
        'Trend analysis',
        'Methodological comparison',
        'Consensus identification',
        'Gap analysis',
        'Research landscape visualization',
      ]}
      benefits={{
        'Review acceleration': 'Weeks to days',
        'Comprehensive synthesis': 'Complete picture',
        'Theme clarity': 'Pattern recognition',
        'Research foundation': 'Solid base',
      }}
      faqs={[
        {
          q: 'Analyze many papers simultaneously?',
          a: 'Yes. Handles dozens of papers and synthesizes findings into coherent themes.',
        },
        {
          q: 'Identify research gaps?',
          a: 'Absolutely. AI recognizes gaps and opportunities in research landscape.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Paper Assistant', slug: 'ai-research-paper-assistant' },
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
      ]}
      primaryKeyword="ai literature review assistant"
      secondaryKeywords={['literature review tool', 'research synthesis', 'thematic analysis']}
    />
  );
}
