import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Summarizer Chat - AI Summary + Q&A Tool | PDFilio',
  description: 'Summarize PDFs with AI and chat about them. Combine automatic summaries with conversational Q&A for complete document understanding.',
  keywords: 'PDF summarizer, document summarization chat, AI summary, document summary and chat',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Summarizer Chat"
      toolSlug="pdf-summarizer-chat"
      description="Automatic summaries plus interactive chat. Understand documents quickly with AI summaries, then explore details through conversation."
      mainContent="Get the summary automatically, then ask follow-up questions. Quick understanding combined with deep exploration. Best of both - summaries and chat."
      features={['Automatic summaries', 'Key points extraction', 'Interactive follow-up', 'Quick understanding', 'Detail exploration', 'Summary-based chat', 'Quick and deep', 'Combined approach']}
      benefits={['Quick understanding', 'Detail exploration', 'Efficient learning', 'Summary support', 'Complete comprehension', 'Fast and thorough', 'Hybrid approach', 'Best of both']}
      useCase={['Quick summaries needed', 'Then ask details', 'Efficient learning', 'Time-saving analysis', 'Complete understanding', 'Explore after summary', 'Deep comprehension', 'Hybrid workflows'].join('\n')}
      testimonials={[{name: 'Jennifer White', role: 'Researcher', text: 'Summary gives overview, then I chat for details. Perfect combination.'}]}
      faqs={[{q: 'How does summary work?', a: 'Automatic AI summary generated first, then chat about details.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="PDF summarizer chat"
      secondaryKeywords={['document summarization', 'AI summary']}
    />
  );
}
