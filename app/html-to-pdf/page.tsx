import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import HtmlToPdfTool from '@/components/tools/html-to-pdf-tool';

export const metadata: Metadata = {
  title: 'HTML to PDF Online – Convert Web Pages and HTML Files | PDFilio',
  description: 'Convert supported HTML content to PDF online with PDFilio. Prepare printable documents, reports, invoices, web pages, and other HTML-based files for sharing or archiving.',
  keywords: ['HTML to PDF', 'HTML to PDF online', 'convert HTML to PDF', 'HTML file to PDF', 'web page to PDF', 'HTML PDF converter'],
  alternates: { canonical: 'https://pdfilio.com/html-to-pdf' },
  openGraph: {
    title: 'HTML to PDF Online – Convert HTML to PDF | PDFilio',
    description: 'Convert supported HTML content into PDF documents for printing, sharing, archiving, and professional document workflows.',
    url: 'https://pdfilio.com/html-to-pdf',
    type: 'website',
  },
};

export default function HtmlToPdfToolPage() {
  return (
    <>
      <HtmlToPdfTool />
      <ToolLandingLayout
        toolName="HTML to PDF"
        toolSlug="html-to-pdf"
        description="Convert supported HTML content into PDF documents and review the final file before sharing, printing, or archiving."
        heroImage="/tool-images/html-to-pdf-hero.png"
        mainContent={`HTML to PDF helps turn supported HTML content into a portable PDF document. Converting HTML to PDF can be useful when you need a fixed-layout version of a web page, report, invoice, article, form, or other browser-based document that is easier to print, share, or archive.

The final appearance of an HTML document can depend on its CSS, fonts, images, external resources, page size, and print settings. For that reason, always review the generated PDF before using it for an important submission or publication. Complex scripts, interactive elements, external assets, and responsive layouts may not behave exactly like a live web page after conversion.

For best results, use clean HTML and verify page breaks, margins, images, fonts, links, headers, and footers in the resulting PDF. Keep the original HTML when you may need to make further changes later.`}
        useCase={[
          'Converting HTML documents to PDF',
          'Preparing web pages for printing',
          'Creating PDF reports from HTML',
          'Preparing invoices and business documents',
          'Archiving fixed-layout copies of web content',
          'Sharing printable versions of HTML documents',
          'Preparing HTML-based forms for distribution',
          'Creating PDF copies for offline review',
        ].join('\n')}
        features={[
          'Browser-based HTML to PDF workflow',
          'Supported HTML content conversion',
          'PDF output for printing and sharing',
          'Useful for reports and business documents',
          'Reviewable converted output',
          'Mobile and desktop browser access',
          'HTML-to-PDF document workflow',
          'Related PDF conversion tools',
        ]}
        benefits={[
          'Create fixed-layout PDF copies of supported HTML content',
          'Prepare web-based documents for printing',
          'Share HTML content in a widely supported document format',
          'Create archival copies for offline reference',
          'Prepare reports and invoices for distribution',
          'Review the final PDF before sending or publishing',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert HTML to PDF?', a: 'Open HTML to PDF, provide supported HTML content through the available workflow, start the conversion, review the generated PDF, and download it when it is ready.' },
          { q: 'Can I convert an HTML file to PDF?', a: 'If the current workflow accepts the HTML file format, you can upload supported HTML content and convert it to PDF.' },
          { q: 'Can I convert a web page to PDF?', a: 'A web page can be converted when its content is supported by the current HTML-to-PDF workflow. Dynamic pages, external resources, and interactive elements may not reproduce exactly.' },
          { q: 'Why does my converted PDF look different from the web page?', a: 'HTML is responsive and interactive, while PDF uses a fixed page layout. CSS, fonts, images, page dimensions, print styles, and external resources can affect the final result.' },
          { q: 'Can I convert HTML to PDF on my phone?', a: 'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Will images and fonts be preserved?', a: 'Supported images and fonts may be preserved, but external assets, unavailable fonts, cross-origin resources, and complex page layouts can affect the output. Review the generated PDF.' },
          { q: 'Can I convert an HTML report to PDF?', a: 'Yes, HTML reports are a common use case when the report content and resources are supported by the conversion workflow.' },
          { q: 'Can I create invoices from HTML?', a: 'HTML-based invoices can be converted to PDF when supported. Check page breaks, totals, logos, fonts, and alignment in the final document.' },
          { q: 'Does HTML to PDF preserve links?', a: 'Link preservation depends on the conversion engine and document structure. Test important links in the generated PDF before distribution.' },
          { q: 'Can JavaScript or interactive HTML be converted?', a: 'Interactive behavior may not carry over to a fixed PDF. Scripts and dynamic content can depend on browser rendering and external resources.' },
          { q: 'How can I get better HTML-to-PDF results?', a: 'Use clean HTML and CSS, make sure required assets are available, define appropriate print styles and page dimensions, and review margins, page breaks, fonts, and images after conversion.' },
          { q: 'Should I keep the original HTML?', a: 'Yes. Keep the source HTML when you may need to correct content or regenerate the PDF later.' },
          { q: 'Is HTML to PDF free?', a: 'PDFilio provides the online HTML-to-PDF workflow; current usage limits, account requirements, and available features depend on the product configuration shown in the interface.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Edit PDF', slug: 'edit-pdf' },
        ]}
        primaryKeyword="HTML to PDF"
        secondaryKeywords={['HTML to PDF online', 'convert HTML to PDF', 'HTML file to PDF', 'web page to PDF', 'HTML PDF converter']}
      />
    </>
  );
}
