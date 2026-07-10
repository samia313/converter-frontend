import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Report Summarizer - Business Report Summary Tool | PDFilio',
  description: 'Summarize business reports and analytics documents. Extract insights and key metrics automatically.',
  keywords: 'report summarizer, business summary AI, analytics summary, executive brief',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Report Summarizer"
      toolSlug="ai-report-summarizer"
      description="Business-focused summarization. Extracts key metrics, insights, and actionable information from reports."
      mainContent="Report-optimized AI. Understands report structure, identifies key metrics, extracts insights, and generates executive summaries automatically."
      features={['Report focused', 'Metric extraction', 'Insight identification', 'Executive format', 'Business intelligence', 'Data point focus', 'Analytics ready', 'Business optimized']}
      benefits={['Executive ready', 'Insight focused', 'Metric highlighted', 'Decision support', 'Business aligned', 'Time saving', 'Action oriented', 'Professional format']}
      useCase={['Business reports', 'Analytics summaries', 'Executive briefs', 'Metric review', 'Insight extraction', 'Business analysis', 'Report condensing', 'Decision support'].join('\n')}
      testimonials={[{name: 'Victoria Wong', role: 'CEO', text: 'Extracts exactly what executives need. Perfect summaries of lengthy reports with all key metrics.'}]}
      faqs={[{q: 'Business focused?', a: 'Yes, extracts metrics, insights, and business intelligence from reports.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="AI report summarizer"
      secondaryKeywords={['business summary', 'analytics summary']}
    />
  );
}
