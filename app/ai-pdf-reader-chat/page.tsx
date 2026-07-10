import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI PDF Reader Chat - Intelligent Reading Assistant | PDFilio',
  description: 'Read PDFs intelligently with AI chat. Get explanations and assistance while reading.',
  keywords: 'pdf reader ai, intelligent reader, reading assistant, interactive pdf',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI PDF Reader Chat"
      toolSlug="ai-pdf-reader-chat"
      description="Intelligent PDF reader with built-in chat. Read, understand, and chat simultaneously with your documents."
      mainContent={`Reading made intelligent. While you read, chat about what you're learning. Combine reading with AI assistance.

Reading Assistant:
- Read and chat together
- Ask about content
- Get explanations
- Clarify concepts
- Active learning
- Contextual help
- Interactive reading
- Learning enhancement

Active Learning:
Move beyond passive reading. Chat about the content, ask questions, deepen understanding as you read.

Study Enhancement:
Perfect for textbooks, research papers, technical documents. Chat while you read to maximize comprehension.`}
      features={[
        'PDF viewer integration',
        'Chat while reading',
        'Explanations available',
        'Concept clarification',
        'Context awareness',
        'Active engagement',
        'Learning support',
        'Interactive interface',
      ]}
      benefits={[
        'Better understanding',
        'Faster learning',
        'Deeper comprehension',
        'Active engagement',
        'Study efficiency',
        'Learning support',
        'Interactive experience',
        'Knowledge retention',
      ]}
      useCase={[
        'Textbook reading',
        'Study sessions',
        'Research reading',
        'Learning projects',
        'Academic study',
        'Professional development',
        'Technical reading',
        'Educational content',
        'Comprehension support',
        'Active learning',
      ].join('\n')}
      testimonials={[
        {
          name: 'Emma Daniels',
          role: 'Graduate Student',
          text: 'Chat while reading textbooks. Clarify concepts instantly. My comprehension improved significantly.',
        },
        {
          name: 'Professor Mark Stevens',
          role: 'Educator',
          text: 'Students understand better with this intelligent reader. Active engagement makes learning stick.',
        },
      ]}
      faqs={[
        {
          q: 'How does reader chat work?',
          a: 'View PDF and chat panel side by side. Chat about the content while reading.',
        },
        {
          q: 'Helps with understanding?',
          a: 'Absolutely. Ask questions and get explanations while reading for better comprehension.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'AI PDF Reader', slug: 'ai-pdf-reader' },
      ]}
      primaryKeyword="AI PDF reader chat"
      secondaryKeywords={['intelligent reader', 'reading assistant']}
    />
  );
}
