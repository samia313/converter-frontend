import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

const SITE_URL = 'https://pdfilio.com';
import RedactPdfTool from '@/components/tools/redact-pdf-tool';

export const metadata: Metadata = {
  title: 'Redact PDF Online – Permanently Remove Sensitive Information | PDFilio',
  description: 'Redact sensitive information from supported PDF files online. Remove or obscure confidential text and review the result before sharing.',
  keywords: ['redact PDF', 'PDF redaction', 'redact PDF online', 'remove sensitive information from PDF'],
  alternates: { canonical: `${SITE_URL}/redact-pdf` },
  openGraph: {
    title: 'Redact PDF Online – Remove Sensitive Information | PDFilio',
    description: 'Redact sensitive information from supported PDF files online with PDFilio.',
    url: `${SITE_URL}/redact-pdf`,
    type: 'website',
  },
};

export default function RedactPdfToolPage() {
  return (
    <>
      <RedactPdfTool />
      <ToolLandingLayout
        toolName="Redact PDF"
        toolSlug="redact-pdf"
        description="Redact sensitive information from supported PDF files online. Review the result before sharing confidential documents."
        heroImage="/tool-images/redact-pdf-hero.png"
        mainContent="Use PDFilio to redact sensitive information from supported PDF files. Redaction is useful for removing confidential text before a document is shared, submitted, or published. Always review the final PDF to confirm that sensitive information is no longer visible or recoverable."
        useCase="Redact contracts, reports, forms, applications, invoices, and other PDFs before sharing them with people who should not see confidential information."
        features={['Redact sensitive PDF content', 'Review the processed document', 'Browser-based workflow', 'Useful for confidential documents', 'Works across supported modern devices']}
        benefits={['Reduce accidental disclosure', 'Prepare documents for sharing', 'Keep confidential information out of copies', 'Review the final result before distribution', 'Use a simple browser workflow']}
        faqs={[
          { q: 'What does it mean to redact a PDF?', a: 'PDF redaction is the process of removing or obscuring sensitive information so it is not exposed in the version shared with others.' },
          { q: 'What information can I redact?', a: 'Common examples include names, addresses, account details, identification numbers, confidential clauses, and other sensitive text or content supported by the tool.' },
          { q: 'Is redaction the same as highlighting text?', a: 'No. A visual highlight or black rectangle may only cover text. A proper redaction workflow should remove or securely obscure the underlying sensitive content.' },
          { q: 'Should I review a redacted PDF?', a: 'Yes. Always inspect the final PDF and test sensitive areas before distributing an important document.' },
          { q: 'Can I redact a PDF on my phone?', a: 'The browser-based workflow can be accessed from supported modern phones, tablets, and desktop browsers.' },
          { q: 'Can I redact contracts and legal documents?', a: 'Yes, redaction can be useful for contracts and legal documents when confidential information must be withheld. For legally significant documents, verify the final output carefully.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        primaryKeyword="redact PDF"
        secondaryKeywords={['redact PDF online', 'PDF redaction', 'remove sensitive information from PDF', 'redact confidential information PDF']}
      />
    </>
  );
}
