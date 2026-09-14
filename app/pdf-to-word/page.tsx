import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToWordTool from '@/components/tools/pdf-to-word-tool';

export const metadata: Metadata = {
  title: 'PDF to Word Converter – Convert PDF to DOCX Online',
  description: 'Convert supported PDF files to editable Word DOCX online. Learn how formatting, tables, images and scanned PDFs can affect conversion results.',
  keywords: [
    'PDF to Word',
    'PDF to Word converter',
    'convert PDF to Word',
    'PDF to DOCX',
    'PDF to Word online',
    'convert PDF to Word without losing formatting',
    'PDF to Word keeping formatting',
  ],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-word' },
  openGraph: {
    title: 'PDF to Word Converter – Convert PDF to DOCX Online | PDFilio',
    description: 'Convert supported PDFs to editable Word documents and check formatting, tables, images and page breaks after conversion.',
    url: 'https://pdfilio.com/pdf-to-word',
    type: 'website',
  },
};

export default function PDFToWordPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Word Converter',
    description: 'Convert supported PDF documents to editable Word DOCX files.',
    applicationCategory: 'Utility',
  };

  return (
    <>
      <PDFToWordTool />
      <ToolLandingLayout
        toolName="PDF to Word Converter"
        toolSlug="pdf-to-word"
        description="Convert supported PDF documents into editable Word DOCX files for editing, reuse, collaboration, and document preparation."
        heroImage="/tool-images/pdf-to-word-hero.png"
        mainContent={`PDF to Word conversion is useful when you need to edit or reuse text from a supported PDF.

## Convert PDF to Word Without Losing Formatting

No converter can guarantee identical formatting for every PDF because PDF and Word use different document models. Digital PDFs with simple text and consistent layouts generally convert more cleanly than complex multi-column pages, scans, unusual fonts, floating objects, or complicated tables.

## How to Convert PDF to Word

Upload a supported PDF, start the conversion, download the DOCX file, and compare it with the original. Check headings, fonts, tables, images, page breaks, spacing, headers, footers, and text near page boundaries.

## PDF to Word Keeping Formatting

For the best practical result, start with a clean digital PDF when possible and review the converted document before editing it further. Keep the original PDF as the reference copy.

## Scanned PDF to Word

The current PDF to Word converter requires selectable text. Scanned or image-only PDFs may need OCR first. Use an OCR workflow to recognize the text, then convert the resulting text-based document where appropriate.

## PDF to Word With Tables and Images

Tables, columns, images, and unusual layouts can move during conversion. For important documents, compare totals, headings, dates, names, and other high-value information with the original PDF.

## What to Do When Formatting Changes

Use the converted DOCX as an editable starting point. Adjust page breaks, table widths, fonts, spacing, images, and headings in Word where necessary rather than assuming the conversion will be pixel-perfect.`}
        useCase={[
          'Editing PDF reports in Word',
          'Updating business documents',
          'Repurposing PDF text',
          'Preparing documents for collaboration',
          'Moving supported PDF content into Word workflows',
          'Creating an editable starting point for document updates',
        ].join('\n')}
        testimonials={[]}
        features={[
          'PDF to editable Word conversion',
          'DOCX document output',
          'Selectable-text extraction',
          'Support for common PDF layouts',
          'Browser-based conversion',
          'No software installation required',
          'Desktop and mobile browser access',
          'Clear handling for scanned/image-only PDFs',
        ]}
        benefits={[
          'Edit supported PDF content more easily in Word',
          'Reduce manual copying and retyping',
          'Reuse document text for new work',
          'Prepare documents for collaborative editing',
          'Move supported PDF text into familiar Word workflows',
          'Create an editable starting point for document updates',
        ]}
        faqs={[
          { q: 'How do I convert PDF to Word without losing formatting?', a: 'Convert the PDF to DOCX, then compare headings, tables, fonts, images, spacing, and page breaks with the original. Complex PDFs may still need manual cleanup.' },
          { q: 'Can I convert PDF to Word online?', a: 'Yes. PDFilio provides a browser-based workflow for supported PDF documents and returns a Word-compatible DOCX file.' },
          { q: 'Can I convert PDF to DOCX?', a: 'Yes. Supported PDFs can be converted into Word-compatible DOCX documents.' },
          { q: 'Will PDF formatting be preserved exactly in Word?', a: 'Not necessarily. PDF and Word use different document structures, and complex layouts can change during conversion.' },
          { q: 'Does PDF to Word work with scanned PDFs?', a: 'The current converter requires selectable text. Scanned or image-only PDFs may need OCR before they can be converted effectively.' },
          { q: 'Can I convert PDFs with tables?', a: 'Supported PDFs containing tables can be converted, but complex tables or unusual layouts may require manual cleanup in Word.' },
          { q: 'Can I use PDF to Word on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones and tablets as well as desktop computers.' },
          { q: 'What should I do if the converted document needs cleanup?', a: 'Review headings, tables, spacing, images, fonts, and page breaks in Word. Keep the original PDF available for comparison.' },
        ]}
        relatedTools={[
          { name: 'Word to PDF', slug: 'word-to-pdf' },
          { name: 'PDF to Excel', slug: 'pdf-to-excel' },
          { name: 'AI OCR', slug: 'ai-ocr' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        primaryKeyword="PDF to Word"
        secondaryKeywords={['PDF to Word converter', 'convert PDF to Word', 'PDF to DOCX', 'PDF to Word online', 'convert PDF to Word without losing formatting']}
        schema={schema}
      />
    </>
  );
}
