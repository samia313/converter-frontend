import { Metadata } from 'next';
import PDFChatTool from '@/components/tools/pdf-chat-tool';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'PDF Chat with AI – Ask Questions About PDF Documents | PDFilio',
  description: 'Chat with supported PDF documents using AI. Ask questions, explore document content, and find information faster online with PDFilio.',
  keywords: ['PDF chat', 'AI PDF chat', 'chat with PDF', 'ask PDF questions', 'PDF chatbot', 'AI PDF reader', 'talk to PDF'],
  alternates: { canonical: 'https://pdfilio.com/pdf-chat' },
  openGraph: {
    title: 'PDF Chat with AI – Ask Questions About PDF Documents | PDFilio',
    description: 'Ask questions about supported PDF documents and explore their content with an AI-powered PDF chat workflow.',
    url: 'https://pdfilio.com/pdf-chat',
    type: 'website',
  },
};

export default function PDFChatPage() {
  return (
    <>
      <PDFChatTool />
      <ToolLandingLayout
        toolName="PDF Chat"
        toolSlug="pdf-chat"
        description="Chat with supported PDF documents using AI. Ask natural-language questions and explore document content without manually searching every page."
        mainContent={`PDF Chat lets you interact with a supported PDF through questions and conversational prompts. It can help you locate relevant information, understand sections of a document, and create a faster starting point for detailed review.

Common uses include:
- Exploring long PDF reports
- Reviewing research papers and study material
- Finding information in business documents
- Asking follow-up questions about document content
- Understanding difficult sections before reading the original in detail

AI-generated responses can contain errors or omit context. For legal, financial, medical, academic, contractual, or other important information, always verify answers against the original PDF.`}
        features={[
          'AI-powered PDF question answering',
          'Natural-language questions',
          'Conversational document exploration',
          'Follow-up questions',
          'Document-aware responses',
          'Browser-based workflow',
          'Useful for long PDFs',
          'Research and study support',
        ]}
        benefits={[
          'Find information faster than manual page-by-page searching',
          'Understand complex PDF sections more quickly',
          'Ask follow-up questions in one workflow',
          'Get a useful overview before detailed reading',
          'Save time during initial document review',
        ]}
        useCase={[
          'Students exploring course PDFs and research material',
          'Researchers reviewing papers and reports',
          'Professionals checking business documents',
          'Teams searching long internal PDFs',
          'Readers who want explanations of document content',
        ].join('\n')}
        faqs={[
          { q: 'What is PDF Chat?', a: 'PDF Chat is an AI-powered workflow that lets you ask questions about a supported PDF and explore its content conversationally.' },
          { q: 'Can I ask questions about a PDF?', a: 'Yes. You can ask natural-language questions about the content of a supported PDF.' },
          { q: 'Can I ask follow-up questions?', a: 'Yes. Follow-up questions can help you explore related parts of the same document.' },
          { q: 'Can PDF Chat summarize a PDF?', a: 'You can ask questions that help you understand a PDF, and PDFilio also offers a dedicated AI Document Summarizer for document summaries.' },
          { q: 'Is PDF Chat useful for students?', a: 'Yes. It can help students explore study documents and research material, but important academic claims should be checked against the original source.' },
          { q: 'Can I use PDF Chat for business reports?', a: 'Yes. It can help explore supported business reports and other workplace documents.' },
          { q: 'Are AI answers always accurate?', a: 'No. AI responses may contain mistakes or miss context. Verify important information against the original PDF.' },
          { q: 'Can I use PDF Chat for legal documents?', a: 'It can help you explore supported documents, but AI output should not replace professional legal advice or review of the original document.' },
          { q: 'Do I need to install software?', a: 'The workflow is designed for browser-based use, so you can use a compatible modern web browser.' },
          { q: 'What type of PDFs are supported?', a: 'Use PDFs supported by PDFilio’s current processing workflow. Results can vary with file quality, text extraction, scans, and document complexity.' },
        ]}
        relatedTools={[
          { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
          { name: 'AI Document Summarizer', slug: 'ai-document-summarizer' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        primaryKeyword="pdf chat"
        secondaryKeywords={['AI PDF chat', 'chat with PDF', 'ask PDF questions', 'PDF chatbot', 'AI PDF reader', 'talk to PDF']}
      />
    </>
  );
}
