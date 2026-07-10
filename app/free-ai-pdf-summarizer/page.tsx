import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI PDF Summarizer - Unlimited Free Summaries | PDFilio',
  description: 'Completely free AI PDF summarizer. Unlimited summaries with no hidden fees, no credit card, no limits.',
  keywords: 'free AI PDF summarizer, free summarizer, unlimited summaries, no signup PDF summarizer',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Free AI PDF Summarizer"
      toolSlug="free-ai-pdf-summarizer"
      description="Completely free PDF summarization with AI. No hidden fees, no credit card required, unlimited summaries. Pure free service."
      mainContent={`Truly free PDF summarization. No freemium tricks, no premium upsells, no hidden costs. Unlimited summaries for everyone, forever.

What You Get Free:
- Unlimited PDF summaries
- Full AI intelligence
- All features included
- No registration required
- No credit card needed
- No usage limits
- No time restrictions
- Complete access always

No Catches:
This is genuinely free service. Not a limited trial. Not a demo. Full access to all features.

For Students, Professionals, Everyone:
Whether you're a student managing coursework or a professional handling business documents, full access is completely free.`}
      features={[
        'Completely free access',
        'Unlimited summaries',
        'No registration needed',
        'No credit card required',
        'All features free',
        'No usage limits',
        'No paywalls',
        'Truly free forever',
      ]}
      benefits={[
        'No cost barrier',
        'No hidden fees',
        'Complete free access',
        'Works for everyone',
        'Student friendly',
        'Budget conscious choice',
        'Full feature access',
        'Permanent free use',
      ]}
      useCase={[
        'Student research papers',
        'Budget-conscious professionals',
        'Academic use',
        'Learning and education',
        'Personal use',
        'Non-profit organizations',
        'Anyone needing summaries',
        'Free tool alternatives',
      ].join('\n')}
      testimonials={[
        {
          name: 'Alex Martinez',
          role: 'Graduate Student',
          text: 'Finally a truly free tool! Unlimited summaries for my research papers. No registration, no fees. Perfect for students.',
        },
      ]}
      faqs={[
        {
          q: 'Is this really free?',
          a: 'Yes! Completely free with unlimited summaries. No tricks, no hidden fees.',
        },
        {
          q: 'Any limitations?',
          a: 'None! Full access to all features completely free.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Summary', slug: 'ai-pdf-summary' },
      ]}
      primaryKeyword="free AI PDF summarizer"
      secondaryKeywords={['unlimited summaries', 'no cost summarizer']}
    />
  );
}
