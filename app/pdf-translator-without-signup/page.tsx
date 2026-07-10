import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Translator Without Signup - Instant Access Translation | TranslateHub',
  description: 'Translate PDFs without creating an account. Zero-friction signup-free access.',
  keywords: 'pdf translator without signup, signup free, no signup translator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Translator Without Signup"
      toolSlug="pdf-translator-without-signup"
      description="Zero-friction translation. No signup, no account creation, no form filling. Just upload and translate."
      mainContent={`Skip the signup. Skip the forms. Just translate your PDF immediately.

Zero Friction:
- No signup process
- No account creation
- No form filling
- No email confirmation
- Instant access
- Zero friction
- Immediate use
- Start translating now

Fastest Entry Point:
Other tools waste your time with signup. This tool gets you translating in seconds.

For Impatient Users:
Need to translate a PDF right now? No time for account creation? This is your tool.`}
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
        'Quick translation',
        'One-time users',
        'Speed focused',
        'No-friction preference',
        'Impatient users',
        'Temporary needs',
        'Rapid deployment',
        'Quick use',
        'Trial users',
        'Friction-free access',
      ].join('\n')}
      testimonials={[
        {
          name: 'Carlos López',
          role: 'Busy Manager',
          text: 'No signup required. Translate instantly. No wasted time, no unnecessary forms.',
        },
        {
          name: 'Priya Sharma',
          role: 'Freelancer',
          text: 'Love that I can translate immediately. No account, just upload and go.',
        },
      ]}
      faqs={[
        {
          q: 'Really no signup?',
          a: 'No signup ever. Upload and translate immediately.',
        },
        {
          q: 'Permanent access?',
          a: 'Your session stays active as long as you need.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'PDF Translator Without Login', slug: 'pdf-translator-without-login' },
      ]}
      primaryKeyword="pdf translator without signup"
      secondaryKeywords={['signup free', 'no signup required']}
    />
  );
}
