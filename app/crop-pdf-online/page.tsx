import { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'
import CropPdfTool from '@/components/tools/crop-pdf-tool'

export const metadata: Metadata = {
  title: 'Crop PDF Online | Crop PDF Pages & Remove Margins | PDFilio',
  description: 'Crop PDF pages online by trimming visible margins. Adjust top, bottom, left, and right crop areas for cleaner documents, printing, and sharing.',
  keywords: ['crop PDF online','crop PDF pages','crop PDF','trim PDF pages','remove PDF margins','PDF cropper online','crop PDF document'],
  alternates: { canonical: 'https://pdfilio.com/crop-pdf-online' },
  openGraph: {
    title: 'Crop PDF Online | Crop PDF Pages & Remove Margins | PDFilio',
    description: 'Crop supported PDF pages by adjusting visible margins and page boundaries online.',
    url: 'https://pdfilio.com/crop-pdf-online',
    type: 'website',
  },
}

const faqs = [
  { q: 'How do I crop a PDF online?', a: 'Upload a supported PDF, set the top, bottom, left, and right crop margins, create the cropped PDF, and review the result.' },
  { q: 'Can I crop PDF pages to remove white margins?', a: 'Yes. Adjusting the crop margins can reduce excessive visible whitespace around page content.' },
  { q: 'Can I crop all PDF pages at once?', a: 'Yes. The current PDFilio workflow applies the selected crop margins to every page in the uploaded PDF.' },
  { q: 'Can I set different crop areas for different pages?', a: 'The current workflow applies one set of crop margins across the PDF rather than separate settings for individual pages.' },
  { q: 'What crop measurements can I change?', a: 'You can set the left, right, top, and bottom crop margins using the available PDF-point controls.' },
  { q: 'Will cropping change my original PDF?', a: 'No. The workflow creates a separate cropped PDF, allowing you to keep the original file separately.' },
  { q: 'Can I crop a PDF for printing?', a: 'Yes. Cropping can help create a cleaner visible page area before printing, but always check the final output and printer requirements.' },
  { q: 'Can I crop a scanned PDF?', a: 'Yes, supported scanned PDFs can be processed, although the exact result depends on the source document and crop settings.' },
  { q: 'Can I crop a PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported mobile browsers.' },
  { q: 'Does cropping remove PDF content outside the crop area?', a: 'The workflow changes the visible page area according to the selected crop margins. Review the output carefully if hidden or outside-area content matters to your use case.' },
  { q: 'What is the PDF upload limit?', a: 'The current PDFilio crop workflow supports PDFs up to the configured upload limit shown in the tool interface.' },
  { q: 'Should I review the cropped PDF before sharing?', a: 'Yes. Check page edges, text, images, tables, and other important content before printing or distributing the final PDF.' },
]

export default function CropPdfOnlineLandingPage() {
  return (
    <>
      <CropPdfTool />
      <ToolLandingLayout
        toolName="Crop PDF Online"
        toolSlug="crop-pdf"
        description="Crop supported PDF pages online by trimming visible margins and adjusting the page area. Create a cleaner PDF for printing, sharing, and document workflows."
        mainContent={`Crop PDF Online lets you trim visible PDF page margins by adjusting the top, bottom, left, and right crop areas. It is useful when a document has excessive whitespace, unwanted page margins, or a page frame that needs to be tightened.

The current workflow applies the selected crop margins across the PDF. This makes it useful for consistent documents such as reports, scanned materials, forms, presentations, and multi-page business files. Review the final document carefully to ensure that no important text, images, tables, signatures, or page content has been affected.

A typical workflow is simple: upload the PDF, set the crop margins, create the cropped output, inspect the page boundaries, and then use the result for printing, sharing, or further editing.`}
        useCase={['Remove excessive PDF margins','Trim scanned document pages','Improve page framing before printing','Prepare reports for cleaner presentation','Crop forms and business documents','Tighten page boundaries around visible content','Prepare PDFs for sharing or further editing','Apply consistent cropping across multi-page PDFs'].join('\n')}
        features={['Top, bottom, left, and right crop controls','PDF-point margin measurements','Apply crop settings across pages','Separate cropped PDF output','Browser-based workflow','Support for supported scanned PDFs','Desktop and mobile browser access','Review output before sharing or printing']}
        benefits={['Reduce excessive visible margins','Create cleaner page framing','Prepare documents for printing','Apply consistent crop settings','Keep the original PDF separately','Reduce manual document editing steps']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[
          {name:'Crop PDF',slug:'crop-pdf'},
          {name:'Remove Pages',slug:'remove-pages'},
          {name:'Rotate PDF',slug:'rotate-pdf'},
          {name:'Edit PDF',slug:'edit-pdf'},
          {name:'Organize PDF',slug:'organize-pdf'},
        ]}
        primaryKeyword="crop PDF online"
        secondaryKeywords={['crop PDF pages','crop PDF','trim PDF pages','remove PDF margins','PDF cropper online','crop PDF document']}
        howitworks={['1. Upload a supported PDF.','2. Set the top, bottom, left, and right crop margins.','3. Create the cropped PDF with the selected page-area settings.','4. Review page edges and important content before printing or sharing.'].join('\n')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Crop PDF Online',
          description: 'Crop supported PDF pages by adjusting visible page margins online.',
          applicationCategory: 'Utility',
          operatingSystem: 'Web',
          url: 'https://pdfilio.com/crop-pdf-online',
        }}
      />
    </>
  )
}
