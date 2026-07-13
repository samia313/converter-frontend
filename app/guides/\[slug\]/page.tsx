import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides } from '@/lib/content/guides'

export const dynamicParams = true

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/guides"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          ← Back to Guides
        </Link>

        <h1 className="mb-4 text-4xl font-bold">{guide.title}</h1>

        <div className="mb-6 flex flex-col gap-4 rounded-lg bg-gray-50 p-4">
          <div>
            <p className="text-sm font-semibold text-gray-600">Tool</p>
            <p className="text-lg font-medium capitalize">{guide.tool}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Difficulty Level</p>
            <p className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium capitalize text-yellow-800">
              {guide.difficulty}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {guide.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="prose max-w-none space-y-6 text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold">What You&apos;ll Learn</h2>
            <p>
              This guide walks you through everything you need to know about{' '}
              {guide.title.toLowerCase()}. By the end, you&apos;ll be able to
              complete this task efficiently and confidently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Prerequisites</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Access to PDFilio (free online tool)</li>
              <li>Your PDF document ready to process</li>
              <li>Basic understanding of PDF files</li>
              <li>5-10 minutes of free time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Step-by-Step Instructions</h2>

            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold">Step 1: Prepare Your Document</h3>
                <p>
                  First, gather your document and ensure it&apos;s in PDF format.
                  If you have a different format, you may need to convert it first
                  using PDFilio&apos;s conversion tools.
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold">Step 2: Upload to PDFilio</h3>
                <p>
                  Go to PDFilio and select the appropriate tool for your task.
                  Click the upload button and select your document. You can also
                  drag and drop your file.
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold">Step 3: Configure Settings</h3>
                <p>
                  Configure any necessary settings based on your specific needs.
                  Different operations may have different options available.
                  Review each option carefully before proceeding.
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold">Step 4: Process Your Document</h3>
                <p>
                  Click the process or convert button to start the operation.
                  Processing usually takes just a few seconds depending on file
                  size.
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-semibold">Step 5: Download Results</h3>
                <p>
                  Once processing is complete, download your result immediately.
                  The file will be ready to use right away. No sign-up required!
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Tips & Tricks</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Start with smaller files to get familiar with the process</li>
              <li>
                Experiment with different settings to find the best result for your
                needs
              </li>
              <li>Save your processed documents in an organized folder</li>
              <li>Share results with others by simply sending the file</li>
              <li>Use batch processing for multiple files when available</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">
                  Q: What if the process fails?
                </h3>
                <p>
                  Try uploading a different file or clearing your browser cache.
                  PDFilio is very reliable, but occasional issues can be resolved
                  by refreshing and trying again.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Q: Can I process multiple files?
                </h3>
                <p>
                  Yes! Many operations support batch processing. Upload multiple
                  files at once to save time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Q: How long does processing take?</h3>
                <p>
                  Most operations complete in seconds. Very large files may take
                  slightly longer, but typically still under a minute.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Next Steps</h2>
            <p>
              Now that you&apos;ve completed {guide.title.toLowerCase()}, you can:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Explore other PDFilio features</li>
              <li>Try advanced options and settings</li>
              <li>Share your knowledge with others</li>
              <li>Automate your workflow with batch processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Conclusion</h2>
            <p>
              You&apos;ve successfully learned how to {guide.title.toLowerCase()}{' '}
              using PDFilio. This skill will help you work more efficiently with
              your documents. Practice these steps with your own files and soon
              you&apos;ll be able to do this without thinking!
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-green-50 p-6">
          <h3 className="text-xl font-semibold">Ready to try it yourself?</h3>
          <p className="mt-2 text-gray-700">
            Put this guide into practice with PDFilio right now. It&apos;s free and
            takes just minutes to get started.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            Start {guide.title}
          </Link>
        </div>
      </article>
    </main>
  )
}
