import { notFound } from 'next/navigation'
import Link from 'next/link'
import { featurePages } from '@/lib/content/features'

export const dynamicParams = true

export async function generateStaticParams() {
  return featurePages.map((feature) => ({
    slug: feature.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const feature = featurePages.find((f) => f.slug === slug)

  if (!feature) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/features"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          ← Back to Features
        </Link>

        <h1 className="mb-4 text-4xl font-bold">{feature.title}</h1>

        <p className="mb-8 text-lg text-gray-700">{feature.description}</p>

        <div className="prose max-w-none space-y-8 text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p>
              {feature.title} is one of PDFilio&apos;s most powerful and versatile
              features. Whether you&apos;re a casual user or a professional, this
              feature can significantly improve your document workflow.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Key Benefits</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Save time on document processing</li>
              <li>Improve document quality and consistency</li>
              <li>Reduce manual work and errors</li>
              <li>Increase productivity and efficiency</li>
              <li>Work with documents on any device</li>
              <li>No installation or software required</li>
              <li>Completely free to use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">How It Works</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold">Step 1: Upload</h3>
                <p>Upload your document to PDFilio. The process is simple - just click the upload button or drag and drop your file.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold">Step 2: Configure</h3>
                <p>Select the options that match your needs. Our intuitive interface makes it easy to find exactly what you&apos;re looking for.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold">Step 3: Process</h3>
                <p>Click process and let PDFilio handle the work. Processing typically completes in seconds, even for large files.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold">Step 4: Download</h3>
                <p>Download your processed document immediately. No sign-up required, completely free.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Use Cases</h2>
            <p>
              {feature.title} is useful in many different scenarios:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Business document processing</li>
              <li>Student academic work</li>
              <li>Professional document management</li>
              <li>Batch processing of multiple files</li>
              <li>Document sharing and collaboration</li>
              <li>Archive and storage optimization</li>
              <li>Quality improvement and conversion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Advanced Features</h2>
            <p>
              Beyond the basics, {feature.title} includes advanced capabilities
              for power users:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Batch processing for multiple files</li>
              <li>Customizable processing parameters</li>
              <li>Quality presets for different needs</li>
              <li>Advanced format options</li>
              <li>Integration with cloud storage</li>
              <li>API access for automation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Comparison with Alternatives</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Feature</th>
                  <th className="border border-gray-300 p-2 text-left">PDFilio</th>
                  <th className="border border-gray-300 p-2 text-left">Competitors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Free Tier</td>
                  <td className="border border-gray-300 p-2">✓ Unlimited</td>
                  <td className="border border-gray-300 p-2">✗ Limited</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Speed</td>
                  <td className="border border-gray-300 p-2">⚡ Very Fast</td>
                  <td className="border border-gray-300 p-2">Slower</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Quality</td>
                  <td className="border border-gray-300 p-2">✓ Excellent</td>
                  <td className="border border-gray-300 p-2">Good</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Support</td>
                  <td className="border border-gray-300 p-2">24/7 Live Chat</td>
                  <td className="border border-gray-300 p-2">Email Only</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Tips & Best Practices</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Test with a small file first to ensure settings are correct</li>
              <li>Use batch processing to save time with multiple files</li>
              <li>Keep original files as backup before processing</li>
              <li>Explore different quality settings for your specific needs</li>
              <li>Take advantage of free features before considering premium</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Issue: Processing takes too long</h3>
                <p>
                  For very large files, processing may take longer than expected.
                  Try splitting the file or using the quality optimization option.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Issue: Result quality is lower than expected</h3>
                <p>
                  Adjust the quality settings and try again. Different quality
                  levels are available depending on your needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Issue: File won&apos;t upload</h3>
                <p>
                  Ensure the file is a valid PDF format and under the size limit.
                  Clear your browser cache and try again.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Get Started Today</h2>
            <p>
              {feature.title} is free to use with PDFilio. No credit card
              required, no hidden fees. Simply upload your document and start
              processing today!
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-blue-50 p-6">
          <h3 className="text-xl font-semibold">Experience {feature.title}</h3>
          <p className="mt-2 text-gray-700">
            Try this feature for free right now. No sign-up required.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Try {feature.title} Free
          </Link>
        </div>
      </article>
    </main>
  )
}
