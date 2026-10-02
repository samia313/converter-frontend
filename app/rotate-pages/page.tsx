import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import RotatePDFTool from '@/components/tools/rotate-pdf-tool';

export const metadata: Metadata = {
  title: 'Rotate PDF Pages Online | Rotate PDF & Fix Orientation | PDFilio',
  description: 'Rotate PDF pages online to fix sideways, upside-down, or incorrectly oriented documents. Turn supported PDF pages by 90, 180, or 270 degrees.',
  keywords: ['rotate PDF pages online','rotate PDF online','rotate PDF','fix PDF orientation','rotate PDF page','fix sideways PDF','PDF page rotation'],
  alternates: { canonical: 'https://pdfilio.com/rotate-pages' },
  openGraph: {
    title: 'Rotate PDF Pages Online | Fix PDF Orientation | PDFilio',
    description: 'Rotate supported PDF pages online and correct sideways or upside-down document orientation.',
    url: 'https://pdfilio.com/rotate-pages',
    type: 'website',
  },
};

const faqs = [
  {q:'How do I rotate PDF pages online?',a:'Upload a supported PDF, choose the required rotation angle, process the file, review the page orientation, and download the resulting PDF.'},
  {q:'What rotation angles can I use?',a:'The current PDFilio rotation workflow supports 90, 180, and 270 degree rotation options.'},
  {q:'Can I rotate a sideways PDF?',a:'Yes. Choose the rotation angle that corrects the sideways orientation, then review the resulting PDF.'},
  {q:'Can I rotate an upside-down PDF?',a:'Yes. A 180 degree rotation can correct an upside-down page when that is the appropriate orientation.'},
  {q:'Can I rotate scanned PDF pages?',a:'Yes. Rotation is useful for scanned pages that were saved sideways or upside down.'},
  {q:'Can I rotate PDF pages on my phone?',a:'Yes. The browser-based workflow can be used on supported phones, tablets, and desktop browsers.'},
  {q:'Do I need to install software to rotate a PDF?',a:'No separate application is required for the browser-based PDF rotation workflow.'},
  {q:'Will rotating a PDF change its content?',a:'Rotation is intended to change page orientation rather than rewrite the document content. Review important files after processing.'},
  {q:'Can I rotate a PDF before printing?',a:'Yes. Correct page orientation before printing so the document is easier to read and handle.'},
  {q:'Can I rotate mixed-orientation PDF pages?',a:'The available rotation controls and page structure determine how mixed-orientation documents can be handled. Always review the final PDF.'},
  {q:'Will the original PDF be changed?',a:'The workflow produces a processed PDF output. Keep your original file if you may need to restore or compare the original orientation.'},
  {q:'What PDF files can I rotate?',a:'The tool is designed for supported PDF files. Convert other file formats to PDF first when necessary.'},
];

export default function RotatePagesLandingPage() {
  return (
    <>
      <RotatePDFTool />
      <ToolLandingLayout
        toolName="Rotate PDF Pages Online"
        toolSlug="rotate-pdf"
        description="Rotate PDF pages online to fix sideways, upside-down, or incorrectly oriented documents. Choose the required angle and review the resulting PDF."
        heroImage="/tool-images/rotate-pdf-hero.png"
        mainContent={`Rotate PDF pages online when a document is difficult to read because one or more pages have the wrong orientation.

## Rotate PDF pages to fix orientation
Turn supported PDF pages by 90, 180, or 270 degrees to correct sideways or upside-down scans and documents. Rotation changes page direction rather than converting the PDF into another format.

## Rotate PDF pages for printing and sharing
Correct page orientation before printing, submitting, archiving, or sharing a document. This can be especially useful for scanned paperwork, camera-scanned pages, and PDFs assembled from sources with different orientations.

## Review the rotated PDF
After processing, check the pages carefully to make sure text, tables, images, signatures, and other important content are oriented correctly. Keep the original PDF when you may need it later.`}
        useCase={['Fixing sideways scanned PDF pages','Correcting upside-down document pages','Preparing PDFs for printing','Improving PDF reading on phones and tablets','Correcting camera-scanned pages','Preparing documents for submission','Organizing PDFs with incorrect page direction','Fixing orientation before sharing or archiving'].join('\n')}
        features={['90 degree page rotation','180 degree page rotation','270 degree page rotation','PDF orientation correction','Browser-based workflow','Mobile and desktop browser support','Processed PDF output','Simple upload and rotation workflow']}
        benefits={['Fix hard-to-read sideways pages','Correct upside-down PDF pages','Make documents easier to read','Prepare PDFs for printing and submission','Correct scanned document orientation','Keep the original PDF available for comparison']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[{name:'Rotate PDF',slug:'rotate-pdf'},{name:'Merge PDF',slug:'merge-pdf'},{name:'Split PDF',slug:'split-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'PDF to Word',slug:'pdf-to-word'},{name:'PDF to JPG',slug:'pdf-to-jpg'}]}
        primaryKeyword="rotate PDF pages online"
        secondaryKeywords={['rotate PDF online','rotate PDF','fix PDF orientation','rotate PDF page','fix sideways PDF','PDF page rotation']}
        howitworks={['1. Open Rotate PDF Pages Online and select a supported PDF.','2. Choose the required rotation angle: 90, 180, or 270 degrees.','3. Process the PDF and review the page orientation.','4. Download the rotated PDF after confirming the pages are positioned correctly.'].join('\n')}
        schema={{
          '@context':'https://schema.org',
          '@type':'SoftwareApplication',
          name:'Rotate PDF Pages Online',
          description:'Rotate supported PDF pages online to correct document orientation.',
          applicationCategory:'Utility',
          operatingSystem:'Web',
          url:'https://pdfilio.com/rotate-pages',
        }}
      />
    </>
  );
}
