import { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'
import PageNumbersTool from '@/components/tools/page-numbers-tool'

export const metadata: Metadata = {
  title: 'Page Numbers for PDF Online | Add Page Numbers to PDF | PDFilio',
  description: 'Add page numbers to PDF files online. Number PDF pages with a custom starting number, font size, and position for reports, books, forms, and documents.',
  keywords: ['page numbers for PDF','add page numbers to PDF online','PDF page numbering','number PDF pages','add page numbers to PDF','PDF page number generator'],
  alternates: { canonical: 'https://pdfilio.com/page-numbers-online' },
  openGraph: {
    title: 'Page Numbers for PDF Online | Add Page Numbers to PDF | PDFilio',
    description: 'Add sequential page numbers to supported PDF files with position, starting number, and font-size controls.',
    url: 'https://pdfilio.com/page-numbers-online',
    type: 'website',
  },
}

const faqs = [
  { q: 'How do I add page numbers to a PDF online?', a: 'Upload a supported PDF, choose the starting number, font size, and page position, then create the numbered PDF.' },
  { q: 'Can I choose where the page numbers appear?', a: 'Yes. The current workflow provides multiple page-number positions, including top and bottom alignment options.' },
  { q: 'Can I start PDF numbering from a different number?', a: 'Yes. You can choose a custom starting number for the PDF page sequence.' },
  { q: 'Can I add page numbers to a long PDF?', a: 'Yes. The tool is designed to add sequential numbering across supported PDF pages.' },
  { q: 'Can I change the page number font size?', a: 'Yes. The current tool provides a font-size control for the page numbers.' },
  { q: 'Will adding page numbers remove existing PDF content?', a: 'No. Page numbers are added as text over the existing page content.' },
  { q: 'Can I number a PDF for printing?', a: 'Yes. Page numbers can make printed reports, manuals, books, and other multi-page documents easier to reference.' },
  { q: 'Can I add page numbers to reports?', a: 'Yes. Page numbering is useful for reports, proposals, research documents, and other structured PDFs.' },
  { q: 'Can I keep my original PDF?', a: 'Yes. Keep a copy of your original PDF if you may need an unnumbered version later.' },
  { q: 'Can I add page numbers to a PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported mobile browsers.' },
  { q: 'Does page numbering change the original page layout?', a: 'The page number is added to the page. Review the final PDF to confirm its position does not interfere with important content.' },
  { q: 'Should I review the numbered PDF before sharing?', a: 'Yes. Check the starting number, sequence, position, size, and readability before printing or sharing the final document.' },
]

export default function PageNumbersOnlineLandingPage() {
  return (
    <>
      <PageNumbersTool />
      <ToolLandingLayout
        toolName="Page Numbers for PDF Online"
        toolSlug="page-numbers"
        description="Add sequential page numbers to supported PDF files online. Choose the starting number, font size, and page position for reports, books, forms, and other documents."
        mainContent={`Page Numbers for PDF Online helps you add sequential numbering to supported PDF documents. Page numbers make longer reports, manuals, books, research documents, forms, and business files easier to reference and organize.

Choose a starting number and adjust the available page-number settings before creating the numbered PDF. The workflow adds page numbers to the existing document, so review the final output to make sure the numbering is readable and does not interfere with important content.

A typical workflow is simple: upload the PDF, choose the starting number and appearance settings, select the page-number position, create the result, and review the numbered PDF before printing or sharing.`}
        useCase={['Number business reports and proposals','Add page numbers to research papers','Prepare books and manuals for distribution','Number forms and multi-page documents','Organize educational and training PDFs','Prepare documents for printing','Make long PDFs easier to reference','Add sequential numbers to working documents'].join('\n')}
        features={['Sequential PDF page numbering','Custom starting number','Multiple page-number positions','Adjustable font size','Separate numbered PDF output','Browser-based workflow','Works with supported PDF documents','Review result before sharing or printing']}
        benefits={['Make long documents easier to navigate','Create consistent page references','Prepare PDFs for printing and submission','Control the starting number and placement','Keep the original PDF available separately','Reduce manual page-numbering work']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[
          {name:'Add Page Numbers to PDF',slug:'page-numbers'},
          {name:'Organize PDF',slug:'organize-pdf'},
          {name:'Merge PDF',slug:'merge-pdf'},
          {name:'Edit PDF',slug:'edit-pdf'},
          {name:'Watermark PDF',slug:'watermark-pdf'},
        ]}
        primaryKeyword="page numbers for PDF"
        secondaryKeywords={['add page numbers to PDF online','PDF page numbering','number PDF pages','add page numbers to PDF','PDF page number generator']}
        howitworks={['1. Upload a supported PDF.','2. Choose the starting page number and font size.','3. Select the available page-number position.','4. Create the numbered PDF and review the sequence and placement before sharing or printing.'].join('\n')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Page Numbers for PDF Online',
          description: 'Add sequential page numbers to supported PDF documents online.',
          applicationCategory: 'Utility',
          operatingSystem: 'Web',
          url: 'https://pdfilio.com/page-numbers-online',
        }}
      />
    </>
  )
}
