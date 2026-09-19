import type { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import FlattenPdfTool from '@/components/tools/flatten-pdf-tool';

export const metadata: Metadata = {
  title: 'Flatten PDF Online – Flatten PDF Form Fields | PDFilio',
  description: 'Flatten supported PDF form fields online so entered values become part of the page appearance and are no longer interactive.',
  keywords: ['flatten PDF', 'flatten PDF online', 'flatten PDF form', 'PDF form flattening', 'make PDF form non editable'],
  alternates: { canonical: 'https://pdfilio.com/flatten-pdf' },
  openGraph: {
    title: 'Flatten PDF Online – Flatten PDF Form Fields | PDFilio',
    description: 'Flatten supported interactive PDF form fields into a non-editable page appearance.',
    url: 'https://pdfilio.com/flatten-pdf',
    type: 'website',
  },
};

export default function FlattenPdfPage() {
  return (
    <>
      <FlattenPdfTool />
      <ToolLandingLayout
        toolName="Flatten PDF"
        toolSlug="flatten-pdf"
        description="Flatten supported interactive PDF form fields so their displayed values become part of the page appearance and the fields are no longer editable."
        heroImage="/tool-images/flatten-pdf-hero.png"
        mainContent={`Flattening a PDF is useful when you want completed form fields to become part of the document's fixed appearance. PDFilio uses the PDF form structure available in supported files and creates a separate flattened PDF, leaving your original file unchanged.

Flattening is different from removing PDF security. It does not decrypt an encrypted PDF or bypass an opening password. Results can vary for unusual form widgets or unsupported PDF features, so review the downloaded PDF before sharing or archiving it.`}
        useCase={`Finalizing completed PDF forms
Preventing accidental edits to entered form values
Preparing completed forms for sharing
Archiving filled PDF applications
Locking supported form field appearances
Preparing a filled form for printing
Creating a fixed copy while keeping the original
Standardizing completed PDF paperwork`}
        features={[
          'Supported interactive PDF form flattening',
          'Separate flattened output file',
          'Original PDF remains unchanged',
          '100 MB upload limit',
          'Browser-based workflow',
          'Works on supported mobile and desktop browsers',
          'No password bypassing',
          'Clear output naming',
        ]}
        benefits={[
          'Keep completed form values fixed',
          'Reduce accidental form-field edits',
          'Create a separate archive-ready copy',
          'Keep the original interactive PDF',
          'Use a simple browser workflow',
          'Review the resulting PDF before distribution',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'What does flattening a PDF mean?', a: 'Flattening supported PDF form fields turns their displayed values into part of the page appearance so the fields are no longer interactive.' },
          { q: 'Will flattening remove my typed form values?', a: 'For supported PDF form fields, the displayed values are preserved in the flattened page appearance. Always review the output before relying on it.' },
          { q: 'Can I edit a PDF after flattening it?', a: 'The flattened form fields are no longer interactive. You can still use other PDF editing methods that operate on page content.' },
          { q: 'Does flattening remove a PDF password?', a: 'No. Flattening does not bypass encryption or remove an opening password.' },
          { q: 'Does flattening change the original PDF?', a: 'No. PDFilio creates a separate flattened PDF and does not overwrite your uploaded file.' },
          { q: 'Can I flatten a PDF on my phone?', a: 'Yes, the browser-based workflow is designed for supported phones, tablets, and desktop browsers.' },
          { q: 'Why did my PDF fail to flatten?', a: 'The PDF may be encrypted, malformed, or contain form features that the current PDF processing library cannot support.' },
          { q: 'Can I flatten a PDF without filling its fields?', a: 'Yes. The tool can flatten supported fields as they currently appear, including blank fields, but you should review the result.' },
        ]}
        relatedTools={[
          { name: 'Edit PDF', slug: 'edit-pdf' },
          { name: 'Sign PDF', slug: 'sign-pdf' },
          { name: 'Protect PDF', slug: 'protect-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Watermark PDF', slug: 'watermark-pdf' },
        ]}
        primaryKeyword="flatten PDF"
        secondaryKeywords={['flatten PDF online', 'flatten PDF form', 'PDF form flattening', 'make PDF form non editable']}
      />
    </>
  );
}
