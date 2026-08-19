import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import RotatePDFTool from '@/components/tools/rotate-pdf-tool';

export const metadata: Metadata = {
  title: 'Rotate PDF Online – Rotate PDF Pages & Fix Orientation | PDFilio',
  description: 'Rotate supported PDF pages by 90, 180, or 270 degrees online. Fix sideways scans, mixed page orientation, and documents that need a different viewing direction.',
  keywords: ['rotate PDF', 'rotate PDF online', 'rotate PDF pages', 'fix PDF orientation', 'PDF page rotation', 'fix sideways PDF', 'PDF rotation tool'],
  alternates: { canonical: 'https://pdfilio.com/rotate-pdf' },
  openGraph: {
    title: 'Rotate PDF Online – Rotate PDF Pages & Fix Orientation | PDFilio',
    description: 'Rotate supported PDF pages by 90, 180, or 270 degrees to correct page orientation.',
    url: 'https://pdfilio.com/rotate-pdf',
    type: 'website',
  },
};

export default function RotatePDFPage() {
  return (
    <>
      <RotatePDFTool />
      <ToolLandingLayout
        toolName="Rotate PDF"
        toolSlug="rotate-pdf"
        description="Rotate supported PDF pages to correct orientation, fix sideways scans, and make mixed-orientation documents easier to read, share, and print."
        heroImage="/tool-images/rotate-pdf-hero.png"
        mainContent={`Rotate PDF helps you correct the orientation of supported PDF pages. This is useful when scanned pages appear sideways or upside down, when a document contains mixed page orientations, or when you need a different page direction for viewing or printing.

The tool supports 90, 180, and 270 degree rotation options. Rotation changes the page orientation rather than converting the document into another file format. The final result can depend on the source PDF and the current processing workflow, so review important documents after processing.

Typical workflow: upload a supported PDF, choose the required rotation angle, process the file, review the page orientation, and download the resulting PDF. Keep the original file when you may need to compare or restore the original orientation.`}
        useCase={[
          'Fixing sideways scanned documents',
          'Correcting upside-down PDF pages',
          'Organizing mixed-orientation documents',
          'Preparing PDFs for printing',
          'Improving PDF viewing on phones and tablets',
          'Correcting camera-scanned pages saved as PDF',
          'Preparing documents for sharing and submission',
          'Adjusting page direction for reading workflows',
        ].join('\n')}
        features={[
          '90 degree page rotation',
          '180 degree page rotation',
          '270 degree page rotation',
          'PDF orientation correction',
          'Browser-based workflow',
          'Desktop and mobile browser support',
          'PDF output after processing',
          'Simple upload and rotation workflow',
        ]}
        benefits={[
          'Fix hard-to-read sideways or upside-down pages',
          'Make mixed-orientation PDFs easier to view',
          'Prepare documents for printing and submission',
          'Avoid manually rebuilding a document just to correct orientation',
          'Improve consistency when sharing scanned documents',
          'Correct page direction before other PDF workflows',
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
        ]}
        faqs={[
          { q: 'How do I rotate a PDF online?', a: 'Upload a supported PDF, choose the required rotation angle, process the file, review the result, and download the rotated PDF.' },
          { q: 'What rotation angles are available?', a: 'The current Rotate PDF workflow supports 90, 180, and 270 degree rotation options.' },
          { q: 'Can I rotate a sideways PDF?', a: 'Yes. Rotating a sideways page by the appropriate angle can correct its viewing orientation.' },
          { q: 'Can I rotate an upside-down PDF?', a: 'Yes. A 180 degree rotation can correct pages that are upside down when that is the appropriate orientation.' },
          { q: 'Will rotating a PDF change its content?', a: 'Rotation is intended to change page orientation rather than rewrite the document content. Review the output for important files.' },
          { q: 'Will PDF quality decrease after rotation?', a: 'Rotation itself does not require intentionally reducing image quality, but the generated output depends on the source PDF and processing workflow.' },
          { q: 'Can I rotate PDF pages on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate PDF rotation application is required for the browser-based workflow.' },
          { q: 'Can I rotate scanned PDF pages?', a: 'Yes. Rotating scanned pages can be useful when a scanner or camera produced pages in the wrong orientation.' },
          { q: 'Can I rotate a PDF before printing?', a: 'Yes. Correcting page orientation before printing can make the document easier to read and reduce orientation problems.' },
          { q: 'Can I rotate a mixed-orientation PDF?', a: 'The usefulness of rotation depends on the controls available in the current tool interface and the page structure of the PDF. Review the resulting pages before sharing.' },
          { q: 'What file format can I rotate?', a: 'The Rotate PDF tool accepts supported PDF files. Convert other document or image formats to PDF first if needed.' },
          { q: 'Is Rotate PDF free?', a: 'PDFilio provides the online rotation tool; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
        ]}
        primaryKeyword="rotate PDF"
        secondaryKeywords={['rotate PDF online', 'rotate PDF pages', 'fix PDF orientation', 'PDF page rotation', 'fix sideways PDF', 'PDF rotation tool']}
      />
    </>
  );
}
