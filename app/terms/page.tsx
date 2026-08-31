import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of PDFilio online PDF and document tools.',
  alternates: { canonical: 'https://pdfilio.com/terms' },
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: August 31, 2026</p>
      <div className="prose prose-gray mt-10 max-w-none">
        <h2>1. Acceptable use</h2><p>Use PDFilio only for lawful purposes and only with files and content you are authorized to process. Do not use the service to violate privacy, intellectual-property, or other applicable laws.</p>
        <h2>2. Service and tool limits</h2><p>PDFilio provides browser-based PDF and document tools, plus selected AI features. Availability, supported formats, processing limits, and features may differ by tool and may change as the service is improved. Unless a page explicitly states a limit, do not assume that a tool supports unlimited file size, pages, files, or processing.</p>
        <h2>3. Uploaded files</h2><p>You remain responsible for the files you upload and for maintaining backups of important documents. PDFilio is not a permanent document-storage service. Temporary processing may occur in the browser or on our server infrastructure depending on the tool.</p>
        <h2>4. AI features</h2><p>Selected features use third-party AI or infrastructure services to perform requested tasks. AI results can contain errors and should be reviewed before being relied upon for legal, financial, medical, academic, or other high-impact decisions.</p>
        <h2>5. Availability and results</h2><p>We work to keep the service reliable, but cannot guarantee uninterrupted availability, error-free processing, or successful conversion of every file. Damaged, encrypted, unsupported, unusually complex, or image-only documents may require different processing or may fail.</p>
        <h2>6. Advertising and third-party services</h2><p>The website may display advertising and use analytics or other third-party services. Their processing is governed by their applicable policies. See the Privacy Policy and Cookie Policy for more information.</p>
        <h2>7. Intellectual property</h2><p>You retain rights to content you upload. PDFilio retains rights in its website, software, branding, and original service materials, subject to applicable law.</p>
        <h2>8. Changes</h2><p>Features, pricing, limits, and availability may change. Material changes to these terms will be reflected on this page.</p>
        <h2>9. Contact</h2><p>Questions about these terms can be sent to <a href="mailto:support@pdfilio.com">support@pdfilio.com</a> or through the <a href="/contact">Contact</a> page.</p>
      </div>
    </main>
  )
}
