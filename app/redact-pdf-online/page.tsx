import { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'
import RedactPdfTool from '@/components/tools/redact-pdf-tool'

export const metadata: Metadata = {
  title: 'Redact PDF Online | Cover Sensitive Information in PDF | PDFilio',
  description: 'Redact PDF pages online by covering selected areas with an opaque rectangle. Use it to visually hide sensitive information and review the output carefully before sharing.',
  keywords: ['redact PDF online','redact PDF','PDF redaction','redact sensitive information PDF','cover sensitive PDF content','PDF redaction tool','redact PDF document'],
  alternates: { canonical: 'https://pdfilio.com/redact-pdf-online' },
  openGraph: {
    title: 'Redact PDF Online | Cover Sensitive Information in PDF | PDFilio',
    description: 'Cover selected areas of supported PDF pages with an opaque rectangle and review the result.',
    url: 'https://pdfilio.com/redact-pdf-online',
    type: 'website',
  },
}

const faqs = [
  { q: 'How do I redact a PDF online?', a: 'Upload a supported PDF, choose the area to cover using the available coordinates and dimensions, create the output, and review the final PDF carefully.' },
  { q: 'Does this permanently remove the underlying PDF text?', a: 'No. The current PDFilio workflow visually covers an area with an opaque rectangle. Underlying PDF content may remain recoverable.' },
  { q: 'Can I use this for secure legal redaction?', a: 'Do not rely on this visual-covering workflow as secure legal redaction. Sensitive documents should be independently verified before distribution.' },
  { q: 'Can I choose the area to cover?', a: 'Yes. The current tool provides X and Y coordinates plus width and height controls for the rectangle.' },
  { q: 'Does the redaction box apply to every page?', a: 'Yes. The current workflow applies the same rectangle coordinates to every page in the uploaded PDF.' },
  { q: 'Can I cover names or other visible information?', a: 'You can visually cover visible content within the selected rectangle. Review the final PDF carefully because the underlying content is not securely removed by this workflow.' },
  { q: 'Can I redact a scanned PDF?', a: 'The visual rectangle can be applied to supported PDF pages, including pages that contain scanned or image-based content. Review the output before sharing.' },
  { q: 'What is the difference between redaction and a black box?', a: 'Secure redaction removes or sanitizes underlying content, while the current PDFilio workflow places an opaque visual rectangle over an area.' },
  { q: 'Can I redact the same area on multiple pages?', a: 'Yes. The current workflow applies the selected rectangle coordinates to every page.' },
  { q: 'Can I keep my original PDF?', a: 'Yes. The workflow creates a separate output PDF. Keeping the original separately can be useful when you need the unmodified source.' },
  { q: 'Should I verify a redacted PDF before sharing?', a: 'Yes. Carefully inspect the output and consider independent verification whenever sensitive or legally important information is involved.' },
  { q: 'Is Redact PDF Online a complete document-security solution?', a: 'No. Visual covering is not a substitute for access controls, encryption, or secure redaction methods when those protections are required.' },
]

export default function RedactPdfOnlineLandingPage() {
  return (
    <>
      <RedactPdfTool />
      <ToolLandingLayout
        toolName="Redact PDF Online"
        toolSlug="redact-pdf"
        description="Cover selected areas of supported PDF pages with an opaque rectangle. Use the workflow for visual document marking and review, and verify sensitive files before sharing."
        mainContent={`Redact PDF Online provides a visual PDF redaction workflow for covering selected areas of supported PDF pages. You can define the rectangle's position and size, create a separate output PDF, and review the result.

This distinction is important: the current workflow places an opaque rectangle over the page rather than securely removing the underlying PDF text or objects. For sensitive, confidential, or legally important documents, do not assume that a covered area has been permanently sanitized. Independently verify the final file before distribution.

A typical workflow is to upload the PDF, define the area to cover, create the output, inspect the result, and only then decide whether it is suitable for your intended use.`}
        useCase={['Visually cover sensitive information in document copies','Mark areas for review before document distribution','Cover repeated regions across PDF pages','Prepare a visually redacted working copy','Hide visible content in draft documents','Review document areas before sharing'].join('\n')}
        features={['Opaque rectangle covering','Custom X and Y coordinates','Custom width and height','Same-area application across pages','Separate output PDF','Browser-based workflow','Support for visual document marking','Output review before sharing']}
        benefits={['Quickly cover visible PDF areas','Apply the same cover area across pages','Create a separate marked-up copy','Control the covered region precisely','Keep the original PDF separately','Encourage final-file review before distribution']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[
          {name:'Redact PDF',slug:'redact-pdf'},
          {name:'Protect PDF',slug:'protect-pdf'},
          {name:'Password Protect PDF',slug:'password-protect-pdf'},
          {name:'Watermark PDF',slug:'watermark-pdf'},
          {name:'Edit PDF',slug:'edit-pdf'},
        ]}
        primaryKeyword="redact PDF online"
        secondaryKeywords={['redact PDF','PDF redaction','redact sensitive information PDF','cover sensitive PDF content','PDF redaction tool','redact PDF document']}
        howitworks={['1. Upload a supported PDF.','2. Define the X and Y position and the rectangle width and height.','3. Create the visually covered PDF.','4. Inspect the final output carefully before sharing, especially when sensitive information is involved.'].join('\n')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Redact PDF Online',
          description: 'Visually cover selected areas of supported PDF pages with an opaque rectangle.',
          applicationCategory: 'Utility',
          operatingSystem: 'Web',
          url: 'https://pdfilio.com/redact-pdf-online',
        }}
      />
    </>
  )
}
