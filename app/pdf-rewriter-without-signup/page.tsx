import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Rewriter Without Signup - Instant Access | ConvertHub',
  description: 'Rewrite PDFs without creating an account. Zero-friction signup-free access.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Rewriter Without Signup"
      toolSlug="pdf-rewriter-without-signup"
      description="Zero-friction rewriting. No signup, no account creation, no form filling. Just upload and rewrite."
      mainContent={`Skip the signup. Skip the forms. Just rewrite your PDF immediately.

Zero Friction:
No signup process. No account creation. No form filling. No email confirmation. Instant access. Zero friction.

Fastest Entry Point:
Get rewriting in seconds. No wasted time. No unnecessary forms. Pure simplicity.`}
      useCase={`Quick rewriting needs
One-time users
Speed focused
No-friction preference
Impatient users
Temporary needs
Rapid deployment
Quick use`}
      testimonials={{
        'Carlos López': 'Busy Manager - No signup required. Rewrite instantly. No wasted time, no unnecessary forms.',
        'Priya Sharma': 'Freelancer - Love that I can rewrite immediately. No account, just upload and go.',
      }}
      features={{
        'Signup-free access': 'No account needed',
        'No forms': 'No email required',
        'Zero friction': 'Instant start',
        'Quick access': 'Immediate use',
        'No barriers': 'Pure simplicity',
        'Fast entry': 'Simple interface',
        'No delays': 'Instant rewriting',
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
        'Really no signup?': 'No signup ever. Upload and rewrite immediately.',
        'Permanent access?': 'Your session stays active as long as you need.',
        'How quick?': 'Upload and rewrite in seconds. Zero setup time.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'PDF Rewriter Without Login', slug: 'pdf-rewriter-without-login' },
      ]}
      primaryKeyword="pdf rewriter without signup"
      secondaryKeywords={['signup free', 'no signup required']}
    />
  );
}
