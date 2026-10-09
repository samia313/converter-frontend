import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDFilio Pricing | Free PDF Tools and AI Features',
  description: 'Explore PDFilio’s free online PDF tools and learn how access, limits, and availability work for AI and premium features.',
  alternates: { canonical: 'https://pdfilio.com/pricing' },
  openGraph: {
    title: 'PDFilio Pricing | Free PDF Tools and AI Features',
    description: 'Compare PDFilio’s free PDF tools with features that may have separate access or usage limits.',
    url: 'https://pdfilio.com/pricing',
    type: 'website',
  },
}

const included = [
  'Access to the available online PDF tools',
  'Common PDF workflows including merge, split, compression, and conversion',
  'No payment required to try tools that are marked free',
]

const notes = [
  { title: 'Free PDF tools', body: 'Start with the free tools available on PDFilio. Each tool page explains its supported formats and any file or usage limits that apply.' },
  { title: 'AI and advanced features', body: 'Availability, account requirements, and usage limits can differ by feature. Check the relevant tool page or in-product prompt before relying on a particular limit or capability.' },
  { title: 'Premium billing', body: 'PDFilio does not currently publish a verified price list on this page. We do not want to display an outdated or unverified subscription price. If a paid option is shown in the product, review its price, billing period, renewal, and cancellation terms before confirming payment.' },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:underline">Home</Link><span className="mx-2">/</span><span aria-current="page">Pricing</span>
          </nav>
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">Simple, transparent access</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">PDFilio Pricing</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Start with available free PDF tools. Feature access, supported formats, file-size limits, and AI usage can vary by tool, so check the details shown on the tool you plan to use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools" className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700">Explore PDF tools</Link>
            <Link href="/faq" className="rounded-lg border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-50">Read pricing FAQs</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-green-700">Get started</p>
            <h2 className="mt-2 text-2xl font-bold">Free PDF tools</h2>
            <p className="mt-3 text-3xl font-black">$0 <span className="text-base font-medium text-gray-500">to use tools marked free</span></p>
            <p className="mt-4 leading-7 text-gray-600">Use available free tools for everyday PDF and document workflows. Limits and supported formats are shown on individual tool pages.</p>
            <ul className="mt-5 space-y-3">{included.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-gray-700"><span aria-hidden="true" className="font-bold text-green-700">✓</span><span>{item}</span></li>)}</ul>
            <Link href="/tools" className="mt-7 inline-flex font-semibold text-red-700 hover:underline">Browse free tools →</Link>
          </article>
          <article className="rounded-2xl border border-gray-200 p-7 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Feature-dependent</p>
            <h2 className="mt-2 text-2xl font-bold">AI and advanced tools</h2>
            <p className="mt-3 text-3xl font-black">Check in product</p>
            <p className="mt-4 leading-7 text-gray-600">Some AI or advanced features may have account, usage, or payment requirements. The current tool interface is the source of truth for availability and any price shown.</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
              <li>• AI PDF summary and document chat</li>
              <li>• PDF translation and rewriting</li>
              <li>• OCR and document extraction</li>
            </ul>
            <Link href="/ai-tools" className="mt-7 inline-flex font-semibold text-red-700 hover:underline">Explore AI tools →</Link>
          </article>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-3xl">What to check before paying</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {notes.map((note) => <article key={note.title} className="rounded-xl border border-gray-200 bg-white p-5"><h3 className="font-bold">{note.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{note.body}</p></article>)}
          </div>
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold">Need help with pricing?</h2>
            <p className="mt-2 leading-7 text-gray-600">If you have a question about a price or billing option displayed by PDFilio, contact support before purchasing.</p>
            <Link href="/contact" className="mt-4 inline-flex font-semibold text-red-700 hover:underline">Contact PDFilio support →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
