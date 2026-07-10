import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI PDF Rewriter - Unlimited Free Rewriting | ConvertHub',
  description: 'Completely free PDF rewriting with AI. Unlimited rewrites, no credit card required.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Free AI PDF Rewriter"
      toolSlug="free-ai-pdf-rewriter"
      description="Completely free PDF rewriting powered by AI. Unlimited rewrites with zero payments, no limits."
      mainContent={`Rewriting shouldn't cost money. Our completely free service delivers professional-quality rewrites without any payment required.

Truly Free Service:
Unlimited rewrites. Unlimited file uploads. Unlimited usage. No credit card. No hidden fees. No future surprises. Ever.

Professional Quality at Zero Cost:
Same quality AI as premium services. Professional enhancement. Zero cost. Complete freedom to rewrite as much as you need.`}
      useCase={{
        'Student writing projects': 'Budget access',
        'Personal document improvement': 'Cost savings',
        'Learning and practice': 'Skill development',
        'Non-commercial writing': 'Hobby projects',
        'Community work': 'Pro-bono assistance',
        'Small business startups': 'Cost consciousness',
        'Research projects': 'Academic support',
        'Casual rewriting needs': 'No commitment required',
      }}
      testimonials={{
        'Marcus Chen': 'Graduate Student - Completely free and genuinely helpful. Improved my thesis writing without spending anything. Quality rivals expensive services.',
        'Jennifer Davis': 'Student Writer - Perfect for essays and assignments. Free rewriting helped my grades improve. No cost whatsoever.',
      }}
      features={{
        'Completely free': 'No payments ever',
        'Unlimited rewrites': 'No caps',
        'No credit card': 'Zero barriers',
        'No registration': 'Instant access',
        'Professional quality': 'Full features',
        'No file limits': 'Any size',
        'No usage restrictions': 'Total freedom',
        'Zero hidden costs': 'Transparent pricing',
      }}
      benefits={{
        'Zero cost solution': 'Completely free',
        'Unlimited usage': 'Rewrite infinitely',
        'No barriers': 'Instant access',
        'Perfect for students': 'Budget friendly',
        'Community accessible': 'Everyone included',
        'Professional quality': 'No compromise',
        'Complete freedom': 'No restrictions',
        'Peace of mind': 'No surprises',
      }}
      faqs={{
        'Is it really free?': 'Completely free. No payments, no credit card, no hidden fees. Ever.',
        'Usage limits?': 'No limits. Rewrite unlimited documents unlimited times.',
        'Quality same as paid?': 'Yes. Identical AI quality. No feature restrictions.',
      }}
      relatedTools={[
        { name: 'AI Rewrite PDF', slug: 'ai-rewrite-pdf' },
        { name: 'Rewrite PDF Online', slug: 'rewrite-pdf-online' },
      ]}
      primaryKeyword="free ai pdf rewriter"
      secondaryKeywords={['free rewriting', 'no cost rewriter']}
    />
  );
}
