import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Translator Without Signup - Instant Access | ConvertHub',
  description: 'Translate PDFs without creating an account. Zero-friction signup-free access.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Translator Without Signup"
      toolSlug="ai-pdf-translator-without-signup"
      description="Zero-friction translation. No signup, no account creation, no form filling. Just upload and translate."
      mainContent={`Skip the signup. Skip the forms. Just translate your PDF immediately.

Zero Friction:
No signup process. No account creation. No form filling. No email confirmation. Instant access. Zero friction throughout.

Fastest Entry Point:
Get translating in seconds. No wasted time. No unnecessary forms.`}
      useCase={{
        'Quick translation': 'One-time users',
        'Speed focused': 'No-friction preference',
        'Impatient users': 'Temporary needs',
        'Rapid deployment': 'Quick use',
        'Trial users': 'Friction-free access',
        'Casual translation': 'Simple needs',
        'Quick reference': 'Fast turnaround',
        'No commitment': 'Try it first',
      }}
      testimonials={{
        'Carlos López': 'Busy Manager - No signup required. Translate instantly. No wasted time, no unnecessary forms.',
        'Priya Sharma': 'Freelancer - Love that I can translate immediately. No account, just upload and go.',
      }}
      features={{
        'Signup-free access': 'No account needed',
        'No forms': 'No email required',
        'Zero friction': 'Instant start',
        'Quick access': 'Immediate use',
        'No barriers': 'Pure simplicity',
        'Fast entry': 'Simple interface',
        'No delays': 'Instant translation',
        'Complete ease': 'Easy process',
      }}
      benefits={{
        'No barriers': 'Fastest access',
        'Zero friction': 'Immediate use',
        'Time efficient': 'Quick start',
        'Easy entry': 'Simple process',
        'No delays': 'Instant results',
        'No commitment': 'Try now',
        'Friction-free': 'Pure simplicity',
        'Complete ease': 'No hassle',
      }}
      faqs={{
        'Really no signup?': 'No signup ever. Upload and translate immediately.',
        'Permanent access?': 'Your session stays active as long as you need.',
        'How quick?': 'Upload and translate in seconds. Zero setup time.',
      }}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI PDF Translator Without Login', slug: 'ai-pdf-translator-without-login' },
      ]}
      primaryKeyword="ai pdf translator without signup"
      secondaryKeywords={['signup free', 'no signup required']}
    />
  );
}
