import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFChatTool from '@/components/tools/pdf-chat-tool';

export const metadata: Metadata = {
  title: 'PDF Chat - Ask Questions About Your PDFs | PDFilio',
  description: 'Chat with your PDF documents. Ask questions and get instant answers from your PDF content using AI.',
  keywords: 'PDF chat, ask PDF questions, document chatbot, AI PDF reader',
};

export default function PDFChatPage() {
  return (
    <>
      <PDFChatTool />
      <ToolLandingLayout
        toolName="PDF Chat"
        toolSlug="pdf-chat"
        description="Chat with your PDF documents. Ask questions and get instant answers from your PDF content using AI-powered analysis."
        primaryKeyword="PDF Chat"
        secondaryKeywords={['ask PDF questions', 'document chatbot', 'AI PDF reader', 'PDF Q&A']}
        features={['Conversational interface', 'Instant answers', 'AI-powered understanding']}
        benefits={['Find information quickly', 'Understand documents better', 'Natural language questions']}
        faqs={[]}
        relatedTools={[]}
      />
    </>
  );
}
