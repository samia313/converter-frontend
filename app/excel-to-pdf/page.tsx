import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import ExcelToPDFTool from '@/components/tools/excel-to-pdf-tool';

export const metadata: Metadata = {
  title: 'Excel to PDF - Convert Spreadsheets to PDF | PDFilio',
  description: 'Convert Excel spreadsheets to PDF instantly. Preserve formatting, share spreadsheets securely, and print Excel files perfectly. Free and easy conversion.',
  keywords: ['Excel to PDF', 'convert Excel to PDF', 'spreadsheet to PDF', 'XLSX to PDF'],
};

export default function ExcelToPDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF format',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1850',
    },
  };

  return (
    <>
      <ExcelToPDFTool />
      <ToolLandingLayout
        toolName="Excel to PDF"
        toolSlug="excel-to-pdf"
        description="Convert Excel spreadsheets to PDF format instantly. Perfect for sharing reports, printing spreadsheets, and archiving data. Formatting preserved, security enhanced, and completely free."
        heroImage="/tool-images/excel-to-pdf-hero.png"
        mainContent={`Excel to PDF converts your spreadsheets into professional PDF documents instantly. Perfect for sharing financial reports, creating print-friendly spreadsheets, and archiving important data.

Our converter preserves all Excel formatting including colors, fonts, borders, and calculations. Convert single sheets or entire workbooks with multiple sheets into organized PDF files.

Convert spreadsheets securely with instant processing and automatic file deletion. No registration needed, no email verification, no hidden costs. Your files stay private throughout the conversion process.`}
        useCase={`Converting financial reports for stakeholder distribution
Creating print-friendly versions of budget spreadsheets
Archiving sales data and performance metrics
Sharing survey results in PDF format
Creating professional invoices from Excel templates
Distributing payroll reports securely
Preparing spreadsheets for legal compliance`}
        features={[
        'Convert Excel to professional PDF',
        'Preserve all formatting and styling',
        'Convert single sheets or entire workbooks',
        'Maintain colors, fonts, and borders',
        'Handle large spreadsheets',
        'Batch convert multiple files',
        'Instant download',
        'Works on all devices',
      ]}
        benefits={[
        'Share spreadsheets safely',
        'Create print-ready documents',
        'Professional appearance',
        'Easy distribution',
        'Secure data sharing',
        'Prevent accidental modifications',
        'Universal file format',
        'Perfect formatting every time',
      ]}
        testimonials={[
        {
          name: 'Jennifer L.',
          role: 'Business Manager',
          text: 'Excel to PDF is our go-to tool for converting financial reports. The formatting always looks perfect, and sharing PDF is more secure than Excel files.',
        },
        {
          name: 'Thomas P.',
          role: 'Financial Analyst',
          text: 'Fast, reliable, and the output looks exactly like my Excel file. Perfect for converting reports before sending to executives.',
        },
        {
          name: 'Sophie B.',
          role: 'Operations Manager',
          text: 'Converting 50+ spreadsheets monthly. Excel to PDF is the fastest solution. Formatting preserved perfectly every time.',
        },
      ]}
        relatedTools={[
        { name: 'PDF to Excel', slug: 'pdf-to-excel' },
        { name: 'Word to PDF', slug: 'word-to-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
      ]}
        faqs={[
        {
          q: 'How do I convert Excel files to PDF?',
          a: 'Upload your Excel file (.xls, .xlsx), choose your preferences (single sheet or all sheets), click Convert, and download your PDF. Takes just seconds!',
        },
        {
          q: 'Does it preserve Excel formatting?',
          a: 'Yes! All colors, fonts, borders, images, and formatting are preserved perfectly. Your PDF looks exactly like your Excel spreadsheet.',
        },
        {
          q: 'Can I convert multiple sheets from one workbook?',
          a: 'Yes! Convert single sheets or entire workbooks with multiple sheets. Each sheet becomes a PDF page.',
        },
        {
          q: 'What about formulas and calculations?',
          a: 'Formulas are calculated and results are shown as values in the PDF. The formula bar will not appear in the PDF.',
        },
        {
          q: 'Can I convert multiple Excel files at once?',
          a: 'Yes! Batch convert multiple Excel files. Upload all files and download all PDFs at the same time.',
        },
        {
          q: 'Does it work with all Excel versions?',
          a: 'Yes! Converts Excel 97-2003 (.xls), Excel 2007+ (.xlsx), and Excel macro files (.xlsm). All formats supported.',
        },
        {
          q: 'How large can Excel files be?',
          a: 'No file size limits! Convert spreadsheets with thousands of rows, complex formulas, and multiple sheets.',
        },
        {
          q: 'Is the PDF editable after conversion?',
          a: 'PDFs are not editable by default, which is perfect for sharing finalized reports. You can always convert again if needed.',
        },
        {
          q: 'How secure is the conversion?',
          a: 'Your files are encrypted during processing and automatically deleted within 24 hours. We never store files or share data.',
        },
        {
          q: 'Works on mobile devices?',
          a: 'Absolutely! Convert Excel files on phones, tablets, and computers. All processing happens online through your browser.',
        },
        {
          q: 'Is there any cost?',
          a: '100% free! No registration, no subscription, no hidden fees. Convert unlimited Excel files to PDF completely free.',
        },
        {
          q: 'What about Excel charts and images?',
          a: 'Charts, images, and all embedded objects are preserved perfectly in the PDF. Everything converts accurately.',
        },
      ]}
        primaryKeyword="Excel to PDF"
        secondaryKeywords={['convert Excel to PDF', 'spreadsheet to PDF', 'XLSX to PDF', 'Excel conversion']}
      />
    </>
  );
}
