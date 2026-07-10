import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatic PDF Summary - Hands-Free Summarization | PDFilio',
  description: 'Automatic PDF summarization with zero manual input. Upload and get instant summaries automatically.',
  keywords: 'automatic PDF summary, hands-free summarization, automated processing, auto summarizer',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Automatic PDF Summary"
      toolSlug="automatic-pdf-summary"
      description="Completely automatic summarization. Upload PDF and get instant summary automatically. Zero manual work."
      mainContent="Fully automatic. No adjustment needed. Upload document, receive summary instantly. Complete automation for hands-free summarization."
      features={['Fully automatic', 'Zero manual work', 'Instant processing', 'Auto-generate', 'Hands-free operation', 'Complete automation', 'No adjustment needed', 'Instant results']}
      benefits={['No effort needed', 'Hands-free operation', 'Zero manual work', 'Instant results', 'Complete automation', 'Time efficient', 'Easy usage', 'Simple process']}
      useCase={['Batch processing', 'Hands-free work', 'Automated workflows', 'Zero manual effort', 'Large volume', 'System integration', 'Workflow automation', 'Batch summarization'].join('\n')}
      testimonials={[{name: 'Thomas Baker', role: 'Workflow Manager', text: 'Completely automatic. Upload and forget. Summaries ready when needed.'}]}
      faqs={[{q: 'Manual adjustments?', a: 'None needed! Completely automatic from upload to summary.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="automatic PDF summary"
      secondaryKeywords={['hands-free summarization', 'automated processing']}
    />
  );
}
