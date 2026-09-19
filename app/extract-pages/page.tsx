import type { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ExtractPagesTool from '@/components/tools/extract-pages-tool';

export const metadata: Metadata = {
  title: 'Extract Pages from PDF Online – Create a New PDF | PDFilio',
  description: 'Extract selected pages from a PDF online and create a separate PDF containing only the pages you choose.',
  keywords: ['extract pages from PDF', 'extract PDF pages', 'extract pages from PDF online', 'PDF page extractor'],
  alternates: { canonical: 'https://pdfilio.com/extract-pages' },
  openGraph: { title: 'Extract Pages from PDF Online | PDFilio', description: 'Create a new PDF from selected pages of an existing PDF.', url: 'https://pdfilio.com/extract-pages', type: 'website' },
};

export default function ExtractPagesPage() {
  return <>
    <ExtractPagesTool />
    <ToolLandingLayout
      toolName="Extract Pages from PDF"
      toolSlug="extract-pages"
      description="Select original page numbers and create a separate PDF containing only those pages."
      heroImage="/tool-images/extract-pages-hero.png"
      mainContent={`Extract Pages from PDF lets you create a smaller, separate PDF from selected pages of an existing document. Enter the original page numbers in the order you want them to appear.

The original PDF is not overwritten. This tool copies selected pages into a new PDF and is useful for sharing a chapter, appendix, form, or other subset of a larger document.`}
      useCase={`Extract selected pages for sharing
Create a PDF from a chapter
Separate an appendix from a report
Send only relevant pages to a client
Create a shorter reference PDF
Save selected pages as a new document
Prepare a subset for printing
Separate supporting documents`}
      features={['Select pages by original page number','Comma-separated page selection','Creates a separate PDF','100 MB upload limit','Original file remains unchanged','Browser-based workflow','Works on supported mobile and desktop browsers','Preserves selected page order']}
      benefits={['Share only relevant pages','Create smaller focused documents','Keep the source PDF unchanged','Choose pages in a custom order','Avoid manual copy and paste','Prepare documents quickly in a browser']}
      testimonials={[]}
      faqs={[
        { q: 'How do I extract pages from a PDF?', a: 'Upload a PDF, enter the original page numbers separated by commas, then select Extract Pages.' },
        { q: 'Can I extract multiple pages?', a: 'Yes. Enter multiple page numbers such as 1,3,5,8.' },
        { q: 'Can I change the page order?', a: 'Yes. Enter the page numbers in the order you want them to appear in the new PDF.' },
        { q: 'Can I use page ranges like 1-5?', a: 'The current interface accepts individual page numbers separated by commas. Enter 1,2,3,4,5 instead.' },
        { q: 'Does extraction change my original PDF?', a: 'No. PDFilio creates a separate extracted PDF.' },
        { q: 'Can I extract pages on my phone?', a: 'Yes, on supported mobile browsers.' },
        { q: 'What if I enter a page number that does not exist?', a: 'The tool validates page numbers against the uploaded PDF and returns an error when a number is outside the document.' },
        { q: 'Will the selected pages keep their order?', a: 'Yes. They are copied in the order you enter.' },
      ]}
      relatedTools={[{ name: 'Split PDF', slug: 'split-pdf' }, { name: 'Remove Pages', slug: 'remove-pages' }, { name: 'Organize PDF', slug: 'organize-pdf' }, { name: 'Merge PDF', slug: 'merge-pdf' }, { name: 'Crop PDF', slug: 'crop-pdf' }]}
      primaryKeyword="extract pages from PDF"
      secondaryKeywords={['extract PDF pages', 'extract pages from PDF online', 'PDF page extractor']}
    />
  </>;
}
