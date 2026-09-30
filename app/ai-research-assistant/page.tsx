import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Assistant – Research and Document Analysis | PDFilio',
  description: 'AI-assisted research support for analyzing documents, organizing information, synthesizing findings, and exploring research questions.',
  keywords: ['AI research assistant', 'research assistant AI', 'AI document research', 'research analysis tool', 'AI research workflow'],
  alternates: { canonical: 'https://pdfilio.com/ai-research-assistant' },
  openGraph: { title: 'AI Research Assistant | PDFilio', description: 'AI-assisted research and document analysis workflows.', url: 'https://pdfilio.com/ai-research-assistant', type: 'website' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Assistant"
      toolSlug="ai-research-assistant"
      description="AI-assisted research support for document analysis, information synthesis, and organized research workflows."
      mainContent={`Use AI-assisted workflows to analyze supported document content, organize information, compare findings, and explore research questions. Review important findings against the original sources.

## How an AI Research Assistant Can Help

Use supported document content as a starting point for organizing notes, identifying themes, comparing information, and developing follow-up questions. Results depend on the source material, extraction quality, and current tool capabilities.

## Verify Research Findings

AI-generated analysis can miss context or introduce errors. Check important claims, quotations, statistics, citations, and conclusions against the original sources before relying on them.`}
      useCase={`Research projects
Literature review support
Multi-source document review
Academic note organization
Market research analysis
Report preparation
Research question exploration`}
      testimonials={[]}
      features={['AI-assisted document analysis','Information synthesis','Research organization','Theme and topic exploration','Follow-up question support','Source verification workflow']}
      benefits={['Organize research faster','Explore document themes','Prepare structured notes','Compare information more efficiently','Keep source verification in the workflow']}
      faqs={[
        {q:'What does an AI research assistant do?',a:'It can assist with analyzing supported documents, organizing information, synthesizing findings, and exploring research questions.'},
        {q:'Can it replace original research sources?',a:'No. Use AI output as research assistance and verify important claims against the original sources.'},
        {q:'Can it analyze multiple documents?',a:'Capabilities depend on the current workflow and supported inputs. Check the uploader and tool limits before processing multiple documents.'},
        {q:'Can students use an AI research assistant?',a:'It can help organize study and research material, but students should follow their institution’s rules and verify claims and citations against original sources.'},
      ]}
      relatedTools={[{name:'AI Research Writing Assistant',slug:'ai-research-writing-assistant'},{name:'AI Document Chat',slug:'ai-document-chat-tool'},{name:'AI PDF Summarizer',slug:'ai-summary'},{name:'OCR PDF',slug:'ocr'}]}
      primaryKeyword="AI research assistant"
      secondaryKeywords={['AI document research','research analysis tool','AI research workflow']}
    />
  );
}