import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fast PDF Summarizer - Quick Document Summaries | PDFilio',
  description: 'Fast and efficient PDF summarizer. Quick processing without sacrificing quality.',
  keywords: 'fast PDF summarizer, quick summarizer, efficient summarization, rapid processor',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Fast PDF Summarizer"
      toolSlug="fast-pdf-summarizer"
      description="Fast and efficient PDF summarization. Quick processing with consistent quality."
      mainContent="Fast processing without compromises. Quick summaries that maintain accuracy and quality. Speed and quality combined."
      features={['Fast processing', 'Efficient algorithms', 'Quality maintained', 'Quick results', 'Reliable speed', 'Consistent quality', 'Optimized performance', 'No lag']}
      benefits={['Save time', 'Fast turnaround', 'Quality assured', 'Efficient workflow', 'Quick access', 'Reliable service', 'No delays', 'Performance focus']}
      useCase={['Daily workflows', 'Quick reviews', 'Fast processing', 'Efficiency focus', 'Time management', 'Busy professionals', 'Rapid turnaround', 'Speed priority'].join('\n')}
      testimonials={[{name: 'Lisa Chen', role: 'Project Manager', text: 'Fast and reliable. Processes documents quickly without losing quality.'}]}
      faqs={[{q: 'Quality with speed?', a: 'Yes, optimized for speed while maintaining accuracy and quality.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="fast PDF summarizer"
      secondaryKeywords={['quick summarizer', 'efficient summarization']}
    />
  );
}
