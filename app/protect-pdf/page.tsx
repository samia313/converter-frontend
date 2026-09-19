import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ProtectPdfTool from '@/components/tools/protect-pdf-tool';

export const metadata: Metadata = {
  title: 'Protect PDF Online – Password Protect PDF Files | PDFilio',
  description: 'Password-protect PDF files online with RC4-128 encryption and optional printing, copying, and editing permissions.',
  keywords: ['protect PDF','protect PDF online','password protect PDF','PDF password','encrypt PDF','secure PDF','PDF security'],
  alternates:{canonical:'https://pdfilio.com/protect-pdf'},
  openGraph:{title:'Protect PDF Online – Password Protect PDF Files | PDFilio',description:'Password-protect PDF files and control basic document permissions.',url:'https://pdfilio.com/protect-pdf',type:'website'},
};

export default function ProtectPdfToolPage(){
 return <>
  <ProtectPdfTool/>
  <ToolLandingLayout
   toolName="Protect PDF" toolSlug="protect-pdf"
   description="Password-protect PDF files with RC4-128 encryption and optional printing, copying, and editing permissions."
   heroImage="/tool-images/protect-pdf-hero.png"
   mainContent={`Protect PDF adds a password-based security layer to supported PDF files. The tool uses RC4-128 PDF encryption for compatibility with a wide range of PDF readers and lets you choose basic printing, copying, and editing permissions.

Use a strong unique password and keep it separate from the file when appropriate. PDF permission flags are advisory, so highly sensitive documents should also use secure storage, controlled sharing, and other appropriate security measures.

For compatibility, passwords are limited to characters supported by the legacy PDF password encoding used by this implementation. If a password contains an unsupported character, the tool will report the issue rather than creating a file that may be impossible to open.`}
   useCase={['Password-protecting private PDF documents','Securing business reports before sharing','Protecting personal records and forms','Restricting basic printing or copying','Preparing PDFs for controlled sharing','Protecting archived PDF copies'].join('\n')}
   features={['Real PDF password encryption','RC4-128 compatibility','Open and owner password support','Printing permission control','Copying permission control','Editing permission control','100 MB PDF limit','Browser-based workflow']}
   benefits={['Add a password required to open the PDF','Control common document permissions','Keep the original file unchanged','Download a separate protected copy','Review and test the protected PDF before sharing']}
   testimonials={[]}
   faqs={[
    {q:'How do I password-protect a PDF?',a:'Upload a PDF, enter and confirm an open password, optionally set a separate owner password, choose permissions, and select Protect PDF.'},
    {q:'What encryption does PDFilio Protect PDF use?',a:'The current implementation uses RC4-128 PDF encryption for broad reader compatibility.'},
    {q:'Can I restrict printing, copying, or editing?',a:'Yes. The tool provides separate controls for printing, copying text/images, and modifying content.'},
    {q:'What is an owner password?',a:'The owner password manages document security permissions. If you leave it blank, the tool uses the open password as the owner password.'},
    {q:'Can I protect a PDF on my phone?',a:'Yes. The browser-based tool works on supported mobile and desktop browsers.'},
    {q:'Is PDF password protection complete security?',a:'No. Password encryption adds a security layer, but permission restrictions can be advisory. Use additional controls for highly sensitive information.'},
    {q:'What if my password contains unusual characters?',a:'The current RC4 PDF password format supports a legacy PDF character set. Unsupported characters are rejected instead of producing an unreliable protected file.'},
    {q:'Can I protect an already password-protected PDF?',a:'No. The current tool asks you to remove existing protection first so encrypted content is not incorrectly encrypted a second time.'},
    {q:'Should I keep the original PDF?',a:'Yes. Keep a secure original so you can recover the document if the protected copy or password is lost.'},
   ]}
   relatedTools={[{name:'Unlock PDF',slug:'unlock-pdf'},{name:'Watermark PDF',slug:'watermark-pdf'},{name:'Sign PDF',slug:'sign-pdf'},{name:'Merge PDF',slug:'merge-pdf'},{name:'Compress PDF',slug:'compress-pdf'}]}
   primaryKeyword="protect PDF"
   secondaryKeywords={['protect PDF online','password protect PDF','PDF password','encrypt PDF','secure PDF','PDF security']}
  />
 </>;
}
