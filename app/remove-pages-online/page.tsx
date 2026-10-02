import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Remove PDF Pages Online | Delete Pages from PDF | PDFilio',
  description: 'Remove PDF pages online and create a clean document without unwanted pages. Delete blank, duplicate, or unnecessary pages from supported PDFs.',
  keywords: ['remove PDF pages online','delete pages from PDF','remove PDF pages','delete PDF pages online','PDF page remover','remove pages from PDF file'],
  alternates: { canonical: 'https://pdfilio.com/remove-pages-online' },
  openGraph: {
    title: 'Remove PDF Pages Online | Delete Pages from PDF | PDFilio',
    description: 'Delete unwanted pages from supported PDF files and create a separate cleaned PDF.',
    url: 'https://pdfilio.com/remove-pages-online',
    type: 'website',
  },
}

export default function RemovePagesOnlinePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Remove PDF Pages Online',
    description: 'Online workflow for removing unwanted pages from supported PDF documents.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
  }

  return <ToolLandingLayout
    toolName="Remove PDF Pages Online"
    toolSlug="remove-pages"
    description="Delete unwanted pages from supported PDF files and create a clean PDF for sharing, printing, submission, or storage."
    heroImage="/tool-images/remove-pages-hero.png"
    mainContent={`PDF documents can contain blank pages, duplicate pages, outdated sections, or information you no longer need. PDFilio provides a focused workflow for removing selected pages and creating a separate PDF.

## Delete Unwanted Pages from a PDF

Upload a supported PDF and identify the pages you want to remove. The workflow creates a new document with those pages excluded, while keeping the source file available as your original.

## Remove Blank or Extra PDF Pages

Removing blank, duplicate, or unnecessary pages can make a document easier to review, share, print, and organize.

## Clean a PDF Before Submission

If a PDF contains pages that should not be included in a submission, application, report, or shared copy, remove those pages before creating the final version. Always review the output before sending an important document.

## Keep Your Original PDF

The removal workflow is designed to produce a separate output file rather than overwrite your source PDF. Keeping the original can be useful if you later need to restore a removed page.

## Review the Final PDF

After processing, check page count, page order, and important content to make sure the resulting document contains the pages you intended to keep.`}
    useCase={['Remove blank PDF pages','Delete duplicate pages','Clean reports before sharing','Prepare applications and submissions','Remove outdated document sections','Create shorter PDF copies','Clean scanned documents','Prepare PDFs for printing'].join('\n')}
    features={['Select pages for removal','Create a separate PDF output','Keep the source PDF unchanged','Browser-based workflow','Mobile and desktop browser access','Simple page-removal process']}
    benefits={['Create cleaner PDF documents','Remove pages you do not need','Prepare files for sharing and submission','Reduce unnecessary pages before printing','Keep an original backup','Simplify document organization']}
    howitworks={'1. Upload a supported PDF.\n2. Select or enter the page numbers you want to remove.\n3. Process the file, download the new PDF, and review the remaining pages.'}
    testimonials={[]}
    faqs={[
      {q:'How do I remove pages from a PDF online?',a:'Upload a supported PDF, select the pages you want to remove, process the file, and download the new PDF.'},
      {q:'Can I delete multiple PDF pages?',a:'Yes. You can select multiple pages for removal according to the controls available in the PDFilio tool.'},
      {q:'Can I remove a blank page from a PDF?',a:'Yes. Removing unwanted blank pages is a common use case for the page-removal workflow.'},
      {q:'Can I delete duplicate pages from a PDF?',a:'Yes. If a page is duplicated and you do not need the extra copy, you can remove the unwanted page.'},
      {q:'Will removing pages change my original PDF?',a:'The workflow creates a separate output PDF, so you can keep the original file as a backup.'},
      {q:'Can I remove pages from a scanned PDF?',a:'Yes. Page removal can be useful for scanned documents when individual pages are no longer needed.'},
      {q:'Can I remove pages before submitting a PDF?',a:'Yes. Removing unnecessary pages can help prepare a cleaner document for submission or sharing.'},
      {q:'Can I remove several pages at once?',a:'Yes. The tool supports selecting multiple pages according to its available page-selection controls.'},
      {q:'Do I need to install software?',a:'No separate installation is required for the browser-based workflow.'},
      {q:'Can I remove PDF pages on my phone?',a:'The browser-based workflow can be accessed from supported mobile and desktop browsers.'},
      {q:'Will the remaining pages keep their order?',a:'The output is intended to retain the remaining document pages in their existing order. Review the final PDF before sharing.'},
      {q:'Is Remove Pages from PDF free?',a:'Current availability and usage limits depend on the product configuration shown in the PDFilio interface.'},
    ]}
    relatedTools={[
      {name:'Remove Pages',slug:'remove-pages'},
      {name:'Organize PDF',slug:'organize-pdf'},
      {name:'Split PDF',slug:'split-pdf'},
      {name:'Merge PDF',slug:'merge-pdf'},
      {name:'Rotate PDF',slug:'rotate-pdf'},
    ]}
    primaryKeyword="remove PDF pages online"
    secondaryKeywords={['delete pages from PDF','remove PDF pages','delete PDF pages online','PDF page remover']}
    schema={schema}
  />
}
