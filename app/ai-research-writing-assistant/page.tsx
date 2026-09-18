import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Writing Assistant – Academic Writing Support | PDFilio',
  description: 'AI-assisted support for improving research writing clarity, structure, wording, and organization. Review important claims and citations against the source material.',
  alternates: { canonical: 'https://pdfilio.com/ai-research-writing-assistant' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Writing Assistant"
      toolSlug="ai-research-writing-assistant"
      description="AI-assisted research writing support for improving clarity, organizing arguments, and refining academic drafts."
      mainContent={`Use AI-assisted writing support to revise research drafts, improve clarity, organize arguments, and prepare text for human review.

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
      testimonials={[]}
      features={['Writing improvement','Argument structuring','Clarity enhancement','Tone adjustment','Finding articulation','Publication preparation','Academic standards','Writing support']}
      benefits={['Writing quality','Clarity','Efficiency','Success']}
      faqs={[{q:'Improve academic writing?',a:'Yes. Enhances clarity, structures arguments, and elevates academic writing quality.'},{q:'Prepare for publication?',a:'Absolutely. Prepares research writing for academic publication standards.'}]}
      relatedTools={[{name:'AI Research Assistant',slug:'ai-research-assistant'},{name:'AI Research Paper Assistant',slug:'ai-research-paper-assistant'}]}
      primaryKeyword="ai research writing assistant"
      secondaryKeywords={['research writing','academic writing','writing support']}
    />
  );
}
