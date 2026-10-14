import Link from 'next/link'
import type { Metadata } from 'next'
import PricingPlans from './pricing-plans'

export const metadata: Metadata = {
  title: 'Pricing | Free PDF Tools and AI Features',
  description: 'Explore PDFilio’s free online PDF tools and learn how access, limits, and availability work for AI and premium features.',
  alternates: { canonical: 'https://pdfilio.com/pricing' },
  openGraph: {
    title: 'PDFilio Pricing | Free PDF Tools and AI Features',
    description: 'Compare PDFilio’s free PDF tools with features that may have separate access or usage limits.',
    url: 'https://pdfilio.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFilio Pricing | Free PDF Tools and AI Features',
    description: 'Explore PDFilio’s free online PDF tools and learn how access, limits, and availability work for AI and premium features.',
    images: ['/icon-512x512.png'],
  },
}

const included = [
  'Access to the available online PDF tools',
  'Common PDF workflows including merge, split, compression, and conversion',
  'No payment required to try tools that are marked free',
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
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 max-w-3xl leading-7 text-gray-600">
            Choose a plan in USD. PDFilio’s proposed prices are deliberately below publicly listed competitor benchmarks. Before paying, verify the included features, limits, billing interval, and cancellation terms in checkout.
          </p>
          <PricingPlans />
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-bold">Free plan</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">$0. Use tools marked free, subject to each tool’s stated limits and availability.</p>
            <Link href="/tools" className="mt-3 inline-flex font-semibold text-red-700 hover:underline">Browse free tools →</Link>
          </div>
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
