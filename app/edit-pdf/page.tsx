import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import EditPdfTool from '@/components/tools/edit-pdf-tool';

export const metadata: Metadata = {
  title: 'Edit PDF Online – Add Text, Images & Annotations | PDFilio',
  description: 'Edit supported PDF files online by adding or modifying available text, images, annotations, and document elements. Review your PDF before downloading.',
  keywords: ['edit PDF', 'edit PDF online', 'PDF editor online', 'edit PDF text', 'add text to PDF', 'add image to PDF', 'annotate PDF'],
  alternates: { canonical: 'https://pdfilio.com/edit-pdf' },
  openGraph: {
    title: 'Edit PDF Online – PDF Editor | PDFilio',
    description: 'Edit supported PDF documents with available text, image, and annotation tools in your browser.',
    url: 'https://pdfilio.com/edit-pdf',
    type: 'website',
  },
};

export default function EditPdfToolPage() {
  return (
    <>
      <EditPdfTool />
      <ToolLandingLayout
        toolName="Edit PDF"
        toolSlug="edit-pdf"
        description="Edit supported PDF files online using the available text, image, annotation, and document-editing controls."
        heroImage="/tool-images/edit-pdf-hero.png"
        mainContent={`Edit PDF helps you make changes to supported PDF documents in your browser. Depending on the current editor capabilities, you may be able to add or modify text, insert images, annotate pages, or make other supported document changes without rebuilding the file from scratch.

Common uses include correcting document text, adding notes or annotations, inserting images or signatures when supported, preparing forms and reports, and making final presentation changes before sharing a PDF. The exact editing controls depend on the current PDFilio editor.

Always review the edited PDF before relying on it. Complex PDFs, scanned documents, embedded fonts, forms, tables, and unusual layouts may behave differently during editing. Keep an original copy when you may need to preserve the source document.`}
        useCase={[
          'Correcting supported PDF text',
          'Adding notes and annotations',
          'Inserting images into PDF pages',
          'Preparing reports and proposals',
          'Making final document changes before sharing',
          'Reviewing and updating supported PDF documents',
          'Adding visual information to PDF pages',
          'Making simple document edits from a browser',
        ].join('\n')}
        features={[
          'Browser-based PDF editing',
          'Supported text editing controls',
          'Annotation workflow when available',
          'Image insertion when available',
          'PDF page editing',
          'Mobile and desktop browser access',
          'Reviewable edited output',
          'Related PDF document tools',
        ]}
        benefits={[
          'Make supported PDF changes without rebuilding the document',
          'Correct or update document content more efficiently',
          'Add notes and visual information to pages',
          'Prepare PDFs for sharing and presentation',
          'Work from a browser on supported devices',
          'Keep an original copy while creating an edited version',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I edit a PDF online?', a: 'Open the Edit PDF tool, upload a supported PDF, use the available editing controls, review your changes, and download the edited document.' },
          { q: 'Can I edit text in a PDF?', a: 'Text editing depends on the PDF structure and the controls available in the current editor. Select supported text and make the required changes.' },
          { q: 'Can I add text to a PDF?', a: 'If the current editor provides a text tool, you can add text to supported PDF pages and position it where needed.' },
          { q: 'Can I add images to a PDF?', a: 'Image insertion may be available through the editor. Use the image controls shown in the current PDFilio interface.' },
          { q: 'Can I annotate a PDF?', a: 'Annotation capabilities depend on the current editor. Supported annotation tools can be used for notes, highlights, or other available markup.' },
          { q: 'Can I edit a scanned PDF?', a: 'Scanned PDFs contain page images rather than normal selectable text. OCR may be needed before text can be edited as text, and results depend on scan quality.' },
          { q: 'Can I edit a PDF on my phone?', a: 'The editor is browser-based and can be accessed on supported phones, tablets, and desktop browsers.' },
          { q: 'Will editing preserve the original PDF layout?', a: 'Simple edits may preserve much of the layout, but complex fonts, tables, forms, embedded elements, and unusual page structures can change during processing. Review the output.' },
          { q: 'Can I edit PDF forms?', a: 'Form editing depends on the type of PDF form and the controls supported by the current editor. Test the document and review the saved result.' },
          { q: 'Can I edit a password-protected PDF?', a: 'A password-protected or restricted PDF may require the appropriate password or permissions before it can be edited.' },
          { q: 'Does editing a PDF reduce quality?', a: 'Quality can depend on the type of changes and how the PDF is processed. Review images, fonts, and page appearance in the final document.' },
          { q: 'Should I keep a copy of my original PDF?', a: 'Yes. Keeping the original is recommended so you can restore the source if an edit does not produce the result you want.' },
          { q: 'Is Edit PDF free?', a: 'PDFilio provides the online PDF editor; current usage limits, account requirements, and available editing features depend on the product configuration shown in the interface.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Watermark PDF', slug: 'watermark-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        primaryKeyword="edit PDF"
        secondaryKeywords={['edit PDF online', 'PDF editor online', 'edit PDF text', 'add text to PDF', 'add image to PDF', 'annotate PDF']}
      />
    </>
  );
}
