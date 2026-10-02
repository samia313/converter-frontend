import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'OCR PDF Online | Extract Text from Scanned PDFs | PDFilio',
  description: 'OCR PDF files online and extract text from scanned or image-based PDF documents. Convert supported scanned pages into searchable, machine-readable text for editing, copying, and review.',
  keywords: ['OCR PDF online','PDF OCR','OCR PDF files','OCR scanned PDF','extract text from PDF','scanned PDF to text','PDF text recognition'],
  alternates: { canonical: 'https://pdfilio.com/ocr-pdf-online' },
  openGraph: {
    title: 'OCR PDF Online | Extract Text from Scanned PDFs | PDFilio',
    description: 'Extract text from supported scanned and image-based PDFs with online OCR.',
    url: 'https://pdfilio.com/ocr-pdf-online',
    type: 'website',
  },
};

export default function OCRPdfOnlinePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OCR PDF Online',
    description: 'Extract text from supported scanned and image-based PDF documents with OCR.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <ToolLandingLayout
      toolName="OCR PDF Online"
      toolSlug="ocr"
      description="Extract text from supported scanned and image-based PDF files with OCR. Make document content easier to search, copy, edit, and reuse."
      heroImage="/tool-images/ai-ocr-hero.png"
      mainContent={`OCR PDF technology recognizes text in scanned or image-based PDF pages and converts that visual content into machine-readable text. PDFilio's OCR PDF workflow is useful when a PDF does not contain selectable text and you need to work with the words inside the document.

Common uses include scanned forms, receipts, invoices, archived documents, photographed pages, research material, and other image-based PDFs. OCR accuracy can vary with scan quality, handwriting, unusual fonts, page layout, language, and image clarity, so important extracted text should be reviewed against the original document.

Typical workflow: upload a supported PDF, run OCR, review the recognized text, and use the resulting content in your next document workflow. Keep the original PDF available when accuracy or document fidelity matters.`}
      useCase={['Extract text from scanned PDF files','Make image-based PDFs searchable','Copy text from scanned documents','Process scanned forms and receipts','Extract text from invoices and business records','Work with archived or photographed documents','Prepare scanned PDFs for editing or reuse','Reduce manual retyping from document scans'].join('\n')}
      features={['OCR for supported PDF documents','Text recognition from scanned pages','Browser-based workflow','Useful for image-based and scanned PDFs','Searchable and machine-readable text output','Simple upload and processing workflow','Desktop and mobile browser access','Review extracted text against the source']}
      benefits={['Turn scanned pages into usable text','Reduce manual retyping','Make image-based documents easier to search','Reuse text in editing and document workflows','Work with scanned business and study documents','Access OCR from a browser']}
      testimonials={[]}
      relatedTools={[
        {name:'OCR Online',slug:'ocr-online'},
        {name:'AI OCR',slug:'ai-ocr'},
        {name:'PDF to Word',slug:'pdf-to-word'},
        {name:'PDF to Excel',slug:'pdf-to-excel'},
        {name:'PDF to JPG',slug:'pdf-to-jpg'},
      ]}
      faqs={[
        {q:'What is OCR for PDF?',a:'OCR, or optical character recognition, identifies text in scanned or image-based PDF pages and converts it into machine-readable text.'},
        {q:'How do I OCR a PDF online?',a:'Upload a supported scanned or image-based PDF, start the OCR workflow, then review the recognized text and resulting document output.'},
        {q:'Can OCR make a scanned PDF searchable?',a:'OCR can make recognized text available for search when the resulting workflow produces searchable text. Review the output to confirm recognition quality.'},
        {q:'Can I extract text from a scanned PDF?',a:'Yes. OCR is designed to recognize text that is represented as an image rather than selectable document text.'},
        {q:'Does OCR work on scanned documents?',a:'Yes. Scanned PDFs are a common OCR use case. Results depend on scan quality, orientation, language, fonts, and page layout.'},
        {q:'Can OCR recognize handwriting in a PDF?',a:'Handwriting recognition can be substantially more difficult than printed text. Do not assume accurate handwriting recognition; review any extracted text carefully.'},
        {q:'Will OCR preserve the original PDF formatting?',a:'OCR focuses on text recognition. Exact preservation of the original layout, fonts, tables, images, and other PDF elements depends on the processing workflow and source document.'},
        {q:'Can I OCR an invoice or receipt PDF?',a:'Yes. Supported scanned invoices and receipts can be processed to recognize printed text, subject to scan quality and layout.'},
        {q:'Can I use OCR for a scanned PDF on my phone?',a:'Yes. The browser-based workflow can be accessed from supported mobile devices.'},
        {q:'Is OCR PDF online free?',a:'PDFilio provides the online OCR workflow; current limits, account requirements, and availability depend on the product configuration shown in the tool interface.'},
        {q:'Is OCR text always accurate?',a:'No. OCR accuracy varies with image quality, language, fonts, skew, noise, handwriting, tables, and other document characteristics. Important text should be checked against the original.'},
        {q:'What is the difference between OCR PDF and AI OCR?',a:'OCR generally refers to optical character recognition for converting visual text into machine-readable text. AI OCR can use additional AI-based processing to improve recognition or handle more complex document content, depending on the implementation.'},
      ]}
      primaryKeyword="OCR PDF online"
      secondaryKeywords={['PDF OCR','OCR PDF files','OCR scanned PDF','extract text from PDF','scanned PDF to text','PDF text recognition']}
      schema={schema}
    />
  );
}
