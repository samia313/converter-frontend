import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Reader - Intelligent Document Reading Tool | PDFilio',
  description: 'Read PDFs intelligently with AI assistance. Get explanations, summaries, and interactive reading experience beyond traditional PDF viewing.',
  keywords: 'AI PDF reader, intelligent document reader, PDF reading assistant, smart PDF viewer',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Reader"
      toolSlug="ai-pdf-reader"
      description="Beyond traditional PDF reading. Intelligent reading with AI explanations, context, and instant answers. More than a viewer, a learning tool."
      mainContent="AI PDF Reader transforms reading into interactive learning. Read with AI assistance, get instant explanations, understand complex concepts as you read."
      features={['Intelligent explanations', 'Concept clarification', 'Terminology definitions', 'Content simplification', 'Interactive reading', 'Margin notes support', 'Reading assistance', 'Learning optimization']}
      benefits={['Read with understanding', 'Get instant explanations', 'Learn better', 'Understand complexity', 'Interactive experience', 'Faster comprehension', 'Educational support', 'Enhanced learning']}
      useCase={['Study textbooks', 'Read technical docs', 'Learn complex topics', 'Student assistance', 'Professional learning', 'Technical documentation', 'Academic reading', 'Self-education'].join('\n')}
      testimonials={[{name: 'Emma Taylor', role: 'Student', text: 'Reading with AI explanations helps me understand better.'}]}
      faqs={[{q: 'Different from regular PDF readers?', a: 'Yes - interactive with AI help and explanations built-in.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'Talk to PDF', slug: 'talk-to-pdf'}]}
      primaryKeyword="AI PDF reader"
      secondaryKeywords={['intelligent PDF reader', 'smart PDF viewer']}
    />
  );
}
