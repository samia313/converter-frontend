import { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'
import CropPdfTool from '@/components/tools/crop-pdf-tool'

export const metadata: Metadata = {
  title: 'Crop PDF Online – Trim PDF Pages and Margins | PDFilio',
  description: 'Crop PDF pages online by trimming visible margins. Apply precise crop margins to create a cleaner PDF for printing, sharing, and editing.',
  keywords: ['crop PDF', 'crop PDF online', 'trim PDF pages', 'crop PDF pages', 'remove PDF margins'],
  alternates: { canonical: 'https://pdfilio.com/crop-pdf' },
  openGraph: { title: 'Crop PDF Online – Trim PDF Pages and Margins | PDFilio', description: 'Trim visible PDF page margins with precise crop measurements.', url: 'https://pdfilio.com/crop-pdf', type: 'website' },
}

export default function CropPdfToolPage() {
  return <>
    <CropPdfTool />
    <ToolLandingLayout
      toolName="Crop PDF"
      toolSlug="crop-pdf"
      description="Trim visible PDF page margins with precise crop measurements and create a cleaner PDF."
      mainContent="Crop PDF lets you adjust the visible page area by setting left, right, top, and bottom crop margins. The crop is applied to every page, while the original PDF remains unchanged."
      features={['Precise crop margins in PDF points','Apply the same crop to every page','100 MB upload limit','Creates a separate PDF output','Browser-based workflow','Mobile and desktop support']}
      benefits={['Remove excessive visible margins','Improve page framing','Prepare documents for cleaner printing','Create a more compact visible page area']}
      relatedTools={[{name:'Organize PDF',slug:'organize-pdf'},{name:'Remove Pages',slug:'remove-pages'},{name:'Rotate PDF',slug:'rotate-pdf'},{name:'Edit PDF',slug:'edit-pdf'}]}
      faqs={[
        {q:'How do I crop a PDF?',a:'Upload a PDF, enter the left, right, top, and bottom margins in points, then select Crop PDF.'},
        {q:'Can I remove white margins from a PDF?',a:'Yes. Crop margins can reduce the visible white space around page content.'},
        {q:'Are the same crop margins applied to every page?',a:'Yes. The current workflow applies the entered margins to every page.'},
        {q:'Does cropping delete the original PDF?',a:'No. PDFilio creates a separate cropped PDF and leaves the uploaded file unchanged.'},
        {q:'What is the upload limit?',a:'The current upload limit is 100 MB per PDF.'},
      ]}
      primaryKeyword="crop PDF"
      secondaryKeywords={['crop PDF online','trim PDF pages','crop PDF pages','remove PDF margins']}
    />
  </>
}