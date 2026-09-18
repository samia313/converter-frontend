import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Study Research Assistant – Study and Understand Research Documents | PDFilio',
  description: 'AI-assisted study support for simplifying complex material, organizing notes, reviewing documents, and preparing practice questions from supported content.',
  keywords: 'AI study research assistant, AI study assistant, research study tool, document study assistant',
  alternates: { canonical: 'https://pdfilio.com/ai-study-research-assistant' },
  openGraph: { title: 'AI Study Research Assistant – Study and Understand Research Documents | PDFilio', description: 'AI-assisted study support for simplifying complex material, organizing notes, reviewing documents, and preparing practice questions from supported content.', url: 'https://pdfilio.com/ai-study-research-assistant', type: 'website' },
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Study Research Assistant"
      toolSlug="ai-study-research-assistant"
      description="AI-assisted study support for simplifying complex material, organizing notes, reviewing documents, and preparing study materials."
      mainContent={`Study smarter, not harder. Complex material simplified. Comprehensive notes generated automatically. Exam preparation streamlined.

Learning Support Engine:
AI breaks down complex concepts. Creates study summaries. Generates practice questions. Identifies knowledge gaps.

Study Excellence:
Prepare thoroughly. Master material deeply. Pass exams confidently. Achieve academic success.`}
      useCase={`Exam preparation
Study notes generation
Complex concept simplification
Material comprehension
Practice question creation
Knowledge gap identification
Review material synthesis
Study guide development`}
      testimonials={[]}
      features={[
        'Concept simplification',
        'Study notes generation',
        'Practice questions',
        'Gap identification',
        'Material review',
        'Exam preparation',
        'Learning support',
        'Progress tracking',
      ]}
      benefits={[
        'Study efficiency',
        'Material mastery',
        'Exam confidence',
        'Academic success',
      ]}
      faqs={[
        {
          q: 'Simplify difficult material?',
          a: 'Yes. Breaks down complex concepts into understandable, organized study material.',
        },
        {
          q: 'Generate practice questions?',
          a: 'Absolutely. Creates relevant practice questions for comprehensive exam preparation.',
        },
      ]}
      relatedTools={[
        { name: 'AI Academic Research Assistant', slug: 'ai-academic-research-assistant' },
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
      ]}
      primaryKeyword="ai study research assistant"
      secondaryKeywords={['study aid', 'exam preparation', 'learning support']}
    />
  );
}
