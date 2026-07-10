import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Summary Generator - Automatic Summary Creation | PDFilio',
  description: 'Automatically generate professional PDF summaries. One-click summarization with customizable output formats.',
  keywords: 'PDF summary generator, automatic summarization, summary creator, document generator',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="PDF Summary Generator"
      toolSlug="pdf-summary-generator"
      description="Automatically generate professional summaries from any PDF. One-click processing with customizable formats and styles."
      mainContent={`Generate summaries in one click. Automatic PDF analysis creates professional summaries instantly. No manual work, just upload and generate.

One-Click Simplicity:
- Upload PDF
- Click Generate
- Get summary instantly
- Download or copy

Customizable Output:
Choose your summary format - bullet points, paragraphs, or structured outline. Adjust length and detail level instantly.

Professional Results:
Every summary is polished and professional. Perfect for presentations, reports, and business communication.`}
      features={[
        'One-click generation',
        'Instant processing',
        'Multiple output formats',
        'Customizable templates',
        'Professional styling',
        'Batch generation',
        'Export options',
        'Quick turnaround',
      ]}
      benefits={[
        'Extremely fast',
        'No manual work',
        'Professional output',
        'Instant results',
        'Easy customization',
        'Time saving',
        'Batch capable',
        'Quality assured',
      ]}
      useCase={[
        'Report generation',
        'Presentation preparation',
        'Quick document review',
        'Instant summaries',
        'Batch processing',
        'Professional documents',
        'Business communication',
        'Content creation',
      ].join('\n')}
      testimonials={[
        {
          name: 'Robert Chang',
          role: 'Business Analyst',
          text: 'One click and I get a perfect summary. No fiddling, no adjustments needed. Saves me hours daily.',
        },
      ]}
      faqs={[
        {
          q: 'How fast does it generate?',
          a: 'Almost instantly. Most PDFs summarized in 2-5 seconds.',
        },
        {
          q: 'Can I customize the format?',
          a: 'Yes, multiple format options including bullets, paragraphs, and outlines.',
        },
      ]}
      relatedTools={[
        { name: 'AI PDF Summary', slug: 'ai-pdf-summary' },
      ]}
      primaryKeyword="PDF summary generator"
      secondaryKeywords={['automatic summarization', 'summary creator']}
    />
  );
}
