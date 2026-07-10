import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Translation - Professional Document Translation | ConvertHub',
  description: 'Comprehensive PDF translation solution using AI. Perfect for business, legal, and technical documents.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Translation"
      toolSlug="ai-pdf-translation"
      description="Complete PDF translation solution powered by enterprise-grade AI. Professional quality for every document type."
      mainContent={`The complete translation solution. From initial translation to final refinement, our AI handles every aspect of document translation professionally.

Enterprise-Grade Translation:
Built for organizations that need reliable, scalable translation. Handle single documents or thousands simultaneously. Our infrastructure scales with your needs.

Quality Assurance Built-In:
Automatic quality checks ensure consistency. Flag potential issues. Maintain terminology databases. Everything designed for professional translation workflows.`}
      useCase={`Enterprise document translation
Large-scale localization projects
Translation workflow management
Quality assurance processes
Terminology management
Compliance documentation
International expansion projects
Multilingual team coordination`}
      testimonials={[
        {
          name: 'David Thompson',
          role: 'Translation Manager, Fortune 500 Company',
          text: 'Enterprise-level solution. Quality, scalability, and workflow management are exceptional. Recommended for large-scale translation needs.',
        },
        {
          name: 'Patricia Martinez',
          role: 'Compliance Director',
          text: 'Meets all our compliance requirements. Translation quality and documentation trail are audit-ready.',
        },
      ]}
      features={[
        'Enterprise-grade infrastructure',
        'Scalable processing',
        'Quality assurance tools',
        'Terminology management',
        'Translation history tracking',
        'Compliance documentation',
        'Advanced analytics',
        'Team collaboration tools',
      ]}
      benefits={[
        'Professional-grade quality',
        'Scalable for growth',
        'Compliance ready',
        'Workflow optimization',
        'Team productivity',
        'Cost efficiency',
        'Risk reduction',
        'Quality assurance',
      ]}
      faqs={[
        {
          q: 'Suitable for enterprises?',
          a: 'Perfect for enterprises. Scalable infrastructure, compliance features, and professional workflows.',
        },
        {
          q: 'Quality assurance included?',
          a: 'Yes. Automatic quality checks, consistency verification, and compliance documentation included.',
        },
      ]}
      relatedTools={[
        { name: 'AI Translate PDF', slug: 'ai-translate-pdf' },
        { name: 'AI Multilingual PDF Translator', slug: 'ai-multilingual-pdf-translator' },
      ]}
      primaryKeyword="ai pdf translation"
      secondaryKeywords={['pdf translation', 'document translation service']}
    />
  );
}
