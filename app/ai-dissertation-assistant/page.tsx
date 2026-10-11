import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Dissertation Assistant – Organize and Analyze Dissertation Research',
  description: 'AI-assisted support for dissertation research, literature organization, document analysis, and research workflows. Verify important findings against source material.',
  keywords: 'AI dissertation assistant, dissertation research AI, PhD research assistant, literature review assistant',
  alternates: { canonical: 'https://pdfilio.com/ai-dissertation-assistant' },
  openGraph: { title: 'AI Dissertation Assistant – Organize and Analyze Dissertation Research', description: 'AI-assisted support for dissertation research, literature organization, document analysis, and research workflows. Verify important findings against source material.', url: 'https://pdfilio.com/ai-dissertation-assistant', type: 'website' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Dissertation Assistant"
      toolSlug="ai-dissertation-assistant"
      description="AI-assisted support for dissertation research, literature organization, document analysis, and structured research workflows."
      mainContent={`Use this AI-assisted workflow as a starting point for organizing dissertation research, reviewing supported documents, and turning source material into structured notes. The tool can help you explore themes and prepare questions for further investigation; it does not independently validate research or guarantee a complete literature review.

## A Practical Dissertation Workflow

Start with a focused research question, review the documents supported by the current workflow, and use the results to group relevant ideas or identify areas that need closer reading. Keep a record of source details as you work.

## Verify Evidence and Originality

Check quotations, citations, methods, and conclusions against the original publications. Your argument, interpretation, and original contribution must remain your own, and you should follow your institution’s academic-integrity and AI-use policies.`}
      useCase={`Doctoral literature review
Research project management
Comprehensive analysis
Original contribution identification
Methodology development
Complex research synthesis
Defense preparation
Academic publication`}
      testimonials={[]}
      features={[
        'Organize supported research documents',
        'Prepare structured research notes',
        'Explore themes in source material',
        'Develop follow-up research questions',
        'Review AI-generated summaries',
        'Keep source verification in the workflow',
      ]}
      benefits={[
        'Create a starting point for document review',
        'Organize research material more consistently',
        'Identify topics for further investigation',
        'Keep human review central to dissertation work',
      ]}
      faqs={[
        {
          q: 'Can this tool complete my dissertation research for me?',
          a: 'No. It can assist with supported document workflows and research organization, but you remain responsible for research design, interpretation, evidence, and original writing.',
        },
        {
          q: 'Should I verify AI-generated findings?',
          a: 'Yes. Check facts, quotations, citations, and conclusions against original sources and follow your institution’s academic-integrity policies.',
        },
      ]}
      relatedTools={[
        { name: 'AI Thesis Research Assistant', slug: 'ai-thesis-research-assistant' },
        { name: 'AI Academic Research Assistant', slug: 'ai-academic-research-assistant' },
      ]}
      primaryKeyword="ai dissertation assistant"
      secondaryKeywords={['dissertation research assistant', 'dissertation document analysis', 'doctoral research organization']}
    />
  );
}
