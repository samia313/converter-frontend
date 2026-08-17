import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | PDFilio',
  description: 'Learn how PDFilio handles information, uploaded files, analytics, cookies, and privacy.',
  alternates: { canonical: 'https://pdfilio.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: August 18, 2026</p>

      <div className="prose prose-gray mt-10 max-w-none">
        <h2>1. Overview</h2>
        <p>PDFilio provides online PDF and document tools. We aim to collect only information needed to operate, secure, improve, and support the service.</p>

        <h2>2. Files you upload</h2>
        <p>Uploaded files are processed to provide the requested tool. PDFilio should not be used for information that you are not authorized to upload. Where a tool or account flow stores files beyond processing, that storage should be explained to you before use.</p>

        <h2>3. Usage and technical information</h2>
        <p>We may receive technical and usage information such as browser type, device information, approximate location, pages visited, and events needed for analytics, security, and service improvement.</p>

        <h2>4. Cookies and advertising</h2>
        <p>PDFilio may use cookies or similar technologies for essential functionality, analytics, and advertising. If Google AdSense is enabled, Google and its partners may use cookies to serve and measure ads subject to their applicable policies and your available consent choices.</p>

        <h2>5. Third-party services</h2>
        <p>PDFilio may use infrastructure, analytics, authentication, payment, advertising, and other service providers. These providers process information only as necessary for the services they provide and under their applicable terms.</p>

        <h2>6. Security</h2>
        <p>We use reasonable technical and organizational measures to protect the service. No internet transmission or storage system can be guaranteed to be completely secure.</p>

        <h2>7. Your choices</h2>
        <p>You may contact PDFilio about privacy questions or requests concerning information associated with your use of the service.</p>

        <h2>8. Contact</h2>
        <p>For privacy questions, please use the contact method provided on the PDFilio Contact page.</p>
      </div>
    </main>
  )
}
