import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dissertation Assistant - Doctoral Research Support | ConvertHub',
  description: 'Advanced AI for dissertation research. Manage comprehensive research, analyze complex literature, support doctoral excellence.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Dissertation Assistant"
      toolSlug="ai-dissertation-assistant"
      description="Advanced AI-powered doctoral research platform. Manage complex research projects, analyze comprehensive literature, achieve dissertation excellence."
      mainContent={`Doctoral research excellence. Complex research managed systematically. Comprehensive literature synthesized intelligently. Dissertation contributions articulated clearly.

Research Management Engine:
AI handles dissertation complexity. Organizes extensive research. Synthesizes comprehensive literature. Supports original contributions.

Doctoral Success:
Complete doctoral research confidently. Develop compelling scholarship. Defend dissertation powerfully. Launch academic career.`}
      useCase={`Doctoral literature review
Research project management
Comprehensive analysis
Original contribution identification
Methodology development
Complex research synthesis
Defense preparation
Academic publication`}
      testimonials={[
        {
          name: 'Dr. Yuki Tanaka',
          role: 'Recent PhD Graduate',
          text: 'Doctoral research complexity managed effectively. Literature synthesis comprehensive and rigorous. Dissertation received excellent committee feedback.',
        },
        {
          name: 'Prof. Edward Johnson',
          role: 'Dissertation Advisor',
          text: 'Student dissertations improved markedly. Research organization rigorous. Graduation timelines on track.',
        },
        {
          name: 'Sofia Perez',
          role: 'Doctoral Candidate',
          text: 'Overwhelming doctoral research became manageable. Support systemic and intelligent. Doctoral success achievable.',
        },
      ]}
      features={[
        'Extensive literature synthesis',
        'Research organization',
        'Original contribution',
        'Methodology development',
        'Defense preparation',
        'Complex analysis',
        'Academic publishing',
        'Career launch',
      ]}
      benefits={[
        'Research rigor',
        'Organization clarity',
        'Timeline efficiency',
        'Academic excellence',
      ]}
      faqs={[
        {
          q: 'Manage complex dissertation research?',
          a: 'Yes. Systematically manages extensive doctoral research projects with comprehensive organization.',
        },
        {
          q: 'Support original contributions?',
          a: 'Absolutely. Identifies and develops original scholarship contributions.',
        },
      ]}
      relatedTools={[
        { name: 'AI Thesis Research Assistant', slug: 'ai-thesis-research-assistant' },
        { name: 'AI Academic Research Assistant', slug: 'ai-academic-research-assistant' },
      ]}
      primaryKeyword="ai dissertation assistant"
      secondaryKeywords={['doctoral support', 'dissertation research', 'doctoral excellence']}
    />
  );
}
