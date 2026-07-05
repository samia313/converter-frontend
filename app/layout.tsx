import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import LiveChatWidget from '@/components/live-chat-widget'
import StructuredData from '@/components/structured-data'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PDFilio - Free AI-Powered PDF Tools & Editor | Convert, Merge, Compress',
  description: 'PDFilio - Complete PDF solution with 45+ free professional tools. Convert PDF to Word, merge, split, compress, edit, OCR, protect and more with AI. No sign-up required. Enterprise-grade security.',
  keywords: 'PDF converter, PDF editor, merge PDF, compress PDF, PDF to Word, Word to PDF, OCR PDF, protect PDF, unlock PDF, split PDF, rotate PDF, free PDF tools, online PDF editor, best PDF converter, secure PDF converter, convert PDF online, edit PDF online, compress PDF free, merge PDF online, split PDF online',
  generator: 'v0.app',
  applicationName: 'PDFilio',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'icon',
        url: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  authors: [
    {
      name: 'PDFilio Team',
      url: 'https://pdfilio.com',
    },
  ],
  creator: 'PDFilio Team',
  publisher: 'PDFilio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pdfilio.com',
    title: 'PDFilio - Free AI-Powered PDF Tools & Editor',
    description: 'Complete PDF solution with 45+ free tools. Convert, merge, split, compress, edit, OCR, protect PDFs and more. No sign-up required.',
    siteName: 'PDFilio',
    images: [
      {
        url: 'https://pdfilio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PDFilio - Free PDF Tools',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFilio - Free PDF Tools with AI',
    description: 'Convert, merge, compress, edit, OCR and protect PDFs online. 45+ professional tools, no sign-up required.',
    creator: '@PDFilio',
    images: ['https://pdfilio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    bingbot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: 'https://pdfilio.com',
  },
  category: 'Productivity',
  classification: 'PDF Tools, Document Management, Online Editor',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon-180x180.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
        <link rel="sitemap" href="/sitemap.xml" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'PDFilio',
              url: 'https://pdfilio.com',
              description: 'Complete PDF solution with 19+ free tools. Convert, merge, split, compress, edit, and OCR PDFs online.',
              applicationCategory: 'Utility',
              browserRequirements: 'Requires JavaScript, HTML5',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              operatingSystem: 'All',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '5000',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white">
        <StructuredData />
        {children}
        <LiveChatWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
