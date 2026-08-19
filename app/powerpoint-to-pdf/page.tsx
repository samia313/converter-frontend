import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PowerpointToPdfTool from '@/components/tools/powerpoint-to-pdf-tool';

export const metadata: Metadata = {
  title: 'PowerPoint to PDF Converter Online – Convert PPT & PPTX to PDF | PDFilio',
  description: 'Convert supported PowerPoint PPT and PPTX presentations to PDF online. Prepare slides for sharing, printing, review, submission, and archiving.',
  keywords: ['PowerPoint to PDF', 'PPT to PDF', 'PPTX to PDF', 'PowerPoint to PDF converter', 'convert PowerPoint to PDF', 'presentation to PDF', 'PowerPoint PDF'],
  alternates: { canonical: 'https://pdfilio.com/powerpoint-to-pdf' },
  openGraph: {
    title: 'PowerPoint to PDF Converter Online | PDFilio',
    description: 'Convert supported PPT and PPTX presentations into PDF files for sharing, printing, and document workflows.',
    url: 'https://pdfilio.com/powerpoint-to-pdf',
    type: 'website',
  },
};

export default function PowerpointToPdfToolPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PowerPoint to PDF',
    description: 'Convert supported PowerPoint presentations to PDF format.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <PowerpointToPdfTool />
      <ToolLandingLayout
        toolName="PowerPoint to PDF"
        toolSlug="powerpoint-to-pdf"
        description="Convert supported PPT and PPTX presentations into PDF files for sharing, printing, review, submission, and archiving."
        heroImage="/tool-images/powerpoint-to-pdf-hero.png"
        mainContent={`PowerPoint to PDF converts supported PowerPoint presentations into PDF documents. PDF can be useful when you want to share slides in a consistent document format, prepare presentations for printing, submit them through an upload portal, or archive a finished deck.

The final PDF can depend on slide size, fonts, images, charts, animations, transitions, speaker notes, embedded media, and the conversion engine. Animations and interactive presentation features are not equivalent to their original PowerPoint behavior in a static PDF. Review important presentations after conversion.

Typical workflow: upload a supported PPT or PPTX presentation, start the conversion, review the generated PDF, and download it for your next document workflow. Current supported formats and processing limits depend on the tool configuration shown in the interface.`}
        useCase={[
          'Sharing presentations as PDF handouts',
          'Preparing slides for printing',
          'Submitting presentations to portals or clients',
          'Archiving completed slide decks',
          'Creating fixed-format copies of presentations',
          'Sharing presentation content across devices',
          'Preparing slides for review and approval',
          'Distributing presentation documents by email',
        ].join('\n')}
        features={[
          'PPT and PPTX to PDF conversion',
          'PDF presentation output',
          'Browser-based workflow',
          'Useful for slide decks and handouts',
          'Supported desktop and mobile browser access',
          'Downloadable PDF output',
          'Simple upload and conversion process',
          'Related PDF document tools',
        ]}
        benefits={[
          'Create a shareable PDF version of a presentation',
          'Prepare slides for printing and submission',
          'Reduce manual presentation-to-PDF work',
          'Keep completed presentations in a common distribution format',
          'Make slide sharing easier across devices',
          'Create fixed-format copies for review and archiving',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert PowerPoint to PDF online?', a: 'Upload a supported PPT or PPTX presentation, start the conversion, review the generated PDF, and download the result.' },
          { q: 'Can I convert PPTX to PDF?', a: 'Yes. Supported PPTX presentations can be converted into PDF files through the PowerPoint-to-PDF workflow.' },
          { q: 'Can I convert PPT to PDF?', a: 'If the current uploader accepts PPT files, they can be processed through the conversion workflow. Follow the formats shown by the tool interface.' },
          { q: 'Will PowerPoint formatting be preserved exactly?', a: 'Exact preservation is not guaranteed for every presentation. Fonts, images, charts, slide layouts, embedded content, and other presentation features can affect the final PDF.' },
          { q: 'Are PowerPoint animations preserved in PDF?', a: 'No. PDF is a static document format, so slide animations and transitions do not behave like they do in PowerPoint.' },
          { q: 'Can I convert presentation slides to a PDF handout?', a: 'Yes. A presentation converted to PDF can be used as a slide-based document for sharing or printing, subject to the resulting layout.' },
          { q: 'Can I convert a presentation with images and charts?', a: 'Supported presentations containing images and charts can be processed, but complex slides should be reviewed after conversion.' },
          { q: 'Can I use PowerPoint to PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need Microsoft PowerPoint installed?', a: 'No separate PowerPoint installation is required for the online conversion workflow, provided your presentation is in a supported format.' },
          { q: 'How long does PowerPoint to PDF conversion take?', a: 'Processing time depends on presentation size, number of slides, embedded content, complexity, and current system resources.' },
          { q: 'Is PowerPoint to PDF free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'Should I check the PDF after conversion?', a: 'Yes. For important presentations, check slide order, fonts, images, charts, page size, text placement, and other critical content before distributing the PDF.' },
          { q: 'Can I edit the PDF like a PowerPoint presentation?', a: 'A PDF is primarily a distribution format and does not provide the same slide-editing features as PowerPoint. Keep the original presentation for substantial edits.' },
        ]}
        relatedTools={[
          { name: 'Word to PDF', slug: 'word-to-pdf' },
          { name: 'Excel to PDF', slug: 'excel-to-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        primaryKeyword="PowerPoint to PDF"
        secondaryKeywords={['PPT to PDF', 'PPTX to PDF', 'PowerPoint to PDF converter', 'convert PowerPoint to PDF', 'presentation to PDF', 'PowerPoint PDF']}
        schema={schema}
      />
    </>
  );
}
