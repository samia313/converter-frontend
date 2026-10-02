import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Compress PDF Online | Reduce PDF File Size | PDFilio',
  description: 'Compress PDF online and reduce file size for email, uploads, forms, storage, and sharing. Choose a compression level and review the resulting size and quality.',
  keywords: ['compress PDF online','compress PDF','reduce PDF size','PDF compressor','compress PDF to 2MB','compress PDF for email','make PDF smaller'],
  alternates: { canonical: 'https://pdfilio.com/compress-pdf-online' },
  openGraph: { title: 'Compress PDF Online | Reduce PDF File Size | PDFilio', description: 'Reduce supported PDF file sizes online for email, uploads, storage, and sharing.', url: 'https://pdfilio.com/compress-pdf-online', type: 'website' },
}

export default function CompressPdfOnlinePage() {
  const schema = { '@context':'https://schema.org', '@type':'SoftwareApplication', name:'Compress PDF Online', description:'Online workflow for reducing the file size of supported PDF documents.', applicationCategory:'UtilitiesApplication', operatingSystem:'Web' }
  return <ToolLandingLayout
    toolName="Compress PDF Online" toolSlug="compress-pdf" heroImage="/tool-images/compress-pdf-hero.png"
    description="Reduce supported PDF file sizes online for email, uploads, applications, storage, and sharing. Review the resulting file size and quality before using it."
    mainContent={`Compress PDF Online helps reduce the size of supported PDF documents when a file is too large for an email attachment, upload form, cloud workflow, or convenient sharing.

## Compress PDF Online

Upload a supported PDF, choose an available compression level, process the document, and check the resulting file size. Keep the original PDF so you can compare the output or create another compressed version if needed.

## Compress PDF to 2MB

If an application or upload form asks for a PDF around 2MB, use a stronger available compression setting and check the actual output size. A specific 2MB result cannot be guaranteed because compression depends on the source PDF.

## Compress PDF for Email

Email attachment limits vary. Compress the PDF, check the final size, and open the result before sending. If it remains too large, removing unnecessary pages or oversized images may help.

## Reduce PDF Size Without Losing Too Much Quality

Compression can affect image quality, especially in scan-heavy or image-heavy PDFs. Choose the lightest compression that meets your file-size requirement and review important pages afterward.

## Why Is My PDF So Large?

High-resolution images, scanned pages, embedded fonts, graphics, attachments, and other document resources can increase PDF size. Optimizing the source content can sometimes reduce size more effectively than repeated compression.

## Check the Final PDF

Compare the original and compressed file sizes, then inspect text, images, tables, signatures, and links before sharing or submitting the compressed document.`}
    useCase={['Reduce email attachment size','Meet online upload limits','Prepare PDFs for mobile sharing','Reduce cloud storage usage','Compress PDFs before online forms','Create smaller copies for sharing','Prepare documents for applications','Reduce large scanned PDF files'].join('\n')}
    features={['Available compression levels','Original and compressed size comparison','Reports resulting size reduction','Downloadable compressed PDF','PDF validation','Browser-based workflow','Mobile and desktop browser support','Process another PDF']}
    benefits={['Reduce PDF storage size','Send smaller attachments','Make uploads easier','Create more convenient files for sharing','Choose a practical size-quality balance','Keep the original document as a backup']}
    howitworks={'1. Open Compress PDF Online and upload a supported PDF.\n2. Choose the available compression level and process the file.\n3. Check the resulting size and review important pages before downloading or sharing.'}
    faqs={[
      { q:'How do I compress a PDF online?', a:'Upload a supported PDF, choose an available compression level, process the file, then review and download the compressed PDF.' },
      { q:'Can I compress a PDF to 2MB?', a:'You can try a stronger available compression setting and check the actual output size, but a 2MB result cannot be guaranteed for every source PDF.' },
      { q:'Can I compress a PDF for email?', a:'Yes. Compress the file and compare the final size with your email provider attachment limit before sending.' },
      { q:'How do I make a PDF smaller for email?', a:'Compress the PDF first. If it remains too large, consider removing unnecessary pages or oversized source images, or splitting the document when appropriate.' },
      { q:'Will PDF compression reduce quality?', a:'It can. Stronger compression may reduce image quality, so inspect important pages after processing.' },
      { q:'What makes a PDF file large?', a:'High-resolution images, scans, embedded fonts, graphics, attachments, and other resources can increase PDF size.' },
      { q:'How much smaller will my PDF become?', a:'The reduction depends on the source document and compression settings. The actual output size should be checked after processing.' },
      { q:'Can I compress a PDF on my phone?', a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
      { q:'Can I compress scanned PDFs?', a:'Yes, supported scanned PDFs can be compressed. Because scans often contain images, the effect on size and image quality can vary.' },
      { q:'Should I keep my original PDF?', a:'Yes. Keeping the original gives you a reference copy and lets you create another compressed version if needed.' },
      { q:'Is Compress PDF free?', a:'Current usage limits and availability are determined by the product configuration shown in the PDFilio Compress PDF interface.' },
      { q:'What should I check after compression?', a:'Check file size and inspect text, images, tables, signatures, links, and other important content before sharing or submitting the result.' },
    ]}
    relatedTools={[{name:'Split PDF',slug:'split-pdf'},{name:'Merge PDF',slug:'merge-pdf'},{name:'PDF to Word',slug:'pdf-to-word'},{name:'PDF to Excel',slug:'pdf-to-excel'},{name:'Rotate PDF',slug:'rotate-pdf'}]}
    primaryKeyword="compress PDF online"
    secondaryKeywords={['compress PDF','reduce PDF size','PDF compressor','compress PDF to 2MB','compress PDF for email','make PDF smaller']}
    schema={schema}
  />
}