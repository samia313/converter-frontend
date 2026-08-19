import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ExcelToPDFTool from '@/components/tools/excel-to-pdf-tool';

export const metadata: Metadata = {
  title: 'Excel to PDF Converter Online – Convert XLS & XLSX to PDF | PDFilio',
  description: 'Convert supported Excel XLS and XLSX spreadsheets to PDF online. Prepare reports, tables, budgets, invoices, and workbooks for sharing, printing, and archiving.',
  keywords: ['Excel to PDF', 'Excel to PDF converter', 'convert Excel to PDF', 'XLS to PDF', 'XLSX to PDF', 'spreadsheet to PDF', 'Excel to PDF online'],
  alternates: { canonical: 'https://pdfilio.com/excel-to-pdf' },
  openGraph: {
    title: 'Excel to PDF Converter Online | PDFilio',
    description: 'Convert supported Excel spreadsheets into PDF files for sharing, printing, and document workflows.',
    url: 'https://pdfilio.com/excel-to-pdf',
    type: 'website',
  },
};

export default function ExcelToPDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Excel to PDF',
    description: 'Convert supported Excel spreadsheets to PDF format.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <ExcelToPDFTool />
      <ToolLandingLayout
        toolName="Excel to PDF"
        toolSlug="excel-to-pdf"
        description="Convert supported Excel spreadsheets into PDF files for reports, printing, sharing, submissions, and archiving."
        heroImage="/tool-images/excel-to-pdf-hero.png"
        mainContent={`Excel to PDF converts supported Excel spreadsheets into PDF documents. PDF is useful when you want to share a report, prepare a spreadsheet for printing, submit a document through an upload portal, or keep a fixed-format copy of a workbook.

The final PDF can depend on the workbook structure, print settings, page breaks, formulas, fonts, charts, images, hidden content, and the conversion engine. For important reports, review page orientation, pagination, tables, totals, charts, and other critical content before distributing the PDF.

Typical workflow: upload a supported XLS or XLSX file, start the conversion, review the generated PDF, and download it for your next document workflow. Current input formats and processing limits depend on the tool configuration shown in the interface.`}
        useCase={[
          'Converting financial reports to PDF',
          'Preparing budgets for printing',
          'Sharing sales and performance reports',
          'Creating PDF invoices from spreadsheet templates',
          'Preparing tables for submissions',
          'Archiving spreadsheet reports',
          'Sharing workbook data with clients or teams',
          'Creating fixed-format copies of spreadsheets',
        ].join('\n')}
        features={[
          'XLS and XLSX to PDF conversion',
          'PDF document output',
          'Browser-based workflow',
          'Useful for tables and reports',
          'Support for common desktop and mobile browsers',
          'Downloadable PDF output',
          'Simple upload and conversion process',
          'Related PDF document tools',
        ]}
        benefits={[
          'Create a shareable PDF version of spreadsheet data',
          'Prepare reports for printing and submission',
          'Reduce manual spreadsheet-to-PDF work',
          'Keep finalized reports in a common distribution format',
          'Make spreadsheet sharing easier across devices',
          'Create fixed-format copies for review and archiving',
        ]}
        testimonials={[]}
        relatedTools={[
          { name: 'PDF to Excel', slug: 'pdf-to-excel' },
          { name: 'Word to PDF', slug: 'word-to-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        faqs={[
          { q: 'How do I convert Excel to PDF online?', a: 'Upload a supported Excel spreadsheet, start the conversion, review the generated PDF, and download the result.' },
          { q: 'Can I convert XLSX to PDF?', a: 'Yes. Supported XLSX workbooks can be converted into PDF files through the Excel-to-PDF workflow.' },
          { q: 'Can I convert XLS to PDF?', a: 'If the current uploader accepts XLS files, they can be processed through the same conversion workflow. Follow the formats displayed by the tool.' },
          { q: 'Will Excel formatting be preserved exactly?', a: 'Exact preservation is not guaranteed for every workbook. Page breaks, print areas, fonts, formulas, charts, images, and complex layouts can affect the final PDF.' },
          { q: 'Can I convert a workbook with multiple sheets?', a: 'Supported workbooks can contain multiple sheets, but the final PDF structure depends on the current conversion workflow and workbook settings. Review the output before sharing.' },
          { q: 'What happens to Excel formulas?', a: 'The PDF represents the spreadsheet as a document rather than an editable workbook. Formula results may be rendered as displayed values, depending on the conversion process.' },
          { q: 'Can I convert Excel charts to PDF?', a: 'Charts and other visual spreadsheet elements may be rendered in the PDF, but complex workbooks should be reviewed after conversion.' },
          { q: 'Can I convert Excel invoices to PDF?', a: 'Yes. Supported spreadsheet invoices are a common use case for creating a shareable or printable PDF copy.' },
          { q: 'Can I use Excel to PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need Microsoft Excel installed?', a: 'No separate Excel installation is required to use the online conversion workflow, provided your file is in a supported format.' },
          { q: 'How long does Excel to PDF conversion take?', a: 'Processing time depends on workbook size, number of sheets, complexity, and current system resources.' },
          { q: 'Is Excel to PDF free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'Should I check the PDF after conversion?', a: 'Yes. For important spreadsheets, check page breaks, orientation, totals, charts, tables, headers, footers, and other critical content before distributing the PDF.' },
        ]}
        primaryKeyword="Excel to PDF"
        secondaryKeywords={['convert Excel to PDF', 'spreadsheet to PDF', 'XLS to PDF', 'XLSX to PDF', 'Excel conversion', 'Excel to PDF online']}
        schema={schema}
      />
    </>
  );
}
