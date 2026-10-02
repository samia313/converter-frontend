import { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'
import WatermarkPdfTool from '@/components/tools/watermark-pdf-tool'

export const metadata: Metadata = {
  title: 'Watermark PDF Online | Add Text Watermark to PDF | PDFilio',
  description: 'Add a text watermark to PDF online. Label drafts, add confidentiality notices, identify documents, or add visible branding to supported PDF files.',
  keywords: ['watermark PDF online','add watermark to PDF','PDF watermark','text watermark PDF','watermark PDF','add text to PDF as watermark'],
  alternates: { canonical: 'https://pdfilio.com/watermark-pdf-online' },
  openGraph: {
    title: 'Watermark PDF Online | Add Text Watermark to PDF | PDFilio',
    description: 'Add a customizable text watermark to supported PDF files online.',
    url: 'https://pdfilio.com/watermark-pdf-online',
    type: 'website',
  },
}

const faqs = [
  { q: 'How do I add a watermark to a PDF online?', a: 'Open Watermark PDF, upload a supported PDF, enter the watermark text, choose the position and appearance settings, then create the watermarked PDF.' },
  { q: 'Can I add a text watermark to every PDF page?', a: 'Yes. The current PDFilio watermark workflow applies the selected text watermark across the PDF pages.' },
  { q: 'Can I change the watermark position?', a: 'Yes. The current workflow provides multiple position options so you can place the watermark where it fits your document.' },
  { q: 'Can I make a PDF watermark transparent?', a: 'Yes. You can adjust watermark opacity so the underlying document remains more visible.' },
  { q: 'Can I rotate a PDF watermark?', a: 'Yes. The watermark workflow supports adjustable rotation.' },
  { q: 'Can I change the watermark size?', a: 'Yes. You can adjust the watermark font size to suit the document and intended use.' },
  { q: 'Can I use an image or logo as a watermark?', a: 'The current PDFilio workflow is designed for text watermarks. Image or logo watermarking is not part of this workflow.' },
  { q: 'Will watermarking change my original PDF?', a: 'The workflow creates a separate watermarked PDF, so you can keep your original file unchanged.' },
  { q: 'Can I watermark a draft PDF?', a: 'Yes. A visible DRAFT or similar text watermark can help identify working copies before distribution.' },
  { q: 'Can I add a confidentiality watermark?', a: 'Yes. Text such as CONFIDENTIAL can be used when a visible document-use notice is appropriate.' },
  { q: 'Can I watermark a PDF for branding?', a: 'Yes. Text-based branding or document identification can be added as a visible watermark.' },
  { q: 'Should I review the PDF after adding a watermark?', a: 'Yes. Review the final PDF to make sure the watermark position, opacity, size, and rotation do not interfere with important content.' },
]

export default function WatermarkPdfLandingPage() {
  return (
    <>
      <WatermarkPdfTool />
      <ToolLandingLayout
        toolName="Watermark PDF Online"
        toolSlug="watermark-pdf"
        description="Add a customizable text watermark to PDF files online for drafts, confidentiality notices, document identification, and visible branding."
        mainContent={`Watermark PDF online when you need visible text placed across a supported document without changing the original file.

## Add a text watermark to a PDF
Enter your watermark text and adjust its position, opacity, font size, and rotation. The result is a separate watermarked PDF that you can review before sharing.

## Watermark PDFs for common document workflows
Use text watermarks such as DRAFT, CONFIDENTIAL, SAMPLE, INTERNAL, or other document labels when a visible notice helps communicate how a PDF should be handled.

## Review the watermarked document
Always check the final PDF for readability. A watermark should remain visible enough for its purpose without unnecessarily covering important text, tables, signatures, or other document content.`}
        useCase={['Adding DRAFT labels to working documents','Adding CONFIDENTIAL notices to PDFs','Identifying internal or review copies','Adding visible text-based branding','Labeling sample documents before distribution','Marking documents for controlled review'].join('\n')}
        features={['Text watermark on PDF pages','Multiple position options','Adjustable opacity','Adjustable font size','Adjustable rotation','Separate watermarked PDF output']}
        benefits={['Clearly label document status','Add visible confidentiality notices','Identify working or sample copies','Add simple text-based branding','Keep the original PDF unchanged','Review the final watermark before sharing']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[{name:'Watermark PDF',slug:'watermark-pdf'},{name:'Protect PDF',slug:'protect-pdf'},{name:'Password Protect PDF',slug:'password-protect-pdf'},{name:'Redact PDF',slug:'redact-pdf'},{name:'Edit PDF',slug:'edit-pdf'},{name:'Compress PDF',slug:'compress-pdf'}]}
        primaryKeyword="watermark PDF online"
        secondaryKeywords={['add watermark to PDF','PDF watermark','text watermark PDF','watermark PDF','add text to PDF as watermark']}
        howitworks={['1. Open Watermark PDF Online and select a supported PDF.','2. Enter the text you want to display as the watermark.','3. Choose the watermark position, opacity, size, and rotation.','4. Create the watermarked PDF and review the result before sharing or distributing it.'].join('\n')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Watermark PDF Online',
          description: 'Add a customizable text watermark to supported PDF files online.',
          applicationCategory: 'Utility',
          operatingSystem: 'Web',
          url: 'https://pdfilio.com/watermark-pdf-online',
        }}
      />
    </>
  )
}
