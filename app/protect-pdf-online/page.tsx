import { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'
import ProtectPdfTool from '@/components/tools/protect-pdf-tool'

export const metadata: Metadata = {
  title: 'Protect PDF Online | Password Protect PDF Files | PDFilio',
  description: 'Protect PDF files online with password-based PDF encryption. Add an open password and manage available printing, copying, and editing permissions.',
  keywords: ['protect PDF online','protect PDF','password protect PDF','PDF password protection','encrypt PDF online','secure PDF','PDF security'],
  alternates: { canonical: 'https://pdfilio.com/protect-pdf-online' },
  openGraph: {
    title: 'Protect PDF Online | Password Protect PDF Files | PDFilio',
    description: 'Password-protect supported PDF files and manage available document permissions online.',
    url: 'https://pdfilio.com/protect-pdf-online',
    type: 'website',
  },
}

const faqs = [
  { q: 'How do I protect a PDF online?', a: 'Upload a supported PDF, enter and confirm a password, choose the available document permissions, create the protected PDF, and test the result before sharing.' },
  { q: 'Can I password-protect a PDF?', a: 'Yes. The current PDFilio workflow lets you add password-based protection to supported PDF files.' },
  { q: 'Can I restrict printing of a PDF?', a: 'Yes. The current tool provides a printing permission control.' },
  { q: 'Can I restrict copying from a PDF?', a: 'Yes. The current workflow provides a copying permission control.' },
  { q: 'Can I restrict editing of a PDF?', a: 'Yes. Available editing permissions can be configured before creating the protected PDF.' },
  { q: 'What encryption does the current Protect PDF tool use?', a: 'The current implementation uses RC4-128 PDF encryption.' },
  { q: 'What is an owner password?', a: 'An owner password is used for document security permissions. The exact behavior depends on the PDF security settings and reader used to open the file.' },
  { q: 'Is password-protected PDF completely secure?', a: 'Password protection adds a security layer, but no single PDF setting should be treated as complete security for highly sensitive information. Use appropriate storage and sharing controls as well.' },
  { q: 'Can I protect a PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported mobile and desktop browsers.' },
  { q: 'Can I protect an already protected PDF?', a: 'The current workflow expects a PDF that can be processed without existing encryption. Remove existing protection first when required.' },
  { q: 'Should I keep a copy of the original PDF?', a: 'Yes. Keep the original in a secure location so you can recover the document if the protected copy or password is lost.' },
  { q: 'Should I test the protected PDF before sharing?', a: 'Yes. Open the resulting PDF and check the password, permissions, and document content before distributing it.' },
]

export default function ProtectPdfOnlineLandingPage() {
  return (
    <>
      <ProtectPdfTool />
      <ToolLandingLayout
        toolName="Protect PDF Online"
        toolSlug="protect-pdf"
        description="Password-protect supported PDF files online and configure available printing, copying, and editing permissions."
        heroImage="/tool-images/protect-pdf-hero.png"
        mainContent={`Protect PDF Online adds password-based protection to supported PDF documents. You can set an open password and configure available permissions for printing, copying, and editing.

The current implementation uses RC4-128 PDF encryption. Because PDF security behavior can vary between readers and permission restrictions can be advisory, highly sensitive documents should also use appropriate secure storage, controlled sharing, and other security measures.

A typical workflow is to upload the PDF, set the password and available permissions, create the protected copy, then open and test the result before sharing it. Keep the original document separately when you may need it later.`}
        useCase={['Password-protect private PDF documents','Protect business reports before sharing','Add access control to personal records','Configure printing permissions','Configure copying permissions','Configure editing permissions','Prepare PDFs for controlled sharing','Protect archived PDF copies']}
        features={['Password-based PDF protection','RC4-128 PDF encryption','Open password support','Owner password support','Printing permission control','Copying permission control','Editing permission control','Separate protected PDF output']}
        benefits={['Add a password required to open supported PDFs','Configure common document permissions','Keep the original PDF separately','Create a protected copy for sharing','Review and test the protected file before distribution','Use a browser-based PDF protection workflow']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[
          {name:'Protect PDF',slug:'protect-pdf'},
          {name:'Password Protect PDF',slug:'password-protect-pdf'},
          {name:'Unlock PDF',slug:'unlock-pdf'},
          {name:'Watermark PDF',slug:'watermark-pdf'},
          {name:'Sign PDF',slug:'sign-pdf'},
        ]}
        primaryKeyword="protect PDF online"
        secondaryKeywords={['protect PDF','password protect PDF','PDF password protection','encrypt PDF online','secure PDF','PDF security']}
        howitworks={['1. Upload a supported PDF.','2. Enter and confirm the PDF password and configure available permissions.','3. Create the protected PDF.','4. Open and test the output before sharing or distributing it.'].join('\n')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Protect PDF Online',
          description: 'Password-protect supported PDF documents online with available permission controls.',
          applicationCategory: 'Utility',
          operatingSystem: 'Web',
          url: 'https://pdfilio.com/protect-pdf-online',
        }}
      />
    </>
  )
}
