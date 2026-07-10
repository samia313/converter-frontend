import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online PDF Summarizer - Web-Based Summary Tool | PDFilio',
  description: 'Summarize PDFs online instantly. No downloads, no plugins. Pure web-based summarization.',
  keywords: 'online PDF summarizer, web summarizer, browser-based, online summary tool',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Online PDF Summarizer"
      toolSlug="online-pdf-summarizer"
      description="Web-based PDF summarization. Upload online and get summaries instantly in your browser."
      mainContent="Instant online summarization. No software installation, no plugins, no complications. Pure web convenience for summarizing PDFs."
      features={['Web-based', 'Instant access', 'No installation', 'Cloud processing', 'Mobile friendly', 'Secure servers', 'Instant results', 'Works everywhere']}
      benefits={['No setup time', 'Instant access', 'Device independent', 'Team friendly', 'Secure processing', 'Always available', 'Easy sharing', 'Zero maintenance']}
      useCase={['Quick summaries', 'Team collaboration', 'Mobile access', 'Remote work', 'Cross-platform usage', 'No-install preference', 'Instant analysis', 'Anywhere access'].join('\n')}
      testimonials={[{name: 'Mark Thompson', role: 'IT Manager', text: 'Web-based tool with no installation headaches. Perfect for our team.'}]}
      faqs={[{q: 'Secure online?', a: 'Yes, encryption and secure servers ensure complete security.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="online PDF summarizer"
      secondaryKeywords={['web summarizer', 'browser-based tool']}
    />
  );
}
