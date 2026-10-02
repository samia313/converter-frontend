import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Compress PDF Files Online | Reduce PDF Size | PDFilio',
  description: 'Compress PDF files online and make documents smaller for email, uploads, applications, storage, and sharing. Choose compression and review the result.',
  keywords: ['compress PDF files online','reduce PDF file size','make PDF smaller','compress PDF document','PDF size reducer','shrink PDF file'],
  alternates: { canonical: 'https://pdfilio.com/compress-pdf-files' },
  openGraph: {
    title: 'Compress PDF Files Online | Reduce PDF Size | PDFilio',
    description: 'Reduce the size of supported PDF files for email, uploads, storage, and sharing.',
    url: 'https://pdfilio.com/compress-pdf-files',
    type: 'website',
  },
}

export default function CompressPdfFilesPage() {
  const schema = {
    '@context':'https://schema.org',
    '@type':'SoftwareApplication',
    name:'Compress PDF Files Online',
    description:'Online workflow for reducing the file size of supported PDF documents.',
    applicationCategory:'UtilitiesApplication',
    operatingSystem:'Web',
  }

  return <ToolLandingLayout
    toolName="Compress PDF Files Online"
    toolSlug="compress-pdf"
    description="Reduce the size of supported PDF files for email, uploads, applications, storage, and sharing while checking the final file size and readability."
    heroImage="/tool-images/compress-pdf-hero.png"
    mainContent={`Large PDF files can be difficult to upload, email, store, or share. PDFilio provides a browser-based workflow for compressing supported PDF files and creating a smaller copy.

## Reduce PDF File Size Online

Upload a supported PDF, choose an available compression level, process the document, and compare the resulting size with the original. Keep the source file when you may need the original quality later.

## Make a PDF Smaller for Email

Email attachment limits vary by provider. Compress the document, check the final size, and open the result before sending. If it remains too large, consider removing unnecessary pages or splitting the document when appropriate.

## Compress PDF for Uploads and Applications

Many websites and application forms impose file-size limits. Compression can help create a smaller PDF that is easier to upload. Always check the destination's exact size requirement rather than assuming a particular compression result.

## Compress Without Unnecessary Quality Loss

Compression can affect images and other document resources. Choose a practical compression level and review text, images, tables, signatures, and important pages after processing.

## Why Are Some PDF Files So Large?

Scanned pages, high-resolution photographs, embedded fonts, graphics, and other resources can contribute to PDF size. Compression results vary by the contents of the original document.

## Check the Final PDF

After compression, compare the file size and inspect the document before sharing, printing, submitting, or replacing the original.`}
    useCase={['Reduce PDF files for email','Meet online upload limits','Prepare application documents','Create smaller files for mobile sharing','Save PDF storage space','Reduce scanned document size','Prepare PDFs for cloud uploads','Create smaller copies for sharing'].join('\n')}
    features={['Available compression levels','Original and output size comparison','Reports resulting size reduction','Downloadable compressed PDF','PDF validation workflow','Browser-based processing','Mobile and desktop browser support','Review output before sharing']}
    benefits={['Create smaller PDF files','Make email attachments easier to send','Prepare documents for upload limits','Reduce storage requirements','Simplify mobile and cloud sharing','Choose a practical size-versus-quality balance']}
    howitworks={'1. Upload a supported PDF.\n2. Choose an available compression level and process the file.\n3. Download the smaller PDF, compare its size, and review important content.'}
    testimonials={[]}
    faqs={[
      {q:'How do I compress a PDF file online?',a:'Upload a supported PDF, choose an available compression level, process it, and download the resulting smaller PDF.'},
      {q:'Can I reduce PDF size for email?',a:'Yes. Compress the PDF and compare its final size with your email provider’s attachment limit before sending.'},
      {q:'Can I make a PDF smaller for an online upload?',a:'Yes. Compression can reduce file size and may help with upload limits. Check the destination requirement and verify the resulting size.'},
      {q:'Can I compress a PDF to 2MB?',a:'You can try a stronger available compression setting and check the result, but a specific 2MB output cannot be guaranteed for every PDF.'},
      {q:'Will compressing a PDF reduce quality?',a:'It can, particularly with image-heavy documents. Review important pages after processing.'},
      {q:'Why is my PDF file so large?',a:'Scans, high-resolution images, embedded fonts, graphics, and other document resources can increase PDF size.'},
      {q:'Can I compress a scanned PDF?',a:'Yes. Scanned PDFs can often be compressed, although the amount of size reduction depends on the source document.'},
      {q:'Can I compress a PDF on my phone?',a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.'},
      {q:'Should I keep the original PDF?',a:'Yes. Keeping the original gives you a backup if you later need the original file size or quality.'},
      {q:'Can I compress a PDF before submitting it?',a:'Yes. Compression can help when a submission system has a file-size limit. Check the final PDF before submitting.'},
      {q:'How do I know how much the PDF was reduced?',a:'The compression workflow can report the original and resulting file sizes so you can compare them.'},
      {q:'Is Compress PDF free?',a:'Current availability and usage limits depend on the product configuration shown in the PDFilio interface.'},
    ]}
    relatedTools={[
      {name:'Compress PDF',slug:'compress-pdf'},
      {name:'Split PDF',slug:'split-pdf'},
      {name:'Merge PDF',slug:'merge-pdf'},
      {name:'PDF to Word',slug:'pdf-to-word'},
      {name:'Rotate PDF',slug:'rotate-pdf'},
    ]}
    primaryKeyword="compress PDF files online"
    secondaryKeywords={['reduce PDF file size','make PDF smaller','compress PDF document','PDF size reducer','shrink PDF file']}
    schema={schema}
  />
}
