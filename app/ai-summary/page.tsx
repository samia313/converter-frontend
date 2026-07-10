import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import AISummaryTool from '@/components/tools/ai-summary-tool';

export const metadata: Metadata = {
  title: 'AI Document Summary - Intelligent PDF Summarization | PDFilio',
  description: 'Generate intelligent summaries of PDF documents using AI. Extract key points and save reading time instantly.',
  keywords: 'AI summary, document summary, PDF summary, text summarization',
};

export default function AISummaryPage() {
  return (
    <>
      <AISummaryTool />
      <ToolLandingLayout
        toolName="AI Document Summary"
        toolSlug="ai-summary"
        description="Automatically generate intelligent summaries of your PDF documents using advanced AI technology. Save time reading long documents."
        primaryKeyword="AI Summary"
        secondaryKeywords={['document summary', 'PDF summary', 'text summarization', 'AI analysis']}
        features={['AI-powered summarization', 'Customizable length', 'Key point extraction']}
        benefits={['Save reading time', 'Understand documents faster', 'Extract important information']}
        faqs={[]}
        relatedTools={[]}
      />
    </>
  );
}
