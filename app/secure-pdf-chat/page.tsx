import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure PDF Chat AI - Private Document Conversation | PDFilio',
  description: 'Chat with PDFs securely. Enterprise-grade encryption. Perfect for confidential documents, sensitive contracts, and private communications.',
  keywords: 'secure PDF chat, private PDF chat, encrypted PDF chat, confidential document chat',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Secure PDF Chat AI"
      toolSlug="secure-pdf-chat"
      description="Enterprise-grade security for PDF conversations. Analyze confidential documents with peace of mind. End-to-end encryption and maximum privacy."
      mainContent="Security-first PDF chat. Enterprise encryption, secure servers, zero-knowledge architecture. Perfect for confidential, sensitive, and private documents."
      features={['End-to-end encryption', 'Secure servers', 'Zero-knowledge architecture', 'No logging', 'Data privacy', 'Enterprise security', 'Compliance ready', 'Audit trails']}
      benefits={['Complete privacy', 'Secure analysis', 'Confidential handling', 'Compliance assured', 'Peace of mind', 'Business safety', 'Legal compliance', 'Enterprise ready']}
      useCase={['Legal documents', 'Medical records', 'Confidential contracts', 'Private communications', 'Sensitive data', 'Business secrets', 'Financial records', 'Protected information'].join('\n')}
      testimonials={[{name: 'Thomas Black', role: 'Legal Advisor', text: 'Security is crucial for legal documents. This tool provides enterprise-grade protection.'}]}
      faqs={[{q: 'How secure is this?', a: 'Enterprise-grade encryption with zero-knowledge architecture.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}]}
      primaryKeyword="secure PDF chat"
      secondaryKeywords={['private PDF chat', 'encrypted PDF chat']}
    />
  );
}
