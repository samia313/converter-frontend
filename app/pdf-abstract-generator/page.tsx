import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Abstract Generator - Academic Summary Tool | PDFilio',
  description: 'Generate academic abstracts automatically. Perfect for research papers and academic documents.',
  keywords: 'PDF abstract generator, academic abstract, research paper summary, abstract AI',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Abstract Generator"
      toolSlug="pdf-abstract-generator"
      description="Generate professional academic abstracts automatically. Perfect for research papers and scholarly documents."
      mainContent="Academic focus. Creates abstracts in academic style suitable for research papers. Concise, professional, publication-ready."
      features={['Academic format', 'Research focused', 'Abstract style', 'Professional tone', 'Citation ready', 'Publication format', 'Scholarly language', 'Academic standards']}
      benefits={['Academic style', 'Research ready', 'Publication suitable', 'Professional format', 'Time saving', 'Quality assured', 'Standards compliant', 'Scholarly output']}
      useCase={['Research papers', 'Academic writing', 'Paper submission', 'Literature review', 'Thesis support', 'Journal preparation', 'Academic conference', 'Scholarly work'].join('\n')}
      testimonials={[{name: 'Prof. Elena Rodriguez', role: 'Academic Advisor', text: 'Generates abstracts in proper academic format. Perfect for student papers and research.'}]}
      faqs={[{q: 'Academic format?', a: 'Yes, generates abstracts in proper academic style suitable for publication.'}]}
      relatedTools={[{name: 'AI PDF Summary', slug: 'ai-pdf-summary'}]}
      primaryKeyword="PDF abstract generator"
      secondaryKeywords={['academic abstract', 'research paper summary']}
    />
  );
}
