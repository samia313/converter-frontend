import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Convert JPG Images to PDF Online | JPEG to PDF | PDFilio',
  description: 'Convert JPG and JPEG images to PDF online. Turn photos, scans, receipts, screenshots, and image files into an organized PDF for sharing, printing, and submission.',
  keywords: ['convert JPG images to PDF','JPG images to PDF online','JPEG images to PDF','JPG file to PDF','turn JPG into PDF','image files to PDF','photos to PDF online'],
  alternates: { canonical: 'https://pdfilio.com/jpg-images-to-pdf' },
  openGraph: {
    title: 'Convert JPG Images to PDF Online | JPEG to PDF | PDFilio',
    description: 'Turn supported JPG and JPEG images into PDF files for sharing, printing, submissions, and document workflows.',
    url: 'https://pdfilio.com/jpg-images-to-pdf',
    type: 'website',
  },
}

export default function JpgImagesToPdfPage() {
  const schema = {
    '@context':'https://schema.org',
    '@type':'SoftwareApplication',
    name:'Convert JPG Images to PDF Online',
    description:'Online workflow for converting supported JPG and JPEG images into PDF documents.',
    applicationCategory:'UtilitiesApplication',
    operatingSystem:'Web',
  }

  return <ToolLandingLayout
    toolName="Convert JPG Images to PDF"
    toolSlug="jpg-to-pdf"
    description="Turn supported JPG and JPEG images into PDF documents for sharing, printing, applications, archiving, and everyday document workflows."
    heroImage="/tool-images/jpg-to-pdf-hero.png"
    mainContent={`JPG and JPEG files are commonly used for photos, scanned pages, receipts, screenshots, certificates, and other images. Converting these images into PDF can make them easier to collect, print, submit, share, and archive. PDFilio provides an online workflow for converting supported JPG and JPEG files into PDF documents.

## Convert JPG Images to PDF

Upload supported JPG or JPEG images, arrange them when ordering controls are available, create the PDF, review the pages, and download the finished document. Keep your original image files when you may need the source images later.

## Convert JPEG to PDF Online

JPG and JPEG are common image formats for document scans and photographs. Turning them into PDF can create a single document from individual image files.

## Convert Multiple JPG Files to One PDF

When several images belong to the same document, combining them into one PDF can simplify sharing and printing. Check page order and orientation before downloading the final file.

## Convert Photos to PDF

Photos of receipts, certificates, forms, notes, or other documents can be collected into a PDF when the source images are supported.

## Convert Scanned Images to PDF

Scanned pages saved as JPG or JPEG can be assembled into a PDF document. If the images contain text that needs editing or searching, an OCR workflow may be more appropriate.

## Prepare JPG Images for Sharing or Submission

A PDF can be useful for applications, document submissions, email attachments, printing, and archiving. Review image orientation, page order, readability, and quality before sending the final PDF.

## Review the Converted PDF

Output appearance can depend on source image dimensions, resolution, orientation, and the conversion workflow. For important documents, check every page before sharing or submitting it.`}
    useCase={['Convert photos to PDF','Combine scanned JPG pages into one PDF','Convert receipts and invoices to PDF','Create PDF copies of certificates','Turn screenshots into PDF documents','Prepare application documents','Create printable image-based PDFs','Archive groups of related JPG files'].join('\n')}
    features={['JPG and JPEG to PDF conversion','Combine multiple images into one PDF','Image-based document creation','Browser-based workflow','Mobile and desktop browser access','Useful for scans and photos','Simple upload and conversion process','Downloadable PDF output']}
    benefits={['Turn image collections into one organized document','Make photos and scans easier to share','Prepare image-based submissions','Create printable PDF copies of JPG files','Keep related images together in one document','Reduce manual image-to-document assembly']}
    howitworks={'1. Upload supported JPG or JPEG images.\n2. Arrange the images if page-order controls are available and create the PDF.\n3. Download the PDF and review page order, orientation, readability, and image quality.'}
    testimonials={[]}
    faqs={[
      {q:'How do I convert JPG images to PDF online?',a:'Upload supported JPG or JPEG images, arrange them when supported, create the PDF, review the pages, and download the result.'},
      {q:'Can I convert JPEG images to PDF?',a:'Yes. Supported JPG and JPEG images can be converted into PDF documents.'},
      {q:'Can I convert multiple JPG files into one PDF?',a:'Yes. Multiple supported images can be combined into a single PDF document.'},
      {q:'Can I convert photos to PDF?',a:'Yes. Photos saved as supported JPG or JPEG files can be converted into PDF.'},
      {q:'Can I convert scanned JPG pages to PDF?',a:'Yes. Supported scanned pages saved as JPG or JPEG can be assembled into a PDF.'},
      {q:'Can I convert screenshots to PDF?',a:'Yes. Supported JPG or JPEG screenshots can be included in a PDF document.'},
      {q:'Will the JPG image quality stay exactly the same?',a:'Output appearance can depend on source dimensions, resolution, and conversion processing. Review the PDF when image quality is important.'},
      {q:'Can I arrange JPG images before creating the PDF?',a:'If page-order controls are available in the current interface, use them to arrange images before creating the PDF.'},
      {q:'Can I use JPG to PDF on my phone?',a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.'},
      {q:'Do I need to install software to convert JPG to PDF?',a:'No separate PDF application is required for the browser-based conversion workflow.'},
      {q:'Can I use the PDF for printing or submission?',a:'Yes. A generated PDF can be used for common printing, sharing, and document-submission workflows. Review the final pages first.'},
      {q:'Should I use OCR if my JPG contains text?',a:'If you need selectable or editable text from an image, an OCR workflow may be more suitable than simply converting the image to PDF.'},
    ]}
    relatedTools={[
      {name:'JPG to PDF',slug:'jpg-to-pdf'},
      {name:'PDF to JPG',slug:'pdf-to-jpg'},
      {name:'OCR Online',slug:'ocr-online'},
      {name:'Merge PDF',slug:'merge-pdf'},
      {name:'Compress PDF',slug:'compress-pdf'},
    ]}
    primaryKeyword="convert JPG images to PDF"
    secondaryKeywords={['JPG images to PDF online','JPEG images to PDF','JPG file to PDF','turn JPG into PDF','image files to PDF','photos to PDF online']}
    schema={schema}
  />
}
