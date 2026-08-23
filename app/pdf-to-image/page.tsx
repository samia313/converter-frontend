import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PdfToImageTool from '@/components/tools/pdf-to-image-tool';

export const metadata: Metadata = {
  title: 'PDF to Image Online – Convert PDF to JPG & PNG | PDFilio',
  description: 'Convert supported PDF pages to JPG, PNG or other available image formats online with PDFilio. Extract selected pages or convert a document for sharing, previews, web use and editing.',
  keywords: ['PDF to image', 'PDF to JPG', 'PDF to PNG', 'convert PDF to image', 'PDF page to image', 'PDF image converter'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-image' },
  openGraph: {
    title: 'PDF to Image Online – Convert PDF Pages to Images | PDFilio',
    description: 'Convert supported PDF pages into image files for sharing, previews, web use, editing and presentations.',
    url: 'https://pdfilio.com/pdf-to-image',
    type: 'website',
  },
};

export default function PDFToImagePage() {
  return (
    <>
      <PdfToImageTool />
      <ToolLandingLayout
        toolName="PDF to Image"
        toolSlug="pdf-to-image"
        description="Convert supported PDF pages into image files and prepare selected pages or complete documents for sharing, web use, presentations, or editing."
        heroImage="/tool-images/pdf-to-image-hero.png"
        mainContent={`PDF to Image turns supported PDF pages into image files. This can be useful when a page needs to be displayed as a visual preview, shared on a platform that expects an image, placed into a presentation, or opened in an image-editing workflow.

Choose the image format and quality settings that fit your purpose. JPG can be useful for compact photographic content, while PNG can be preferable when sharp text, diagrams, or transparency-related requirements matter. Higher resolution can improve readability but may also increase file size.

For important documents, review the generated images before publishing or printing. Check page order, text clarity, margins, graphics, signatures, and any content near the page edges. Keep the original PDF when you may need to regenerate images at a different resolution or format.`}
        useCase={[
          'Creating visual previews of PDF pages',
          'Sharing PDF pages as images',
          'Preparing pages for social platforms',
          'Adding PDF pages to presentations',
          'Editing page images in graphics software',
          'Creating web thumbnails',
          'Extracting selected pages as images',
          'Preparing visual document archives',
        ].join('\n')}
        features={[
          'Convert supported PDF pages to images',
          'JPG and PNG output workflows',
          'Select pages or convert a document',
          'Adjust available quality and resolution settings',
          'Useful output for web and presentations',
          'Browser-based PDF processing',
          'Mobile and desktop browser access',
          'Related PDF and image tools',
        ]}
        benefits={[
          'Share individual PDF pages as visual files',
          'Create previews and thumbnails',
          'Prepare pages for image-editing workflows',
          'Use PDF content in presentations',
          'Choose output settings for quality or size',
          'Review image output before distribution',
        ]}
        testimonials={[]}
        relatedTools={[
          { name: 'Image to PDF', slug: 'image-to-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        faqs={[
          { q: 'How do I convert PDF pages to images?', a: 'Open PDF to Image, upload a supported PDF, choose the available image format and page options, start the conversion, review the output, and download the resulting images.' },
          { q: 'Can I convert only selected PDF pages?', a: 'If page selection is available in the current workflow, you can choose the pages you need instead of converting the entire document.' },
          { q: 'Can I convert PDF to JPG?', a: 'Yes, JPG is a common output format for converting PDF pages into shareable image files when supported by the workflow.' },
          { q: 'Can I convert PDF to PNG?', a: 'Yes, supported PDF pages can be rendered as PNG images through the available conversion workflow.' },
          { q: 'Which is better, JPG or PNG?', a: 'JPG can be useful when smaller files are important, while PNG can be useful for sharp text, diagrams, or graphics. Choose based on the content and intended use.' },
          { q: 'Can I adjust image quality or resolution?', a: 'Available quality and resolution settings depend on the current tool configuration. Higher resolution generally improves detail while increasing output size.' },
          { q: 'Will the text remain readable?', a: 'Readability depends on the source PDF, page size, output resolution, and image format. Review text at the intended display or print size before distribution.' },
          { q: 'Can I use PDF pages as images in a presentation?', a: 'Yes. Converting individual pages to images can make it easier to place document pages into slides or other visual layouts.' },
          { q: 'Can I create web previews from a PDF?', a: 'Yes. PDF pages can be converted into images for thumbnails or visual previews when the output meets your website requirements.' },
          { q: 'Can I convert a PDF on my phone?', a: 'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Does converting a PDF to an image preserve links and form fields?', a: 'An image represents the visual appearance of a page. Interactive PDF features such as form fields, embedded links, and selectable text generally do not remain interactive in a raster image.' },
          { q: 'Should I keep the original PDF?', a: 'Yes. Keep the original PDF until you have checked the image output and confirmed that the resolution, page order, and visual content meet your needs.' },
          { q: 'Is PDF to Image free?', a: 'PDFilio provides the online PDF-to-image workflow; current usage limits, account requirements, and available features depend on the product configuration shown in the interface.' },
        ]}
        primaryKeyword="PDF to image"
        secondaryKeywords={['convert PDF to image', 'PDF to JPG', 'PDF to PNG', 'PDF page to image', 'PDF image converter']}
      />
    </>
  );
}
