import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Translator Without Login - Anonymous Translation | ConvertHub',
  description: 'Translate PDFs without logging in. Complete anonymity, immediate access.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Translator Without Login"
      toolSlug="ai-pdf-translator-without-login"
      description="Immediate access without logging in. Upload and translate anonymously, instantly."
      mainContent={`No login, no accounts, no email. Upload your PDF and translate immediately in complete anonymity.

Total Anonymity:
Your privacy is protected. No tracking, no profiles, no data collection. Just pure translation. Complete anonymity throughout.

For One-Time Users:
Don't create accounts. Just upload and translate. Simple as that.`}
      useCase={[
        'One-time translation needs',
        'Privacy-focused translation',
        'Quick translation',
        'Anonymous usage',
        'No commitment needed',
        'Temporary translation work',
        'Quick reference',
        'Trial usage',
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
      features={{
        'No registration required': 'No login needed',
        'No email needed': 'Anonymous access',
        'Instant start': 'Zero barriers',
        'Complete privacy': 'No tracking',
        'No account creation': 'True anonymity',
        'Pure translation': 'Simple interface',
        'Zero friction': 'Quick access',
        'Immediate use': 'Fast translation',
      }}
      benefits={{
        'Immediate access': 'No barriers',
        'Complete privacy': 'Anonymous usage',
        'Zero friction': 'Quick access',
        'No commitment': 'Total freedom',
        'Pure simplicity': 'Easy to use',
        'Fast start': 'No setup',
        'Instant translation': 'No delays',
        'True anonymity': 'Complete privacy',
      }}
      faqs={{
        'Really no login?': 'No. Upload and translate. No accounts, no logins.',
        'Is it private?': 'Completely anonymous. No tracking, no profiles, no data collection.',
        'How to use?': 'Just upload your PDF and click translate. That\'s it.',
      }}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
      ]}
      primaryKeyword="ai pdf translator without login"
      secondaryKeywords={['anonymous translation', 'no login translator']}
    />
  );
}
