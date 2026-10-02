import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Rotate PDF Files Online | Turn PDF Pages | PDFilio',
  description: 'Rotate PDF files online to correct sideways or upside-down pages. Turn supported PDF pages by 90, 180, or 270 degrees and review the result.',
  keywords: ['rotate PDF files online','turn PDF pages','rotate PDF document','PDF page rotator','rotate PDF file','fix sideways PDF','rotate PDF pages'],
  alternates: { canonical: 'https://pdfilio.com/rotate-pdf-files' },
  openGraph: { title: 'Rotate PDF Files Online | Turn PDF Pages | PDFilio', description: 'Correct the orientation of supported PDF files by rotating pages online.', url: 'https://pdfilio.com/rotate-pdf-files', type: 'website' },
}

export default function RotatePdfFilesPage() {
  const schema = {
    '@context':'https://schema.org',
    '@type':'SoftwareApplication',
    name:'Rotate PDF Files Online',
    description:'Online workflow for rotating supported PDF pages to correct document orientation.',
    applicationCategory:'UtilitiesApplication',
    operatingSystem:'Web',
  }

  return <ToolLandingLayout
    toolName="Rotate PDF Files Online"
    toolSlug="rotate-pdf"
    heroImage="/tool-images/rotate-pdf-hero.png"
    description="Turn supported PDF pages by 90, 180, or 270 degrees to fix sideways, upside-down, or incorrectly oriented documents."
    mainContent={`A PDF can sometimes contain pages that are sideways or upside down because of scanning, photography, document assembly, or mixed page orientation. PDFilio provides a browser-based workflow for rotating supported PDF files.

## Turn PDF Pages Online

Upload a supported PDF, choose the required rotation angle, process the document, and review the resulting pages. The available rotation options are 90, 180, and 270 degrees.

## Fix Sideways PDF Files

A sideways scan can make reading, sharing, and printing inconvenient. Rotating the affected document can correct its viewing direction without requiring you to rebuild the PDF.

## Rotate an Upside-Down PDF

When a page is upside down, a 180-degree rotation can place it back into the expected reading direction. Always check the output before using it for an important workflow.

## Rotate PDFs for Printing and Sharing

Correct page orientation before printing, submitting, archiving, or sharing a document. This is particularly useful for scanned forms, reports, applications, and camera-created PDFs.

## Review the Rotated PDF

After processing, check page direction, mixed orientations, page appearance, and any important document features before sharing or printing.`}
    useCase={['Fix sideways scanned PDFs','Correct upside-down pages','Rotate camera-scanned documents','Prepare PDFs for printing','Fix orientation before submission','Improve mobile PDF reading','Correct mixed-orientation documents','Prepare scanned reports for sharing'].join('\n')}
    features={['90-degree rotation','180-degree rotation','270-degree rotation','PDF orientation correction','Browser-based workflow','Mobile and desktop browser access','PDF output after processing','Review before sharing or printing']}
    benefits={['Make incorrectly oriented pages easier to read','Correct scanned document direction','Prepare PDFs for printing and submission','Avoid rebuilding documents for simple orientation fixes','Improve consistency when sharing PDFs','Keep the source PDF available for backup']}
    howitworks={'1. Upload a supported PDF file.\n2. Choose 90, 180, or 270 degrees and start processing.\n3. Download the rotated PDF and review the page orientation before using it.'}
    testimonials={[]}
    faqs={[
      { q:'How do I rotate a PDF file online?', a:'Upload a supported PDF, select the required rotation angle, process the file, and download the resulting PDF.' },
      { q:'Can I rotate PDF pages by 90 degrees?', a:'Yes. The current workflow supports 90-degree rotation.' },
      { q:'Can I rotate a PDF by 180 degrees?', a:'Yes. A 180-degree rotation can correct an upside-down page when that is the required orientation.' },
      { q:'Can I rotate a PDF by 270 degrees?', a:'Yes. The current workflow also provides a 270-degree rotation option.' },
      { q:'How do I fix a sideways PDF?', a:'Upload the PDF and choose the rotation direction that places the sideways pages into the correct reading orientation.' },
      { q:'Can I rotate a scanned PDF?', a:'Yes. Rotating scanned PDF pages can correct pages captured in the wrong direction.' },
      { q:'Will rotating change my PDF content?', a:'Rotation is intended to change page orientation rather than rewrite the visible document content. Review the output after processing.' },
      { q:'Can I rotate a PDF before printing?', a:'Yes. Correcting orientation before printing can help prevent sideways or upside-down pages.' },
      { q:'Can I rotate a PDF on my phone?', a:'The browser-based workflow is designed for supported mobile and desktop browsers.' },
      { q:'Do I need to install software?', a:'No separate installation is required for the browser-based PDF rotation workflow.' },
      { q:'Will PDF quality decrease after rotation?', a:'The final result depends on the source PDF and processing workflow. Review important files after rotation.' },
      { q:'Is Rotate PDF free?', a:'Current availability and usage limits depend on the product configuration shown in the PDFilio interface.' },
    ]}
    relatedTools={[{name:'Rotate PDF',slug:'rotate-pdf'},{name:'Merge PDF',slug:'merge-pdf'},{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to JPG',slug:'pdf-to-jpg'}]}
    primaryKeyword="rotate PDF files online"
    secondaryKeywords={['turn PDF pages','rotate PDF document','PDF page rotator','rotate PDF file','fix sideways PDF']}
    schema={schema}
  />
}
