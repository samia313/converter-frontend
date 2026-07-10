import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Summary Assistant - Research Summarization | ConvertHub',
  description: 'Intelligent summarization for research. Create concise summaries, extract key points, synthesize findings.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Summary Assistant"
      toolSlug="ai-research-summary-assistant"
      description="Intelligent research summarization platform. Create concise summaries, extract key points, synthesize complex findings efficiently."
      mainContent={`Research summarized intelligently. Long documents condensed to essentials. Key points extracted automatically. Time saved dramatically.

Smart Summarization Engine:
AI identifies essential information. Preserves critical findings. Eliminates redundancy. Creates readable summaries.

Time Efficiency:
Hours of reading condensed to minutes. Understanding accelerated. Research synthesis streamlined.`}
      useCase={`Quick research comprehension
Summary generation
Key point extraction
Finding synthesis
Research condensing
Efficient comprehension
Summary creation
Quick understanding`}
      testimonials={[
        {
          name: 'Dr. Angela Brooks',
          role: 'Research Coordinator',
          text: 'Summaries accurately capture research essence. Time savings substantial. Team comprehension accelerated.',
        },
        {
          name: 'Henry Patterson',
          role: 'Senior Analyst',
          text: 'Complex research quickly understood. Summary quality excellent. Efficiency gains remarkable.',
        },
        {
          name: 'Lucy Hammond',
          role: 'Information Officer',
          text: 'Research materials suddenly manageable. Summarization quality professional. Understanding accelerated significantly.',
        },
      ]}
      features={{
        'Smart summarization': 'Intelligent condensing',
        'Key point extraction': 'Essential information',
        'Finding preservation': 'Critical content',
        'Redundancy elimination': 'Concise output',
        'Readability': 'Clear summaries',
        'Multiple formats': 'Various summary types',
        'Length customization': 'Flexible output',
        'Quality assurance': 'Accuracy verification',
      }}
      benefits={{
        'Time saving': 'Hours to minutes',
        'Comprehension speed': 'Rapid understanding',
        'Efficiency': 'Process acceleration',
        'Quality': 'Accurate summaries',
      }}
      faqs={[
        {
          q: 'Accurately summarize research?',
          a: 'Yes. Intelligently creates accurate summaries capturing essential findings and key points.',
        },
        {
          q: 'Customize summary length?',
          a: 'Absolutely. Generate short summaries or detailed abstracts as needed.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Research Paper Assistant', slug: 'ai-research-paper-assistant' },
      ]}
      primaryKeyword="ai research summary assistant"
      secondaryKeywords={['research summarization', 'summary generation', 'text summarization']}
    />
  );
}
