import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Translate PDF Online - Web-Based Translation | ConvertHub',
  description: 'Translate PDF documents online instantly. No software installation needed. Works on any device, anywhere.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Translate PDF Online"
      toolSlug="translate-pdf-online"
      description="Pure web-based PDF translation. Upload and translate instantly from any browser, on any device, anywhere in the world."
      mainContent={`Translation without barriers. No software to install, no accounts to create. Just upload your PDF and translate immediately.

Complete Online Freedom:
Works on desktop, laptop, tablet, smartphone. Chrome, Safari, Firefox, Edge—any browser works. Windows, Mac, Linux—any operating system supported.

Instant Access:
Fastest translation. Upload, select language, translate. Results in seconds. No waiting, no complexity.`}
      useCase={[
        'Quick translation needs',
        'Remote work translation',
        'Mobile device access',
        'Travel document translation',
        'Quick reference translation',
        'On-the-go translation',
        'Multiple device support',
        'Cross-platform access',
      ].join('\n')}
      testimonials={[
        {
          name: 'James Wilson',
          role: 'Remote Worker',
          text: 'Perfect for remote work. No installation, works on my laptop and phone. Translate documents instantly anywhere.',
        },
        {
          name: 'Nina Patel',
          role: 'Traveling Consultant',
          text: 'Used it while traveling. No software needed, works perfectly in any browser. Exactly what I needed.',
        },
      ]}
      features={[
        'Works in any browser',
        'No software installation',
        'No registration required',
        'Mobile responsive design',
        'Cross-platform support',
        'Instant results',
        'Works offline preparation',
        'Multiple language pairs',
      ]}
      benefits={[
        'Complete convenience',
        'No installation hassle',
        'Access from anywhere',
        'Works on all devices',
        'Zero setup time',
        'Instant translation',
        'No system requirements',
        'Truly portable',
      ]}
      faqs={[
        {
          q: 'Really no installation?',
          a: 'No installation needed. Works directly in your browser. Open, upload, translate.',
        },
        {
          q: 'Works on my phone?',
          a: 'Yes! Fully responsive. Works perfectly on smartphones and tablets.',
        },
      ]}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'Free AI Translate PDF', slug: 'free-ai-translate-pdf' },
      ]}
      primaryKeyword="translate pdf online"
      secondaryKeywords={['online translation', 'web based translator']}
    />
  );
}
