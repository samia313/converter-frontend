import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import SplitPDFTool from '@/components/tools/split-pdf-tool';

export const metadata: Metadata = {
  title: 'Split PDF Online – Extract Pages & Divide PDF Files | PDFilio',
  description: 'Split supported PDF files into individual pages or extract selected page ranges online. Organize large PDFs and create smaller document sections.',
  keywords: ['split PDF', 'split PDF online', 'divide PDF', 'extract PDF pages', 'PDF splitter', 'separate PDF pages', 'split PDF pages'],
  alternates: { canonical: 'https://pdfilio.com/split-pdf' },
  openGraph: {
    title: 'Split PDF Online – Extract PDF Pages | PDFilio',
    description: 'Divide supported PDFs into pages or extract selected page ranges online.',
    url: 'https://pdfilio.com/split-pdf',
    type: 'website',
  },
};

export default function SplitPDFPage() {
  return (
    <>
      <SplitPDFTool />
      <ToolLandingLayout
        toolName="Split PDF"
        toolSlug="split-pdf"
        description="Divide supported PDF documents into individual pages or extract selected page ranges for easier organization, sharing, and document management."
        heroImage="/tool-images/split-pdf-hero.png"
        mainContent={`Split PDF helps you divide a supported PDF into separate pages or extract the page ranges you need. It is useful when a large document contains sections that need to be shared, archived, reviewed, or managed separately.

You can use PDF splitting for textbooks, research papers, business reports, technical manuals, contracts, application documents, and other supported PDFs. The available page-selection options and output behavior depend on the current PDFilio tool implementation.

The original PDF on your device is not changed by creating split outputs. After processing, review the resulting files to make sure the selected pages and document features are correct before using them for important work.`}
        useCase={[
          'Extracting chapters from textbooks',
          'Selecting pages from research papers',
          'Separating sections of business reports',
          'Extracting relevant contract pages',
          'Creating smaller technical-document sections',
          'Preparing selected pages for sharing',
          'Organizing multi-page application documents',
          'Breaking large PDFs into manageable sections',
        ].join('\n')}
        features={[
          'Split supported PDFs into pages',
          'Extract selected page ranges',
          'Page-selection workflow',
          'Creates separate PDF output files',
          'Browser-based PDF processing',
          'Works on supported mobile and desktop browsers',
          'Original local PDF remains available to the user',
          'Related PDF organization tools',
        ]}
        benefits={[
          'Extract only the pages you need',
          'Organize large PDF documents more easily',
          'Create smaller sections for sharing',
          'Reduce repetitive manual document handling',
          'Prepare selected pages for separate review',
          'Make long PDFs easier to manage',
        ]}
        testimonials={[]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to Excel', slug: 'pdf-to-excel' },
          { name: 'Rotate PDF', slug: 'rotate-pdf' },
        ]}
        faqs={[
          { q: 'How do I split a PDF into individual pages?', a: 'Upload a supported PDF, choose the page-splitting option available in the tool, process the file, and download the resulting PDF output.' },
          { q: 'Can I extract specific pages from a PDF?', a: 'Yes. The tool supports selecting pages or page ranges according to the current page-selection interface.' },
          { q: 'Can I extract multiple page ranges?', a: 'Supported page-selection options can be used to create the sections you need. The exact output structure depends on the current tool workflow.' },
          { q: 'Will splitting change the original PDF?', a: 'Creating split outputs does not intentionally modify the original PDF stored on your device. Keep the original if you may need to create different page selections later.' },
          { q: 'Will PDF quality stay exactly the same?', a: 'The goal is to retain the document content when splitting, but individual PDF features can behave differently depending on the source file and processing workflow. Review important outputs.' },
          { q: 'Is there a maximum PDF file size or page count?', a: 'Current processing limits can depend on the PDFilio infrastructure and file requirements. Follow the limits shown by the uploader rather than assuming unlimited size.' },
          { q: 'Can I split a PDF on my phone?', a: 'Yes. The browser-based workflow is designed to be accessible from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate PDF-splitting application is required for the browser-based workflow.' },
          { q: 'Can I split a PDF for free?', a: 'PDFilio provides the online Split PDF tool; current usage limits, account requirements, and availability are determined by the product configuration shown in the interface.' },
          { q: 'Can I split a scanned PDF?', a: 'A scanned PDF can generally be split by pages because each page is part of the PDF structure. OCR is only needed if you also want to extract or search the text.' },
          { q: 'Can I split a PDF into chapters?', a: 'Yes. If you know the chapter page ranges, you can use the page-selection workflow to create separate sections.' },
          { q: 'What happens if I select the wrong pages?', a: 'You can keep the original PDF and create another split output using a corrected page selection.' },
          { q: 'Can splitting reduce PDF file size?', a: 'It can produce smaller individual files when each output contains fewer pages, but the exact size depends on the content and PDF structure.' },
        ]}
        primaryKeyword="split PDF"
        secondaryKeywords={['split PDF online', 'divide PDF', 'extract PDF pages', 'PDF splitter', 'separate PDF pages', 'split PDF pages']}
      />
    </>
  );
}
