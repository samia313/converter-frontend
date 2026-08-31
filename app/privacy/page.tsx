import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | PDFilio',
  description: 'How PDFilio handles uploaded files, technical information, analytics, cookies, advertising, AI processing, and privacy requests.',
  alternates: { canonical: 'https://pdfilio.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: August 31, 2026</p>
      <div className="prose prose-gray mt-10 max-w-none">
        <h2>1. Overview</h2>
        <p>PDFilio provides online PDF, document, and selected AI-powered tools. This policy explains what information may be processed when you use the website and how we handle it. We do not make unsupported claims about security, storage, deletion, traffic, or regulatory compliance.</p>
        <h2>2. Uploaded documents</h2>
        <p>When you upload a document, the relevant tool processes the file to provide the requested result. Some tools process files in the browser and other tools use server-side processing. The applicable processing flow depends on the tool. We do not use uploaded documents for unrelated purposes.</p>
        <p>Temporary processing data is not intended to operate as a user-accessible file-storage service. You should keep your own backup of important documents and should not upload information that you are not authorized to process.</p>
        <h2>3. Personal and technical information</h2>
        <p>Depending on how you use the service, we may process information such as your IP address, browser and device information, approximate location, pages viewed, referral information, error information, and interaction events. Contact forms may also collect the name, email address, subject, and message that you submit.</p>
        <h2>4. Analytics and measurement</h2>
        <p>PDFilio uses analytics and measurement technologies, which may include Google Analytics, Google Tag Manager, Vercel Analytics, and related technical services. These technologies can use identifiers, cookies, or similar technologies to measure traffic, diagnose problems, and improve the service.</p>
        <h2>5. Cookies and advertising</h2>
        <p>PDFilio may use essential cookies and similar technologies for website functionality, analytics, security, and advertising. Google AdSense is configured on the website. If advertising is served, Google and its advertising partners may process information and use cookies or similar technologies to serve, measure, and personalize advertising subject to applicable Google policies and available consent choices.</p>
        <p>For more information about cookies and advertising choices, see our <a href="/cookies">Cookie Policy</a>.</p>
        <h2>6. AI and third-party processing</h2>
        <p>Selected AI features may send relevant document content or extracted text to third-party AI or infrastructure providers when required to perform the requested feature. AI processing is feature-specific; not every PDF tool uses AI. Users should avoid uploading sensitive information to AI features unless they are authorized and comfortable with the applicable processing.</p>
        <h2>7. File retention</h2>
        <p>PDFilio does not promise a single fixed retention period for every tool because processing architectures differ. Where a tool uses temporary server-side processing, files are intended to be temporary and are not offered as permanent document storage. We will update this policy if a tool introduces persistent file storage or a materially different retention practice.</p>
        <h2>8. Service providers</h2>
        <p>PDFilio may use hosting, infrastructure, analytics, authentication, payments, advertising, AI, email, and other service providers. They may process information necessary to provide their services under their applicable terms and privacy practices.</p>
        <h2>9. International users and privacy rights</h2>
        <p>Users may have privacy rights under laws applicable to them, including rights relating to access, correction, deletion, restriction, objection, portability, and withdrawal of consent where applicable. Depending on jurisdiction, this may include rights under the GDPR, UK GDPR, or applicable U.S. state privacy laws such as the CCPA/CPRA. PDFilio does not claim that every statutory obligation applies identically to every user; requests will be handled according to applicable law.</p>
        <h2>10. Security</h2>
        <p>We use reasonable technical and organizational measures appropriate to the service. No website, network transmission, or storage system can be guaranteed to be completely secure.</p>
        <h2>11. Children</h2>
        <p>PDFilio is a general-purpose productivity service and is not directed specifically to children. Users should have the legal capacity required to use the service in their jurisdiction.</p>
        <h2>12. Changes</h2>
        <p>We may update this policy when the service, processing practices, or legal requirements change. The latest version will be posted on this page with its update date.</p>
        <h2>13. Contact</h2>
        <p>For privacy questions or requests, contact <a href="mailto:support@pdfilio.com">support@pdfilio.com</a> or use the <a href="/contact">Contact</a> page.</p>
      </div>
    </main>
  )
}
