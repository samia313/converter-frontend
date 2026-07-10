import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rewrite PDF Online - Web-Based Document Rewriting | ConvertHub',
  description: 'Rewrite PDFs directly in your browser. No installation needed. Works on any device.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Rewrite PDF Online"
      toolSlug="rewrite-pdf-online"
      description="Web-based PDF rewriting. Upload, rewrite, download—all in your browser instantly."
      mainContent={`Pure web convenience. No software to install. No accounts to create. Just open, rewrite, download. Works on desktop, tablet, smartphone.

Browser-Based Simplicity:
Chrome, Safari, Firefox, Edge—any modern browser works perfectly. Windows, Mac, Linux—any operating system supported. Truly platform-independent.

Instant Access:
Upload your PDF. Select rewriting style. Download improved version. No complications. No barriers. Pure simplicity online.`}
      useCase={`Quick rewriting needs
Remote work from anywhere
Mobile device access
Travel document editing
Cross-platform compatibility
Simple one-time rewrites
Browser-only access
No installation preference`}
      testimonials={[
        {
          name: 'Lisa Patterson',
          role: 'Remote Consultant',
          text: 'Perfect for remote work. Rewrite PDFs from any device using any browser. Zero installation hassle, instant results.',
        },
        {
          name: 'Alex Kumar',
          role: 'Mobile-First Professional',
          text: 'Works flawlessly on my phone and laptop. Consistent experience everywhere. Essential for mobile professionals.',
        },
      ]}
      features={[
        'Works in any browser',
        'No installation required',
        'No registration needed',
        'Mobile responsive',
        'Cross-platform support',
        'Instant access',
        'Complete privacy',
        'Multiple language support',
      ]}
      benefits={{
        'Complete accessibility': 'Works everywhere',
        'Zero setup time': 'Instant start',
        'Device independent': 'Any device works',
        'Always available': 'Browser access',
      }}
      faqs={{
        'Really no installation?': 'No. Pure browser-based. Works immediately.',
        'Mobile support?': 'Perfect. Fully responsive on phones and tablets.',
        'Which browsers?': 'All modern browsers. Chrome, Safari, Firefox, Edge—everything works.',
        'Data privacy?': 'Complete. No data stored. Session-based only.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Free AI PDF Rewriter', slug: 'free-ai-pdf-rewriter' },
      ]}
      primaryKeyword="rewrite pdf online"
      secondaryKeywords={['web based rewriter', 'online document editor']}
    />
  );
}
