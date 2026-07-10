import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart PDF Assistant - Intelligent Document Helper | PDFilio',
  description: 'Your intelligent PDF assistant. Proactive suggestions, smart analysis, and helpful insights. More than a tool, a helpful partner.',
  keywords: 'smart PDF assistant, intelligent document helper, PDF intelligence, proactive PDF analysis',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Smart PDF Assistant"
      toolSlug="smart-pdf-assistant"
      description="Your intelligent document partner. Proactive suggestions, smart analysis, and helpful insights. Not just answering questions - helping you succeed."
      mainContent="Smart assistance beyond Q&A. Proactive insights, helpful suggestions, anticipatory analysis. Your AI partner understands your needs and helps accordingly."
      features={['Proactive suggestions', 'Smart insights', 'Anticipatory help', 'Context understanding', 'Helpful recommendations', 'Smart analysis', 'Intelligent assistance', 'Partnership approach']}
      benefits={['Helpful assistance', 'Proactive support', 'Smart suggestions', 'Better understanding', 'Partnership experience', 'Anticipatory help', 'Efficient workflow', 'Enhanced productivity']}
      useCase={['Smart guidance', 'Helpful suggestions', 'Decision support', 'Analysis assistance', 'Learning support', 'Workflow optimization', 'Smart recommendations', 'Intelligent help'].join('\n')}
      testimonials={[{name: 'Michael Torres', role: 'Manager', text: 'Like having a helpful assistant. Proactive suggestions make work easier.'}]}
      faqs={[{q: 'How is this different?', a: 'Provides proactive suggestions and anticipatory help beyond answering.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'AI PDF Chat', slug: 'ai-pdf-chat'}]}
      primaryKeyword="smart PDF assistant"
      secondaryKeywords={['intelligent document helper', 'PDF intelligence']}
    />
  );
}
