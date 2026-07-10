import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Thesis Research Assistant - Master Thesis Support | ConvertHub',
  description: 'Specialized AI for thesis research. Conduct comprehensive literature review, organize research, prepare defense.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Thesis Research Assistant"
      toolSlug="ai-thesis-research-assistant"
      description="Comprehensive thesis support platform. Conduct research efficiently, organize findings systematically, prepare defense confidently."
      mainContent={`Thesis research made manageable. Literature comprehensively analyzed. Findings organized systematically. Defense preparation streamlined.

Research Synthesis Support:
AI organizes thesis research. Synthesizes literature findings. Identifies research contributions. Supports thesis argumentation.

Thesis Excellence:
Complete thesis research efficiently. Develop compelling arguments. Prepare confident defense. Achieve thesis success.`}
      useCase={`Literature review compilation
Research synthesis
Argument development
Defense preparation
Finding organization
Methodology documentation
Conclusion development
Publication preparation`}
      testimonials={[
        {
          name: 'Alex Foster',
          role: 'Master Candidate',
          text: 'Thesis research process manageable. Literature organized systematically. Defense preparation comprehensive and confident.',
        },
        {
          name: 'Dr. Patricia Wong',
          role: 'Thesis Advisor',
          text: 'Student thesis quality improved significantly. Research organization systematic. Graduation timeline accelerated.',
        },
        {
          name: 'James Sullivan',
          role: 'Graduate Student',
          text: 'Overwhelming research project became organized. Thesis development clear and systematic. Success achieved.',
        },
      ]}
      features={[
        'Literature synthesis',
        'Research organization',
        'Finding compilation',
        'Argument development',
        'Defense preparation',
        'Methodology documentation',
        'Conclusion support',
        'Publication readiness',
      ]}
      benefits={[
        'Research organization',
        'Process efficiency',
        'Quality improvement',
        'Stress reduction',
      ]}
      faqs={[
        {
          q: 'Organize thesis research?',
          a: 'Yes. Systematically organizes all thesis research and literature finding comprehensively.',
        },
        {
          q: 'Prepare defense?',
          a: 'Absolutely. Supports defense preparation with organized research and strong arguments.',
        },
      ]}
      relatedTools={[
        { name: 'AI Dissertation Assistant', slug: 'ai-dissertation-assistant' },
        { name: 'AI Academic Research Assistant', slug: 'ai-academic-research-assistant' },
      ]}
      primaryKeyword="ai thesis research assistant"
      secondaryKeywords={['thesis support', 'master thesis', 'research organization']}
    />
  );
}
