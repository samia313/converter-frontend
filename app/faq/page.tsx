import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDFilio FAQ | PDF Tools, File Limits, AI Features and Privacy',
  description: 'Get answers about PDFilio PDF conversion tools, supported formats, file-size limits, AI features, file handling, accounts, and support.',
  alternates: { canonical: 'https://pdfilio.com/faq' },
  openGraph: {
    title: 'PDFilio FAQ | Frequently Asked Questions',
    description: 'Answers about using PDFilio PDF tools, conversion, AI features, privacy, and troubleshooting.',
    url: 'https://pdfilio.com/faq',
    type: 'website',
  },
}

const faqs = [
  { q: 'What is PDFilio?', a: 'PDFilio is an online service with PDF tools for tasks such as merging, splitting, compressing, converting, organizing, and extracting document content. Available tools and supported formats are listed on the relevant tool pages.' },
  { q: 'Are PDFilio tools free?', a: 'Tools marked free can be used without payment. Some features may have account, usage, or payment requirements. Check the tool page and any in-product price or checkout details before using a feature.' },
  { q: 'How do I convert a PDF to Word?', a: 'Open the PDF to Word tool, select your PDF, follow the on-screen steps, and download the result when processing finishes. Complex layouts, scanned pages, fonts, and tables may not convert perfectly, so review the output before using it.' },
  { q: 'Which file formats are supported?', a: 'Supported formats depend on the tool. Visit the relevant converter page to see accepted input types and available output formats before uploading a file.' },
  { q: 'Is there a file-size limit?', a: 'Limits can vary by tool and may change as the service evolves. Check the uploader and instructions on the specific tool page; do not assume every tool has the same limit.' },
  { q: 'Does PDFilio process files in my browser or on a server?', a: 'Processing method depends on the tool. Some operations may run in your browser, while others may use server-side processing or third-party infrastructure. Check the relevant tool and privacy information for details.' },
  { q: 'How long are uploaded files kept?', a: 'PDFilio is not intended as permanent document storage, but retention may differ by tool and processing path. We do not promise one fixed deletion period for every feature. Keep your own backup of important files.' },
  { q: 'Is it safe to upload confidential documents?', a: 'Only upload documents you are authorized to process and consider their sensitivity before using any online service. No internet service can guarantee absolute security. Review the Privacy Policy and Security & Privacy page before uploading sensitive files.' },
  { q: 'Does AI always return an exact result?', a: 'No. AI-generated summaries, translations, rewrites, and extracted answers can contain errors or omit context. Verify important details against the original document, especially for legal, financial, medical, or other high-impact decisions.' },
  { q: 'Why did my converted file look different?', a: 'PDF and office formats represent layouts differently. Fonts, tables, columns, scanned pages, and complex graphics may shift during conversion. Try a clearer source file and review the output before relying on it.' },
  { q: 'Do I need an account?', a: 'Account requirements depend on the feature. If a tool asks you to sign in, follow the instructions shown there.' },
  { q: 'How do I get help or report a problem?', a: 'Email support@pdfilio.com or use the Contact page. Include the tool name, a description of the issue, and the steps that led to it. Avoid emailing confidential documents unless support specifically explains a safe method.' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500"><Link href="/" className="hover:underline">Home</Link><span className="mx-2">/</span><span aria-current="page">FAQ</span></nav>
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">Help center</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">Find practical answers about PDF conversion, AI features, supported formats, privacy, and troubleshooting on PDFilio.</p>
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((item) => <details key={item.q} className="group rounded-xl border border-gray-200 bg-white p-5 open:border-gray-300">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-900"><span>{item.q}</span><span aria-hidden="true" className="text-red-600 group-open:rotate-45">+</span></summary>
            <p className="mt-4 max-w-3xl leading-7 text-gray-600">{item.a}</p>
          </details>)}
        </div>
      </section>
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Still need help?</h2>
          <p className="mt-3 leading-7 text-gray-600">Browse the tools or contact our support team if your question is not answered here.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/tools" className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white">Browse PDF tools</Link><Link href="/contact" className="rounded-lg border border-gray-300 px-5 py-3 font-semibold">Contact support</Link><Link href="/pricing" className="rounded-lg border border-gray-300 px-5 py-3 font-semibold">Pricing</Link></div>
        </div>
      </section>
    </main>
  )
}
