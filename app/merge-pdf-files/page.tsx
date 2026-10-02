import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Merge PDF Files Online | Combine PDFs into One | PDFilio',
  description: 'Combine multiple PDF files into one document online. Arrange reports, forms, contracts, scans, and other supported PDFs into a single organized file.',
  keywords: ['merge PDF files online','combine PDFs into one','merge multiple PDFs','combine PDF files','join PDF documents','PDF merger online'],
  alternates: { canonical: 'https://pdfilio.com/merge-pdf-files' },
  openGraph: {
    title: 'Merge PDF Files Online | Combine PDFs into One | PDFilio',
    description: 'Combine multiple supported PDF files into one organized PDF document online.',
    url: 'https://pdfilio.com/merge-pdf-files',
    type: 'website',
  },
}

export default function MergePdfFilesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Merge PDF Files Online',
    description: 'Online workflow for combining multiple supported PDF files into one PDF document.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
  }

  return <ToolLandingLayout
    toolName="Merge PDF Files Online"
    toolSlug="merge-pdf"
    heroImage="/tool-images/merge-pdf-hero.png"
    description="Combine multiple supported PDF files into one organized document for sharing, printing, submission, review, or archiving."
    mainContent={`When several related PDF files need to become one document, merging them can make the final file easier to manage. PDFilio lets you combine supported PDFs into a single output document through a browser-based workflow.

## Combine Multiple PDFs Into One

Select the PDF files you need, arrange them in the required sequence, start the merge, and review the resulting document. This can be useful for reports, contracts, forms, receipts, research material, application documents, and project files.

## Merge PDF Files in the Correct Order

The order of source files matters when the combined PDF is being submitted, printed, reviewed, or archived. Check the selected-file sequence before processing and inspect the final page order afterward.

## Create One PDF for Sharing or Submission

Combining attachments into one PDF can simplify document sharing and systems that request a single file. Keep the original PDFs available if you may need a different combination later.

## Review the Merged PDF

After merging, check that all expected files and pages are present. For important documents, also review orientation, page size, links, bookmarks, forms, annotations, and other features that may depend on the source PDFs and processing workflow.`}
    useCase={['Combine multiple reports into one PDF','Join contract attachments','Assemble application documents','Combine research papers and supporting files','Merge scanned PDF documents','Create a single project document','Combine financial statements','Prepare one PDF for submission'].join('\n')}
    features={['Combine multiple supported PDF files','Arrange files before processing','Create one combined PDF output','Browser-based workflow','Review the final document','Supported desktop and mobile browsers']}
    benefits={['Keep related documents together','Simplify sharing and submission','Reduce repeated file attachments','Create organized project documents','Prepare PDFs for printing or archiving','Keep original files as backups']}
    howitworks={'1. Open Merge PDF Files Online and select the supported PDFs.\n2. Arrange the files in the required order and start the merge.\n3. Download the combined PDF and review the pages before sharing or submitting it.'}
    testimonials={[]}
    faqs={[
      { q: 'How do I merge PDF files online?', a: 'Select the supported PDF files you want to combine, arrange them in the required order, start the merge, and download the resulting PDF.' },
      { q: 'Can I combine multiple PDFs into one?', a: 'Yes. The workflow is designed to combine multiple supported PDF files into one document.' },
      { q: 'Can I merge PDFs in a specific order?', a: 'Yes. Arrange the selected files in the sequence you need before starting the merge.' },
      { q: 'Can I merge contracts and attachments?', a: 'Yes. Combining contracts with related attachments is a common document-organization workflow.' },
      { q: 'Can I combine scanned PDFs?', a: 'Supported scanned PDFs can be combined as PDF files. Merging does not itself perform OCR or edit scanned text.' },
      { q: 'Will my original PDFs be overwritten?', a: 'The merge workflow creates a combined output file; keep your source PDFs if you need the originals for another workflow.' },
      { q: 'What should I check after merging?', a: 'Review page order, missing pages, orientation, page size, links, bookmarks, forms, annotations, and other important features.' },
      { q: 'Can I merge PDFs on my phone?', a: 'The browser-based workflow is designed for supported mobile and desktop browsers.' },
      { q: 'Can I use a merged PDF for a submission?', a: 'Yes. A combined PDF can be useful when an application or submission process asks for related documents in a single file.' },
      { q: 'Does merging PDFs change their quality?', a: 'The result depends on the source files and processing workflow. Review the combined PDF before relying on it for an important use.' },
      { q: 'What is the current file-size limit?', a: 'The current Merge PDF workflow accepts individual PDF files up to 100MB, with a 500MB total selected-file limit.' },
      { q: 'Is PDFilio Merge PDF free?', a: 'Current availability and usage limits depend on the product configuration shown in the PDFilio interface.' },
    ]}
    relatedTools={[{name:'Merge PDF',slug:'merge-pdf'},{name:'Split PDF',slug:'split-pdf'},{name:'Organize PDF',slug:'organize-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'Remove PDF Pages',slug:'remove-pages'}]}
    primaryKeyword="merge PDF files online"
    secondaryKeywords={['combine PDFs into one','merge multiple PDFs','combine PDF files','join PDF documents','PDF merger online']}
    schema={schema}
  />
}
