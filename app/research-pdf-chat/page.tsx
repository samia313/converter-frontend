import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research PDF AI Chat - Scholar Document Analysis Tool | PDFilio',
  description: 'Chat with research papers and academic PDFs. Extract citations, key findings, methodologies. Perfect for researchers and students.',
  keywords: 'research PDF chat, academic PDF chat, research paper analysis, citation extraction',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Research PDF AI Chat"
      toolSlug="research-pdf-chat"
      description="Specialized AI chat for research papers and academic documents. Ask about methodologies, findings, citations, and research details instantly."
      mainContent="Perfect for researchers and students. Extract methodology, findings, citations, and key research points. Understand complex academic papers instantly."
      features={['Citation extraction', 'Finding identification', 'Methodology explanation', 'Abstract summarization', 'Source tracking', 'Academic terminology', 'Research insights', 'Paper relationships']}
      benefits={['Research faster', 'Extract citations easily', 'Understand complex papers', 'Find key findings', 'Academic efficiency', 'Better comprehension', 'Citation management', 'Research organization']}
      useCase={['Extract citations', 'Find methodologies', 'Compare papers', 'Identify findings', 'Understand theories', 'Academic writing', 'Literature review', 'Research efficiency'].join('\n')}
      testimonials={[{name: 'Dr. James Wilson', role: 'Researcher', text: 'Perfect for literature reviews. Ask papers about their methodology and findings.'}]}
      faqs={[{q: 'Extracts citations automatically?', a: 'Yes, ask for citations and the AI provides them.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'PDF Summarizer', slug: 'pdf-summarizer-chat'}]}
      primaryKeyword="research PDF chat"
      secondaryKeywords={['academic PDF', 'research paper analysis']}
    />
  );
}
