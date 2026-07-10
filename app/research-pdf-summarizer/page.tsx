import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research PDF Summarizer - Academic Research Tool | PDFilio',
  description: 'Summarize research papers and academic PDFs. Extract findings, methodology, and conclusions.',
  keywords: 'research PDF summarizer, academic summarizer, research paper analysis, study summary',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Research PDF Summarizer"
      toolSlug="research-pdf-summarizer"
      description="Specialized for research papers. Extracts methodology, findings, conclusions, and key research insights automatically."
      mainContent="Research-focused summarization. Understands research structure and extracts methodology, findings, and conclusions. Perfect for academic work."
      features={['Research structure', 'Methodology extraction', 'Finding identification', 'Conclusion highlighting', 'Citation aware', 'Academic focus', 'Study-specific', 'Research-optimized']}
      benefits={['Research focused', 'Structure understanding', 'Quick paper review', 'Finding identification', 'Academic ready', 'Research efficient', 'Study support', 'Academic advantage']}
      useCase={['Research papers', 'Academic studies', 'Literature review', 'Paper analysis', 'Study support', 'Academic research', 'Finding extraction', 'Methodology review'].join('\n')}
      testimonials={[{name: 'Dr. Rebecca Thompson', role: 'Research Scholar', text: 'Perfect for research papers. Extracts methodology and findings accurately. Essential for my literature reviews.'}]}
      faqs={[{q: 'Research-specific?', a: 'Yes, understands research structure and extracts methodology, findings, and conclusions.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}]}
      primaryKeyword="research PDF summarizer"
      secondaryKeywords={['academic summarizer', 'research paper analysis']}
    />
  );
}
