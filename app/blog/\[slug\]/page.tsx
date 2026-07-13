import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts } from '@/lib/content/blog-posts'

export const dynamicParams = true

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          ← Back to Blog
        </Link>

        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

        <div className="mb-6 flex flex-col gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Category:</span>
            <span className="capitalize">{post.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Tool:</span>
            <span className="capitalize">{post.tool}</span>
          </div>
        </div>

        <p className="mb-6 text-lg text-gray-700">{post.description}</p>

        <div className="mb-8 flex flex-wrap gap-2">
          {post.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="prose max-w-none space-y-6 text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p>
              {post.title} is an essential topic for anyone working with PDF
              documents. This comprehensive guide explores best practices,
              techniques, and tools to help you achieve your goals efficiently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Understanding the Basics</h2>
            <p>
              Before diving into the specifics, it&apos;s important to understand
              the fundamental concepts. {post.tool} provides robust capabilities
              for handling various {post.category} scenarios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Step-by-Step Guide</h2>
            <ol className="list-inside list-decimal space-y-2">
              <li>Start by uploading your document</li>
              <li>Configure the necessary settings</li>
              <li>Process your document</li>
              <li>Download the results</li>
              <li>Share or store as needed</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Best Practices</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Always keep backup copies of important documents</li>
              <li>Test with small files before processing large batches</li>
              <li>Verify the quality of processed documents</li>
              <li>Organize your files systematically</li>
              <li>Use descriptive file names for easy tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Common Challenges & Solutions</h2>
            <p>
              Many users encounter similar challenges when working with {post.tool}
              . Understanding these common issues and their solutions can save you
              time and frustration.
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Quality Issues:</strong> Use lower compression settings
              </li>
              <li>
                <strong>Processing Delays:</strong> Process smaller batches
              </li>
              <li>
                <strong>Format Problems:</strong> Ensure source file compatibility
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Advanced Tips</h2>
            <p>
              For power users, here are some advanced techniques to maximize
              efficiency:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Batch processing for large volumes</li>
              <li>Automation through API integration</li>
              <li>Custom workflow optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p>
              {post.title} is made simple and efficient with the right tools and
              knowledge. By following this guide, you&apos;ll be able to handle your
              documents with confidence and proficiency. Start using PDFilio today
              and experience the difference!
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-blue-50 p-6">
          <h3 className="text-xl font-semibold">Ready to get started?</h3>
          <p className="mt-2 text-gray-700">
            Put these tips into practice with PDFilio. Try for free today.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Try PDFilio Free
          </Link>
        </div>
      </article>
    </main>
  )
}
