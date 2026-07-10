import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Assistant Without Login - Anonymous Research | ConvertHub',
  description: 'Research without registration. AI research assistance instantly, no login required.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Assistant Without Login"
      toolSlug="ai-research-assistant-without-login"
      description="Instant AI research assistance without registration. Access full research capabilities immediately, no login barriers."
      mainContent={`Research instantly. No registration barriers. No login delays. Pure research convenience.

Zero Friction Access:
Open browser. Start researching immediately. Full capabilities without identity verification. Instant productivity.

Anonymous Privacy:
Research without tracking. No account requirements. No privacy concerns. Pure research focus.`}
      useCase={`Quick research needs
Anonymous analysis
Privacy-focused work
Temporary research
No commitment required
Immediate access
One-time research
Guest access`}
      testimonials={[
        {
          name: 'Kevin Palmer',
          role: 'Independent Researcher',
          text: 'No login friction. Research immediately. Exactly what I needed for quick analysis.',
        },
        {
          name: 'Nicole Brooks',
          role: 'Privacy Advocate',
          text: 'Research without tracking. Anonymous access appreciated. Privacy-first approach excellent.',
        },
        {
          name: 'James Miller',
          role: 'Casual Researcher',
          text: 'Quick research needs met instantly. No setup hassle. Exactly right for occasional use.',
        },
      ]}
      features={[
        'No login required',
        'No registration',
        'Full capabilities',
        'Anonymous',
        'No tracking',
        'Instant start',
        'No account',
        'Quick access',
      ]}
      benefits={[
        'Zero setup',
        'Privacy',
        'Convenience',
        'Simplicity',
      ]}
      faqs={[
        {
          q: 'Really no login?',
          a: 'Correct. Completely anonymous access. No registration, no login, no accounts.',
        },
        {
          q: 'Full features without account?',
          a: 'Yes. All research capabilities available without any login requirements.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Research Assistant Without Signup', slug: 'ai-research-assistant-without-signup' },
      ]}
      primaryKeyword="ai research assistant without login"
      secondaryKeywords={['anonymous research', 'no login tool', 'instant access']}
    />
  );
}
