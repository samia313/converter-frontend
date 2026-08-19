import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with Scanned PDF Online – OCR + AI PDF Chat | PDFilio',
  description: 'Chat with scanned PDFs, document images, and supported handwritten documents using OCR and AI. Extract text and ask questions in one browser-based workflow.',
  keywords: ['chat with scanned PDF', 'scanned PDF OCR', 'PDF OCR chat', 'chat with image PDF', 'handwritten PDF chat', 'scanned document chat', 'AI OCR PDF'],
  alternates: { canonical: 'https://pdfilio.com/chat-with-scanned-pdf' },
  openGraph: {
    title: 'Chat with Scanned PDF – OCR + AI | PDFilio',
    description: 'Extract text from scanned PDFs and supported document images, then ask questions with AI.',
    url: 'https://pdfilio.com/chat-with-scanned-pdf',
    type: 'website',
  },
};

export default function ChatScannedPDFPage() {
  return (
    <ToolLandingLayout
      toolName="Chat with Scanned PDF"
      toolSlug="chat-with-scanned-pdf"
      description="Extract text from scanned PDFs and supported document images with OCR, then explore the extracted content through AI-powered questions."
      heroImage="/tool-images/scanned-pdf-hero.png"
      mainContent={`Chat with Scanned PDF combines OCR and AI to make image-based documents easier to explore. When a PDF contains scanned pages rather than selectable text, OCR can extract the text so you can ask focused questions about the document.

Useful document types include scanned papers, printed pages, document photos, image-based PDFs, archival material, and supported handwritten notes. OCR quality depends on scan resolution, handwriting, language, layout, and image quality, so important information should be checked against the original document.

Typical workflow:
1. Upload a supported scanned PDF or document image.
2. OCR extracts readable text from the document.
3. Ask questions about the extracted content.
4. Verify important answers against the original scan.`}
      useCase={[
        'Researching scanned books and papers',
        'Exploring handwritten notes',
        'Reviewing document photos',
        'Working with archival material',
        'Searching image-based PDFs',
        'Understanding old paper documents',
        'Reviewing printed scans',
        'Extracting information from document images',
        'Studying scanned course material',
        'Preparing scanned documents for deeper review',
      ].join('\n')}
      testimonials={[]}
      features={[
        'OCR-based text extraction',
        'AI-powered document questions',
        'Scanned PDF support',
        'Document image processing',
        'Printed-text recognition',
        'Support for suitable handwriting',
        'Browser-based workflow',
        'OCR-to-chat document experience',
      ]}
      benefits={[
        'Explore image-based PDFs without manually reading every page',
        'Combine OCR and document questions in one workflow',
        'Find useful information inside scanned documents',
        'Reduce repetitive manual transcription during initial review',
        'Make archival and scanned material easier to investigate',
        'Use one browser-based workflow for OCR and document chat',
      ]}
      faqs={[
        { q: 'What is Chat with Scanned PDF?', a: 'It is a document workflow that uses OCR to extract text from supported scanned PDFs and images and then lets you ask AI-powered questions about the extracted content.' },
        { q: 'Can I chat with a scanned PDF?', a: 'Yes. The tool is designed specifically for PDFs where important content may be stored as scanned page images.' },
        { q: 'Does it use OCR?', a: 'Yes. OCR is used to recognize text from supported scanned documents before the AI chat workflow analyzes that content.' },
        { q: 'Can it read handwritten documents?', a: 'Supported handwriting may be recognized, but results depend heavily on handwriting clarity, scan quality, language, and layout.' },
        { q: 'Can I use document photos?', a: 'Supported document images can be processed when they meet the tool and file requirements.' },
        { q: 'Will OCR work on low-quality scans?', a: 'It may extract text from lower-quality scans, but accuracy can decrease with blur, fading, skew, noise, unusual fonts, or poor lighting.' },
        { q: 'Can I ask questions after OCR?', a: 'Yes. After the text is available to the workflow, you can ask focused questions about the document content.' },
        { q: 'Is OCR accurate for every language?', a: 'OCR accuracy varies by language and document quality. Check the original scan whenever accuracy is important.' },
        { q: 'Can students use Chat with Scanned PDF?', a: 'Yes. It can help explore scanned study material and research documents, while important academic information should be verified against the source.' },
        { q: 'Can businesses use scanned PDF chat?', a: 'Yes. It can help teams initially explore scanned reports, records, and other supported business documents.' },
        { q: 'Should I rely on AI answers for important documents?', a: 'No. AI and OCR can make mistakes or omit context. For legal, financial, medical, archival, or other important information, verify answers against the original document.' },
        { q: 'Do I need separate OCR software?', a: 'The page is designed to combine OCR and document chat in one browser-based workflow, reducing the need to switch between separate tools.' },
      ]}
      relatedTools={[
        { name: 'Chat with PDF', slug: 'chat-with-pdf' },
        { name: 'AI OCR', slug: 'ai-ocr' },
        { name: 'Image to PDF', slug: 'image-to-pdf' },
        { name: 'Chat Large PDF', slug: 'chat-large-pdf' },
        { name: 'AI Document Chat', slug: 'ai-document-chat' },
      ]}
      primaryKeyword="chat with scanned PDF"
      secondaryKeywords={['scanned PDF OCR', 'PDF OCR chat', 'chat with image PDF', 'handwritten PDF chat', 'scanned document chat', 'AI OCR PDF']}
    />
  );
}
