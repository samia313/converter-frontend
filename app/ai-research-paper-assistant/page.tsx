import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Paper Assistant - Academic Paper Analysis | ConvertHub',
  description: 'Specialized AI tool for analyzing research papers. Extract methodology, findings, and citations instantly.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Paper Assistant"
      toolSlug="ai-research-paper-assistant"
      description="Specialized AI assistant for research paper analysis. Extract key insights, methodology, findings, and citations automatically."
      mainContent={`Analyze research papers smarter. Automated methodology extraction. Instant finding identification. Complete citation discovery.

Paper Analysis Expertise:
AI trained on academic research patterns. Understands experimental design. Recognizes statistical methodology. Identifies research contributions.

Research Intelligence:
Compare papers across your field. Identify methodological trends. Spot research gaps. Understand research evolution.`}
      useCase={`Paper literature review
Methodology comparison
Research gap identification
Publication tracking
Experimental design analysis
Statistical methodology review
Research trend analysis
Paper quality assessment`}
      testimonials={[
        {
          name: 'Dr. Victor Liu',
          role: 'Research Scientist',
          text: 'Methodology extraction accurate and thorough. Saves substantial manual review time. Essential for research synthesis.',
        },
        {
          name: 'Jasmine Williams',
          role: 'PhD Candidate',
          text: 'Paper analysis accelerated dissertation research. Complex papers become understandable quickly.',
        },
        {
          name: 'Prof. Henrik Bergström',
          role: 'Department Chair',
          text: 'Research team productivity increased significantly. Paper analysis quality superior to manual review.',
        },
      ]}
      features={[
        'Methodology extraction',
        'Finding identification',
        'Citation discovery',
        'Abstract analysis',
        'Conclusion synthesis',
        'Experimental design recognition',
        'Statistical method identification',
        'Research contribution assessment',
      ]}
      benefits={{
        'Time savings': 'Minutes vs hours',
        'Analysis depth': 'Comprehensive review',
        'Pattern recognition': 'Trend identification',
        'Research efficiency': 'Faster synthesis',
      }}
      faqs={[
        {
          q: 'Extract methodology accurately?',
          a: 'Yes. AI specialized in identifying and extracting research methodology from academic papers.',
        },
        {
          q: 'Find all citations?',
          a: 'Automatically discovers citations, references, and source attributions.',
        },
      ]}
      relatedTools={[
        { name: 'AI Literature Review Assistant', slug: 'ai-literature-review-assistant' },
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
      ]}
      primaryKeyword="ai research paper assistant"
      secondaryKeywords={['paper analysis', 'academic paper tool', 'methodology extraction']}
    />
  );
}
