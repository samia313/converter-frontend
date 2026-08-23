import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import RemovePagesTool from '@/components/tools/remove-pages-tool';

export const metadata: Metadata = {
  title: 'Remove Pages from PDF Online – Delete PDF Pages | PDFilio',
  description: 'Remove unwanted pages from supported PDF files online. Select the pages you want to delete, create a cleaner PDF, and review the result before sharing.',
  keywords: ['remove pages from PDF', 'delete PDF pages', 'remove PDF pages online', 'delete pages from PDF', 'PDF page remover', 'remove pages PDF'],
  alternates: { canonical: 'https://pdfilio.com/remove-pages' },
  openGraph: {
    title: 'Remove Pages from PDF Online – Delete PDF Pages | PDFilio',
    description: 'Delete unwanted pages from supported PDF documents with an easy browser-based workflow.',
    url: 'https://pdfilio.com/remove-pages',
    type: 'website',
  },
};

export default function RemovePagesToolPage() {
  return (
    <>
      <RemovePagesTool />
      <ToolLandingLayout
        toolName="Remove Pages from PDF"
        toolSlug="remove-pages"
        description="Delete unwanted pages from supported PDF documents and create a cleaner PDF for sharing, uploading, or archiving."
        heroImage="/tool-images/remove-pages-hero.png"
        mainContent={`Remove Pages from PDF lets you remove pages you no longer need from a supported PDF document. It is useful when a file contains blank pages, duplicate material, outdated sections, or other pages that should not be included in the final copy.

A typical workflow is to upload a supported PDF, select the pages to remove, create the revised document, and review the output before sharing or submitting it. Removing pages changes the document structure, so check page numbering, bookmarks, internal links, forms, and other features when they matter.

The result depends on the source PDF and the current processing workflow. For important documents, keep an original copy and verify that the final PDF contains the intended pages and information.`}
        useCase={[
          'Removing blank pages from PDFs',
          'Deleting duplicate pages',
          'Removing outdated sections',
          'Preparing a shorter document for submission',
          'Cleaning up scanned PDF files',
          'Removing pages before sharing a document',
          'Creating a focused PDF from a longer file',
          'Reducing unnecessary pages before archiving',
        ].join('\n')}
        features={[
          'Select pages for removal',
          'Create a revised PDF document',
          'Browser-based PDF workflow',
          'Useful for scanned and standard PDFs when supported',
          'Page-focused document editing',
          'Reviewable output file',
          'Mobile and desktop browser support',
          'Related PDF organization tools',
        ]}
        benefits={[
          'Create shorter, cleaner PDFs',
          'Remove unwanted or duplicate pages',
          'Prepare documents for sharing and submission',
          'Reduce unnecessary document content',
          'Save time compared with rebuilding a PDF manually',
          'Keep the pages you actually need in the final copy',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I remove pages from a PDF?', a: 'Upload a supported PDF, select the pages you want to delete, process the document, and review the resulting PDF.' },
          { q: 'Can I delete one page from a PDF?', a: 'Yes. You can remove a specific unwanted page when it is supported by the page-selection workflow.' },
          { q: 'Can I remove multiple PDF pages at once?', a: 'Yes, multiple pages can be selected when the current tool interface supports multi-page selection.' },
          { q: 'Can I remove blank pages?', a: 'Yes. Blank or unwanted pages are a common use case for a PDF page-removal tool.' },
          { q: 'Can I remove duplicate pages?', a: 'Yes. If duplicate pages are present, you can select the unwanted copies for removal.' },
          { q: 'Can I remove pages from a scanned PDF?', a: 'Supported scanned PDFs can be processed because page removal works at the document-page level, although the file must meet the current uploader requirements.' },
          { q: 'Will removing pages change the remaining pages?', a: 'The remaining pages are retained in the revised PDF, but page numbering, bookmarks, links, forms, and other document features can be affected by structural changes. Review the output when these features matter.' },
          { q: 'Can I undo page removal?', a: 'Keep the original PDF before processing if you may need the deleted pages later. The safest way to restore them is to work from the original copy.' },
          { q: 'Can I remove pages from a PDF on my phone?', a: 'Yes. The browser-based workflow can be used from supported modern phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate desktop application is required for the browser-based page-removal workflow.' },
          { q: 'What PDF files can I upload?', a: 'Use the PDF files accepted by the current uploader. File size, document complexity, and processing limits can affect whether a file can be handled.' },
          { q: 'Should I keep a copy of the original PDF?', a: 'Yes. Keeping the original is recommended whenever the removed pages may be needed later or the document is important.' },
          { q: 'Is Remove Pages from PDF free?', a: 'PDFilio provides the online page-removal tool; current usage limits, account requirements, and availability depend on the product configuration shown in the tool interface.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Organize PDF', slug: 'organize-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Rotate PDF', slug: 'rotate-pdf' },
        ]}
        primaryKeyword="remove pages from PDF"
        secondaryKeywords={['delete PDF pages', 'remove PDF pages online', 'delete pages from PDF', 'PDF page remover', 'remove pages PDF']}
      />
    </>
  );
}
