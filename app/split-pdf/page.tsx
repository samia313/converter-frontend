import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import SplitPDFTool from '@/components/tools/split-pdf-tool';

export const metadata: Metadata = {
  title: 'Split PDF Online – Split PDF into Two Parts | PDFilio',
  description: 'Split a supported PDF into two parts online. Choose a split page or let PDFilio split the document near the middle, then download both PDFs in a ZIP file.',
  keywords: ['split PDF', 'split PDF online', 'split PDF into two parts', 'divide PDF', 'PDF splitter', 'separate PDF pages'],
  alternates: { canonical: 'https://pdfilio.com/split-pdf' },
  openGraph: {
    title: 'Split PDF Online – Split PDF into Two Parts | PDFilio',
    description: 'Split supported PDFs into two parts by choosing where the split occurs, then download both PDF files together.',
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
        description="Split a supported PDF into two separate PDF files by choosing a split page or using the default middle split. Download both parts together as a ZIP file."
        heroImage="/tool-images/split-pdf-hero.png"
        mainContent={`Split PDF helps you divide a supported PDF into two separate PDF files. You can choose the page after which the split should occur, or leave the field blank to split the document near the middle.

This workflow is useful for separating sections of textbooks, reports, contracts, research papers, application documents, and other multi-page PDFs. The service creates two PDF outputs and packages them into one ZIP download.

The original PDF on your device is not changed by creating the split outputs. For important documents, review both generated PDFs before sharing, submitting, or archiving them.`}
        useCase={[
          'Splitting a PDF into two smaller parts',
          'Separating the first section from the rest of a report',
          'Extracting a chapter range from a textbook',
          'Separating contract sections for review',
          'Dividing research papers into manageable sections',
          'Preparing selected document sections for sharing',
          'Breaking a long PDF into two files',
          'Creating separate files for document workflows',
        ].join('\n')}
        features={[
          'Split supported PDFs into two parts',
          'Choose the page where the split occurs',
          'Default middle-page split when no page is entered',
          'Creates two PDF output files',
          'ZIP download containing both parts',
          'Browser-based PDF processing',
          'Works on supported mobile and desktop browsers',
          'Original local PDF remains unchanged',
        ]}
        benefits={[
          'Separate a long PDF into two manageable files',
          'Choose an exact split point for common documents',
          'Prepare smaller sections for sharing and review',
          'Reduce repetitive manual PDF handling',
          'Keep the original PDF available for another split',
          'Download both generated parts together',
        ]}
        testimonials={[]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Rotate PDF', slug: 'rotate-pdf' },
          { name: 'Organize PDF', slug: 'organize-pdf' },
        ]}
        faqs={[
          { q: 'How do I split a PDF into two parts?', a: 'Upload a supported PDF, optionally enter the page after which you want the split, then select Split PDF. If you leave the field blank, the document is split near the middle.' },
          { q: 'Can I choose where the PDF is split?', a: 'Yes. Enter a page number in the Split after page field. For example, entering 5 creates pages 1–5 as the first PDF and pages 6–end as the second.' },
          { q: 'What happens if I do not enter a split page?', a: 'The tool automatically chooses a split point near the middle of the document.' },
          { q: 'How many files does Split PDF create?', a: 'The current workflow creates two PDF files and packages them together in a ZIP download.' },
          { q: 'Can I split a one-page PDF?', a: 'No. The current splitter requires at least two pages so that the document can be divided into two non-empty PDF files.' },
          { q: 'Will splitting change the original PDF?', a: 'No. Creating split outputs does not intentionally modify the original PDF stored on your device.' },
          { q: 'Will PDF quality stay exactly the same?', a: 'The splitter copies pages into new PDF documents. Important files should still be reviewed because some PDF features can behave differently depending on the source document.' },
          { q: 'Can I split a scanned PDF?', a: 'Yes. A scanned PDF can generally be divided by page because the pages are part of the PDF structure. OCR is only needed when you also need searchable or extractable text.' },
          { q: 'Can I split a PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate PDF-splitting application is required for the browser-based workflow.' },
          { q: 'What format is the download?', a: 'The two generated PDFs are packaged into one ZIP file so both parts can be downloaded together.' },
          { q: 'Can splitting reduce PDF file size?', a: 'Two smaller PDFs can individually be smaller than the original, but the exact file sizes depend on the document content and PDF structure.' },
        ]}
        primaryKeyword="split PDF"
        secondaryKeywords={['split PDF online', 'split PDF into two parts', 'divide PDF', 'PDF splitter', 'separate PDF pages']}
      />
    </>
  );
}
