import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | PDFilio',
  description: 'Terms governing use of PDFilio online PDF and document tools.',
  alternates: { canonical: 'https://pdfilio.com/terms' },
}

export default function TermsPage() {
  return <main className="mx-auto max-w-4xl px-6 py-16"><h1 className="text-4xl font-bold">Terms of Service</h1><p className="mt-4 text-sm text-gray-500">Last updated: August 18, 2026</p><div className="prose prose-gray mt-10 max-w-none"><h2>1. Acceptable use</h2><p>Use PDFilio only for lawful purposes and only with files and content you are authorized to process.</p><h2>2. Service</h2><p>PDFilio is provided as an online document-processing service. Features, limits, availability, and supported formats may change as the service is improved.</p><h2>3. User responsibility</h2><p>You are responsible for the documents you upload, the legality of your use, and keeping appropriate backups of important files.</p><h2>4. Availability</h2><p>We aim to keep the service reliable but cannot guarantee uninterrupted availability or that every file will process successfully.</p><h2>5. Intellectual property</h2><p>You retain rights to your uploaded content. PDFilio retains rights in its website, software, branding, and original service materials.</p><h2>6. Contact</h2><p>Questions about these terms can be sent through the PDFilio Contact page.</p></div></main>
}
