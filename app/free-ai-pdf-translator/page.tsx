import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI PDF Translator - Unlimited Free Translations | TranslateHub',
  description: 'Free PDF translator with AI. Unlimited translations, no credit card, no hidden fees.',
  keywords: 'free ai pdf translator, free pdf translation, no cost translator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Free AI PDF Translator"
      toolSlug="free-ai-pdf-translator"
      description="Completely free AI PDF translation. Unlimited translations with full quality. No payments, no restrictions."
      mainContent={`Translation shouldn't cost money. Completely free PDF translator with unlimited access and zero payment required.

Truly Free Service:
- Unlimited translations
- Unlimited PDF uploads
- All features included
- No registration needed
- No credit card required
- No time limits
- No usage restrictions
- Free forever

Perfect For Everyone:
Students working on international projects. Professionals reviewing foreign documents. Anyone needing translation without cost barriers.

No Hidden Costs:
No freemium tricks, no limited trials, no upgrade nags. Full features, completely free, forever.`}
      features={[
        'Completely free',
        'Unlimited uploads',
        'Unlimited translations',
        'All languages',
        'No registration',
        'No credit card',
        'Full features free',
        'Professional quality',
      ]}
      benefits={[
        'No cost barrier',
        'Works for everyone',
        'Student friendly',
        'Budget conscious',
        'Complete access',
        'No surprises',
        'Unlimited use',
        'Professional results',
      ]}
      useCase={[
        'Student research',
        'Budget-conscious work',
        'Academic projects',
        'Learning resources',
        'Personal translation',
        'Non-profit work',
        'Volunteer projects',
        'Cost-free analysis',
        'Unlimited usage',
        'Free trial alternative',
      ].join('\n')}
      testimonials={[
        {
          name: 'Marcus Liu',
          role: 'Graduate Student',
          text: 'Finally a completely free translator that actually works well. Can translate as much as I need for my research.',
        },
        {
          name: 'Jennifer Okonkwo',
          role: 'Non-Profit Manager',
          text: 'Free translation helps us serve international communities without budget constraints.',
        },
      ]}
      faqs={[
        {
          q: 'Is it really free?',
          a: 'Yes, completely free with no hidden costs or limitations.',
        },
        {
          q: 'Any usage limits?',
          a: 'None. Unlimited PDFs and unlimited translations.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Translator', slug: 'ai-pdf-translator' },
        { name: 'Free PDF Translation', slug: 'free-pdf-translation' },
      ]}
      primaryKeyword="free ai pdf translator"
      secondaryKeywords={['free pdf translation', 'no cost translator']}
    />
  );
}
