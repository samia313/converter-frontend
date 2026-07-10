import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Writing Assistant - Academic Writing Support | ConvertHub',
  description: 'Intelligent writing support for research. Improve clarity, structure arguments, write professionaly.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Writing Assistant"
      toolSlug="ai-research-writing-assistant"
      description="Comprehensive research writing platform. Improve clarity, structure arguments, support academic writing excellence."
      mainContent={`Research writing perfected. Writing clarity improved. Arguments structured logically. Academic quality elevated.

Writing Enhancement Engine:
AI improves writing quality. Strengthens arguments. Enhances clarity. Elevates academic tone.

Research Articulation:
Write research findings clearly. Communicate findings effectively. Present arguments powerfully. Achieve academic excellence.`}
      useCase={`Research paper writing
Academic article improvement
Argument structuring
Clarity enhancement
Finding articulation
Professional writing
Publication preparation
Academic communication`}
      testimonials={[
        {
          name: 'Dr. Melissa Gray',
          role: 'Academic Editor',
          text: 'Writing quality improved significantly. Arguments better structured. Research communication enhanced.',
        },
        {
          name: 'Gerald Thompson',
          role: 'Publication Manager',
          text: 'Manuscript quality elevated. Publication readiness accelerated. Writing excellence achieved.',
        },
        {
          name: 'Catherine Noble',
          role: 'Research Writer',
          text: 'Writing process streamlined. Argument clarity enhanced. Research communication professional.',
        },
      ]}
      features={{
        'Writing improvement': 'Quality enhancement',
        'Argument structuring': 'Logical organization',
        'Clarity enhancement': 'Improved readability',
        'Tone adjustment': 'Academic voice',
        'Finding articulation': 'Clear communication',
        'Publication preparation': 'Manuscript readiness',
        'Academic standards': 'Scholarly quality',
        'Writing support': 'Comprehensive assistance',
      }}
      benefits={{
        'Writing quality': 'Academic excellence',
        'Clarity': 'Better communication',
        'Efficiency': 'Process acceleration',
        'Success': 'Publication achievement',
      }}
      faqs={[
        {
          q: 'Improve academic writing?',
          a: 'Yes. Enhances clarity, structures arguments, and elevates academic writing quality.',
        },
        {
          q: 'Prepare for publication?',
          a: 'Absolutely. Prepares research writing for academic publication standards.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Research Paper Assistant', slug: 'ai-research-paper-assistant' },
      ]}
      primaryKeyword="ai research writing assistant"
      secondaryKeywords={['research writing', 'academic writing', 'writing support']}
    />
  );
}
