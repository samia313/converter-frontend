import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat PDF - Conversational PDF Analysis | PDFilio',
  description: 'Chat with supported PDF documents using AI and ask questions about their content.',
  keywords: 'ai chat pdf, chat with pdf, pdf conversation, pdf ai chat',
  alternates: { canonical: 'https://pdfilio.com/ai-chat-pdf' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Chat PDF"
      toolSlug="ai-chat-pdf"
      description="Ask questions about supported PDF documents and explore their content through an AI-powered conversation interface."
      mainContent={`AI Chat PDF is designed for conversational document exploration. Ask questions about a supported PDF and review the generated responses.

Results can depend on document quality, content, and the capabilities available in the current product implementation. Review important answers against the source document.`}
      features={['Natural language questions','Document context','Follow-up questions','Conversational responses']}
      benefits={['Faster information access','Interactive document exploration','Convenient question and answer workflow']}
      useCase={['Student study sessions','Research paper review','Report comprehension','Document investigation','Information lookup'].join('\n')}
      faqs={[
        { q: 'How is this different from search?', a: 'The interface is designed for questions about document content rather than only matching individual search terms.' },
        { q: 'Can I ask complex questions?', a: 'You can ask questions about the supported document. Accuracy depends on the document and the current AI implementation, so verify important information against the source.' },
      ]}
      relatedTools={[
        { name: 'PDF Chat', slug: 'pdf-chat' },
        { name: 'AI Document Summary', slug: 'ai-summary' },
      ]}
      primaryKeyword="ai chat pdf"
      secondaryKeywords={['chat with pdf', 'pdf conversation']}
    />
  );
}
