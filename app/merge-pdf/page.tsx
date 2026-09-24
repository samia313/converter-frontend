import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import MergePDFTool from '@/components/tools/merge-pdf-tool';

export const metadata: Metadata = {
  title: 'Merge PDF Online – Combine Multiple PDF Files into One | PDFilio',
  description: 'Merge multiple PDF files online into one PDF. Combine documents in your chosen order for sharing, printing, submission, review, and archiving.',
  keywords: ['merge PDF', 'merge PDF online', 'combine PDF', 'combine PDF files', 'PDF merger', 'join PDF files', 'merge PDF documents'],
  alternates: { canonical: 'https://pdfilio.com/merge-pdf' },
  openGraph: {
    title: 'Merge PDF Online – Combine PDF Files',
    description: 'Combine supported PDF files into one document and select the files in the order you want them merged.',
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

A typical workflow is to select the PDF files in the order you want them merged, confirm the selected files, process them, review the result, and download the final PDF. The final output can depend on the source PDFs and the current processing workflow.

For important documents, review page order, page size, orientation, bookmarks, forms, links, annotations, and other document features after merging. Keep the original files if you may need to create a different combined document later.`}
        useCase={'Combining reports into one document\nMerging chapters or sections into a single PDF\nOrganizing contract and application documents\nCreating a unified project document\nCombining meeting notes and supporting files\nAssembling financial statements and reports\nPreparing documents for submission\nCreating a single PDF for sharing and archiving'}
        features={['Combine multiple supported PDFs', 'Select files in merge order', 'Create a single PDF output', 'Review the result before download']}
        benefits={['Simplify document sharing', 'Organize related files', 'Prepare submissions more efficiently', 'Keep the original files available for backup']}
        faqs={[
          { q: 'How do I merge PDF files?', a: 'Open the Merge PDF tool, select at least two supported PDF files in the order you want them merged, start processing, and review the resulting PDF before downloading.' },
          { q: 'Can I change the order before merging?', a: 'The current tool uses the order in which files are added to the selected-file list. If you need a different order, clear the list and add the files again in the desired sequence.' },
          { q: 'What happens to my uploaded files?', a: 'Processing depends on the current tool workflow. PDFilio is not a permanent file-storage service; see the Privacy Policy for the general data-handling approach.' },
          { q: 'Is there a file-size limit?', a: 'The current Merge PDF uploader accepts individual PDF files up to 100MB, with a 500MB total selected-file limit.' },
        ]}
        relatedTools={[{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to Word',slug:'pdf-to-word'}]}
        primaryKeyword="merge PDF"
        secondaryKeywords={['combine PDF files','merge PDF online']}
      />
    </>
  );
}
