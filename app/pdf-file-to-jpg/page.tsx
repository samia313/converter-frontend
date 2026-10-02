import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Convert PDF File to JPG Online | PDF to JPEG | PDFilio',
  description: 'Convert PDF files to JPG images online. Turn supported PDF pages into JPEG images for sharing, previews, websites, presentations, design, and image-based workflows.',
  keywords: ['convert PDF file to JPG','PDF file to JPG online','PDF document to JPG','PDF to JPEG online','turn PDF into JPG','PDF to image converter','PDF page to JPG'],
  alternates: { canonical: 'https://pdfilio.com/pdf-file-to-jpg' },
  openGraph: { title: 'Convert PDF File to JPG Online | PDF to JPEG | PDFilio', description: 'Turn supported PDF pages into JPG images for sharing, previews, presentations, websites, and design workflows.', url: 'https://pdfilio.com/pdf-file-to-jpg', type: 'website' },
};

export default function PDFFileToJpgPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Convert PDF File to JPG',
    description: 'Convert supported PDF pages into JPG images.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <ToolLandingLayout
      toolName="PDF File to JPG"
      toolSlug="pdf-to-jpg"
      description="Convert supported PDF files into JPG images for previews, sharing, websites, presentations, design projects, and image-based workflows."
      heroImage="/tool-images/pdf-to-jpg-hero.png"
      mainContent={`Convert PDF files to JPG when a document page needs to be used as a static image. PDFilio's PDF-to-JPG workflow turns supported PDF pages into JPG images that can be easier to preview, share, upload, and reuse in image-based workflows.

Common uses include presentation slides, website previews, design projects, reports, forms, social media assets, and image-based uploads. JPG conversion can change how text, transparency, fonts, and other PDF features are represented, so review important images before publishing or printing.

Upload a supported PDF, start the conversion, review the generated JPG images, and download the output. Keep the original PDF when you need a reference copy or interactive document features.`}
      useCase={['Convert PDF pages into JPG images','Create website previews from PDF pages','Prepare document pages for presentations','Share selected PDF pages as images','Reuse PDF pages in design projects','Prepare image-based uploads','Create visual references from PDF documents','Convert reports and forms into image files'].join('\n')}
      features={['PDF page to JPG conversion','JPG/JPEG image output for supported pages','Browser-based conversion workflow','Simple upload and conversion process','Downloadable image output','Desktop and mobile browser support','Useful for previews and design workflows','Static image output from PDF pages']}
      benefits={['Turn PDF pages into easy-to-share images','Reuse document pages in image-based workflows','Prepare previews for websites and presentations','Reduce manual screenshot work','Access conversion from a browser','Create JPG copies while keeping the original PDF available']}
      testimonials={[]}
      relatedTools={[{name:'PDF to JPG',slug:'pdf-to-jpg'},{name:'PDF to PNG',slug:'pdf-to-png'},{name:'PDF to Word',slug:'pdf-to-word'},{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'}]}
      faqs={[
        {q:'How do I convert a PDF file to JPG?',a:'Upload a supported PDF to PDFilio, start the conversion, review the generated JPG images, and download the output.'},
        {q:'Can I convert PDF to JPEG online?',a:'Yes. JPG and JPEG are commonly used names for the same image format, and supported PDF pages can be converted into JPG image output.'},
        {q:'Does each PDF page become a JPG?',a:'The converter processes supported PDF pages into JPG image output. The exact output structure depends on the current tool workflow.'},
        {q:'Can I convert a PDF to JPG on my phone?',a:'Yes. The browser-based workflow can be accessed from supported phones and tablets as well as desktop browsers.'},
        {q:'Do I need to install software?',a:'No separate desktop converter is required for the online workflow.'},
        {q:'Will JPG quality be identical to the original PDF?',a:'Not necessarily. JPG is a static image format, so text, images, transparency, and other PDF features can be represented differently. Review important output before use.'},
        {q:'Can I convert a scanned PDF to JPG?',a:'Yes. Supported scanned PDFs can be converted into JPG images because the scanned page content can be represented as an image. Output quality depends on the source scan and processing.'},
        {q:'Can I convert PDF pages for a presentation?',a:'Yes. JPG images can be useful in presentation software that accepts image files.'},
        {q:'Can I use PDF pages as website images?',a:'Yes. JPG output can be useful for previews and image-based website content, subject to your image-quality and file-size requirements.'},
        {q:'Can I convert a PDF report to JPG?',a:'Yes. Supported report pages can be converted to JPG images for previews, sharing, or other image-based workflows.'},
        {q:'Are PDF links and form fields preserved in JPG?',a:'No. JPG is a static image format, so interactive PDF features such as clickable links, form fields, and embedded actions are not preserved as interactive elements.'},
        {q:'Can I edit the JPG after conversion?',a:'Yes. Downloaded JPG images can be edited with compatible image-editing software or online design tools.'},
      ]}
      primaryKeyword="convert PDF file to JPG"
      secondaryKeywords={['PDF file to JPG online','PDF document to JPG','PDF to JPEG online','turn PDF into JPG','PDF to image converter','PDF page to JPG']}
      schema={schema}
    />
  );
}
