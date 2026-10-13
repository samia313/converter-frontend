import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ImageToPDFTool from '@/components/tools/image-to-pdf-tool';

export const metadata: Metadata = {
  title: 'PNG to PDF Converter Online – Convert PNG Images',
  description: 'Convert PNG images to PDF online with PDFilio. Combine PNG files into a PDF for diagrams, screenshots, forms, and documents. Review the result before downloading.',
  keywords: ['PNG to PDF', 'PNG to PDF converter', 'convert PNG to PDF', 'PNG images to PDF', 'PNG files to PDF online'],
  alternates: { canonical: 'https://pdfilio.com/png-to-pdf' },
  openGraph: {
    title: 'PNG to PDF Converter Online – Convert PNG Images',
    description: 'Convert supported PNG images into PDF pages for sharing, printing, and document workflows.',
    url: 'https://pdfilio.com/png-to-pdf',
    type: 'website',
  },
};

export default function PngToPDFPage() {
  return (
    <>
      <ImageToPDFTool heading="PNG to PDF Converter" subtitle="Convert PNG images into PDF pages" />
      <ToolLandingLayout
        toolName="PNG to PDF"
        toolSlug="png-to-pdf"
        description="Convert supported PNG images into PDF pages for diagrams, screenshots, forms, and documents. Combine images and review the output before downloading."
        heroImage="/tool-images/image-to-pdf-hero.png"
        mainContent={`PNG to PDF converts supported PNG images into portable PDF documents. It is useful for combining screenshots, diagrams, charts, transparent graphics, forms, and image-based documents into a file that is easier to share or print.

When combining multiple images, review their order, orientation, page size, margins, and final readability. Image dimensions and source quality can affect how the resulting PDF looks and how large the final file becomes.

For important documents, keep the original image files until you have reviewed the PDF. If the source images contain sensitive information, follow your organization's privacy requirements and avoid uploading documents unless the service and workflow meet those requirements.`}
        useCase={[
          'Digitizing photographed paper documents',
          'Combining receipts and invoices into one PDF',
          'Turning handwritten notes into a PDF',
          'Creating photo-based PDF documents',
          'Organizing multiple image pages',
          'Preparing images for printing',
          'Archiving image-based records',
          'Sharing several images as one document',
        ].join('\n')}
        features={[
          'Convert supported image files to PDF',
          'Combine multiple images into one PDF',
          'Arrange images before conversion',
          'Useful page-size and layout workflow',
          'Browser-based image-to-PDF processing',
          'Suitable for mobile and desktop browsers',
          'PDF output for sharing and printing',
          'Related PDF conversion tools',
        ]}
        benefits={[
          'Turn image collections into one portable document',
          'Organize photographed paperwork into page order',
          'Prepare receipts and notes for sharing',
          'Create printable PDFs from supported images',
          'Keep related images together in one file',
          'Review the final PDF before distribution',
        ]}
        testimonials={[]}
        relatedTools={[
          { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        faqs={[
          { q: 'How do I convert an image to PDF?', a: 'Open PNG to PDF, upload supported image files, arrange them as needed, start the conversion, review the resulting PDF, and download it when ready.' },
          { q: 'Can I convert JPG to PDF?', a: 'Yes, JPG images are a common use case when the format is supported by the current conversion workflow.' },
          { q: 'Can I convert PNG to PDF?', a: 'Yes, supported PNG images can be converted into PDF pages.' },
          { q: 'Can I combine multiple images into one PDF?', a: 'Yes. Upload multiple supported images and arrange them in the desired order before creating the PDF.' },
          { q: 'Can I arrange the image order?', a: 'The workflow can allow image ordering before conversion. Review the page sequence before creating the final PDF.' },
          { q: 'Will image orientation be preserved?', a: 'Orientation depends on the source image and conversion workflow. Review portrait and landscape pages in the resulting PDF.' },
          { q: 'Can I convert photos of documents to PDF?', a: 'Yes. Photographing documents and combining the resulting images into a PDF is a common use case. Clear, well-lit source images generally produce better results.' },
          { q: 'Can I create a PDF from receipts?', a: 'Yes. Multiple receipt images can be organized into one PDF for easier sharing, review, or record keeping.' },
          { q: 'Will converting images to PDF reduce quality?', a: 'The result depends on the source resolution, page settings, and conversion process. Review the generated PDF before relying on it for printing or archival use.' },
          { q: 'Can I use PNG to PDF on a phone?', a: 'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'What image formats are supported?', a: 'Supported formats depend on the current tool configuration. Common formats such as JPG and PNG are intended for image-to-PDF workflows.' },
          { q: 'Should I keep my original images?', a: 'Yes. Keep the originals until you have checked the PDF for missing pages, incorrect orientation, unreadable text, or layout problems.' },
          { q: 'Is Image to PDF free?', a: 'PDFilio provides the online image-to-PDF workflow; current usage limits, account requirements, and available features depend on the product configuration shown in the interface.' },
        ]}
        primaryKeyword="PNG to PDF"
        secondaryKeywords={['convert PNG to PDF', 'PNG images to PDF', 'PNG files to PDF online', 'PNG converter']}
      />
    </>
  );
}
