import { notFound } from 'next/navigation'
import Link from 'next/link'
import { comparisons } from '@/lib/content/comparisons'

export const dynamicParams = true

export async function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)

  if (!comparison) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/comparisons"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          ← Back to Comparisons
        </Link>

        <h1 className="mb-4 text-4xl font-bold">{comparison.title}</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {comparison.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">
              Comparing {comparison.competitor} with PDFilio
            </h2>
            <p className="mt-4 text-gray-700">
              This page compares {comparison.competitor} and PDFilio across
              multiple dimensions including features, pricing, performance, and
              user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Feature Comparison</h2>
            <p className="mt-4 text-gray-700">
              PDFilio offers comprehensive features including PDF compression,
              merging, splitting, conversion, and much more. Compare these
              features with {comparison.competitor} to make an informed decision.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Pricing</h2>
            <p className="mt-4 text-gray-700">
              PDFilio provides unlimited free features while {comparison.competitor}{' '}
              may charge for premium capabilities. Review pricing to understand the
              cost difference.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Performance</h2>
            <p className="mt-4 text-gray-700">
              Speed and reliability are crucial. PDFilio typically processes
              documents 2-5x faster than competitors, including{' '}
              {comparison.competitor}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="mt-4 text-gray-700">
              Based on comprehensive comparison, PDFilio offers superior value with
              unlimited free features, faster performance, and better support
              compared to {comparison.competitor}.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-blue-50 p-6">
          <h3 className="text-xl font-semibold">Ready to try PDFilio?</h3>
          <p className="mt-2 text-gray-700">
            Experience the difference. Start using PDFilio today, completely free.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Get Started Free
          </Link>
        </div>
      </article>
    </main>
  )
}
