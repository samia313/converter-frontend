import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with Scanned PDF - OCR + AI Conversation | PDFilio',
  description: 'Chat with scanned PDFs and images. Built-in OCR extracts text, then AI answers your questions. Works with handwritten and printed documents.',
  keywords: 'chat scanned PDF, PDF OCR chat, chat image PDF, handwritten PDF chat, scanned document chat',
  openGraph: {
    title: 'Chat with Scanned PDF - AI for Scanned Documents',
    description: 'Upload scanned PDFs or images and chat with AI. OCR + AI = intelligent document conversations.',
    type: 'website',
  },
};

export default function ChatScannedPDFPage() {
  return (
    <ToolLandingLayout
      toolName="Chat with Scanned PDF"
      toolSlug="chat-with-scanned-pdf"
      description="Upload scanned PDFs, images, or handwritten documents. Built-in OCR extracts text automatically, then AI analyzes and answers your questions instantly."
      heroImage="/tool-images/scanned-pdf-hero.png"
      mainContent={`Chat with Scanned PDF combines OCR technology with AI intelligence. Scanned documents, images, handwritten notes - all work instantly.

OCR + AI = Full document intelligence:
- Automatic text extraction from images
- Handwriting recognition
- Printed text extraction
- Document image analysis
- Automatic text-to-chat conversion

Upload any document image and immediately chat with it. The OCR handles text extraction automatically in the background, then AI answers your questions.

Works with:
- Scanned books and papers
- Handwritten notes
- Printed documents
- Document photos
- Image PDFs
- Mixed text and images
- Low-quality scans
- Any document format

Perfect for archival documents, handwritten notes, old papers, and image-based PDFs that traditional tools can't handle.`}
      useCase={[
        'Extract info from scanned books',
        'Chat with handwritten notes',
        'Analyze document photos',
        'Process archival documents',
        'Understand old paper documents',
        'Digitize and chat with papers',
        'Process document images',
        'Chat with printed documents',
        'Analyze image-based PDFs',
        'Convert scans to intelligence',
      ].join('\n')}
      testimonials={[
        {
          name: 'Professor Robert Chen',
          role: 'Historian',
          text: 'Scanning old documents and chatting with them is amazing. OCR handles the text, AI analyzes. Finally, historical documents are searchable.',
        },
        {
          name: 'Helen Rodriguez',
          role: 'Document Manager',
          text: 'Our paper archives are now intelligent. Scan document, chat with it, get answers. Transformed our document management.',
        },
        {
          name: 'Mark Stevens',
          role: 'Archivist',
          text: 'Perfect for digitizing paper collections. OCR extracts text from scans, AI makes them searchable and intelligent.',
        },
      ]}
      features={[
        'Built-in OCR technology',
        'Automatic text extraction',
        'Handwriting recognition',
        'Image to text conversion',
        'Works with scanned documents',
        'AI chat after OCR',
        'Handles low-quality scans',
        'Image PDF support',
      ]}
      benefits={[
        'Chat with any document format',
        'No separate OCR tool needed',
        'Handles handwritten documents',
        'Works with old/archival documents',
        'Automatic processing',
        'Extract text and chat instantly',
        'Works with document images',
        'One tool for all document types',
      ]}
      faqs={[
        {
          q: 'Does this work with handwriting?',
          a: 'Yes! OCR recognizes both printed and handwritten text accurately.',
        },
        {
          q: 'How good is the OCR?',
          a: 'Advanced OCR technology with high accuracy for both printed and handwritten documents.',
        },
        {
          q: 'What image formats work?',
          a: 'PDFs, JPG, PNG, GIF - any common image format works.',
        },
        {
          q: 'How long does OCR take?',
          a: 'Usually 5-10 seconds, then ready to chat.',
        },
        {
          q: 'Can I upload multiple scans?',
          a: 'Yes, upload multiple scanned PDFs or images.',
        },
        {
          q: 'Does it work with poor quality scans?',
          a: 'Yes, our advanced OCR handles even low-quality or faded scans.',
        },
        {
          q: 'Can I edit the OCR text?',
          a: 'The AI uses the extracted text to chat, and you can ask clarifying questions if needed.',
        },
        {
          q: 'Is OCR accurate for all languages?',
          a: 'Works best in English and major languages. Handles mixed-language documents.',
        },
      ]}
      relatedTools={[
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
        { name: 'AI OCR', slug: 'ai-ocr' },
        { name: 'Image to PDF', slug: 'image-to-pdf' },
        { name: 'Chat Large PDF', slug: 'chat-large-pdf' },
      ]}
      primaryKeyword="chat scanned PDF"
      secondaryKeywords={['PDF OCR chat', 'chat image PDF', 'handwritten PDF chat', 'scanned document chat']}
    />
  );
}
