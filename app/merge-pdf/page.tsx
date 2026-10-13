import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import MergePDFTool from '@/components/tools/merge-pdf-tool';

export const metadata: Metadata = {
  title: { absolute: 'Combine PDF Files Online | Merge PDF | PDFilio' },
  description: 'Combine PDF files online with PDFilio. Merge multiple PDFs into one document in your chosen file order, then review and download the combined PDF.',
  keywords: ['merge PDF', 'merge PDF online', 'combine PDF', 'combine PDF files', 'PDF merger', 'join PDF files', 'merge PDF documents'],
  alternates: { canonical: 'https://pdfilio.com/merge-pdf' },
  openGraph: {
    title: 'Combine PDF Files Online | Merge PDF | PDFilio',
    description: 'Combine PDF files online with PDFilio. Merge multiple PDFs into one document in your chosen file order, then review and download the combined PDF.',
    url: 'https://pdfilio.com/merge-pdf',
    type: 'website',
    images: [{ url: 'https://pdfilio.com/tool-images/merge-pdf-hero.png', alt: 'Merge PDF files online with PDFilio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Combine PDF Files Online | Merge PDF | PDFilio',
    description: 'Merge multiple PDF files into one document in your chosen order. Review the combined PDF before downloading.',
    images: ['https://pdfilio.com/tool-images/merge-pdf-hero.png'],
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

## Combine PDFs in the Right Order

Choose the files you want to bring together and check their order before processing. A deliberate order is especially helpful for applications, reports, scanned paperwork, contracts with appendices, and assignments that must follow a specific sequence. If the order is not right, adjust the selected list before creating the combined document.

## When Is a Combined PDF Useful?

Merging PDFs can reduce the number of attachments you need to send and make related documents easier to review. Common examples include combining report sections, assembling supporting documents for a form submission, joining receipts with an expense report, or keeping meeting materials together. Use only files you are authorized to combine and share.

## What to Check After Merging

A typical workflow is to select supported PDF files, confirm the selected order, start processing, review the result, and download the final PDF. For important documents, check page order, page size, orientation, bookmarks, forms, links, annotations, and other document features after merging. Features can behave differently depending on the source PDFs and processing workflow, so do not assume every interactive element will be preserved identically.

## Merge PDF vs. Compress PDF

Merging combines multiple documents into one PDF; it does not necessarily reduce the file size. If the combined document is too large to upload or email, use a PDF compression tool as a separate step and review the resulting file quality.

## Prepare Files Before You Merge

Use clear file names, remove pages you do not want included, and make sure the source PDFs open correctly. Keep the originals in case you need to rebuild the combined document in a different order or compare the result with the source files.`}
        useCase={'Combining reports into one document\nMerging chapters or sections into a single PDF\nOrganizing contract and application documents\nCreating a unified project document\nCombining meeting notes and supporting files\nAssembling financial statements and reports\nPreparing documents for submission\nCreating a single PDF for sharing and archiving'}
        features={['Combine multiple supported PDFs', 'Select files in merge order', 'Create a single PDF output', 'Review the result before download']}
        benefits={['Simplify document sharing', 'Organize related files', 'Prepare submissions more efficiently', 'Keep the original files available for backup']}
        faqs={[
          { q: 'How do I merge PDF files?', a: 'Open the Merge PDF tool, select at least two supported PDF files in the order you want them merged, start processing, and review the resulting PDF before downloading.' },
          { q: 'Can I change the order before merging?', a: 'Check the selected-file list before processing. If the order is not right, rearrange the files if the interface supports it, or clear the list and add the files again in the desired sequence.' },
          { q: 'Will merging PDFs reduce the file size?', a: 'Not necessarily. Merging combines documents into one PDF, but the resulting file may still be large. Use a PDF compression tool separately if you need a smaller file.' },
          { q: 'Are links, forms, bookmarks, and annotations preserved?', a: 'Preservation can depend on the source PDFs and processing workflow. Review important interactive elements and page features in the merged file before relying on it.' },
          { q: 'What happens to my uploaded files?', a: 'Processing depends on the current tool workflow. PDFilio is not a permanent file-storage service; see the Privacy Policy for the general data-handling approach.' },
          { q: 'Is there a file-size limit?', a: 'The current Merge PDF uploader accepts individual PDF files up to 100MB, with a 500MB total selected-file limit. Follow any limit shown in the live uploader if it changes.' },
        ]}
        relatedTools={[{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to Word',slug:'pdf-to-word'}]}
        primaryKeyword="merge PDF"
        secondaryKeywords={['combine PDF files','merge PDF online','combine PDF online','join PDF files','merge multiple PDFs']}
      />
    </>
  );
}
