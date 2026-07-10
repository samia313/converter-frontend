import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research PDF Chat - Academic Paper Analysis | PDFilio',
  description: 'Chat with research papers and academic PDFs. Extract findings, methodology, and citations instantly.',
  keywords: 'research pdf chat, academic chat, paper analysis, citation extraction',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research PDF Chat"
      toolSlug="ai-research-pdf-chat"
      description="Specialized for research papers. Chat with academic PDFs to extract findings, methodology, citations, and insights."
      mainContent={`Research-focused chat. Understand academic papers better. Chat about methodology, findings, citations, and research questions.

Research Optimized:
- Methodology understanding
- Finding extraction
- Citation awareness
- Academic structure
- Research focus
- Paper analysis
- Insight generation
- Study support

Research Efficiency:
Literature review faster. Paper analysis deeper. Research productivity improved with intelligent chat.

For Academics:
Perfect for researchers, graduate students, and faculty conducting literature reviews and paper analysis.`}
      features={[
        'Research structure understanding',
        'Methodology extraction',
        'Finding identification',
        'Citation awareness',
        'Academic focus',
        'Paper analysis',
        'Research insights',
        'Study support',
      ]}
      benefits={[
        'Research efficiency',
        'Faster literature review',
        'Better understanding',
        'Citation extraction',
        'Methodology clarity',
        'Finding identification',
        'Academic advantage',
        'Time efficient',
      ]}
      useCase={[
        'Literature review',
        'Paper analysis',
        'Methodology study',
        'Finding comparison',
        'Citation tracking',
        'Research efficiency',
        'Academic writing',
        'Thesis support',
        'Research project',
        'Paper comprehension',
      ].join('\n')}
      testimonials={[
        {
          name: 'Dr. Marcus Johnson',
          role: 'PhD Researcher',
          text: 'Perfect for literature review. Chat with papers about methodology and findings. Research productivity doubled.',
        },
        {
          name: 'Sarah Mitchell',
          role: 'Graduate Student',
          text: 'Understanding research papers is much faster. Chat with them naturally instead of reading tediously.',
        },
      ]}
      faqs={[
        {
          q: 'Research-specific?',
          a: 'Yes, understands research structure and academic formats specifically.',
        },
        {
          q: 'Extract citations?',
          a: 'Yes, can identify and extract citations from papers.',
        },
      ]}
      relatedTools={[
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
        { name: 'Research PDF Summarizer', slug: 'research-pdf-summarizer' },
      ]}
      primaryKeyword="AI research PDF chat"
      secondaryKeywords={['academic paper chat', 'research analysis']}
    />
  );
}
