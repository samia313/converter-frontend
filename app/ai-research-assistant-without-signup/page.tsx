import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Research Assistant Without Signup - Zero Friction Tool | ConvertHub',
  description: 'Research without signup barriers. Full AI research capabilities instantly available, no registration needed.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Research Assistant Without Signup"
      toolSlug="ai-research-assistant-without-signup"
      description="Completely frictionless AI research. Full capabilities without signup requirements. Research immediately, no barriers."
      mainContent={`Zero friction research. No signup forms. No email verification. No account setup delays.

Instant Productivity:
Open browser. Start researching. Full capabilities immediately available. Pure convenience.

No Barriers to Entry:
Research without obstacles. No forms to complete. No accounts to create. Instant access.`}
      useCase={`Quick research projects
Time-sensitive analysis
Temporary research needs
Guest access research
Barrier-free research
No commitment research
Immediate analysis
One-time access`}
      testimonials={[
        {
          name: 'Rebecca Turner',
          role: 'Busy Professional',
          text: 'No signup delays. Research immediately. Exactly right for busy professionals.',
        },
        {
          name: 'Marcus Davis',
          role: 'Quick Researcher',
          text: 'No forms, no delays, no hassle. Pure research convenience without friction.',
        },
        {
          name: 'Laura Bennett',
          role: 'Casual User',
          text: 'Frictionless experience. Research when needed without account complications.',
        },
      ]}
      features={{
        'No signup': 'Immediate access',
        'Zero forms': 'Friction-free',
        'Instant access': 'No delays',
        'Full capabilities': 'Complete features',
        'No email needed': 'Zero requirements',
        'No account setup': 'Instant use',
        'Guest research': 'Anonymous access',
        'Quick start': 'Immediate productivity',
      }}
      benefits={{
        'Zero barriers': 'Instant start',
        'Time saving': 'No delays',
        'Convenience': 'Friction-free',
        'Simplicity': 'Pure access',
      }}
      faqs={[
        {
          q: 'Really no signup?',
          a: 'Correct. Completely signup-free. No forms, no registration, no account creation required.',
        },
        {
          q: 'All features available?',
          a: 'Yes. Every feature accessible without any signup barriers.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Research Assistant Without Login', slug: 'ai-research-assistant-without-login' },
      ]}
      primaryKeyword="ai research assistant without signup"
      secondaryKeywords={['no signup tool', 'zero friction', 'instant access']}
    />
  );
}
