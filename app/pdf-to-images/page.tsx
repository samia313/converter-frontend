import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToImagesTool from '@/components/tools/pdf-to-images-tool';

export const metadata: Metadata = {
  title: 'PDF to Images Converter Online – Convert PDF Pages to PNG | PDFilio',
  description: 'Convert PDF pages into PNG images online. Download individual page images as a ZIP for previews, design work, sharing, and image-based workflows.',
  keywords: ['PDF to images', 'PDF to PNG', 'convert PDF to images', 'PDF pages to PNG', 'PDF image converter'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-images' },
  openGraph: { title: 'PDF to Images Converter Online | PDFilio', description: 'Convert supported PDF pages into PNG images and download them as a ZIP.', url: 'https://pdfilio.com/pdf-to-images', type: 'website' },
};

export default function PDFToImagesPage() {
  return (
    <>
      <PDFToImagesTool />
      <ToolLandingLayout
        toolName="PDF to Images Converter"
        toolSlug="pdf-to-images"
        description="Convert supported PDF pages into PNG images for previews, sharing, design, presentations, and image-based workflows."
        heroImage="/tool-images/pdf-to-png-hero.png"
        mainContent={'PDF to Images Converter turns PDF pages into PNG images so individual pages can be reused in image-based workflows.\n\nCommon uses include document previews, design projects, presentations, website assets, and sharing individual pages. Each supported PDF page is rendered as a PNG image and the generated images can be downloaded together as a ZIP file.\n\nFor important documents, review the generated images before publishing or printing because image conversion changes the document from a PDF page into a static raster image.'}
        useCase={['Creating PNG images from PDF pages','Preparing document previews','Using PDF pages in design projects','Sharing individual PDF pages as images','Creating presentation assets','Preparing image-based uploads'].join('\n')}
        features={['PDF page to PNG conversion','Multiple-page image output','ZIP download for all generated images','100 MB upload limit','Browser-based workflow','Mobile and desktop browser support']}
        benefits={['Reuse PDF pages as images','Download all pages in one ZIP','Create previews without screenshots','Prepare pages for design and presentation workflows']}
        faqs={[
          { q: 'How do I convert a PDF to images?', a: 'Upload a supported PDF, start the conversion, then download the generated PNG images as a ZIP.' },
          { q: 'Does every PDF page become an image?', a: 'Supported PDF pages are rendered into PNG images. The number of generated images is reported after processing.' },
          { q: 'Can I convert a PDF to PNG online?', a: 'Yes. PDFilio provides a browser-based PDF-to-images workflow.' },
          { q: 'Can I download all images together?', a: 'Yes. The tool can package the generated PNG pages into a ZIP download.' },
          { q: 'Will links and form fields remain interactive?', a: 'No. PNG is a static image format, so interactive PDF features are not preserved.' },
          { q: 'Can I use the tool on my phone?', a: 'Yes. The browser-based workflow supports modern mobile and desktop browsers.' },
        ]}
        relatedTools={[{ name: 'PDF to JPG', slug: 'pdf-to-jpg' }, { name: 'PDF to PNG', slug: 'pdf-to-png' }, { name: 'Compress PDF', slug: 'compress-pdf' }, { name: 'Split PDF', slug: 'split-pdf' }]}
        primaryKeyword="PDF to images"
        secondaryKeywords={['PDF to PNG', 'convert PDF to images', 'PDF pages to PNG', 'PDF image converter']}
      />
    </>
  );
}
