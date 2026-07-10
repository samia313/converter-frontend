import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure AI PDF Chat - Enterprise-Grade Security | PDFilio',
  description: 'Secure PDF chat with encryption. Enterprise security for confidential documents.',
  keywords: 'secure pdf chat, encrypted chat, confidential documents, enterprise security',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Secure AI PDF Chat"
      toolSlug="secure-ai-pdf-chat"
      description="Enterprise-grade security for PDF chat. End-to-end encryption and maximum privacy for sensitive documents."
      mainContent={`Security-first design. Analyze confidential documents with complete peace of mind.

Enterprise Security:
- End-to-end encryption
- Secure servers
- Zero-knowledge architecture
- No data logging
- Secure connections
- Privacy compliance
- Audit ready
- GDPR compliant

For Confidential Work:
Legal documents, medical records, financial data, trade secrets - chat securely with confidence.

Complete Privacy:
Your documents stay yours. Encrypted, secure, never accessed by anyone else.`}
      features={[
        'End-to-end encryption',
        'Secure servers',
        'Zero-knowledge design',
        'No logging',
        'Encrypted transmission',
        'Privacy guarantee',
        'Compliance ready',
        'Audit trails',
      ]}
      benefits={[
        'Complete privacy',
        'Secure analysis',
        'Confidential handling',
        'Legal compliance',
        'Peace of mind',
        'Business safety',
        'Trusted service',
        'Enterprise grade',
      ]}
      useCase={[
        'Legal documents',
        'Medical records',
        'Financial data',
        'Trade secrets',
        'Confidential reports',
        'Private communications',
        'Sensitive analysis',
        'Compliance needs',
        'Corporate documents',
        'Protected information',
      ].join('\n')}
      testimonials={[
        {
          name: 'Thomas Bradley',
          role: 'Chief Compliance Officer',
          text: 'Security is paramount. This tool provides enterprise-grade encryption for our sensitive documents.',
        },
        {
          name: 'Michelle Wong',
          role: 'Attorney',
          text: 'Can confidently analyze legal documents. Security and privacy are guaranteed.',
        },
      ]}
      faqs={[
        {
          q: 'How secure?',
          a: 'Enterprise-grade with end-to-end encryption and zero-knowledge architecture.',
        },
        {
          q: 'Compliance?',
          a: 'Yes. GDPR compliant and ready for enterprise compliance requirements.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Secure PDF Chat', slug: 'secure-pdf-chat' },
      ]}
      primaryKeyword="secure AI PDF chat"
      secondaryKeywords={['encrypted chat', 'enterprise security']}
    />
  );
}
