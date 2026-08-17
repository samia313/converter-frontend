import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import LiveChatWidget from '@/components/live-chat-widget'
import StructuredData from '@/components/structured-data'
import GA4Analytics from '@/components/ga4-analytics'
import Footer from '@/components/footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const SITE_URL = 'https://pdfilio.com'
const SITE_TITLE = 'PDFilio - Free PDF Tools Online'
const SITE_DESCRIPTION = 'Free online PDF tools for converting, merging, splitting, compressing, editing, OCR, and managing PDF files.'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'PDFilio',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { email: false, telephone: false },
  authors: [{ name: 'PDFilio Team', url: SITE_URL }],
  creator: 'PDFilio Team',
  publisher: 'PDFilio',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PDFilio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PDFilio - Free PDF Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+i:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T9N4TQVD');`,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3342033551482593" crossOrigin="anonymous" />
        <link rel="sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'PDFilio',
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              applicationCategory: 'Utility',
              browserRequirements: 'Requires JavaScript, HTML5',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              operatingSystem: 'All',
            }),
          }}
        />
        <StructuredData />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-white">
        <GA4Analytics />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9N4TQVD" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        {children}
        <Footer />
        <LiveChatWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
