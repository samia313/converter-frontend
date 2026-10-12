import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import JpgToPdfTool from '@/components/tools/jpg-to-pdf-tool';

export const metadata: Metadata = {
  title: { absolute: 'Free JPG to PDF Converter Online | PDFilio' },
  description: 'Convert JPG and JPEG images to PDF online for free. Combine photos, scans, receipts, and screenshots into one PDF for sharing, printing, or submission.',
  keywords: ['JPG to PDF', 'JPG to PDF converter', 'JPEG to PDF', 'convert JPG to PDF', 'JPG to PDF online', 'image to PDF', 'photos to PDF'],
  alternates: { canonical: 'https://pdfilio.com/jpg-to-pdf' },
  openGraph: {
    title: 'Free JPG to PDF Converter Online | PDFilio',
    description: 'Convert JPG and JPEG images to PDF online for free. Combine photos, scans, receipts, and screenshots into one PDF.',
    url: 'https://pdfilio.com/jpg-to-pdf',
    type: 'website',
  },
};

export default function JpgToPdfToolPage() {
  return (
    <>
      <JpgToPdfTool />
      <ToolLandingLayout
        toolName="JPG to PDF"
        toolSlug="jpg-to-pdf"
        description="Convert JPG and JPEG images into PDF documents online. Combine multiple images into one PDF for sharing, printing, archiving, or document workflows."
        heroImage="/tool-images/jpg-to-pdf-hero.png"
        mainContent={`Convert JPG and JPEG images into a PDF online with PDFilio. This tool is useful for combining photos, scanned pages, receipts, certificates, screenshots, forms, and other image-based documents into a single file for sharing, printing, or submission.

To create your PDF, select your JPG or JPEG files in the order you want them to appear, then choose Convert to PDF. The current interface lists images in selection order and does not offer drag-and-drop page reordering after selection. You can add multiple images, with a maximum of 30 images per conversion, up to 100 MB per image and 500 MB total.

Image dimensions and orientation affect how each page looks. After conversion, review the downloaded PDF to confirm that pages are in the intended order and that important details are readable before submitting or printing the document.`}
        useCase={[
          'Combining scanned pages into one PDF',
          'Turning receipts and invoices into PDF documents',
          'Creating PDFs from photos',
          'Converting screenshots into shareable documents',
          'Preparing certificates and application documents',
          'Collecting image-based study material',
          'Creating printable image documents',
          'Archiving groups of related images',
        ].join('\\n')}
        features={[
          'JPG and JPEG to PDF conversion',
          'Combine multiple images into one PDF',
          'Image-based document creation',
          'Browser-based workflow',
          'Support for common desktop and mobile browsers',
          'Useful for scanned pages and photos',
          'Simple upload and conversion process',
          'Downloadable PDF output',
        ]}
        benefits={[
          'Turn several images into one organized document',
          'Make image collections easier to share and print',
          'Reduce manual document assembly',
          'Create PDF versions of scanned pages and receipts',
          'Prepare images for common document workflows',
          'Keep related images together in a single file',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert JPG to PDF online?', a: 'Select supported JPG or JPEG images in the order you want them to appear, create the PDF, then review and download the generated file. The current interface does not provide drag-and-drop reordering after selection.' },
          { q: 'Can I convert JPEG to PDF?', a: 'Yes. JPG and JPEG images are supported input formats for the JPG to PDF workflow.' },
          { q: 'Can I combine multiple JPG images into one PDF?', a: 'Yes. Multiple supported images can be combined into a single PDF document.' },
          { q: 'Can I convert photos to PDF?', a: 'Yes. Photos saved as JPG or JPEG files can be converted into PDF documents.' },
          { q: 'Can I convert scanned pages to PDF?', a: 'Yes. If scanned pages are saved as JPG or JPEG images, they can be combined into a PDF.' },
          { q: 'Can I convert screenshots to PDF?', a: 'Yes. JPG or JPEG screenshots can be included in a PDF document.' },
          { q: 'Will image quality stay exactly the same?', a: 'Output quality can depend on the source image, dimensions, resolution, and conversion settings. Review the resulting PDF when image quality is important.' },
          { q: 'Can I change the order of images before creating the PDF?', a: 'The current interface does not provide drag-and-drop reordering after selection. Select or add the images in the order you want them to appear in the PDF.' },
          { q: 'How many JPG images can I convert at once?', a: 'You can convert up to 30 JPG or JPEG images at once. Each image can be up to 100 MB, with a combined upload limit of 500 MB.' },
          { q: 'Can I use JPG to PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate PDF application is required for the browser-based conversion workflow.' },
          { q: 'Is JPG to PDF free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'Can I print the PDF after conversion?', a: 'Yes. The generated PDF can be used with normal PDF viewing and printing workflows, subject to the output quality and your printer settings.' },
          { q: 'Can JPG to PDF create a PDF from receipts or certificates?', a: 'Yes. Receipts, certificates, forms, and similar image-based documents are common use cases for image-to-PDF conversion.' },
        ]}
        relatedTools={[
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        primaryKeyword="JPG to PDF"
        secondaryKeywords={['JPG to PDF converter', 'JPEG to PDF', 'convert JPG to PDF', 'JPG to PDF online', 'image to PDF', 'photos to PDF']}
      />
    </>
  );
}
