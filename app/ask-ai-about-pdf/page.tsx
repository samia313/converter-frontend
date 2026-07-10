import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask AI About PDF - Intelligent PDF Q&A Tool | PDFilio',
  description: 'Ask AI anything about your PDFs. Instant answers to any question from your documents.',
  keywords: 'ask ai pdf, pdf questions, ask about pdf, instant answers',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Ask AI About PDF"
      toolSlug="ask-ai-about-pdf"
      description="Ask AI anything about your PDFs. Get instant, accurate answers to any question from your documents."
      mainContent={`Your questions answered instantly. Upload a PDF and ask AI anything. Get clear, accurate, helpful answers immediately.

Ask Anything:
- Simple questions
- Complex analysis
- Detailed information
- Relationship questions
- Statistical queries
- Definition requests
- Clarification needs
- Any information need

Instant Answers:
No scrolling through documents. No searching for keywords. Just ask and get your answer immediately. Fast, accurate, helpful.

Perfect For Quick Lookup:
Need a specific fact from a document? Don't search manually. Just ask AI. Get the exact information you need in seconds.`}
      features={[
        'Instant Q&A',
        'Natural questions',
        'Accurate answers',
        'Any question type',
        'Quick lookup',
        'Detailed responses',
        'Follow-up questions',
        'Context-aware answers',
      ]}
      benefits={[
        'Fast information access',
        'No manual searching',
        'Accurate results',
        'Time efficient',
        'Easy interaction',
        'Quick lookups',
        'Precise answers',
        'Instant gratification',
      ]}
      useCase={[
        'Quick fact lookup',
        'Information search',
        'Detail extraction',
        'Fast questions',
        'Specific answers',
        'Rapid research',
        'Answer verification',
        'Information needs',
        'Quick reference',
        'On-demand answers',
      ].join('\n')}
      testimonials={[
        {
          name: 'Marcus Thompson',
          role: 'Journalist',
          text: 'Ask a question, get an answer instantly. No more hunting through documents for specific facts.',
        },
        {
          name: 'Emily Rodriguez',
          role: 'Student',
          text: 'Studying is faster when I can just ask questions instead of rereading pages.',
        },
      ]}
      faqs={[
        {
          q: 'What kind of questions?',
          a: 'Any questions. Simple facts, complex analysis, numerical data - anything about your document.',
        },
        {
          q: 'How accurate are answers?',
          a: 'Very accurate. AI understands the document deeply and provides precise information.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Ask PDF Questions', slug: 'ask-pdf-questions' },
      ]}
      primaryKeyword="ask ai about pdf"
      secondaryKeywords={['pdf questions', 'instant answers']}
    />
  );
}
