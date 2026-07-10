import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Translate PDF Online - Web-Based PDF Translation | TranslateHub',
  description: 'Translate PDFs online instantly. No download needed, works in any browser.',
  keywords: 'translate pdf online, online pdf translator, web pdf translation',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Translate PDF Online"
      toolSlug="translate-pdf-online"
      description="Pure web-based PDF translation. Upload online and get instant translations in any browser, any device."
      mainContent={`Browser-based translation for complete convenience. Upload your PDF and get translation instantly without installing software.

Complete Online Experience:
- Works in any browser
- No software installation
- No app downloads
- Mobile compatible
- Cloud processing
- Instant access anywhere
- Cross-device support
- Always available

Work From Anywhere:
Office, home, travel—wherever you have internet access, you can translate PDFs. Perfect for remote teams and distributed organizations.

Seamless Cross-Device:
Start translation on your desktop, check results on your phone. Cloud-based processing means your work is always synchronized.`}
      features={[
        'Browser-only access',
        'No installation',
        'Cloud processing',
        'Mobile responsive',
        'Cross-device sync',
        'Instant startup',
        'Universal compatibility',
        'Real-time translation',
      ]}
      benefits={[
        'Zero setup time',
        'Works everywhere',
        'Team friendly',
        'No maintenance',
        'Easy adoption',
        'Remote work ready',
        'Device flexible',
        'Always available',
      ]}
      useCase={[
        'Remote teams',
        'Mobile access',
        'Travel translation',
        'Quick translation',
        'Cross-device work',
        'No-installation need',
        'Temporary access',
        'Field work',
        'Distributed teams',
        'Anywhere access',
      ].join('\n')}
      testimonials={[
        {
          name: 'Maria Santos',
          role: 'Remote Coordinator',
          text: 'Online translation is perfect for my distributed team. Everyone accesses from their device instantly.',
        },
        {
          name: 'Thomas Wheeler',
          role: 'Travel Consultant',
          text: 'Translate documents while traveling. No software, no hassle. Perfect for my mobile workflow.',
        },
      ]}
      faqs={[
        {
          q: 'Do I need to install anything?',
          a: 'No. Completely web-based. Works in any modern browser.',
        },
        {
          q: 'Can I use it on my phone?',
          a: 'Yes, fully responsive and optimized for mobile devices.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'Instant PDF Translator', slug: 'instant-pdf-translator' },
      ]}
      primaryKeyword="translate pdf online"
      secondaryKeywords={['online pdf translator', 'web translation']}
    />
  );
}
