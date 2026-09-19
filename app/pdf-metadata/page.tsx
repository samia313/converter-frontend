import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PdfMetadataTool from '@/components/tools/pdf-metadata-tool';

export const metadata: Metadata = {
  title: 'PDF Metadata Editor Online – Edit PDF Properties | PDFilio',
  description: 'Edit PDF metadata online, including title, author, subject, keywords, creator, and producer fields. Create a new PDF without changing the original file.',
  keywords: ['PDF metadata editor','edit PDF metadata','PDF properties','PDF title editor','PDF author metadata','PDF keywords'],
  alternates: { canonical: 'https://pdfilio.com/pdf-metadata' },
  openGraph: { title: 'PDF Metadata Editor Online | PDFilio', description: 'Edit common PDF document properties online.', url: 'https://pdfilio.com/pdf-metadata', type: 'website' },
};

export default function PdfMetadataPage() {
  return <>
    <PdfMetadataTool />
    <ToolLandingLayout
      toolName="PDF Metadata Editor" toolSlug="pdf-metadata"
      description="Edit common PDF document properties such as title, author, subject, keywords, creator, and producer."
      heroImage="/tool-images/pdf-metadata-hero.png"
      mainContent={`PDF metadata contains document properties that can help people and software identify and organize a file. PDFilio's metadata editor lets you create a new copy with updated title, author, subject, keywords, creator, and producer fields.

The tool changes document metadata rather than rewriting the visible text and layout of your PDF. Keep the original file if you need an unchanged source copy. Encrypted or unsupported PDFs may not be editable through this browser-based workflow.`}
      useCase={`Updating a document title
Correcting an author name
Adding searchable keywords
Cleaning old document properties
Preparing a PDF for publishing
Standardizing document metadata
Updating creator or producer information
Creating a metadata-clean copy`}
      features={['Title and author editing','Subject and keyword editing','Creator and producer fields','100MB PDF upload limit','Creates a separate output PDF','Browser-based workflow','Original file remains unchanged','Mobile and desktop browser support']}
      benefits={['Improve document organization','Correct outdated PDF properties','Add useful keywords for document management','Prepare files for publishing or sharing','Keep the source PDF unchanged','Update common metadata without editing visible content']}
      testimonials={[]}
      faqs={[
        {q:'What PDF metadata can I edit?',a:'The tool updates title, author, subject, keywords, creator, and producer fields.'},
        {q:'Does editing metadata change the visible PDF?',a:'The tool is intended to change document properties, not the visible page text or layout.'},
        {q:'Will my original PDF be changed?',a:'No. The tool creates a separate output file.'},
        {q:'Can I remove PDF metadata?',a:'Yes. Leaving fields blank clears the common metadata fields handled by this tool.'},
        {q:'Can I add keywords to a PDF?',a:'Yes. Enter comma-separated keywords and the tool stores them as PDF keywords.'},
        {q:'Can I edit metadata on my phone?',a:'Yes, the browser-based interface works on supported mobile and desktop browsers.'},
        {q:'What if my PDF is encrypted?',a:'Encrypted PDFs may not be supported by this metadata editing workflow.'},
        {q:'Does metadata editing remove hidden information?',a:'No. It only updates the listed standard PDF metadata fields; it is not a complete privacy scrubber.'},
      ]}
      relatedTools={[{name:'Edit PDF',slug:'edit-pdf'},{name:'Protect PDF',slug:'protect-pdf'},{name:'Flatten PDF',slug:'flatten-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'Merge PDF',slug:'merge-pdf'}]}
      primaryKeyword="PDF metadata editor" secondaryKeywords={['edit PDF metadata','PDF properties','PDF title editor','PDF author metadata']}
    />
  </>;
}
