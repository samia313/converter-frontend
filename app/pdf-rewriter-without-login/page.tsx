import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Rewriter Without Login - Anonymous Rewriting | ConvertHub',
  description: 'Rewrite PDFs without logging in. Complete anonymity, immediate access.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Rewriter Without Login"
      toolSlug="pdf-rewriter-without-login"
      description="Instant access without logging in. Upload and rewrite anonymously, instantly."
      mainContent={`No login, no accounts, no email required. Upload your PDF and rewrite immediately in complete anonymity.

Total Anonymity:
Your privacy protected completely. No tracking. No profiles. No data collection. Just pure rewriting. Anonymous throughout.

For One-Time Users:
Don&apos;t create accounts. Just upload and rewrite. Simple as that. Complete freedom. No barriers.`}
      useCase={`One-time rewriting needs
Privacy-focused rewriting
Quick rewriting
Anonymous usage
No commitment required
Temporary rewriting work
Quick reference
Trial usage`}
      testimonials={{
        'Alexander Mueller': 'Privacy Advocate - Finally, rewriting with no login required. Total privacy, instant access.',
        'Maria Gonzalez': 'Casual User - Used once to rewrite a document. No signup, no fuss. Exactly what I needed.',
      }}
      features={{
        'No registration required': 'No login needed',
        'No email needed': 'Anonymous access',
        'Instant start': 'Zero barriers',
        'Complete privacy': 'No tracking',
        'No account creation': 'True anonymity',
        'Pure rewriting': 'Simple interface',
        'Zero friction': 'Quick access',
        'Immediate use': 'Fast rewriting',
      }}
      benefits={{
        'Immediate access': 'No barriers',
        'Complete privacy': 'Anonymous usage',
        'Zero friction': 'Quick access',
        'No commitment': 'Total freedom',
        'Pure simplicity': 'Easy process',
        'Fast start': 'No setup',
        'Instant rewriting': 'No delays',
        'True anonymity': 'Complete privacy',
      }}
      faqs={{
        'Really no login?': 'No. Upload and rewrite. No accounts, no logins.',
        'Is it private?': 'Completely anonymous. No tracking, no data collection.',
        'How to use?': 'Upload your PDF and click rewrite. That&apos;s it.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Rewrite PDF Online', slug: 'rewrite-pdf-online' },
      ]}
      primaryKeyword="pdf rewriter without login"
      secondaryKeywords={['anonymous rewriter', 'no login rewriter']}
    />
  );
}
