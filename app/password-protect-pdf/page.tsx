import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ProtectPdfTool from '@/components/tools/protect-pdf-tool';

export const metadata: Metadata = {
  title: 'Password Protect PDF Online | Encrypt PDF with a Password | PDFilio',
  description: 'Password protect PDF files online and add a password-based security layer before sharing, storing, or sending supported PDF documents.',
  keywords: ['password protect PDF','password protect PDF online','protect PDF with password','PDF password protection','encrypt PDF with password','secure PDF','PDF encryption'],
  alternates: { canonical: 'https://pdfilio.com/password-protect-pdf' },
  openGraph: {
    title: 'Password Protect PDF Online | Encrypt PDF with a Password | PDFilio',
    description: 'Add password protection to supported PDF files and review the protected copy before sharing.',
    url: 'https://pdfilio.com/password-protect-pdf',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Protect PDF Online | PDFilio',
    description: 'Password-protect supported PDF files online with a dedicated PDF security workflow.',
  },
};

const faqs = [
  { q: 'How do I password-protect a PDF online?', a: 'Open the password-protect PDF tool, add your supported PDF, enter and confirm a password, choose available permissions, and create the protected PDF.' },
  { q: 'Can I protect a PDF with a password before sharing it?', a: 'Yes. A password-protected PDF can add an access-control layer before you share the file. Send the password through a separate channel when appropriate.' },
  { q: 'What is the difference between an open password and an owner password?', a: 'An open password is used to open the document. An owner password is associated with document permissions such as printing, copying, or editing.' },
  { q: 'Can I restrict printing or copying?', a: 'The underlying PDF protection workflow supports controls for common permissions such as printing, copying, and editing. PDF permission controls can be advisory depending on the reader.' },
  { q: 'Can I use this PDF password tool on my phone?', a: 'Yes. The browser-based workflow can be used on supported mobile and desktop browsers.' },
  { q: 'Does password protection make a PDF completely secure?', a: 'No security method should be treated as complete protection. Use strong unique passwords and appropriate storage and sharing controls for sensitive documents.' },
  { q: 'Should I keep a copy of the original PDF?', a: 'Yes. Keep a secure original so you can recover the document if the protected copy or password is lost.' },
  { q: 'Can I remove a PDF password later?', a: 'If you know the password and the PDF is supported, use the PDFilio Unlock PDF workflow to create an accessible copy.' },
  { q: 'What documents can I password-protect?', a: 'The workflow is designed for supported PDF files, including common business, personal, academic, and administrative documents.' },
  { q: 'Can I protect a PDF and still share it by email?', a: 'Yes. Password protection can be used before email sharing. Check the final file and communicate the password separately when the document is sensitive.' },
  { q: 'What should I do if I forget the password?', a: 'Keep passwords in a secure password manager or another safe location. PDFilio cannot recover a password that you have lost.' },
  { q: 'Is password protection the same as restricting PDF permissions?', a: 'They are related but different. A password can control opening the file, while PDF permission settings can govern actions such as printing, copying, or editing.' },
];

export default function PasswordProtectPdfLandingPage() {
  return (
    <>
      <ProtectPdfTool />
      <ToolLandingLayout
        toolName="Password Protect PDF"
        toolSlug="protect-pdf"
        description="Password protect PDF files online and add a password-based security layer before sharing, storing, or sending supported documents."
        heroImage="/tool-images/protect-pdf-hero.png"
        mainContent={`Password protect PDF files when a document should not be openly accessible to everyone who receives the file.

## Password protect a PDF before sharing
Add an opening password to a supported PDF and keep the password separate from the document when appropriate. This is useful for documents shared by email, cloud storage, messaging, or other channels.

## PDF password protection for common workflows
Use password protection for business reports, personal records, forms, academic documents, drafts, and other PDFs that need an additional access-control step before distribution.

## Review the protected PDF
After creating a protected copy, verify that the file opens correctly with the intended password and that the selected permissions match your workflow. Keep a secure original and a safe record of the password.

Password protection is one security measure, not a replacement for secure storage, controlled sharing, or other safeguards needed for sensitive information.`}
        useCase={['Password-protecting business reports and documents','Securing personal records before sharing','Adding a password before email delivery','Protecting academic papers, forms, and drafts','Controlling common PDF permissions such as printing or copying','Preparing a protected PDF for controlled distribution'].join('\\n')}
        features={['PDF password protection workflow','Open-password support','Owner-password and permission controls','Printing permission control','Copying permission control','Editing permission control','Separate protected PDF output','Browser-based workflow']}
        benefits={['Add a password layer before sharing a PDF','Control common PDF permissions','Keep the original PDF unchanged','Create a separate protected copy','Review the protected document before distribution']}
        testimonials={[]}
        faqs={faqs}
        relatedTools={[{name:'Protect PDF',slug:'protect-pdf'},{name:'Unlock PDF',slug:'unlock-pdf'},{name:'Sign PDF',slug:'sign-pdf'},{name:'Watermark PDF',slug:'watermark-pdf'},{name:'Redact PDF',slug:'redact-pdf'},{name:'Compress PDF',slug:'compress-pdf'}]}
        primaryKeyword="password protect PDF"
        secondaryKeywords={['password protect PDF online','protect PDF with password','PDF password protection','encrypt PDF with password','secure PDF','PDF encryption']}
        howitworks={['1. Open Password Protect PDF and select a supported PDF file.','2. Enter and confirm a strong password and choose any available PDF permissions.','3. Create the protected PDF and review that it opens correctly with the intended password.','4. Keep the password separate from the document when appropriate, then share the protected copy.'].join('\\n')}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Password Protect PDF',
          description: 'Password-protect supported PDF files online.',
          applicationCategory: 'Utility',
          operatingSystem: 'Web',
          url: 'https://pdfilio.com/password-protect-pdf',
        }}
      />
    </>
  );
}
