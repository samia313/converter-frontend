import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | PDFilio',
  description: 'Learn how PDFilio uses essential technologies and, with consent, analytics and advertising technologies.',
  alternates: { canonical: 'https://pdfilio.com/cookies' },
}

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: August 31, 2026</p>
      <div className="prose prose-gray mt-10 max-w-none">
        <h2>1. What are cookies?</h2>
        <p>Cookies and similar technologies are small pieces of information stored or accessed by a browser or device. They can support functionality, remember preferences, measure usage, and support advertising.</p>
        <h2>2. How PDFilio uses them</h2>
        <ul>
          <li><strong>Essential technologies:</strong> used where needed for core website functionality, security, consent preferences, or service operation.</li>
          <li><strong>Analytics:</strong> Google Analytics, Google Tag Manager, and Vercel Analytics are optional on PDFilio and are loaded only after the user accepts analytics and advertising technologies through the site's consent control.</li>
          <li><strong>Advertising:</strong> Google AdSense is configured on PDFilio and is loaded only after the user accepts analytics and advertising technologies. Google and its partners may use cookies or similar technologies for advertising and measurement subject to applicable policies and consent requirements.</li>
        </ul>
        <h2>3. Your choices</h2>
        <p>On first visit, PDFilio provides a privacy choice control. You can choose <strong>Necessary only</strong> or <strong>Accept analytics &amp; ads</strong>. After choosing, use the <strong>Privacy settings</strong> button shown on the site to change your choice. Your preference is stored locally in your browser.</p>
        <p>Where applicable, additional consent requirements or controls may apply based on your location. Browser settings and third-party provider controls may also affect cookies and similar technologies.</p>
        <h2>4. Third-party cookies</h2>
        <p>Third-party providers such as Google may set or access their own cookies or similar technologies after the relevant optional technologies are enabled. Their practices are governed by their own policies and settings.</p>
        <h2>5. Changes</h2>
        <p>We may update this policy when the services or technologies used by PDFilio change.</p>
        <h2>6. Contact</h2>
        <p>Questions about cookies or privacy can be sent to <a href="mailto:support@pdfilio.com">support@pdfilio.com</a>.</p>
      </div>
    </main>
  )
}
