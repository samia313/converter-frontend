import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'View & Annotate PDF Online | Add Notes to PDF | PDFilio',
  description: 'View and annotate PDF documents online with a focused workflow for adding text notes, labels, instructions, and review comments to supported PDF files.',
  keywords: ['view and annotate PDF','annotate PDF online','PDF annotator','PDF annotation online','view PDF online','add notes to PDF','annotate PDF'],
  alternates: { canonical: 'https://pdfilio.com/view-and-annotate' },
  openGraph: {
    title: 'View & Annotate PDF Online | PDFilio',
    description: 'View supported PDF documents and add text-based annotations, notes, and labels through PDFilio.',
    url: 'https://pdfilio.com/view-and-annotate',
    type: 'website',
  },
};

export default function ViewAndAnnotatePage() {
  return (
    <ToolLandingLayout
      toolName="View & Annotate PDF"
      toolSlug="edit-pdf"
      description="Review a supported PDF and add text-based notes, labels, instructions, or other annotations through a simple browser workflow."
      heroImage="/tool-images/edit-pdf-hero.png"
      mainContent={'Viewing and annotating a PDF can make document review easier when you need to add context without rebuilding the original file. PDFilio provides a focused browser workflow for reviewing supported PDF documents and adding new text to a selected page. The current editing workflow is designed for text-based annotations and additions; it does not claim to provide every annotation type such as freehand drawing, highlighting, stamps, or sticky-note objects. Keep the original PDF when you need an unchanged source copy and review the output before sharing.'}
      useCase={['Adding review notes to PDF pages','Adding labels or instructions','Marking a page with typed comments','Preparing documents for review','Adding typed signature text','Adding context before sharing a PDF','Making simple document annotations','Reviewing reports, forms, and other supported PDFs'].join('\n')}
      features={['Browser-based PDF review workflow','Add text to a selected PDF page','Choose page and text position','Adjust text size','Create a separate edited PDF copy','Original source remains unchanged','Works on supported desktop and mobile browsers','Review the resulting PDF before sharing']}
      benefits={['Add context without rebuilding a document','Leave clear typed notes or labels','Place text where it is needed on a page','Keep the original PDF as a separate source','Prepare documents for review and collaboration','Use a simple browser-based workflow']}
      testimonials={[]}
      faqs={[
        { q: 'Can I view a PDF online?', a: 'Yes. Supported PDF documents can be opened for review through PDFilio workflows.' },
        { q: 'Can I annotate a PDF online?', a: 'PDFilio provides a focused text-based annotation workflow by adding new text to a selected PDF page.' },
        { q: 'What types of annotations can I add?', a: 'The current workflow is focused on adding typed text. It does not claim to support every annotation type such as freehand drawing, highlighting, or sticky-note objects.' },
        { q: 'Can I add notes to a PDF?', a: 'Yes. You can use added text as notes, labels, instructions, or review comments on a supported page.' },
        { q: 'Can I highlight PDF text?', a: 'The current workflow does not provide a dedicated text-highlighting annotation tool. It is designed for adding new text.' },
        { q: 'Can I draw on a PDF?', a: 'The current workflow is text-focused and does not provide a dedicated freehand drawing tool.' },
        { q: 'Will my original PDF be changed?', a: 'No. The editing workflow creates a separate output PDF rather than overwriting the source file.' },
        { q: 'Can I annotate a scanned PDF?', a: 'You may be able to add new text to a supported scanned PDF, while changing existing scanned content requires an OCR or image-editing workflow.' },
        { q: 'Can I use it on a phone?', a: 'The browser-based workflow is designed to work on supported mobile and desktop browsers.' },
        { q: 'What should I do after annotating?', a: 'Review the output PDF to confirm that the added text is positioned and readable before sharing or printing.' },
      ]}
      relatedTools={[
        { name: 'Edit PDF', slug: 'edit-pdf' },
        { name: 'OCR PDF', slug: 'ocr' },
        { name: 'Watermark PDF', slug: 'watermark-pdf' },
        { name: 'Protect PDF', slug: 'protect-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
      ]}
      primaryKeyword="view and annotate PDF"
      secondaryKeywords={['annotate PDF online','PDF annotator','PDF annotation online','view PDF online','add notes to PDF']}
    />
  );
}
