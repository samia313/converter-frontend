import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'OCR Online | Extract Text from Images & Scanned PDFs | PDFilio',
  description: 'OCR online to extract text from supported images and scanned PDFs. Convert image-based documents into machine-readable text for copying, editing, searching, and reuse.',
  keywords: ['OCR online','online OCR','OCR PDF online','image to text','extract text from image','scanned PDF OCR','OCR text extraction'],
  alternates: { canonical: 'https://pdfilio.com/ocr-online' },
  openGraph: { title: 'OCR Online | Extract Text from Images & Scanned PDFs | PDFilio', description: 'Extract text from supported images and scanned PDFs with online OCR.', url: 'https://pdfilio.com/ocr-online', type: 'website' },
}

export default function OcrOnlinePage() {
  const schema = { '@context':'https://schema.org', '@type':'SoftwareApplication', name:'OCR Online', description:'Online OCR workflow for extracting text from supported scanned PDFs and images.', applicationCategory:'UtilitiesApplication', operatingSystem:'Web' }
  return <ToolLandingLayout
    toolName="OCR Online" toolSlug="ocr" heroImage="/tool-images/ai-ocr-hero.png"
    description="Extract text from supported scanned PDFs and images with online OCR. Turn image-based content into machine-readable text for copying, editing, searching, and reuse."
    mainContent={`OCR (Optical Character Recognition) identifies visible text in scanned documents and images and converts recognized content into machine-readable text.

## Extract Text from Scanned PDFs and Images

Upload a supported scan or image, run OCR, and review the recognized text. OCR can help with receipts, invoices, forms, printed notes, reports, screenshots, archived documents, and other image-based content.

## Online OCR for Everyday Document Work

Use OCR when you need to copy text from a scan, reuse information in another document, search recognized content, or reduce manual retyping. Recognition quality depends on image resolution, clarity, language, font, page layout, skew, and other source characteristics.

## Always Review Important OCR Results

OCR is text recognition rather than a guarantee of perfect transcription. Check names, numbers, dates, addresses, totals, tables, and other important information against the original document before using the extracted text.`}
    useCase={['Scanned PDF text extraction','Image to text conversion','Receipt and invoice text extraction','Printed form digitization','Study notes and scanned documents','Screenshot text extraction','Archived document text extraction','Reducing manual retyping'].join('\n')}
    features={['Online OCR workflow','Scanned PDF text extraction','Image-to-text recognition','Machine-readable text output','Browser-based processing workflow','Copy recognized text for reuse','OCR review guidance','Related PDF conversion workflows']}
    benefits={['Reduce manual retyping','Reuse text from image-based documents','Extract text from supported scans','Speed up initial document review','Make printed content easier to copy and edit','Continue extracted text into other document workflows']}
    howitworks={'1. Open the OCR tool and upload a supported scanned PDF or image.\n2. Run the OCR process and wait for the recognized text.\n3. Review the extracted text carefully, especially names, numbers, dates, tables, and other important details, then copy or save it as supported.'}
    faqs={[
      { q:'What is online OCR?', a:'Online OCR uses a browser-based workflow to recognize visible text in supported images or scanned documents and convert it into machine-readable text.' },
      { q:'Can I extract text from a scanned PDF online?', a:'Yes. Supported scanned PDFs can be processed through the PDFilio OCR workflow to recognize visible text.' },
      { q:'Can I convert an image to text?', a:'Yes. Supported images containing visible text can be processed with OCR to produce recognized text.' },
      { q:'Is online OCR accurate?', a:'OCR accuracy varies with scan quality, language, font, layout, image noise, skew, and other characteristics. Important results should always be checked against the source.' },
      { q:'Can OCR recognize handwriting?', a:'Handwriting is generally more difficult than clear printed text. Results depend on the handwriting, image quality, language, and available recognition capabilities.' },
      { q:'What language does PDFilio OCR support?', a:'The current browser OCR workflow uses the English Tesseract model. Non-English documents may produce poor or incorrect recognition results.' },
      { q:'Can I OCR receipts and invoices?', a:'Yes. Receipts and invoices are common OCR use cases, but amounts, dates, invoice numbers, and totals should be verified against the original.' },
      { q:'Does OCR preserve formatting?', a:'Not necessarily. OCR primarily focuses on recognizing text. Complex columns, tables, fonts, spacing, and layouts may require additional cleanup.' },
      { q:'Can I copy OCR text?', a:'Yes. Recognized text can be copied for reuse, subject to the capabilities of the current OCR workflow.' },
      { q:'Can I use online OCR on a phone?', a:'The browser-based workflow can be accessed on supported mobile and desktop browsers.' },
      { q:'Do I need to install OCR software?', a:'No separate desktop OCR application is required for the browser-based PDFilio workflow.' },
      { q:'Can OCR make a scanned PDF searchable?', a:'OCR can convert recognized image text into machine-readable text. Whether the final output is a searchable PDF depends on the selected workflow and output format.' },
    ]}
    relatedTools={[{name:'AI OCR',slug:'ai-ocr'},{name:'PDF to Word',slug:'pdf-to-word'},{name:'PDF to Excel',slug:'pdf-to-excel'},{name:'PDF to PNG',slug:'pdf-to-png'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to JPG',slug:'pdf-to-jpg'}]}
    primaryKeyword="OCR online"
    secondaryKeywords={['online OCR','OCR PDF online','image to text','extract text from image','scanned PDF OCR','OCR text extraction']}
    schema={schema}
  />
}