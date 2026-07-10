import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Translator Without Login - Anonymous Translation | TranslateHub',
  description: 'Translate PDFs without logging in. Complete anonymity, immediate access.',
  keywords: 'pdf translator without login, anonymous translation, no login translator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Translator Without Login"
      toolSlug="pdf-translator-without-login"
      description="Immediate access without logging in. Upload and translate anonymously, instantly."
      mainContent={`No login, no accounts, no email. Upload your PDF and translate immediately in complete anonymity.

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
Your privacy is protected. No tracking, no profiles, no data collection. Just pure, anonymous translation.

For One-Time Users:
Need to translate a single document? Don't create accounts. Just upload and translate.`}
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
        'Total freedom',
        'Pure simplicity',
      ]}
      useCase={[
        'One-time users',
        'Privacy preference',
        'Quick translation',
        'Anonymous usage',
        'No commitment',
        'Temporary work',
        'Quick reference',
        'Trial usage',
        'Casual translation',
        'Privacy focused',
      ].join('\n')}
      testimonials={[
        {
          name: 'Alexander Mueller',
          role: 'Privacy Advocate',
          text: 'Finally, translation with no login required. Total privacy, instant access. Perfect.',
        },
        {
          name: 'Maria Gonzalez',
          role: 'Casual User',
          text: 'Used it once to translate a document. No signup, no fuss. Exactly what I needed.',
        },
      ]}
      faqs={[
        {
          q: 'Really no login?',
          a: 'Really. Upload and translate. No accounts, no logins, no anything.',
        },
        {
          q: 'Is it private?',
          a: 'Completely anonymous. No tracking, no profiles, no data collection.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'PDF Translator Without Signup', slug: 'pdf-translator-without-signup' },
      ]}
      primaryKeyword="pdf translator without login"
      secondaryKeywords={['anonymous translation', 'no login translator']}
    />
  );
}
