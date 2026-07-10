import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Summary Tool - Complete Summarization Solution | PDFilio',
  description: 'Comprehensive AI tool for PDF summarization. Includes templates, presets, and advanced options for professional summarization.',
  keywords: 'PDF summary tool, summarization software, advanced summarizer, professional tool',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Summary Tool"
      toolSlug="ai-pdf-summary-tool"
      description="Professional-grade AI summarization tool. Complete suite of features for every summarization need. Templates, presets, and advanced options included."
      mainContent={`Complete summarization solution for professionals. Not just basic summarization - a full toolkit with advanced options, templates, and customization.

Professional Features:
- Multiple summary styles
- Custom templates
- Batch processing
- Output formatting options
- Integration capabilities
- Team collaboration tools
- Advanced customization
- Professional outputs

Beyond Basic Summarization:
Use preset templates for reports, proposals, papers, and briefs. Customize every aspect of your summaries. Get professional results consistently.

For Teams and Professionals:
Built for organizations that need consistent, professional summaries. Advanced features for sophisticated use cases.`}
      features={[
        'Professional templates',
        'Custom presets',
        'Batch summarization',
        'Output formatting',
        'Team collaboration',
        'Advanced customization',
        'Integration ready',
        'Enterprise features',
      ]}
      benefits={[
        'Professional quality',
        'Consistent output',
        'Time efficient',
        'Team friendly',
        'Customizable workflows',
        'Advanced capabilities',
        'Scalable solution',
        'Integration capable',
      ]}
      useCase={[
        'Team summarization projects',
        'Batch document processing',
        'Professional presentations',
        'Business intelligence',
        'Content management',
        'Document workflows',
        'Enterprise solutions',
        'Custom integrations',
      ].join('\n')}
      testimonials={[
        {
          name: 'Catherine Brooks',
          role: 'Corporate Manager',
          text: 'Professional tool with all the features we need. Templates, batch processing, team collaboration. Worth every penny.',
        },
      ]}
      faqs={[
        {
          q: 'Can teams use this?',
          a: 'Yes! Includes collaboration features for team projects.',
        },
        {
          q: 'Custom templates?',
          a: 'Yes, create and save custom templates for your workflows.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Summary', slug: 'ai-pdf-summary' },
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
      ]}
      primaryKeyword="AI PDF summary tool"
      secondaryKeywords={['summarization software', 'professional tool']}
    />
  );
}
