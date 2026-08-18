import { Metadata } from 'next';
import PDFChatTool from '@/components/tools/pdf-chat-tool';

export const metadata: Metadata = {
  title: 'PDF Chat - Ask Questions About Your PDFs | PDFilio',
  description: 'Chat with your PDF documents and ask questions about their content using AI.',
  keywords: 'PDF chat, ask PDF questions, document chatbot, AI PDF reader',
  alternates: { canonical: 'https://pdfilio.com/pdf-chat' },
};

export default function PDFChatPage() {
  return <PDFChatTool />;
}
