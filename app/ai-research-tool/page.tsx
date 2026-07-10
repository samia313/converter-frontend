import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Tool - Comprehensive Analysis Platform | ConvertHub',
  description: 'Powerful research tool powered by AI. Analyze, synthesize, extract insights from any research document.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Tool"
      toolSlug="ai-research-tool"
      description="Comprehensive AI-powered research tool for document analysis, information extraction, and research intelligence."
      mainContent={`Professional research platform built for efficiency. Analyze documents rapidly. Extract intelligence automatically. Make informed decisions faster.

Smart Analysis Technology:
AI understands research language and academic patterns. Identifies key concepts automatically. Extracts relationships between ideas. Generates structured insights.

Research Intelligence:
Transform raw documents into actionable knowledge. Compare multiple sources. Identify consensus and conflicts. Uncover research gaps.`}
      useCase={`Competitive research
Industry analysis
Academic benchmarking
Patent research
Technology monitoring
Strategic intelligence
Market assessment
Research evaluation`}
      testimonials={[
        {
          name: 'Dr. Susan Patterson',
          role: 'Patent Researcher',
          text: 'Patent landscape research accelerated dramatically. AI identifies relevant patents instantly. Quality analysis impressive.',
        },
        {
          name: 'Robert Chang',
          role: 'Market Analyst',
          text: 'Industry competitive research tool transformed our analysis process. Intelligence quality significantly improved.',
        },
        {
          name: 'Sophia Gonzalez',
          role: 'Research Coordinator',
          text: 'Comprehensive platform handles all research needs. Efficiency gains remarkable across team.',
        },
      ]}
      features={[
        'Rapid analysis',
        'Intelligence extraction',
        'Concept identification',
        'Relationship mapping',
        'Competitive analysis',
        'Patent research',
        'Market assessment',
        'Research synthesis',
      ]}
      benefits={{
        'Faster analysis': 'Hours to minutes',
        'Better intelligence': 'Automated extraction',
        'Competitive edge': 'Market insights',
        'Time savings': 'Process efficiency',
      }}
      faqs={[
        {
          q: 'Patent research capable?',
          a: 'Yes. Specifically optimized for patent landscape analysis and competitive intelligence.',
        },
        {
          q: 'Industry research?',
          a: 'Perfect for competitive intelligence, market analysis, and industry benchmarking.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Research Analysis Tool', slug: 'ai-research-analysis-tool' },
      ]}
      primaryKeyword="ai research tool"
      secondaryKeywords={['research analysis platform', 'intelligence tool', 'competitive research']}
    />
  );
}
