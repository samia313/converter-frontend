import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import LiveChatWidget from '@/components/live-chat-widget'
import StructuredData from '@/components/structured-data'
import PrivacyConsent from '@/components/privacy-consent'
import AdSenseScript from '@/components/adsense-script'
import Footer from '@/components/footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const SITE_URL = 'https://pdfilio.com'
const SITE_TITLE = 'PDFilio - Free PDF Tools Online'
const SITE_DESCRIPTION = 'Free online PDF tools for converting, merging, splitting, compressing, editing, OCR, and managing PDF files.'
const OG_IMAGE = '/og-image.png'

export const metadata: Metadata = {
  title: { default: SITE_TITLE, template: '%s | PDFilio' },
  description: SITE_DESCRIPTION,
  applicationName: 'PDFilio',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { email: false, telephone: false },
  authors: [{ name: 'PDFilio Team', url: SITE_URL }],
  creator: 'PDFilio Team',
  publisher: 'PDFilio',
  metadataBase: new URL(SITE_URL),
  keywords: ['PDF tools', 'PDF converter', 'free PDF tools', 'merge PDF', 'split PDF', 'compress PDF', 'PDF to Word', 'Word to PDF', 'PDF editor', 'OCR PDF'],
  openGraph: { type: 'website', locale: 'en_US', url: SITE_URL, siteName: 'PDFilio', title: SITE_TITLE, description: SITE_DESCRIPTION, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'PDFilio - Free PDF Tools Online' }] },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, noimageindex: false, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  alternates: { canonical: SITE_URL },
  category: 'Productivity',
  verification: { google: 'A4lEEeE2F892vUX8oGfyr9CE_iqjfSe-7hPl511bR6g' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head suppressHydrationWarning>
        <link rel="sitemap" href="/sitemap.xml" />
        <StructuredData />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-white">
        {children}
        <Footer />
        <LiveChatWidget />
        <PrivacyConsent />
        <AdSenseScript />
      </body>
    </html>
  )
}
