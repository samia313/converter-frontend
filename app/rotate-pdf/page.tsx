import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import RotatePDFTool from '@/components/tools/rotate-pdf-tool';

export const metadata: Metadata = {
  title: 'Rotate PDF - Fix Page Orientation | PDFilio',
  description: 'Rotate PDF pages 90, 180, or 270 degrees. Fix scanned documents, adjust page orientation, and save with correct rotation. Fast and secure.',
  keywords: ['rotate PDF', 'fix PDF orientation', 'PDF page rotation', 'rotate PDF pages'],
  alternates: { canonical: 'https://pdfilio.com/rotate-pdf' },
};

export default function RotatePDFPage() {
  return (
    <>
      <RotatePDFTool />
      <ToolLandingLayout
        toolName="Rotate PDF"
        toolSlug="rotate-pdf"
        description="Rotate PDF pages to fix orientation and adjust page direction. Correct scanned documents and fix sideways pages with precise rotation controls."
        heroImage="/tool-images/rotate-pdf-hero.png"
        mainContent={`Rotate PDF helps you fix page orientation issues in your PDF files. Whether you have scanned documents that are sideways, need to adjust page direction, or want to correct improperly oriented pages, our tool makes it simple.

Rotate PDF pages by 90, 180, or 270 degrees. Perfect for fixing scanned documents from multi-function printers, organizing mixed-orientation PDFs, and preparing documents for professional use.

Rotation is designed to preserve the existing PDF content and formatting. Upload a PDF, choose a rotation angle, and process the file without registration.`}
        useCase={`Fixing scanned documents that came out sideways from the scanner
Correcting portrait-oriented pages in landscape documents
Preparing documents for professional printing
Organizing mixed-orientation PDFs into a consistent format
Adjusting page orientation for eBook readers
Preparing documents for tablet or mobile viewing
Correcting camera scan photos converted to PDF`}
        features={[
        'Rotate by 90, 180, or 270 degrees',
        'Simple PDF rotation controls',
        'Preserve existing PDF content and formatting',
        'Fast browser-based processing',
        'Works on desktop and mobile browsers',
      ]}
        benefits={[
        'Fix improperly scanned documents',
        'Improve document readability',
        'Save time on manual corrections',
        'Maintain consistent page orientation',
        'Better mobile viewing',
        'Easy document organization',
        'Prepare documents for printing',
      ]}
        relatedTools={[
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
        faqs={[
        {
          q: 'How do I rotate PDF pages?',
          a: 'Upload your PDF, select a rotation angle (90, 180, or 270 degrees), and start the rotation. You can then download the processed PDF.',
        },
        {
          q: 'What rotation angles are available?',
          a: 'The Rotate PDF tool provides 90, 180, and 270 degree rotation options.',
        },
        {
          q: 'Will rotating affect the PDF quality?',
          a: 'Rotation changes page orientation without intentionally changing the PDF content. The resulting file is generated from your uploaded PDF.',
        },
        {
          q: 'Do I need software or an account to rotate PDFs?',
          a: 'No account or desktop software is required to use the browser-based tool.',
        },
        {
          q: 'Works on mobile phones?',
          a: 'Yes. The Rotate PDF interface is designed to work in modern desktop and mobile browsers.',
        },
        {
          q: 'What file formats can I rotate?',
          a: 'Rotate PDF accepts standard PDF files (.pdf). Other formats can be converted to PDF first using the relevant PDFilio conversion tool.',
        },
      ]}
        primaryKeyword="rotate PDF"
        secondaryKeywords={['fix PDF orientation', 'rotate PDF pages', 'PDF page rotation', 'fix sideways PDF']}
      />
    </>
  );
}
