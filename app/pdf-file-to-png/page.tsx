import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Convert PDF File to PNG Online | PDF to PNG | PDFilio',
  description: 'Convert PDF files to PNG images online. Turn supported PDF pages into PNG images for transparent graphics, high-quality previews, websites, presentations, and design workflows.',
  keywords: ['convert PDF file to PNG','PDF file to PNG online','PDF document to PNG','PDF to PNG online','turn PDF into PNG','PDF to image converter','PDF page to PNG'],
  alternates: { canonical: 'https://pdfilio.com/pdf-file-to-png' },
  openGraph: { title: 'Convert PDF File to PNG Online | PDF to PNG | PDFilio', description: 'Turn supported PDF pages into PNG images for high-quality previews, websites, presentations, and design workflows.', url: 'https://pdfilio.com/pdf-file-to-png', type: 'website' },
};

export default function PDFFileToPngPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Convert PDF File to PNG',
    description: 'Convert supported PDF pages into PNG images.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <ToolLandingLayout
      toolName="PDF File to PNG"
      toolSlug="pdf-to-png"
      description="Convert supported PDF files into PNG images for high-quality previews, websites, presentations, design projects, and image-based workflows."
      heroImage="/tool-images/pdf-to-png-hero.png"
      mainContent={`Convert PDF files to PNG when a document page needs to be used as a static image. PDFilio's PDF-to-PNG workflow turns supported PDF pages into PNG images that can be easier to preview, share, upload, and reuse in image-based workflows.

PNG is useful when image quality, sharp text, graphics, or transparency-related workflows matter. Conversion can still change how PDF fonts, vector content, transparency, and interactive features are represented, so review important output before publishing or printing.

Upload a supported PDF, start the conversion, review the generated PNG images, and download the output. Keep the original PDF when you need the source document or interactive PDF features.`}
      useCase={['Convert PDF pages into PNG images','Create high-quality previews from PDF pages','Prepare document pages for websites','Use PDF pages in presentations','Reuse PDF pages in design projects','Create image-based uploads','Convert reports and forms into PNG images','Create visual references from PDF documents'].join('\n')}
      features={['PDF page to PNG conversion','PNG image output for supported pages','Browser-based conversion workflow','Simple upload and conversion process','Downloadable PNG output','Desktop and mobile browser support','Useful for previews and design workflows','Static image output from PDF pages']}
      benefits={['Turn PDF pages into high-quality images','Reuse document pages in image-based workflows','Prepare clear previews for websites and presentations','Reduce manual screenshot work','Access conversion from a browser','Create PNG copies while keeping the original PDF available']}
      testimonials={[]}
      relatedTools={[{name:'PDF to PNG',slug:'pdf-to-png'},{name:'PDF to JPG',slug:'pdf-to-jpg'},{name:'PDF to Word',slug:'pdf-to-word'},{name:'Compress PDF',slug:'compress-pdf'},{name:'Split PDF',slug:'split-pdf'}]}
      faqs={[
        {q:'How do I convert a PDF file to PNG?',a:'Upload a supported PDF to PDFilio, start the conversion, review the generated PNG images, and download the output.'},
        {q:'Can I convert PDF to PNG online?',a:'Yes. PDFilio provides a browser-based workflow for converting supported PDF pages into PNG images.'},
        {q:'Does each PDF page become a PNG?',a:'The converter processes supported PDF pages into PNG image output. The exact output structure depends on the current tool workflow.'},
        {q:'Can I convert a PDF to PNG on my phone?',a:'Yes. The browser-based workflow can be accessed from supported phones and tablets as well as desktop browsers.'},
        {q:'Do I need to install software?',a:'No separate desktop converter is required for the online workflow.'},
        {q:'Why use PNG instead of JPG for PDF pages?',a:'PNG can be useful when sharp text, graphics, or lossless image representation is preferred. The best format depends on how the resulting image will be used.'},
        {q:'Will PNG quality be identical to the original PDF?',a:'Not necessarily. PNG is an image format, so PDF fonts, vector content, transparency, and other document features are rasterized or represented as image content during conversion. Review important output before use.'},
        {q:'Can I convert a scanned PDF to PNG?',a:'Yes. Supported scanned PDFs can be converted into PNG images. Output quality depends on the source scan and processing.'},
        {q:'Can I use PNG pages on a website?',a:'Yes. PNG output can be useful for image-based website content and previews, subject to your own file-size and display requirements.'},
        {q:'Can I convert a PDF report to PNG?',a:'Yes. Supported report pages can be converted to PNG images for previews, sharing, presentations, or other image-based workflows.'},
        {q:'Are PDF links and form fields preserved in PNG?',a:'No. PNG is a static image format, so interactive PDF elements such as clickable links, form fields, and embedded actions are not preserved as interactive features.'},
        {q:'Can I edit the PNG after conversion?',a:'Yes. Downloaded PNG images can be edited with compatible image-editing software or online design tools.'},
      ]}
      primaryKeyword="convert PDF file to PNG"
      secondaryKeywords={['PDF file to PNG online','PDF document to PNG','PDF to PNG online','turn PDF into PNG','PDF to image converter','PDF page to PNG']}
      schema={schema}
    />
  );
}
