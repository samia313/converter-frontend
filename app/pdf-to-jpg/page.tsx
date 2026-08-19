import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToJpgTool from '@/components/tools/pdf-to-jpg-tool';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter Online – Convert PDF Pages to JPG | PDFilio',
  description: 'Convert supported PDF pages to JPG images online for presentations, previews, sharing, websites, and design workflows. Use a browser-based PDF to JPG converter.',
  keywords: ['PDF to JPG', 'PDF to JPG converter', 'convert PDF to JPG', 'PDF pages to images', 'PDF to image', 'PDF JPG converter'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-jpg' },
  openGraph: {
    title: 'PDF to JPG Converter Online | PDFilio',
    description: 'Convert supported PDF pages into JPG images for sharing, previews, presentations, and design workflows.',
    url: 'https://pdfilio.com/pdf-to-jpg',
    type: 'website',
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
        mainContent={`PDF to JPG Converter turns supported PDF pages into JPG images that are easier to preview, share, upload, and use in image-based workflows. It is useful when a document page needs to be used as an image instead of remaining in PDF format.

Common uses include presentation slides, document previews, websites, design projects, social media assets, reports, forms, and image-based uploads. Output quality and processing time can vary with page size, embedded images, fonts, transparency, and the structure of the source PDF.

Typical workflow: upload a supported PDF, start the conversion, review the generated JPG images, and download the output. For important documents, check the images before publishing or printing to make sure text and visual details are clear.`}
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
