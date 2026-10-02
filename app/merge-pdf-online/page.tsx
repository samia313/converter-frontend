import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Merge PDF Online | Combine Multiple PDF Files | PDFilio',
  description: 'Merge PDF files online into one document. Combine reports, contracts, scans, forms, chapters, and other supported PDFs in the order you need.',
  keywords: ['merge PDF online','merge PDF files','combine PDF','combine PDF files','PDF merger','join PDF files','merge multiple PDFs','combine PDFs into one'],
  alternates: { canonical: 'https://pdfilio.com/merge-pdf-online' },
  openGraph: { title: 'Merge PDF Online | Combine Multiple PDF Files | PDFilio', description: 'Combine multiple supported PDF files into one organized PDF document online.', url: 'https://pdfilio.com/merge-pdf-online', type: 'website' },
}

export default function MergePdfOnlinePage() {
  const schema = { '@context':'https://schema.org', '@type':'SoftwareApplication', name:'Merge PDF Online', description:'Online workflow for combining supported PDF files into one PDF document.', applicationCategory:'UtilitiesApplication', operatingSystem:'Web' }
  return <ToolLandingLayout
    toolName="Merge PDF Online" toolSlug="merge-pdf" heroImage="/tool-images/merge-pdf-hero.png"
    description="Combine multiple supported PDF files into one document online. Arrange related files into a single PDF for sharing, printing, submission, review, or archiving."
    mainContent={`Merge PDF is useful when several related documents need to become one organized PDF. You can combine reports, chapters, forms, contracts, receipts, scans, or project documents into a single file.

## Merge PDF Files Online

Select the PDF files you want to combine, arrange them in the required order, start the merge, and review the resulting PDF before downloading it. Keep the original files if you may need another page order later.

## Combine Multiple PDFs Into One

Merging can simplify document sharing and submission when information is spread across several PDF files. A combined document can be easier to send, review, print, and archive.

## Merge PDFs in the Right Order

Before processing, check the sequence of your files. For important documents, review the final page order, page size, orientation, links, annotations, forms, and other document features after merging.

## Merge Reports, Contracts, Forms, and Scans

Common workflows include assembling reports, application documents, contract attachments, financial statements, meeting notes, research material, and project files into a single PDF.

## Review the Combined PDF

Open the merged document before sharing it. Check that every expected file and page is present and that the pages appear in the intended order.`}
    useCase={['Combine reports into one PDF','Merge contract attachments','Assemble application documents','Combine chapters or sections','Merge scanned documents','Create a project PDF','Combine financial statements','Prepare one PDF for submission'].join('\n')}
    features={['Combine multiple supported PDFs','Arrange files before merging','Create one PDF output','Browser-based workflow','Review the combined document','Desktop and mobile browser access']}
    benefits={['Simplify PDF sharing','Organize related documents','Create a single submission file','Reduce repeated file attachments','Prepare documents for printing or archiving','Keep original PDFs available as backups']}
    howitworks={'1. Open Merge PDF Online and select the supported PDF files.\n2. Arrange the files in the required order and start merging.\n3. Download the combined PDF and review its pages before sharing or submitting it.'}
    faqs={[
      { q:'How do I merge PDF files online?', a:'Open PDFilio Merge PDF Online, select the PDFs you want to combine, arrange their order, start processing, and download the resulting PDF.' },
      { q:'Can I merge multiple PDFs into one?', a:'Yes. The Merge PDF workflow is designed to combine multiple supported PDF files into one document.' },
      { q:'Can I change the order of PDFs before merging?', a:'Yes. Arrange the selected files in the required sequence before starting the merge.' },
      { q:'Can I merge reports and contracts together?', a:'Yes. Combining related reports, contracts, attachments, forms, and other supported PDFs is a common use case.' },
      { q:'Can I merge scanned PDFs?', a:'Supported scanned PDFs can be combined as PDF files. Merging does not itself recognize or edit the text inside scanned pages.' },
      { q:'Will bookmarks and links be preserved?', a:'Document features can depend on the source files and processing workflow. Review the merged PDF before relying on bookmarks, links, forms, or annotations.' },
      { q:'Is there a file-size limit for Merge PDF?', a:'The current Merge PDF tool configuration accepts individual PDF files up to 100MB, with a 500MB total selected-file limit.' },
      { q:'Can I merge PDFs on my phone?', a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
      { q:'What should I check after merging PDFs?', a:'Check page order, missing pages, page orientation, page size, links, annotations, forms, and other important document features.' },
      { q:'Can I merge PDFs for a submission?', a:'Yes. Combining required documents into one PDF can be useful when a submission system asks for a single file.' },
      { q:'Does merging PDF reduce file quality?', a:'Merging primarily combines PDF documents. The final result can depend on the source files and processing workflow, so review the output before sharing.' },
      { q:'Is Merge PDF free?', a:'Current usage limits and availability are determined by the product configuration shown in the PDFilio Merge PDF interface.' },
    ]}
    relatedTools={[{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to Word',slug:'pdf-to-word'},{name:'Organize PDF',slug:'organize-pdf'},{name:'Remove PDF Pages',slug:'remove-pages'}]}
    primaryKeyword="merge PDF online"
    secondaryKeywords={['merge PDF files','combine PDF','combine PDF files','PDF merger','join PDF files','merge multiple PDFs']}
    schema={schema}
  />
}