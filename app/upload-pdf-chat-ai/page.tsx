import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload PDF and Chat with AI - Simple PDF Chat | PDFilio',
  description: 'Simple and fast: upload PDF and start chatting with AI. Easy workflow for PDF analysis.',
  keywords: 'upload pdf chat, pdf upload ai, simple chat pdf, easy document chat',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="Upload PDF and Chat with AI"
      toolSlug="upload-pdf-chat-ai"
      description="Simple three-step workflow: upload, chat, understand. Start conversing with your PDFs immediately."
      mainContent={`Three simple steps: upload your PDF, start chatting, get answers. No complexity, no learning curve, pure simplicity.

Simple Workflow:
- Click upload
- Select your PDF
- Start chatting immediately

Zero Complexity:
No settings to configure, no options to understand, no learning curve. Upload a PDF and you're ready to chat. That's it.

For Everyone:
Whether you're tech-savvy or prefer simplicity, this workflow works. Grandparents to tech professionals - everyone can use it.

Fast and Easy:
Start chatting within seconds of uploading. No waiting, no setup, immediate access to AI conversation.`}
      features={[
        'Simple upload',
        'Instant chatting',
        'Easy workflow',
        'No settings',
        'Immediate access',
        'Quick start',
        'Zero complexity',
        'Straightforward process',
      ]}
      benefits={[
        'Easy to use',
        'No learning needed',
        'Fast start',
        'Simple workflow',
        'Immediate results',
        'No confusion',
        'Accessible to all',
        'Straightforward access',
      ]}
      useCase={[
        'First-time users',
        'Quick analysis',
        'Simplicity preference',
        'Easy access',
        'No-complexity work',
        'Rapid deployment',
        'User-friendly needs',
        'Straightforward use',
        'Simple solutions',
        'Easy adoption',
      ].join('\n')}
      testimonials={[
        {
          name: 'Patricia Chen',
          role: 'Small Business Owner',
          text: 'This is the easiest tool to use. Upload, chat, done. My whole team picked it up immediately.',
        },
        {
          name: 'George Wilson',
          role: 'Office Manager',
          text: 'No training needed. Everyone figured it out in 30 seconds. Simple and effective.',
        },
      ]}
      faqs={[
        {
          q: 'How do I start?',
          a: 'Upload a PDF, then type your first question. You are ready to chat immediately.',
        },
        {
          q: 'Any learning curve?',
          a: 'None. The interface is intuitive and the workflow is straightforward.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Upload PDF and Chat', slug: 'upload-pdf-and-chat' },
      ]}
      primaryKeyword="upload PDF and chat with AI"
      secondaryKeywords={['pdf upload chat', 'simple chat pdf']}
    />
  );
}
