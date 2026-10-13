import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToPngTool from '@/components/tools/pdf-to-png-tool';

export const metadata: Metadata = {
  title: 'PDF to PNG Converter Online – Convert PDF to PNG',
  description: 'Convert PDF pages to PNG images online. Create PNG files from supported PDF pages for transparent graphics, presentations, websites, previews, design work, and sharing.',
  keywords: ['PDF to PNG', 'PDF to PNG converter', 'convert PDF to PNG', 'PDF pages to PNG', 'PDF to image', 'PDF PNG converter', 'PDF to PNG online'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-png' },
  openGraph: {
    title: 'PDF to PNG Converter Online – Convert PDF to PNG',
    description: 'Convert supported PDF pages into PNG images for previews, presentations, design and sharing.',
    url: 'https://pdfilio.com/pdf-to-png',
    type: 'website',
    images: [{ url: 'https://pdfilio.com/tool-images/pdf-to-png-hero.png', alt: 'PDF to PNG Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to PNG Converter Online – Convert PDF to PNG | PDFilio',
    description: 'Convert PDF pages to PNG images for text, diagrams, presentations, websites, and design workflows. Review image dimensions and quality before use.',
    images: ['https://pdfilio.com/tool-images/pdf-to-png-hero.png'],
  },
};

export default function PDFToPngToolPage() {
  return (
    <>
      <PDFToPngTool />
      <ToolLandingLayout
        toolName="PDF to PNG"
        toolSlug="pdf-to-png"
        description="Convert supported PDF pages into PNG images for presentations, previews, websites, design workflows, sharing, and image-based document use."
        heroImage="/tool-images/pdf-to-png-hero.png"
        mainContent={`## Convert PDF Pages to PNG Online

PDFilio converts supported PDF pages into PNG images for presentations, website previews, diagrams, document screenshots, design projects, and other image-based workflows. Upload a supported PDF, start the conversion, then review and download the resulting image files.

## When PNG Is Useful for PDF Pages

PNG uses lossless image compression and can be a useful choice for text-heavy pages, diagrams, screenshots, charts, and graphics where crisp edges matter. The resulting image dimensions and visual quality depend on the source PDF and the converter's rendering settings.

## Text, Links, and Other PDF Features

A PNG is a static image, not an editable PDF. Text rendered into the image is not selectable, and links, form fields, bookmarks, and other interactive PDF features do not remain interactive. If you need searchable text from a scanned document, use an OCR workflow rather than relying on image conversion alone.

## PNG vs JPG: Which Should You Choose?

PNG can be preferable for diagrams, screenshots, and text-heavy pages where lossless compression is useful. JPG may be a better fit when smaller image files are more important. Compare the output with your intended use in mind; neither format preserves the original PDF's interactive behavior.

## How to Convert PDF to PNG

1. Open the PDF to PNG converter and upload a supported PDF.
2. Start conversion and wait for the tool to process the pages.
3. Review the generated images for readability, dimensions, and visual details.
4. Download the PNG output and use it in your intended workflow.

Scanned PDF pages can be rendered to PNG without OCR when your goal is an image copy. OCR is needed only when you want to extract text from the scan.`}
        useCase={[
          'Creating presentation images from PDF pages',
          'Preparing PDF page previews',
          'Using document pages in graphic design projects',
          'Sharing PDF pages as images',
          'Creating website or blog visuals from PDF content',
          'Extracting charts and diagrams as image files',
          'Preparing screenshots and visual references',
          'Creating image-based copies of supported document pages',
        ].join('\n')}
        features={[
          'PDF page to PNG conversion',
          'PNG image output',
          'Image rendering from supported PDF pages',
          'Browser-based workflow',
          'Useful for text, diagrams, and graphics',
          'Mobile and desktop browser support',
          'Downloadable PNG output',
          'Simple PDF-to-image workflow',
        ]}
        benefits={[
          'Turn PDF pages into commonly used image files',
          'Reuse document visuals in presentations and designs',
          'Create easy-to-share page previews',
          'Use PDF content in image-based workflows',
          'Extract visual document pages without manually taking screenshots',
          'Prepare graphics and diagrams for other applications',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert PDF to PNG online?', a: 'Upload a supported PDF, process the document with the PDF to PNG tool, review the generated image output, and download the PNG file or files.' },
          { q: 'Can I convert PDF pages to PNG images?', a: 'Yes. Supported PDF pages can be rendered as PNG images through the PDF-to-image workflow.' },
          { q: 'Why convert a PDF to PNG?', a: 'PNG output is useful when you need a document page as an image for presentations, previews, websites, design work, sharing, or other image-based workflows.' },
          { q: 'Will the text remain selectable after PDF to PNG conversion?', a: 'No. PNG is an image format, so text rendered into the image is not preserved as selectable PDF text.' },
          { q: 'Are PDF links and form fields preserved?', a: 'Interactive PDF elements such as links and form fields are not interactive inside a PNG image.' },
          { q: 'Will the original PDF formatting look the same?', a: 'The goal is to render the page visually, but the final image depends on the source PDF and rendering settings. Review important outputs.' },
          { q: 'What resolution will the PNG have?', a: 'Output dimensions depend on the PDF page and the current rendering settings of the converter. Do not assume one fixed resolution for every file.' },
          { q: 'Can I convert a scanned PDF to PNG?', a: 'Yes. A scanned PDF can be rendered as PNG because the page itself can be converted to an image. OCR is not required when your goal is simply to create a page image.' },
          { q: 'Can I convert PDF charts and diagrams to PNG?', a: 'Yes. Charts, diagrams, screenshots, and other visual page content can be rendered into PNG images when supported by the source PDF.' },
          { q: 'Can I use PDF to PNG on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate PDF-to-image application is required for the browser-based workflow.' },
          { q: 'Is PDF to PNG free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'Is PNG better than JPG for PDF pages?', a: 'It depends on the content. PNG can be useful for text, diagrams, screenshots, and graphics where lossless image compression is desirable, while JPG can be more suitable when smaller image files are the priority.' },
        ]}
        relatedTools={[
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
          { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        primaryKeyword="PDF to PNG"
        secondaryKeywords={['PDF to PNG converter', 'convert PDF to PNG', 'PDF pages to PNG', 'PDF to image', 'PDF PNG converter', 'PDF to PNG online']}
      />
    </>
  );
}
