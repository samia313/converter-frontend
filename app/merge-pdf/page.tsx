import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import MergePDFTool from '@/components/tools/merge-pdf-tool';

export const metadata: Metadata = {
  title: 'Merge PDF Online – Combine PDF Files into One',
  description: 'Combine supported PDF files into one document online. Arrange files in the required order and create a single PDF for sharing, printing, submission, or archiving.',
  keywords: ['merge PDF', 'merge PDF online', 'combine PDF', 'combine PDF files', 'PDF merger', 'join PDF files', 'merge PDF documents'],
  alternates: { canonical: 'https://pdfilio.com/merge-pdf' },
  openGraph: {
    title: 'Merge PDF Online – Combine PDF Files',
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
        ] as any}
        features={['Combine multiple supported PDFs', 'Arrange files before merging', 'Create a single PDF output', 'Review the result before download']}
        benefits={['Simplify document sharing', 'Organize related files', 'Prepare submissions more efficiently', 'Keep the original files available for backup']}
        faqs={[
          { q: 'How do I merge PDF files?', a: 'Open the Merge PDF tool, upload the supported PDF files, arrange them in the required order, start processing, and review the resulting PDF before downloading.' },
          { q: 'Can I change the order before merging?', a: 'The tool supports arranging uploaded files before processing when reordering controls are available.' },
          { q: 'What happens to my uploaded files?', a: 'Processing depends on the current tool workflow. PDFilio is not a permanent file-storage service; see the Privacy Policy for the general data-handling approach.' },
          { q: 'Is there a file-size limit?', a: 'The standard uploader currently validates files up to 50MB unless a specific tool provides a different limit.' },
        ]}
        relatedTools={[{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to Word',slug:'pdf-to-word'}]}
        primaryKeyword="merge PDF"
        secondaryKeywords={['combine PDF files','merge PDF online']}
      />
    </>
  );
}
