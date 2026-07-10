import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask PDF Questions - AI Powered Document Q&A Tool | PDFilio',
  description: 'Ask questions about your PDF documents and get instant answers. Upload any PDF and use AI to find information, extract data, and understand documents better.',
  keywords: 'ask PDF questions, PDF Q&A, question answering PDF, ask questions about PDF, PDF document questions',
  openGraph: {
    title: 'Ask PDF Questions - Get Instant Answers',
    description: 'Ask questions about your PDFs and get AI-powered answers instantly. Extract information without manual searching.',
    type: 'website',
  },
};

export default function AskPDFQuestionsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ask PDF Questions',
    description: 'AI-powered question answering tool for PDF documents',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <ToolLandingLayout
      toolName="Ask PDF Questions"
      toolSlug="ask-pdf-questions"
      description="Upload your PDF and ask questions naturally. Get instant answers powered by AI. Extract information, find data, and understand documents without manual searching through pages."
      heroImage="/tool-images/ask-questions-hero.png"
      mainContent={`Stop manually searching through PDFs to find information. With Ask PDF Questions, simply type what you want to know and get instant answers.

This is document Q&A done right:
- Ask natural language questions
- Get immediate, accurate answers
- Extract specific information instantly
- Find data without page scrolling
- Understand complex documents easily

The process couldn't be simpler: Upload PDF → Ask Questions → Get Answers. Our AI understands your questions and provides relevant answers directly from the document.

Perfect for anyone who needs to work with PDFs regularly. Students researching topics, professionals analyzing reports, researchers reviewing papers - everyone gets faster access to document information.

Ask follow-up questions and explore documents conversationally. The AI understands context, so you can ask questions about previous answers. Efficient information extraction at your fingertips.`}
      useCase={[
        'Find specific data in financial documents',
        'Extract information from contracts',
        'Answer questions about research papers',
        'Understand technical documentation',
        'Extract contact info from PDFs',
        'Find clauses in legal documents',
        'Extract statistics from reports',
        'Answer questions from textbooks',
        'Find information in manuals',
        'Extract data from forms',
      ].join('\n')}
      testimonials={[
        {
          name: 'Kevin Lopez',
          role: 'Business Analyst',
          text: 'Instead of scrolling through pages, I just ask questions. "What are the Q3 revenue numbers?" and get instant answers. Massive time saver.',
        },
        {
          name: 'Susan Park',
          role: 'Student',
          text: 'I ask my PDF textbooks questions during homework. "What is photosynthesis?" and the textbook answers. Makes studying so much easier.',
        },
        {
          name: 'Marcus Brown',
          role: 'Researcher',
          text: 'Academic research got faster. Ask a research paper a question, get instant answers. No more manual scanning of papers.',
        },
      ]}
      features={[
        'Natural language question answering',
        'Instant answer retrieval',
        'Multi-question conversations',
        'Specific data extraction',
        'Context-aware responses',
        'Follow-up question support',
        'Information highlighting',
        'Answer source tracking',
      ]}
      benefits={[
        'Find information instantly',
        'Stop manual document searching',
        'Extract data faster',
        'Get specific answers to specific questions',
        'Reduce time spent reading',
        'Improve information access',
        'Better document comprehension',
        'Faster decision making',
      ]}
      faqs={[
        {
          q: 'What kinds of questions can I ask?',
          a: 'Ask any question about your document! Specific questions ("What is the total?"), general questions ("What is this about?"), conceptual questions, and data extraction questions all work.',
        },
        {
          q: 'How specific can my questions be?',
          a: 'Very specific! Ask for exact data points, specific sections, particular concepts, or detailed comparisons.',
        },
        {
          q: 'What if the PDF doesn\'t contain the answer?',
          a: 'The AI will tell you the information isn\'t in the document rather than making up an answer.',
        },
        {
          q: 'Can I ask follow-up questions?',
          a: 'Yes! Ask follow-ups, clarifications, and related questions. The AI understands conversation context.',
        },
        {
          q: 'How are the answers formatted?',
          a: 'Answers are clear, concise, and directly from the document. For data, you get exact values. For concepts, you get explanations.',
        },
        {
          q: 'Can I quote sources?',
          a: 'Yes, you can see which parts of the document the answers come from.',
        },
        {
          q: 'How many questions can I ask?',
          a: 'Unlimited! Ask as many questions as you need about your documents.',
        },
        {
          q: 'Does this work with scanned PDFs?',
          a: 'Works best with text-based PDFs. For scanned documents, consider OCR first.',
        },
      ]}
      relatedTools={[
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
        { name: 'PDF Question Answer AI', slug: 'pdf-question-answer' },
        { name: 'AI PDF Chat', slug: 'ai-pdf-chat' },
        { name: 'PDF Summarizer Chat', slug: 'pdf-summarizer-chat' },
      ]}
      primaryKeyword="ask PDF questions"
      secondaryKeywords={['PDF Q&A', 'question answering PDF', 'ask questions about PDF', 'PDF document questions']}
    />
  );
}
