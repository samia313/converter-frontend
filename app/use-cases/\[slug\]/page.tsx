import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useCases } from '@/lib/content/use-cases'

export const dynamicParams = true

export async function generateStaticParams() {
  return useCases.map((uc) => ({
    slug: uc.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const useCase = useCases.find((u) => u.slug === slug)

  if (!useCase) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/use-cases"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          ← Back to Use Cases
        </Link>

        <h1 className="mb-4 text-4xl font-bold">{useCase.title}</h1>

        <div className="mb-6 flex flex-col gap-4 rounded-lg bg-gray-50 p-4">
          <div>
            <p className="text-sm font-semibold text-gray-600">Tool</p>
            <p className="text-lg font-medium capitalize">{useCase.tool}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Category</p>
            <p className="text-lg font-medium capitalize">{useCase.category}</p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {useCase.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-gray-700">
              This use case explores how {useCase.category} can effectively use{' '}
              {useCase.tool} to streamline their workflows and improve
              productivity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">The Challenge</h2>
            <p className="mt-4 text-gray-700">
              {useCase.category} face unique challenges when working with PDF
              documents. Managing, processing, and sharing documents efficiently
              can be time-consuming and prone to errors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">The Solution</h2>
            <p className="mt-4 text-gray-700">
              {useCase.tool} provides the perfect solution for {useCase.category}
              . With its powerful features and intuitive interface, document
              processing becomes simple and efficient.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Key Benefits</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
              <li>Save time on document processing</li>
              <li>Improve document quality and consistency</li>
              <li>Enhance collaboration and sharing</li>
              <li>Reduce storage requirements</li>
              <li>Streamline workflows and processes</li>
              <li>Increase productivity and efficiency</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Real-World Example</h2>
            <p className="mt-4 text-gray-700">
              A typical {useCase.category} workflow using {useCase.tool}:
            </p>
            <ol className="mt-4 list-inside list-decimal space-y-2 text-gray-700">
              <li>Upload PDF documents</li>
              <li>Process with {useCase.tool}</li>
              <li>Share results with stakeholders</li>
              <li>Archive for future reference</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Getting Started</h2>
            <p className="mt-4 text-gray-700">
              Getting started with {useCase.tool} is easy. Simply upload your
              documents and start processing immediately. No sign-up required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p className="mt-4 text-gray-700">
              {useCase.tool} is the ideal solution for {useCase.category} who need
              efficient, reliable, and easy-to-use document processing
              capabilities.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-green-50 p-6">
          <h3 className="text-xl font-semibold">Start Your Journey Today</h3>
          <p className="mt-2 text-gray-700">
            Try {useCase.tool} now and experience how it can transform your
            workflow.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            Try {useCase.tool} Free
          </Link>
        </div>
      </article>
    </main>
  )
}
