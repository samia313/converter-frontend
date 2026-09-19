import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import EditPdfTool from '@/components/tools/edit-pdf-tool';

export const metadata: Metadata = {
  title: 'Edit PDF Online – Add Text to PDF | PDFilio',
  description: 'Edit a PDF online by adding text to a selected page. Set the page, position, and font size, then download the edited PDF.',
  keywords: ['edit PDF', 'edit PDF online', 'add text to PDF', 'PDF editor online', 'PDF text editor'],
  alternates: { canonical: 'https://pdfilio.com/edit-pdf' },
  openGraph: { title: 'Edit PDF Online – Add Text to PDF | PDFilio', description: 'Add text to supported PDF pages online, choose its position and font size, and download the edited PDF.', url: 'https://pdfilio.com/edit-pdf', type: 'website' },
};

export default function EditPdfToolPage() {
  return <>
    <EditPdfTool />
    <ToolLandingLayout
      toolName="Edit PDF" toolSlug="edit-pdf"
      description="Add text to a supported PDF page, choose the page and position, and download an edited PDF copy."
      heroImage="/tool-images/edit-pdf-hero.png"
      mainContent={'PDFilio\'s Edit PDF tool currently provides a focused text-editing workflow: upload a PDF, enter text, select the page, set the position and font size, and download the edited copy. This workflow adds new text to the selected PDF page rather than rewriting existing PDF text. Complex scanned documents, encrypted PDFs, unusual fonts, and existing-content replacement may require a different workflow. Keep the original PDF when you need an unchanged source copy, and review the edited output before sharing or printing.'}
      useCase={['Adding text labels to PDF pages','Adding notes or instructions','Making simple document corrections','Adding typed signature text','Preparing reports and forms','Adding missing text before sharing','Updating simple PDF documents','Making browser-based PDF edits'].join('\n')}
      features={['Add text to a selected PDF page','Choose page number and position','Adjust font size','100 MB PDF upload limit','Browser-based editing workflow','Download an edited PDF copy','Original file remains unchanged','Works on supported desktop and mobile browsers']}
      benefits={['Make simple PDF updates without rebuilding the file','Add labels, notes, and instructions quickly','Control where new text appears','Download a separate edited copy','Keep the original document unchanged','Review the result before sharing']}
      testimonials={[]}
      faqs={[
        { q: 'How do I edit a PDF online?', a: 'Upload a supported PDF, enter the text you want to add, choose the page and position, set the font size, and select Add Text & Edit PDF.' },
        { q: 'Can I add text to a PDF?', a: 'Yes. The current Edit PDF tool adds new text to a selected PDF page.' },
        { q: 'Can I change existing PDF text?', a: 'The current workflow adds new text; it does not directly rewrite or remove existing PDF text.' },
        { q: 'How do I choose where the text appears?', a: 'Set the X and Y position in PDF points. Coordinates start from the bottom-left corner of the selected page.' },
        { q: 'Can I edit a scanned PDF?', a: 'You can add new text to a supported scanned PDF, but changing the scanned image existing text requires OCR or image editing.' },
        { q: 'What is the PDF upload limit?', a: 'The current Edit PDF upload limit is 100 MB.' },
        { q: 'Will my original PDF be changed?', a: 'No. The tool creates a separate edited PDF for download and does not overwrite your uploaded file.' },
        { q: 'Can I edit a password-protected PDF?', a: 'Encrypted or restricted PDFs may not be editable by the current workflow. Use an unlocked copy when you have the appropriate permission.' },
        { q: 'Is Edit PDF free?', a: 'Availability and usage limits depend on the current PDFilio product configuration.' },
      ]}
      relatedTools={[{ name: 'Merge PDF', slug: 'merge-pdf' },{ name: 'Compress PDF', slug: 'compress-pdf' },{ name: 'Split PDF', slug: 'split-pdf' },{ name: 'Watermark PDF', slug: 'watermark-pdf' },{ name: 'OCR PDF', slug: 'ocr' }]}
      primaryKeyword="edit PDF" secondaryKeywords={['edit PDF online','add text to PDF','PDF editor online','PDF text editor']}
    />
  </>;
}