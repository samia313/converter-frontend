import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Academic Research Assistant - University Research Support | ConvertHub',
  description: 'Specialized AI research assistant for academic institutions. Perfect for students, faculty, and researchers.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Academic Research Assistant"
      toolSlug="ai-academic-research-assistant"
      description="Purpose-built AI research assistant for academic environments. Support students, faculty, and research teams with intelligent analysis."
      mainContent={`Academic-focused research platform designed for university success. Supports students through literature review. Assists faculty with research analysis.

Scholarly Analysis:
Understands academic conventions, citation styles, and research methodologies. Extracts methodology properly. Analyzes research design rigorously.

Academic Support:
Help students master complex research. Support faculty with literature synthesis. Facilitate institutional research excellence.`}
      useCase={`Literature review support
Thesis research assistance
Faculty research collaboration
Student research projects
Institutional benchmarking
Academic publishing
Research methodology analysis
Citation management`}
      testimonials={[
        {
          name: 'Prof. Margaret O\'Brien',
          role: 'History Department',
          text: 'Students produce better research papers. Tool supports academic rigor. Learning outcomes improved noticeably.',
        },
        {
          name: 'Dr. Nathan Kumar',
          role: 'University Librarian',
          text: 'Faculty adoption high. Students appreciate research support. Institutional research capacity expanded significantly.',
        },
        {
          name: 'Amelia Foster',
          role: 'Undergraduate Researcher',
          text: 'Academic research became manageable. Complex papers understandable. Research confidence increased dramatically.',
        },
      ]}
      features={[
        'Academic methodology',
        'Citation support',
        'Thesis assistance',
        'Literature synthesis',
        'Research rigor',
        'Scholarly conventions',
        'Academic standards',
        'University compatibility',
      ]}
      benefits={[
        'Student success',
        'Faculty efficiency',
        'Institutional support',
        'Research quality',
      ]}
      faqs={[
        {
          q: 'University approved?',
          a: 'Yes. Designed specifically for academic institutional use with research integrity support.',
        },
        {
          q: 'Citation management?',
          a: 'Supports MLA, APA, Chicago, and other academic citation formats.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Thesis Research Assistant', slug: 'ai-thesis-research-assistant' },
      ]}
      primaryKeyword="ai academic research assistant"
      secondaryKeywords={['university research', 'academic support', 'scholarly analysis']}
    />
  );
}
