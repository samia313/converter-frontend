import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Convert Images to PDF Online | JPG & PNG to PDF | PDFilio',
  description: 'Convert images to PDF online. Turn supported JPG, PNG, photos, scans, receipts, notes, and image files into organized PDF documents for sharing, printing, and archiving.',
  keywords: ['convert images to PDF','images to PDF online','JPG and PNG to PDF','image files to PDF','turn images into PDF','photo to PDF converter','image PDF converter'],
  alternates: { canonical: 'https://pdfilio.com/images-to-pdf' },
  openGraph: {
    title: 'Convert Images to PDF Online | JPG & PNG to PDF | PDFilio',
    description: 'Turn supported image files, photos, scans, and screenshots into organized PDF documents.',
    url: 'https://pdfilio.com/images-to-pdf',
    type: 'website',
  },
}

export default function ImagesToPdfPage() {
  const schema = {
    '@context':'https://schema.org',
    '@type':'SoftwareApplication',
    name:'Convert Images to PDF Online',
    description:'Online workflow for converting supported image files into PDF documents.',
    applicationCategory:'UtilitiesApplication',
    operatingSystem:'Web',
  }

  return <ToolLandingLayout
    toolName="Convert Images to PDF"
    toolSlug="image-to-pdf"
    description="Turn supported JPG, PNG, photos, scans, receipts, notes, and other image files into organized PDF documents for sharing, printing, submission, and archiving."
    heroImage="/tool-images/image-to-pdf-hero.png"
    mainContent={`Images are useful for photos, scanned paperwork, receipts, notes, screenshots, certificates, and other visual documents. Converting multiple images into a PDF can make them easier to organize, share, print, submit, or archive. PDFilio provides an online workflow for converting supported image files into PDF documents.

## Convert Images to PDF Online

Upload supported image files, arrange them in the required order, start the conversion, review the generated PDF, and download the result. Keep the original images when you may need the source files later.

## Convert JPG and PNG Images to PDF

JPG and PNG are common formats for photographs, scans, screenshots, and document images. Supported images can be turned into PDF pages and combined into a single document.

## Convert Photos to PDF

Photos of paperwork, receipts, certificates, notes, and forms can be collected into one PDF. Clear, well-oriented source images generally make the resulting document easier to review.

## Convert Scanned Documents to PDF

Scanned pages saved as supported image files can be assembled into a PDF. If you need selectable or editable text from scanned images, consider an OCR workflow instead of image-only PDF conversion.

## Combine Multiple Images into One PDF

When several images belong to one document, putting them into a single PDF can simplify sharing and printing. Review page order, orientation, page size, margins, and readability before downloading.

## Prepare Image Documents for Printing or Submission

A PDF can be useful for applications, forms, reports, printing, email attachments, and archiving. Check the final PDF before submitting important documents.`}
    useCase={['Convert JPG and PNG images to PDF','Turn photos into PDF documents','Combine scanned pages into one PDF','Convert receipts and invoices to PDF','Create PDF copies of certificates','Turn screenshots into PDF','Organize handwritten notes as a PDF','Prepare image-based documents for printing'].join('\n')}
    features={['Supported image-to-PDF conversion','JPG and PNG workflows','Combine multiple images into one PDF','Arrange images before conversion','Browser-based processing','Mobile and desktop browser access','PDF output for sharing and printing','Related PDF conversion tools']}
    benefits={['Turn image collections into one portable document','Organize photographed paperwork into page order','Prepare receipts and notes for sharing','Create printable PDF copies from images','Keep related image pages together','Review the final PDF before distribution']}
    howitworks={'1. Upload supported image files.\n2. Arrange the images in the required order and start the conversion.\n3. Download the PDF and review page order, orientation, readability, and layout.'}
    testimonials={[]}
    faqs={[
      {q:'How do I convert images to PDF online?',a:'Upload supported image files, arrange them as needed, start the conversion, review the PDF, and download the result.'},
      {q:'Can I convert JPG to PDF?',a:'Yes. Supported JPG images can be converted into PDF pages.'},
      {q:'Can I convert PNG to PDF?',a:'Yes. Supported PNG images can be converted into PDF pages.'},
      {q:'Can I combine multiple images into one PDF?',a:'Yes. Multiple supported images can be arranged and combined into a single PDF document.'},
      {q:'Can I convert photos to PDF?',a:'Yes. Photos saved in supported image formats can be turned into PDF documents.'},
      {q:'Can I convert scanned pages to PDF?',a:'Yes. Supported scanned images can be assembled into a PDF. For searchable or editable text, an OCR workflow may be more suitable.'},
      {q:'Can I convert receipts and invoices to PDF?',a:'Yes. Receipt and invoice images can be combined into a PDF for sharing, review, printing, or record keeping.'},
      {q:'Can I arrange image order before creating the PDF?',a:'The workflow can provide image ordering controls. Review the page sequence before creating the final PDF.'},
      {q:'Will image orientation be preserved?',a:'Orientation depends on the source image and conversion workflow. Review portrait and landscape pages in the resulting PDF.'},
      {q:'Will converting images to PDF reduce image quality?',a:'Output quality can depend on source resolution, page settings, and conversion processing. Review the PDF when quality is important.'},
      {q:'Can I convert images to PDF on my phone?',a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.'},
      {q:'What image formats are supported?',a:'Supported formats depend on the current tool configuration. Common formats such as JPG and PNG are intended for image-to-PDF workflows.'},
    ]}
    relatedTools={[
      {name:'Image to PDF',slug:'image-to-pdf'},
      {name:'JPG to PDF',slug:'jpg-to-pdf'},
      {name:'OCR Online',slug:'ocr-online'},
      {name:'Merge PDF',slug:'merge-pdf'},
      {name:'Compress PDF',slug:'compress-pdf'},
    ]}
    primaryKeyword="convert images to PDF"
    secondaryKeywords={['images to PDF online','JPG and PNG to PDF','image files to PDF','turn images into PDF','photo to PDF converter','image PDF converter']}
    schema={schema}
  />
}
