import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Split PDF Files Online | Divide PDF into Parts | PDFilio',
  description: 'Split PDF files online into separate documents. Divide supported PDFs by page to separate reports, chapters, contracts, scans, and other document sections.',
  keywords: ['split PDF files online','divide PDF into parts','split PDF document','separate PDF pages','PDF splitter online','split PDF into sections','divide PDF pages'],
  alternates: { canonical: 'https://pdfilio.com/split-pdf-files' },
  openGraph: { title: 'Split PDF Files Online | Divide PDF into Parts | PDFilio', description: 'Divide supported PDF files into two separate PDF documents by choosing where to split the pages.', url: 'https://pdfilio.com/split-pdf-files', type: 'website' },
}

export default function SplitPdfFilesPage() {
  const schema = {
    '@context':'https://schema.org',
    '@type':'SoftwareApplication',
    name:'Split PDF Files Online',
    description:'Online workflow for dividing supported PDF documents into two separate PDF files.',
    applicationCategory:'UtilitiesApplication',
    operatingSystem:'Web',
  }

  return <ToolLandingLayout
    toolName="Split PDF Files Online"
    toolSlug="split-pdf"
    heroImage="/tool-images/split-pdf-hero.png"
    description="Divide a supported PDF into two separate documents by choosing the page where the split should occur."
    mainContent={`Splitting a PDF is useful when one document contains sections that need to be handled separately. PDFilio provides a browser-based workflow for dividing supported PDF files into two PDF outputs.

## Divide a PDF Into Separate Files

Upload your PDF, choose the page after which the split should happen, process the document, and download the resulting files. For important documents, check the split point before processing.

## Split PDF Pages Into Two Documents

For example, splitting after page 10 creates one PDF containing pages 1–10 and another containing the remaining pages. This can help separate chapters, report sections, application documents, or contract material.

## Separate Sections for Sharing

A large PDF may contain information intended for different people or workflows. Splitting it can make individual sections easier to share, review, submit, print, or archive.

## Split Scanned PDF Files

Supported scanned PDFs can generally be divided by page without OCR. If you need the text inside a scan to become searchable or editable, use an OCR workflow separately.

## Review Both Output Files

After splitting, open both generated PDFs and confirm that the expected pages are present and in the correct order before sharing or submitting them.`}
    useCase={['Divide long reports into two files','Separate textbook or document sections','Split contract material','Separate application documents','Divide research PDFs','Split scanned PDF files','Create smaller files for sharing','Separate PDF sections for review'].join('\n')}
    features={['Split supported PDFs into two parts','Choose the split page','Create two PDF outputs','Browser-based workflow','ZIP download for the output files','Mobile and desktop browser access']}
    benefits={['Separate document sections quickly','Create smaller PDF files','Simplify sharing and review','Prepare selected sections for submission','Keep the source PDF available','Use a straightforward browser workflow']}
    howitworks={'1. Upload a supported PDF with at least two pages.\n2. Choose the page after which the document should be divided.\n3. Download both PDF parts and review them before using them.'}
    testimonials={[]}
    faqs={[
      { q:'How do I split a PDF file online?', a:'Upload a supported PDF, choose the split page, start processing, and download the two resulting PDF files.' },
      { q:'Can I divide a PDF into two documents?', a:'Yes. The current PDFilio workflow divides a supported multi-page PDF into two PDF outputs.' },
      { q:'Can I choose the exact page to split?', a:'Yes. Enter the page after which the split should occur. The first output contains pages through that page and the second contains the remaining pages.' },
      { q:'Can I split a long report into sections?', a:'Yes. Splitting can separate report sections when the desired sections form two page ranges.' },
      { q:'Can I split a scanned PDF?', a:'Yes, supported scanned PDF pages can generally be divided. OCR is only needed when searchable or extractable text is required.' },
      { q:'How many files does the tool create?', a:'The current workflow creates two PDF output files and packages them together for download.' },
      { q:'Can I split a one-page PDF?', a:'No. The current workflow requires a multi-page PDF so that two output documents can be created.' },
      { q:'Will the original PDF be changed?', a:'The workflow creates separate output files rather than intentionally modifying the original PDF on your device.' },
      { q:'Can I split a PDF on mobile?', a:'The browser-based workflow is designed for supported mobile and desktop browsers.' },
      { q:'Should I review the split files?', a:'Yes. Check both output files for page order, missing pages, orientation, and other important document features.' },
      { q:'Can splitting make files smaller?', a:'Each output may be smaller than the source because it contains fewer pages, but the exact file sizes depend on the document content.' },
      { q:'Is Split PDF free?', a:'Current availability and usage limits depend on the product configuration shown in the PDFilio interface.' },
    ]}
    relatedTools={[{name:'Split PDF',slug:'split-pdf'},{name:'Merge PDF',slug:'merge-pdf'},{name:'Organize PDF',slug:'organize-pdf'},{name:'Remove Pages',slug:'remove-pages'},{name:'Compress PDF',slug:'compress-pdf'}]}
    primaryKeyword="split PDF files online"
    secondaryKeywords={['divide PDF into parts','split PDF document','separate PDF pages','PDF splitter online','split PDF into sections']}
    schema={schema}
  />
}
