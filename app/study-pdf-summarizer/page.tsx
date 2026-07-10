import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Study PDF Summarizer - Student Study Helper | PDFilio',
  description: 'Study smarter with AI summaries. Perfect for students studying textbooks and course materials.',
  keywords: 'study PDF summarizer, student tool, textbook summary, learning aid',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Study PDF Summarizer"
      toolSlug="study-pdf-summarizer"
      description="Perfect study helper for students. Summarizes textbooks and course materials for better learning and retention."
      mainContent="Student-focused tool. Understand textbooks better with intelligent summaries. Perfect for studying, exam prep, and learning support."
      features={['Student focused', 'Learning optimized', 'Study support', 'Concept clarity', 'Exam prep', 'Retention support', 'Study friendly', 'Learning aid']}
      benefits={['Study better', 'Learn faster', 'Exam ready', 'Retain knowledge', 'Study efficient', 'Academic success', 'Learning support', 'Grade improvement']}
      useCase={['Textbook reading', 'Exam preparation', 'Course study', 'Learning support', 'Homework help', 'Study groups', 'Academic success', 'Student efficiency'].join('\n')}
      testimonials={[{name: 'Emma Students', role: 'High School Student', text: 'Perfect study tool. Summarizes textbooks and helps me study better. Grades improved!'}]}
      faqs={[{q: 'Student friendly?', a: 'Yes, designed specifically to help students study and understand course material.'}]}
      relatedTools={[{name: 'Chat with PDF', slug: 'chat-with-pdf'}]}
      primaryKeyword="study PDF summarizer"
      secondaryKeywords={['student study tool', 'textbook summary']}
    />
  );
}
