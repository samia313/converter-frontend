import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat Scanned PDF - OCR + Chat Technology | PDFilio',
  description: 'Chat with scanned PDFs and document images. Built-in OCR extracts text automatically.',
  keywords: 'scanned pdf chat, ocr chat, image pdf chat, handwritten pdf',
};

export default function Page() {
  return (
    <ToolLandingLayout
      toolName="AI Chat Scanned PDF"
      toolSlug="ai-chat-scanned-pdf"
      description="Chat with scanned documents and images. Advanced OCR automatically extracts text, then AI enables conversation."
      mainContent={`Scanned documents come alive. OCR extracts text automatically, then chat normally with the extracted content.

OCR + Chat:
- Automatic OCR processing
- Handwriting recognition
- Image text extraction
- Document image support
- Automatic processing
- Transparent workflow
- No manual steps
- Complete automation

Works With Anything:
Scanned books, handwritten notes, printed documents, document photos - any scanned format works.

Perfect For Archives:
Transform old documents into searchable, chattable resources instantly.`}
      features={[
        'Automatic OCR',
        'Handwriting recognition',
        'Image processing',
        'Text extraction',
        'Document image support',
        'Transparent workflow',
        'No manual steps',
        'Complete automation',
      ]}
      benefits={[
        'Scanned documents work',
        'Automatic extraction',
        'Handwriting support',
        'Archive friendly',
        'No manual processing',
        'Complete automation',
        'Easy conversion',
        'Seamless workflow',
      ]}
      useCase={[
        'Scanned documents',
        'Handwritten notes',
        'Document photos',
        'Archive materials',
        'Old papers',
        'Image PDFs',
        'Handwritten documents',
        'Printed documents',
        'Document collections',
        'Archive digitization',
      ].join('\n')}
      testimonials={[
        {
          name: 'Professor Eleanor Davis',
          role: 'Historian',
          text: 'Historical documents become interactive. Scans convert to chatbots instantly. Archive research transformed.',
        },
        {
          name: 'Helen Roberts',
          role: 'Library Manager',
          text: 'Our scanned collections are now accessible for AI chat. Archival materials finally interactive.',
        },
      ]}
      faqs={[
        {
          q: 'Works with scans?',
          a: 'Yes. OCR automatically converts scanned images to text for chatting.',
        },
        {
          q: 'Handwriting too?',
          a: 'Yes, includes handwriting recognition for handwritten documents.',
        },
      ]}
      relatedTools={[
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'Chat Scanned PDF', slug: 'chat-with-scanned-pdf' },
      ]}
      primaryKeyword="AI chat scanned PDF"
      secondaryKeywords={['OCR chat', 'image pdf chat']}
    />
  );
}
