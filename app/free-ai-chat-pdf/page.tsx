import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Chat PDF - Completely Free Document Chat | PDFilio',
  description: 'Free AI PDF chat with unlimited questions. No credit card, no registration, no hidden fees.',
  keywords: 'free ai chat pdf, free pdf chat, free document chat, no cost pdf ai',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Free AI Chat PDF"
      toolSlug="free-ai-chat-pdf"
      description="Completely free PDF chat with AI. Unlimited conversations, unlimited PDFs. No payments ever needed."
      mainContent={`Truly free PDF chat. No freemium tricks, no limited trials, no hidden costs. Full access to everything, forever free.

Completely Free:
- Unlimited PDF uploads
- Unlimited conversations
- All features included
- No registration required
- No credit card needed
- No time limits
- No usage restrictions
- Completely free forever

Perfect For Students:
Managing coursework and research papers. Full AI chat capabilities without spending a dime. Help with studying without payment.

For Professionals Too:
Not just a student tool. Professionals also save by using free AI chat for document analysis and Q&A.`}
      features={[
        'Completely free',
        'Unlimited uploads',
        'Unlimited conversations',
        'No registration',
        'No credit card',
        'All features included',
        'No limits',
        'Forever free',
      ]}
      benefits={[
        'No cost barrier',
        'Works for everyone',
        'Student friendly',
        'Budget conscious',
        'Complete access',
        'No surprises',
        'Full features free',
        'Sustainable pricing',
      ]}
      useCase={[
        'Student research',
        'Budget-conscious work',
        'Academic study',
        'Learning projects',
        'Personal use',
        'Non-profit work',
        'Volunteer projects',
        'Free tool preference',
        'Trial evaluation',
        'Cost-free analysis',
      ].join('\n')}
      testimonials={[
        {
          name: 'Alex Patterson',
          role: 'Graduate Student',
          text: 'Finally a completely free tool that works this well. I can chat with all my research papers without spending anything.',
        },
        {
          name: 'Maria Santos',
          role: 'Non-Profit Coordinator',
          text: 'Free AI chat helps us analyze documents for our mission work. No budget impact, full capability.',
        },
      ]}
      faqs={[
        {
          q: 'Is it really free?',
          a: 'Yes! Completely free with no hidden costs or limitations.',
        },
        {
          q: 'Any usage limits?',
          a: 'None! Unlimited PDFs and unlimited conversations.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Free Chat with PDF', slug: 'free-chat-with-pdf' },
      ]}
      primaryKeyword="free ai chat pdf"
      secondaryKeywords={['free pdf chat', 'no cost document chat']}
    />
  );
}
