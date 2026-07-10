import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Research Assistant - No Cost Research Tool | ConvertHub',
  description: 'Professional AI research capabilities completely free. Unlimited analysis, no credit cards, no limitations.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Free AI Research Assistant"
      toolSlug="free-ai-research-assistant"
      description="Completely free AI-powered research assistant with unlimited analysis capabilities. No payments, no subscriptions, no hidden costs."
      mainContent={`Professional research quality without premium pricing. Unlimited AI analysis completely free. No credit cards required.

Unlimited Analysis:
Analyze as many documents as needed. Unlimited research sessions. Unlimited document uploads. Zero cost barriers.

No Hidden Fees:
Completely transparent pricing. Free means free. No premium upsells. No limited free trials. Full capabilities forever.`}
      useCase={`Student research projects
Budget-conscious teams
Unlimited free analysis
Academic exploration
No subscription needed
Zero cost research
Barrier-free research
Free collaboration`}
      testimonials={[
        {
          name: 'Tom Anderson',
          role: 'Graduate Student',
          text: 'Professional research capabilities without cost. Finally accessible academic tools for students.',
        },
        {
          name: 'Patricia Davis',
          role: 'University Librarian',
          text: 'Provides students unlimited access to quality research tools. Removes financial barriers significantly.',
        },
        {
          name: 'Carlos Mendez',
          role: 'Research Assistant',
          text: 'Completely free with full features. Best academic tool value available anywhere.',
        },
      ]}
      features={[
        'Unlimited analysis',
        'Unlimited documents',
        'Unlimited sessions',
        'No credit card',
        'Full features free',
        'No time limits',
        'No hidden fees',
        'Perpetual access',
      ]}
      benefits={[
        'Zero cost',
        'Budget friendly',
        'Student accessible',
        'No subscriptions',
        'Unlimited usage',
        'No payment stress',
        'Barrier-free access',
        'Academic equality',
      ]}
      faqs={[
        {
          q: 'Really completely free?',
          a: 'Absolutely. Full features, unlimited usage, zero cost. No hidden fees or upgrades.',
        },
        {
          q: 'Credit card required?',
          a: 'No credit card needed ever. Completely free access.',
        },
      ]}
      relatedTools={[
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'Free AI Research Paper Assistant', slug: 'ai-research-paper-assistant' },
      ]}
      primaryKeyword="free ai research assistant"
      secondaryKeywords={['free research tool', 'no cost analysis', 'unlimited free']}
    />
  );
}
