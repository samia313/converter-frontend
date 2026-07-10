import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Chat Without Signup - Instant Access PDF Tool | PDFilio',
  description: 'Chat with PDFs instantly. No signup required, no account creation, just upload and start. Completely free, completely private.',
  keywords: 'PDF chat no signup, instant PDF access, free PDF chat, anonymous PDF chat',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Chat Without Signup"
      toolSlug="pdf-chat-no-signup"
      description="Immediate PDF chat access. No registration, no account creation, no email confirmation. Upload and chat instantly."
      mainContent="True instant access. No signup barriers. Upload your PDF and start chatting immediately. No forms, no emails, no accounts. Pure simplicity."
      features={['No registration', 'No account needed', 'Instant access', 'No email required', 'Anonymous usage', 'Immediate start', 'Privacy-focused', 'Barrier-free']}
      benefits={['Instant access', 'No barriers', 'Complete privacy', 'Easy entry', 'No commitment', 'Immediate use', 'Anonymous usage', 'Complete freedom']}
      useCase={['One-time users', 'Privacy-conscious', 'Quick checks', 'No commitment', 'Anonymous usage', 'Temporary analysis', 'One-off questions', 'Trial usage'].join('\n')}
      testimonials={[{name: 'Alex Johnson', role: 'Privacy Advocate', text: 'Finally, a PDF tool with no signup needed. Pure anonymous usage.'}]}
      faqs={[{q: 'Do I need an account?', a: 'No account needed! Start immediately without any registration.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}, {name: 'Free Chat with PDF', slug: 'free-chat-with-pdf'}]}
      primaryKeyword="PDF chat without signup"
      secondaryKeywords={['no signup PDF chat', 'anonymous PDF chat']}
    />
  );
}
