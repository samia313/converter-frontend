import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat PDF Without Signup - Zero-Friction Access | PDFilio',
  description: 'Chat with PDFs without creating accounts. Instant signup-free access to PDF chat.',
  keywords: 'no signup pdf chat, signup free, account free chat, instant access pdf',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Chat PDF Without Signup"
      toolSlug="ai-chat-pdf-without-signup"
      description="Zero-friction PDF chat. No signup, no account creation, no form filling. Just upload and chat."
      mainContent={`Skip the signup. Skip the forms. Skip the emails. Just chat with your PDF immediately.

Zero Friction:
- No signup process
- No account creation
- No form filling
- No email confirmation
- Instant access
- Zero friction
- Immediate use
- Start chatting now

Fastest Entry Point:
Other tools waste your time with signup. This tool gets you to PDF chat in seconds.

For Impatient Users:
Want to analyze a PDF right now? No time for account creation? This is your tool.`}
      features={[
        'Signup-free access',
        'No account needed',
        'No forms',
        'No email required',
        'Zero friction',
        'Instant start',
        'Quick access',
        'Immediate use',
      ]}
      benefits={[
        'No barriers',
        'Fastest access',
        'Zero friction',
        'Immediate use',
        'Time efficient',
        'Easy entry',
        'Quick start',
        'No delays',
      ]}
      useCase={[
        'Quick analysis',
        'One-time users',
        'Speed focused',
        'No-friction preference',
        'Impatient users',
        'Temporary needs',
        'Rapid deployment',
        'Quick lookups',
        'Trial users',
        'Friction-free access',
      ].join('\n')}
      testimonials={[
        {
          name: 'Michael Torres',
          role: 'Busy Executive',
          text: 'No signup required. No wasted time. Chat with PDFs immediately. Perfect for my workflow.',
        },
        {
          name: 'Jamie Lee',
          role: 'Freelancer',
          text: 'Love that I can use it instantly. No account creation, just upload and analyze.',
        },
      ]}
      faqs={[
        {
          q: 'Really no signup?',
          a: 'No signup ever. Upload a PDF and start chatting immediately.',
        },
        {
          q: 'Permanent access?',
          a: 'Yes, your session stays active as long as you need.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Chat PDF Without Login', slug: 'ai-chat-pdf-without-login' },
      ]}
      primaryKeyword="AI chat PDF without signup"
      secondaryKeywords={['no signup required', 'signup-free access']}
    />
  );
}
