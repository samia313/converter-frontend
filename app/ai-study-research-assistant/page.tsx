import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Study Research Assistant - Student Study Support | ConvertHub',
  description: 'AI-powered study companion for students. Comprehend complex material, prepare for exams, master difficult concepts.',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Study Research Assistant"
      toolSlug="ai-study-research-assistant"
      description="Student-focused AI research companion. Master complex material, prepare comprehensive study notes, accelerate learning."
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
      testimonials={[
        {
          name: 'Emily Rodriguez',
          role: 'Engineering Student',
          text: 'Complex material finally understandable. Study notes comprehensive and organized. Exam scores improved dramatically.',
        },
        {
          name: 'David Kim',
          role: 'Medical Student',
          text: 'Massive textbooks simplified effectively. Study process efficient. Knowledge retention improved significantly.',
        },
        {
          name: 'Prof. Rebecca Martinez',
          role: 'Dean of Students',
          text: 'Student academic performance improved. Learning support accessible 24/7. Student satisfaction exceptional.',
        },
      ]}
      features={{
        'Concept simplification': 'Complex made clear',
        'Study notes generation': 'Automatic organization',
        'Practice questions': 'Self-testing enabled',
        'Gap identification': 'Weakness discovery',
        'Material review': 'Comprehensive synthesis',
        'Exam preparation': 'Systematic readiness',
        'Learning support': 'Personalized help',
        'Progress tracking': 'Improvement monitoring',
      }}
      benefits={{
        'Study efficiency': 'Time optimization',
        'Material mastery': 'Deep learning',
        'Exam confidence': 'Preparation quality',
        'Academic success': 'Performance improvement',
      }}
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
