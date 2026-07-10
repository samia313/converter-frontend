import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Chat Assistant - Intelligent Document Helper | PDFilio',
  description: 'Your personal AI assistant for PDFs. Intelligent help with document analysis, Q&A, and document exploration.',
  keywords: 'ai pdf chat assistant, document assistant, pdf helper, intelligent chat',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Chat Assistant"
      toolSlug="ai-pdf-chat-assistant"
      description="Your intelligent document assistant. Helps you explore, understand, and analyze PDFs through smart conversation."
      mainContent={`More than a tool, a helpful assistant. Proactive help, smart suggestions, and intelligent support for your document work.

Intelligent Assistance:
- Proactive suggestions
- Smart insights
- Helpful recommendations
- Context understanding
- Anticipatory help
- Partnership approach
- Smart problem-solving
- Assistive technology

Your Document Partner:
Doesn't just answer questions. Understands your goals and helps you achieve them. Like having a knowledgeable colleague available 24/7.

Always Helpful:
Never condescending, never dismissive. Just genuinely helpful assistance with your documents.`}
      features={[
        'Proactive help',
        'Smart suggestions',
        'Context awareness',
        'Anticipatory assistance',
        'Partnership approach',
        'Intelligent insights',
        'Helpful recommendations',
        'Goal-oriented support',
      ]}
      benefits={[
        'Feels like partnership',
        'Helpful not just informative',
        'Smarter than Q&A',
        'Anticipates needs',
        'Better outcomes',
        'Satisfying interaction',
        'Productive collaboration',
        'Enhanced productivity',
      ]}
      useCase={[
        'Document exploration',
        'Smart guidance',
        'Learning support',
        'Analysis assistance',
        'Decision support',
        'Research help',
        'Content understanding',
        'Workflow optimization',
        'Problem solving',
        'Project support',
      ].join('\n')}
      testimonials={[
        {
          name: 'Dr. Rebecca Williams',
          role: 'Research Scientist',
          text: 'Feels like having an intelligent colleague who knows all my documents. Proactive suggestions make research faster.',
        },
        {
          name: 'Thomas Bradley',
          role: 'Knowledge Manager',
          text: 'This assistant understands what I need. More helpful than just answering questions.',
        },
      ]}
      faqs={[
        {
          q: 'How is it an assistant?',
          a: 'Provides proactive help, smart suggestions, and anticipatory support - not just answers to your questions.',
        },
        {
          q: 'Can it help with analysis?',
          a: 'Yes, provides guidance and insights throughout your analysis process.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Smart PDF Summary AI', slug: 'smart-pdf-summary' },
      ]}
      primaryKeyword="AI PDF chat assistant"
      secondaryKeywords={['document assistant', 'pdf helper']}
    />
  );
}
