import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic PDF Rewriter - Academic Writing Enhancement | ConvertHub',
  description: 'Rewrite academic PDFs. Professional academic writing with AI.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Academic PDF Rewriter"
      toolSlug="academic-pdf-rewriter"
      description="Specialized for academic writing. Rewrite essays, papers, and dissertations with scholarly precision."
      mainContent={`Academic excellence focused. Proper academic tone. Scholarly language. Research integrity maintained. Thesis-ready quality.

Academic Standards:
Formal language. Proper structure. Citation compatibility. Academic conventions. Research standards maintained.

Student Ready:
Perfect for essays, papers, research projects, dissertations. Academic quality guaranteed. Citation ready.`}
      useCase={`Essay rewriting
Research paper rewriting
Dissertation enhancement
Thesis improvement
Academic writing refinement
Citation compatibility
Academic standards
Scholarly communication`}
      testimonials={[
        {
          name: 'Dr. Alexandra Price',
          role: 'Professor',
          text: 'Students submit improved work. Academic quality enhanced. Learning support excellent.',
        },
        {
          name: 'Michael Lee',
          role: 'PhD Student',
          text: 'Dissertation improved significantly. Maintains academic integrity perfectly.',
        },
      ]}
      features={[
        'Academic tone',
        'Scholarly style',
        'Citation ready',
        'Academic standards',
        'Research integrity',
        'Thesis ready',
        'Academic structure',
        'Scholarly vocabulary',
      ]}
      benefits={[
        'Academic quality',
        'Thesis ready',
        'Citation compatible',
        'Academic credibility',
        'Learning support',
        'Research integrity',
        'Professional quality',
        'Time efficient',
      ]}
      faqs={[
        {
          q: 'Academic appropriate?',
          a: 'Yes. Specialized for academic writing with proper scholarly tone.',
        },
        {
          q: 'Citation compatible?',
          a: 'Yes. Maintains citation format and research integrity.',
        },
        {
          q: 'Thesis ready?',
          a: 'Yes. Professional academic quality throughout.',
        },
      ]}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Research Paper Rewriter', slug: 'research-paper-rewriter' },
      ]}
      primaryKeyword="academic pdf rewriter"
      secondaryKeywords={['academic writing', 'thesis enhancement']}
    />
  );
}
