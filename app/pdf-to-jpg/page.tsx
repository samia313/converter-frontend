import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToJpgTool from '@/components/tools/pdf-to-jpg-tool';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter Online – Convert PDF to JPG',
  description: 'Convert PDF pages to JPG images online. Create JPG files from supported PDF pages for sharing, previews, websites, presentations, and design workflows.',
  keywords: ['PDF to JPG', 'PDF to JPG converter', 'convert PDF to JPG', 'PDF pages to images', 'PDF to image', 'PDF JPG converter'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-jpg' },
  openGraph: {
    title: 'PDF to JPG Converter Online – Convert PDF to JPG',
    description: 'Convert supported PDF pages into JPG images for sharing, previews, presentations, and design workflows.',
    url: 'https://pdfilio.com/pdf-to-jpg',
    type: 'website',
    images: [{ url: 'https://pdfilio.com/tool-images/pdf-to-jpg-hero.png', alt: 'PDF to JPG Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to JPG Converter Online – Convert PDF to JPG | PDFilio',
    description: 'Convert PDF pages to JPG images online for previews, presentations, websites, and design workflows. Review your images before sharing or publishing.',
    images: ['https://pdfilio.com/tool-images/pdf-to-jpg-hero.png'],
  },
};

export default function PDFToJpgToolPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to JPG Converter',
    description: 'Convert supported PDF pages into JPG images.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <PDFToJpgTool />
      <ToolLandingLayout
        toolName="PDF to JPG Converter"
        toolSlug="pdf-to-jpg"
        description="Convert supported PDF pages into JPG images for previews, presentations, sharing, websites, and design workflows."
        heroImage="/tool-images/pdf-to-jpg-hero.png"
        mainContent={`## Convert PDF Pages to JPG Online

Use PDFilio to turn supported PDF pages into JPG images when you need a visual copy for sharing, presentations, website previews, forms, reports, or design projects. Upload a PDF, start the conversion, then review and download the generated image output.

## When to Use JPG Images from a PDF

JPG files are widely accepted by websites, presentation tools, messaging apps, and image editors. Converting pages to JPG can be useful when a service accepts image uploads but does not accept PDFs, or when you want to share a page as a static visual.

## What Happens to Text, Links, and Formatting?

A JPG is a raster image, not an editable PDF document. Text in the output is not selectable, and interactive PDF features such as hyperlinks, form fields, bookmarks, and embedded actions do not remain interactive. Visual results can vary with the original page size, fonts, transparency, images, and rendering settings.

## JPG Quality and File Size

JPG uses lossy image compression, so fine text, small details, and sharp edges may look different from the original PDF. Review the output at the size you plan to use, especially before printing or publishing. If your workflow needs a lossless image format for diagrams or text-heavy pages, compare the PDF to PNG option.

## How to Convert PDF to JPG

1. Open the PDF to JPG converter and upload a supported PDF.
2. Start conversion and wait for the tool to process the document.
3. Preview the generated JPG images and check that the pages look correct.
4. Download the output and use it in your intended workflow.

For scanned PDFs, conversion creates an image of the scanned page; OCR is not needed unless you also want to extract searchable text.`}
        useCase={[
          'Creating JPG images from PDF pages',
          'Preparing document pages for presentations',
          'Creating image previews for websites',
          'Sharing selected document pages as images',
          'Using PDF pages in design projects',
          'Preparing image-based uploads',
          'Converting reports and forms into image files',
          'Creating visual references from PDF documents',
        ].join('\n')}
        features={[
          'PDF page to JPG conversion',
          'Image output for supported PDF pages',
          'Browser-based workflow',
          'Simple upload and conversion process',
          'Downloadable JPG output',
          'Desktop and mobile browser support',
          'Useful for previews and design workflows',
          'No separate converter application required',
        ]}
        benefits={[
          'Turn PDF pages into easy-to-share images',
          'Reuse document pages in image-based workflows',
          'Prepare previews for websites and presentations',
          'Reduce manual screenshot work',
          'Access conversion from a modern browser',
          'Create JPG copies without editing the original PDF',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert PDF to JPG?', a: 'Upload a supported PDF, start the conversion, then review and download the resulting JPG images.' },
          { q: 'Does each PDF page become a JPG?', a: 'The converter processes supported PDF pages into JPG image output. The exact output structure depends on the current tool workflow.' },
          { q: 'Can I convert a PDF to JPG online?', a: 'Yes. PDFilio provides a browser-based PDF to JPG conversion workflow.' },
          { q: 'Can I use PDF to JPG on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones and tablets as well as desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate desktop converter is required for the online workflow.' },
          { q: 'Will JPG quality be identical to the original PDF?', a: 'JPG is an image format, so conversion can change how text, images, transparency, and other PDF features are represented. Review important output before use.' },
          { q: 'Can I convert a scanned PDF to JPG?', a: 'Yes, supported scanned PDFs can be converted page-by-page because the scan is already represented as page content. The resulting JPG quality depends on the source scan and processing.' },
          { q: 'Can I convert a PDF for a presentation?', a: 'Yes. JPG images can be convenient for presentation software that accepts image files.' },
          { q: 'Can I use PDF pages as website images?', a: 'Yes. JPG output can be useful for previews and image-based website content, subject to your own image-quality and file-size requirements.' },
          { q: 'Can I convert a PDF report to JPG?', a: 'Yes. Supported report pages can be converted to JPG images for previews, sharing, or other image-based workflows.' },
          { q: 'Does PDF to JPG preserve links and interactive PDF features?', a: 'No. JPG is a static image format, so interactive PDF elements such as clickable links, form fields, and embedded actions are not preserved as interactive features.' },
          { q: 'Can I edit the JPG after conversion?', a: 'Yes. Once downloaded, JPG images can be edited with compatible image-editing software or online design tools.' },
          { q: 'Is PDF to JPG free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
        ]}
        relatedTools={[
          { name: 'PDF to PNG', slug: 'pdf-to-png' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        primaryKeyword="PDF to JPG"
        secondaryKeywords={['PDF to JPG converter', 'convert PDF to JPG', 'PDF pages to images', 'PDF to image', 'PDF JPG converter']}
        schema={schema}
      />
    </>
  );
}
