import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF AI Analyzer - Deep Document Analysis Tool | PDFilio',
  description: 'Analyze PDFs with advanced AI. Get insights, summaries, key points, and intelligent analysis of your documents automatically.',
  keywords: 'PDF analyzer, document analysis AI, PDF insights, deep document analysis, intelligent PDF analysis',
  openGraph: { title: 'PDF AI Analyzer - Smart Document Insights', description: 'Analyze PDFs automatically with AI', type: 'website' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF AI Analyzer"
      toolSlug="pdf-ai-analyzer"
      description="Go beyond chat. Analyze PDFs deeply with AI to extract insights, identify patterns, generate summaries, and understand document structure automatically."
      mainContent="PDF AI Analyzer performs deep analysis beyond Q&A. Automatic insights without asking. Automatic summarization, key point extraction, topic identification, pattern recognition, and comprehensive document understanding."
      features={['Automatic summarization', 'Key points extraction', 'Pattern identification', 'Document structure analysis', 'Insight generation', 'Topic extraction', 'Comprehensive analysis', 'Interactive follow-up']}
      benefits={['Automatic insights', 'Understand documents faster', 'Identify key information', 'Save analysis time', 'Pattern discovery', 'Quick assessment', 'Professional analysis']}
      useCase={['Quick assessment', 'Identify purpose', 'Extract key info', 'Find important points', 'Pattern analysis', 'Document classification', 'Comprehensive understanding', 'Fast review'].join('\n')}
      testimonials={[{name: 'Dr. Alice Wong', role: 'Analyst', text: 'Analyzing documents went from hours to minutes.'}]}
      faqs={[{q: 'What analysis is performed?', a: 'Summarization, key points, patterns, structure, and insights.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="PDF AI analyzer"
      secondaryKeywords={['document analysis', 'PDF insights']}
    />
  );
}
