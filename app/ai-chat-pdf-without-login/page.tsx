import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat PDF Without Login - Instant Anonymous Access | PDFilio',
  description: 'Chat with PDFs instantly without logging in. Complete anonymity, immediate access.',
  keywords: 'pdf chat no login, anonymous pdf chat, instant access, no registration',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Chat PDF Without Login"
      toolSlug="ai-chat-pdf-without-login"
      description="Immediate access without logging in. Upload and chat anonymously, instantly."
      mainContent={`No login, no registration, no email verification. Upload a PDF and chat immediately.

Instant Access:
- No registration required
- No login needed
- No email confirmation
- No account creation
- Immediate access
- Complete anonymity
- Zero barriers
- Start instantly

Total Anonymity:
Your privacy is protected. No tracking, no profiles, no data collection. Just pure, anonymous PDF chat.

For One-Time Users:
Need to analyze a single PDF? Don't create accounts. Just upload and chat.`}
      features={[
        'No registration',
        'No login required',
        'No email needed',
        'Anonymous access',
        'Instant start',
        'Zero barriers',
        'Complete privacy',
        'No tracking',
      ]}
      benefits={[
        'Immediate access',
        'No barriers',
        'Complete privacy',
        'Anonymous usage',
        'Quick access',
        'No commitment',
        'Freedom',
        'Pure simplicity',
      ]}
      useCase={[
        'One-time users',
        'Privacy preference',
        'Quick analysis',
        'Anonymous usage',
        'No commitment',
        'Temporary work',
        'Quick reference',
        'Trial usage',
        'Casual use',
        'Privacy focused',
      ].join('\n')}
      testimonials={[
        {
          name: 'Alex Johnson',
          role: 'Privacy Advocate',
          text: 'Finally, PDF chat with no login required. Total privacy, instant access. Perfect.',
        },
        {
          name: 'Sophie Martin',
          role: 'Casual User',
          text: 'Used it once to analyze a document. No signup, no fuss. Exactly what I needed.',
        },
      ]}
      faqs={[
        {
          q: 'Really no login?',
          a: 'Really. Upload and chat. No registration, no accounts, no anything.',
        },
        {
          q: 'Is it private?',
          a: 'Completely anonymous. No tracking, no profiles, no data collection.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Chat PDF No Signup', slug: 'ai-chat-pdf-without-signup' },
      ]}
      primaryKeyword="AI chat PDF without login"
      secondaryKeywords={['anonymous pdf chat', 'no login required']}
    />
  );
}
