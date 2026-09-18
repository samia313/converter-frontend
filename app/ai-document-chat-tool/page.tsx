import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Document Chat Tool – Chat with Supported Documents | PDFilio',
  description: 'Chat with supported documents using AI assistance. Ask questions, find information, and review document content while checking important answers against the source.',
  keywords: 'AI document chat, document chat tool, chat with documents, AI document assistant',
  alternates: { canonical: 'https://pdfilio.com/ai-document-chat-tool' },
};

export default function Page() {
  return (<ToolLandingLayout toolName="AI Document Chat Tool" toolSlug="ai-document-chat-tool" description="AI-assisted document chat for supported PDFs, documents, images, and scans, depending on the current tool configuration." mainContent={`Upload supported document content and ask questions about it using an AI-assisted chat workflow. Available file types and limits depend on the current tool configuration.`} features={['Multi-format support','PDF and Word','Image support','Scanned files','Format auto-detection','Universal chat','One integrated tool','Complete compatibility']} benefits={['One tool all formats','Simplified workflow','No format conversion','Complete coverage','Easy integration','Time efficient','Cost effective','Unified solution']} useCase={['Mixed document types','Format diversity','Workflow simplification','Universal needs','Diverse collections','Format flexibility','Integrated workflows','Complete solutions','Multi-format projects','Unified chat'].join('\n')} testimonials={[]} faqs={[{q:'What formats work?',a:'PDFs, Word documents, text files, images, scans - virtually any document format.'},{q:'Automatic detection?',a:'Yes, automatically detects and processes any document format.'}]} relatedTools={[{name:'AI Chat PDF',slug:'ai-chat-pdf'},{name:'AI Document Chat',slug:'ai-document-chat'}]} primaryKeyword="AI document chat tool" secondaryKeywords={['universal document chat','multi-format tool']} />);
}
