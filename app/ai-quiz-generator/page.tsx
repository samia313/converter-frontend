import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'AI Quiz Generator Online | Create Quizzes with AI | PDFilio',
  description: 'Create quizzes with AI assistance from study material, documents, and provided content. Generate structured questions for learning, revision, and practice.',
  keywords: ['AI quiz generator', 'quiz generator AI', 'AI question generator', 'create quiz with AI', 'AI test generator', 'study quiz generator'],
  alternates: { canonical: 'https://pdfilio.com/ai-quiz-generator' },
  openGraph: {
    title: 'AI Quiz Generator Online | PDFilio',
    description: 'Create quizzes with AI assistance from your study material and documents.',
    url: 'https://pdfilio.com/ai-quiz-generator',
    type: 'website',
  },
}

export default function AIQuizGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Quiz Generator',
    description: 'AI-assisted quiz and question generation tool.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
  }

  return (
    <ToolLandingLayout
      toolName="AI Quiz Generator"
      toolSlug="ai-quiz-generator"
      description="Create structured quizzes and practice questions with AI assistance from your study material, documents, or provided content."
      mainContent={`AI Quiz Generator helps turn supplied learning material into structured practice questions. Use it for revision, classroom preparation, self-study, training, or knowledge checks, then review the generated questions before using them.

## How to Create a Quiz with AI

Provide your source material and specify the topic, difficulty, question style, or other requirements you need. Generate a quiz draft, review the questions and answers, and adjust the content to match your learning goals.

## Create Practice Questions from Study Material

AI can help identify concepts, definitions, facts, and relationships from supplied content and turn them into questions. You can use the resulting quiz as a study aid rather than relying on it as the only source of truth.

## Review Questions and Answers

Check generated questions, answer keys, terminology, dates, calculations, and other factual details against the original material. Editing the quiz before sharing helps ensure that it matches the intended curriculum or training content.`}
      useCase={[
        'Exam preparation',
        'Study and revision',
        'Classroom practice',
        'Teacher-created quizzes',
        'Training and knowledge checks',
        'Research and reading review',
        'Self-assessment',
        'Educational content creation',
      ].join('\n')}
      features={[
        'AI-assisted question generation',
        'Multiple-choice quiz drafting',
        'Topic-based question creation',
        'Study-material-based quizzes',
        'Difficulty and format guidance',
        'Answer and explanation organization',
        'Revision-friendly quiz structure',
        'Editable generated content',
      ]}
      benefits={[
        'Create practice questions faster',
        'Turn study material into revision quizzes',
        'Organize knowledge checks around specific topics',
        'Reduce repetitive question-writing work',
        'Create drafts for classes and training',
        'Start with structured quiz content you can review',
      ]}
      faqs={[
        { q: 'What is an AI quiz generator?', a: 'An AI quiz generator creates quiz questions from instructions or source material you provide, helping turn information into structured practice and knowledge-check content.' },
        { q: 'Can AI create a quiz from a PDF?', a: 'If the PDF content is supported by the current PDFilio workflow, its content can be used as source material for generating quiz questions.' },
        { q: 'Can I create quizzes for exam preparation?', a: 'Yes. You can use generated questions as a revision aid and review them against your study material.' },
        { q: 'Can teachers use an AI quiz generator?', a: 'Yes. Teachers can use it to draft classroom questions, revision activities, and knowledge checks, followed by their own review and editing.' },
        { q: 'Can I create multiple-choice questions?', a: 'Yes. Multiple-choice questions can be included when supported by the current tool configuration and your selected requirements.' },
        { q: 'Can I choose the difficulty?', a: 'You can specify a desired difficulty or level in your instructions. The generated questions should still be reviewed for suitability.' },
        { q: 'Can I generate questions from my notes?', a: 'Yes. Your notes or other supported source content can be used to create practice questions based on the supplied information.' },
        { q: 'Can AI generate answer explanations?', a: 'AI can assist with answer explanations when requested, but explanations should be checked against reliable source material before use.' },
        { q: 'Can I use it for training and assessments?', a: 'It can help draft knowledge-check questions for training and internal learning activities. Review the content before using it for formal assessment.' },
        { q: 'Are AI-generated quiz answers always accurate?', a: 'No. Verify questions, answer keys, calculations, terminology, and other important facts against the source material.' },
        { q: 'Is AI Quiz Generator free?', a: 'Current pricing, usage limits, and available features depend on the product configuration shown by PDFilio.' },
        { q: 'Can I edit an AI-generated quiz?', a: 'Yes. Review and edit the generated questions, choices, answers, and explanations to fit your intended audience and source material.' },
      ]}
      relatedTools={[
        { name: 'AI Notes Generator', slug: 'ai-notes-generator' },
        { name: 'AI PDF Summary', slug: 'ai-pdf-summary' },
        { name: 'AI Research Assistant', slug: 'ai-research-assistant' },
        { name: 'AI Chat with PDF', slug: 'ai-chat-pdf' },
      ]}
      primaryKeyword="AI quiz generator"
      secondaryKeywords={['quiz generator AI', 'AI question generator', 'create quiz with AI', 'AI test generator', 'study quiz generator']}
      schema={schema}
    />
  )
}
