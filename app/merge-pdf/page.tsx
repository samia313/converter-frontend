import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import MergePDFTool from '@/components/tools/merge-pdf-tool';

export const metadata: Metadata = {
  title: 'Merge PDF Online – Combine PDF Files into One | PDFilio',
  description: 'Combine supported PDF files into one document online. Arrange files in the required order and create a single PDF for sharing, printing, submission, or archiving.',
  keywords: ['merge PDF', 'merge PDF online', 'combine PDF', 'combine PDF files', 'PDF merger', 'join PDF files', 'merge PDF documents'],
  alternates: { canonical: 'https://pdfilio.com/merge-pdf' },
  openGraph: {
    title: 'Merge PDF Online – Combine PDF Files | PDFilio',
    description: 'Combine supported PDF files into one document and organize their order before creating the final PDF.',
    url: 'https://pdfilio.com/merge-pdf',
    type: 'website',
  },
};

export default function MergePDFPage() {
  return (
    <>
      <MergePDFTool />
      <ToolLandingLayout
        toolName="Merge PDF"
        toolSlug="merge-pdf"
        description="Combine supported PDF files into a single document for easier sharing, printing, submission, review, and archiving."
        heroImage="/tool-images/merge-pdf-hero.png"
        mainContent={`Merge PDF helps you combine multiple supported PDF files into one document. This is useful when related reports, chapters, forms, receipts, contracts, or project documents are stored as separate PDF files and need to be shared or managed together.

A typical workflow is to upload the PDFs, arrange them in the required order when the interface provides reordering controls, create the merged document, review the result, and download the final PDF. The final output can depend on the source PDFs and the current processing workflow.

For important documents, review page order, page size, orientation, bookmarks, forms, links, annotations, and other document features after merging. Keep the original files if you may need to create a different combined document later.`}
        useCase={[
          'Combining reports into one document',
          'Merging chapters or sections into a single PDF',
          'Organizing contract and application documents',
          'Creating a unified project document',
          'Combining meeting notes and supporting files',
          'Assembling financial statements and reports',
          'Preparing documents for submission',
          'Creating a single PDF for sharing and archiving',
        ].join('\n')}
        features={[
          'Combine supported PDF files',
          'Arrange PDF files before merging when supported',
          'Single PDF output',
          'Browser-based workflow',
          'Mobile and desktop browser support',
          'Useful for multi-document workflows',
          'Downloadable merged PDF',
          'Related PDF organization tools',
        ]}
        benefits={[
          'Keep related PDFs together in one file',
          'Simplify document sharing and submission',
          'Reduce repetitive manual document handling',
          'Create organized project and business documents',
          'Prepare a single file for printing or archiving',
          'Make multi-file document workflows easier to manage',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I merge PDF files online?', a: 'Upload supported PDF files, arrange them in the required order when available, start the merge process, review the resulting document, and download it.' },
          { q: 'Can I combine multiple PDFs into one?', a: 'Yes. The Merge PDF workflow is designed to combine supported PDF files into a single PDF document.' },
          { q: 'Can I reorder PDFs before merging?', a: 'If reordering controls are available in the current interface, use them to place the source files in the required sequence before merging.' },
          { q: 'Will the original PDF files be changed?', a: 'Creating a merged output does not intentionally modify the original files stored on your device. Keep the originals if you may need them again.' },
          { q: 'Will PDF quality remain exactly the same?', a: 'The goal is to combine the documents without intentionally reducing quality, but output behavior can depend on the source PDFs and processing workflow. Review important files.' },
          { q: 'Can I merge PDFs with different page sizes?', a: 'PDFs with different page dimensions can be combined, but the resulting document may contain mixed page sizes. Review the output before printing.' },
          { q: 'Can I merge portrait and landscape PDFs?', a: 'Yes, supported PDFs can be combined, and the resulting document can contain pages with different orientations.' },
          { q: 'Can I merge scanned PDFs?', a: 'Yes. Scanned PDFs can be combined as PDF pages. OCR is only needed if you also want to extract or search their image-based text.' },
          { q: 'Can I merge PDFs on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install PDF software?', a: 'No separate PDF-merging application is required for the browser-based workflow.' },
          { q: 'How long does PDF merging take?', a: 'Processing time depends on the number and size of the PDFs, page count, document complexity, and current system resources.' },
          { q: 'Is Merge PDF free?', a: 'PDFilio provides the online merger; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'Can I merge password-protected PDFs?', a: 'Password-protected or restricted PDFs may require access permissions before they can be processed. Follow any instructions shown by the tool if a file cannot be read.' },
        ]}
        relatedTools={[
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Rotate PDF', slug: 'rotate-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
        ]}
        primaryKeyword="merge PDF"
        secondaryKeywords={['combine PDF', 'merge PDF online', 'combine PDF files', 'PDF merger', 'join PDF files', 'merge PDF documents']}
      />
    </>
  );
}
