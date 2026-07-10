import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Translate PDF - Unlimited Free Translation | ConvertHub',
  description: 'Completely free PDF translation with AI. Unlimited translations, no credit card, no hidden fees ever.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Free AI Translate PDF"
      toolSlug="free-ai-translate-pdf"
      description="Completely free PDF translation powered by AI. Unlimited translations with no payments, no registration, no limits."
      mainContent={`Translation shouldn't cost money. Our free AI translator delivers professional quality without any payment.

Truly Free Service:
Unlimited translations. Unlimited file uploads. Unlimited language pairs. No credit card needed. No account creation. No hidden fees. Ever.

Professional Quality at No Cost:
Same professional-grade AI that powers enterprise solutions. Same accuracy. Same formatting preservation. Completely free.`}
      useCase={[
        'Student document translation',
        'Budget-conscious translation',
        'Personal document translation',
        'Learning foreign languages',
        'Research paper translation',
        'Hobby projects',
        'Community translation',
        'Non-profit translation work',
      ].join('\n')}
      testimonials={[
        {
          name: 'Marcus Liu',
          role: 'Graduate Student',
          text: 'Completely free and actually works well! Translated dozens of research papers for my thesis. Translation quality is excellent.',
        },
        {
          name: 'Jennifer White',
          role: 'Language Learning Enthusiast',
          text: 'Perfect for language learning. Free translation helps me understand documents in languages I\'m learning. Highly recommended.',
        },
      ]}
      features={[
        'Completely free service',
        'Unlimited translations',
        'No registration required',
        'No credit card needed',
        'Professional quality',
        'No file limits',
        'No usage restrictions',
        'No hidden fees',
      ]}
      benefits={[
        'Zero cost translation',
        'No barriers to access',
        'Perfect for students',
        'Budget-friendly',
        'Unlimited usage',
        'No commitments',
        'No surprises',
        'Truly accessible',
      ]}
      faqs={[
        {
          q: 'Is it really free?',
          a: 'Completely free. No payments, no credit card, no hidden fees. Ever.',
        },
        {
          q: 'Are there usage limits?',
          a: 'No limits. Translate as much as you need, whenever you need.',
        },
      ]}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'Translate PDF Online', slug: 'translate-pdf-online' },
      ]}
      primaryKeyword="free ai translate pdf"
      secondaryKeywords={['free translation', 'no cost translator']}
    />
  );
}
