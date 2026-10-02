import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Split PDF Online | Divide PDF into Separate Files | PDFilio',
  description: 'Split PDF online into two separate PDF files. Choose where to divide a supported PDF and download the resulting parts for sharing, review, or organization.',
  keywords: ['split PDF online','split PDF','split PDF into two parts','divide PDF','PDF splitter','separate PDF pages','split PDF file'],
  alternates: { canonical: 'https://pdfilio.com/split-pdf-online' },
  openGraph: { title: 'Split PDF Online | Divide PDF into Separate Files | PDFilio', description: 'Divide a supported PDF into two separate PDF files online by choosing the split point.', url: 'https://pdfilio.com/split-pdf-online', type: 'website' },
}

export default function SplitPdfOnlinePage() {
  const schema = { '@context':'https://schema.org', '@type':'SoftwareApplication', name:'Split PDF Online', description:'Online workflow for splitting supported PDF documents into two separate PDF files.', applicationCategory:'UtilitiesApplication', operatingSystem:'Web' }
  return <ToolLandingLayout
    toolName="Split PDF Online" toolSlug="split-pdf" heroImage="/tool-images/split-pdf-hero.png"
    description="Divide a supported PDF into two separate PDF files online. Choose the split point and download both resulting parts together."
    mainContent={`Split PDF Online helps you divide a multi-page PDF into two separate documents. This is useful when a long PDF contains sections that need to be shared, reviewed, submitted, or organized separately.

## Split PDF Online

Upload a supported PDF, choose the page after which you want to split it, start processing, and download the two resulting PDF parts. If no split page is entered, the current tool can use a middle split.

## Split PDF Into Two Parts

For example, splitting after page 5 creates one PDF containing pages 1–5 and another containing the remaining pages. Check the selected page before processing when the exact division matters.

## Divide a PDF for Sharing or Submission

Splitting can help when different sections of a report, textbook, contract, research paper, or application document need to be handled separately. Review both output files before sharing or submitting them.

## Split Scanned PDFs

A scanned PDF can generally be divided by page because splitting operates on the PDF pages. OCR is only needed when you also need searchable or extractable text.

## Review Both PDF Parts

Open both generated files after splitting and confirm that the expected pages are present, in the correct order, before using them in an important workflow.`}
    useCase={['Split a long PDF into two files','Separate report sections','Divide textbook chapters','Separate contract sections','Split research documents','Prepare smaller files for sharing','Divide application documents','Create separate PDF parts'].join('\n')}
    features={['Split supported PDFs into two parts','Choose the split page','Middle split when no page is entered','Two PDF output files','ZIP download containing both parts','Browser-based workflow','Mobile and desktop browser access','Original PDF remains unchanged']}
    benefits={['Create smaller PDF parts','Choose a practical split point','Separate document sections','Simplify sharing and review','Prepare selected sections for workflows','Keep the original PDF available']}
    howitworks={'1. Open Split PDF Online and upload a supported multi-page PDF.\n2. Enter the page after which the split should occur, or use the default middle split.\n3. Download the two PDF parts and review them before sharing or submitting.'}
    faqs={[
      { q:'How do I split a PDF online?', a:'Upload a supported PDF, choose the split page, start the Split PDF workflow, and download the resulting PDF parts.' },
      { q:'Can I split a PDF into two parts?', a:'Yes. The current PDFilio splitter creates two PDF files from a supported multi-page PDF.' },
      { q:'Can I choose where the PDF is split?', a:'Yes. Enter the page after which you want the split. For example, splitting after page 5 creates pages 1–5 as the first PDF and the remaining pages as the second.' },
      { q:'What happens if I do not enter a split page?', a:'The current workflow can automatically choose a split point near the middle of the document.' },
      { q:'How many files does the splitter create?', a:'The current workflow creates two PDF files and packages them together in a ZIP download.' },
      { q:'Can I split a one-page PDF?', a:'No. The current splitter requires at least two pages so that both output files contain pages.' },
      { q:'Can I split a scanned PDF?', a:'Yes. Scanned PDF pages can generally be divided without OCR. OCR is needed when you want searchable or extractable text.' },
      { q:'Will splitting change my original PDF?', a:'The split operation creates separate output files; it does not intentionally modify the original PDF on your device.' },
      { q:'Can I split a PDF on my phone?', a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
      { q:'Does splitting reduce PDF size?', a:'Each resulting file may be smaller than the original, but the exact sizes depend on the PDF content and structure.' },
      { q:'What format are the split files?', a:'The output parts are PDF files and are packaged together in a ZIP download in the current workflow.' },
      { q:'Is Split PDF free?', a:'Current usage limits and availability are determined by the product configuration shown in the PDFilio Split PDF interface.' },
    ]}
    relatedTools={[{name:'Merge PDF',slug:'merge-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'Organize PDF',slug:'organize-pdf'},{name:'Remove Pages',slug:'remove-pages'},{name:'PDF to Word',slug:'pdf-to-word'}]}
    primaryKeyword="split PDF online"
    secondaryKeywords={['split PDF','split PDF into two parts','divide PDF','PDF splitter','separate PDF pages','split PDF file']}
    schema={schema}
  />
}