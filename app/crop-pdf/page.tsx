import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import CropPdfTool from '@/components/tools/crop-pdf-tool';

export const metadata: Metadata = {
  title: 'Crop PDF Online – Trim PDF Pages and Margins | PDFilio',
  description: 'Crop PDF pages online to remove unwanted margins or adjust the visible page area. Prepare cleaner PDFs for printing, sharing, and document workflows.',
  keywords: ['crop PDF', 'crop PDF online', 'trim PDF pages', 'crop PDF pages', 'remove PDF margins', 'PDF page cropper'],
  alternates: { canonical: 'https://pdfilio.com/crop-pdf' },
  openGraph: {
    title: 'Crop PDF Online – Trim PDF Pages | PDFilio',
    description: 'Crop supported PDF pages to remove unwanted margins and adjust the visible page area.',
    url: 'https://pdfilio.com/crop-pdf',
    type: 'website',
  },
};

export default function CropPdfToolPage() {
  return (
    <>
      <CropPdfTool />
      <ToolLandingLayout
        toolName="Crop PDF"
        toolSlug="crop-pdf"
        description="Crop supported PDF pages to remove unwanted margins and create a cleaner page area for printing, sharing, or further editing."
        heroImage="/tool-images/crop-pdf-hero.png"
        mainContent={`Crop PDF lets you adjust the visible page area of a supported PDF. Cropping can help remove excessive white space, trim unwanted margins, improve page framing, or prepare a document for a cleaner print and presentation layout.

Cropping changes the page view area rather than automatically rewriting the original document content. Content outside the selected crop area may remain part of the PDF even when it is no longer visible in the normal page view. Always review the result before distributing a sensitive or important document.

For consistent results, check every page after cropping, especially PDFs with different page sizes, scanned documents, forms, annotations, or important headers and footers. Keep an original copy when you may need to restore the previous page boundaries.`}
        useCase={`Removing excessive PDF margins
Trimming white space around scanned pages
Preparing PDFs for cleaner printing
Improving page framing for presentations
Standardizing visible page areas
Preparing documents for further editing
Cleaning up scanned document layouts
Creating a more compact visual page area`}
        features={[
          'PDF page cropping workflow',
          'Adjustable visible page area',
          'Useful for margins and white space',
          'PDF output after processing',
          'Browser-based workflow',
          'Mobile and desktop browser support',
          'Reviewable cropped document',
          'Related PDF editing tools',
        ]}
        benefits={[
          'Remove unwanted visible margins',
          'Improve page framing and presentation',
          'Prepare scanned pages for cleaner printing',
          'Standardize page appearance where appropriate',
          'Reduce distracting white space around content',
          'Review the result before sharing or publishing',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I crop a PDF online?', a: 'Open Crop PDF, upload a supported PDF, choose the desired crop area using the available controls, process the document, and review the resulting pages.' },
          { q: 'Can I crop all pages of a PDF?', a: 'The available cropping controls determine whether the same crop can be applied to multiple pages. Review the final document because page sizes and layouts can differ.' },
          { q: 'Can I crop just one PDF page?', a: 'If the current workflow provides page-level cropping, you can select the applicable page and adjust its visible area.' },
          { q: 'Does cropping delete content from a PDF?', a: 'Cropping changes the visible page area. Content outside the crop boundary may still exist in the document depending on the PDF structure and how it is processed.' },
          { q: 'Can I remove white margins from a scanned PDF?', a: 'Yes, cropping is commonly used to reduce visible white margins around scanned pages. Check each page after processing.' },
          { q: 'Will cropping change my PDF quality?', a: 'Cropping normally changes page boundaries rather than intentionally reducing image resolution. The final output should still be reviewed for layout and rendering quality.' },
          { q: 'Can I crop a PDF on my phone?', a: 'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Why do different pages need different crop areas?', a: 'Scanned or mixed-size PDFs can contain pages with different margins, orientations, or content positions. A single crop setting may not fit every page.' },
          { q: 'Can I crop a PDF for printing?', a: 'Yes. Cropping can help remove excessive margins and improve the visible page framing before printing, but always check the printer page size and margins.' },
          { q: 'Will links, forms, and annotations remain after cropping?', a: 'Their behavior depends on the PDF structure and processing workflow. Test important interactive elements after cropping.' },
          { q: 'Should I keep the original PDF before cropping?', a: 'Yes. Keep an original copy when the source document is important or you may need to restore the previous page boundaries.' },
          { q: 'Is Crop PDF free?', a: 'PDFilio provides the online cropping workflow; current usage limits, account requirements, and available features depend on the product configuration shown in the interface.' },
          { q: 'Is my PDF automatically deleted after cropping?', a: 'Do not rely on an automatic deletion claim unless the current PDFilio privacy and processing policy explicitly states it. For sensitive documents, review the service policy before uploading.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Edit PDF', slug: 'edit-pdf' },
          { name: 'Watermark PDF', slug: 'watermark-pdf' },
        ]}
        primaryKeyword="crop PDF"
        secondaryKeywords={['crop PDF online', 'trim PDF pages', 'crop PDF pages', 'remove PDF margins', 'PDF page cropper']}
      />
    </>
  );
}
