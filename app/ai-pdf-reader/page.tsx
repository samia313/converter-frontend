import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Reader – Read and Understand PDF Documents with AI | PDFilio',
  description: 'AI-assisted PDF reading for explanations, summaries, terminology help, and document understanding. Verify important answers against the source PDF.',
  keywords: 'AI PDF reader, PDF reading assistant, intelligent PDF reader, AI document reader',
  alternates: { canonical: 'https://pdfilio.com/ai-pdf-reader' },
  openGraph: { title: 'AI PDF Reader – Read and Understand PDF Documents with AI | PDFilio', description: 'AI-assisted PDF reading for explanations, summaries, terminology help, and document understanding. Verify important answers against the source PDF.', url: 'https://pdfilio.com/ai-pdf-reader', type: 'website' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Reader"
      toolSlug="ai-pdf-reader"
      description="AI-assisted PDF reading with explanations, context, terminology help, and document understanding."
      mainContent="AI PDF Reader transforms reading into interactive learning. Read with AI assistance, get instant explanations, understand complex concepts as you read."
      features={['Intelligent explanations', 'Concept clarification', 'Terminology definitions', 'Content simplification', 'Interactive reading', 'Margin notes support', 'Reading assistance', 'Learning optimization']}
      benefits={['Read with understanding', 'Get instant explanations', 'Learn better', 'Understand complexity', 'Interactive experience', 'Faster comprehension', 'Educational support', 'Enhanced learning']}
      useCase={['Study textbooks', 'Read technical docs', 'Learn complex topics', 'Student assistance', 'Professional learning', 'Technical documentation', 'Academic reading', 'Self-education'].join('\n')}
      testimonials={[]}
      faqs={[{q: 'Different from regular PDF readers?', a: 'Yes - interactive with AI help and explanations built-in.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'Talk to PDF', slug: 'talk-to-pdf'}]}
      primaryKeyword="AI PDF reader"
      secondaryKeywords={['intelligent PDF reader', 'smart PDF viewer']}
    />
  );
}
