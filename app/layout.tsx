import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import LiveChatWidget from '@/components/live-chat-widget'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PDFilio - Free AI-Powered PDF Tools & Editor | Convert, Merge, Compress',
  description: 'PDFilio - Complete PDF solution with 19+ free tools. Convert PDF to Word, merge, split, compress, edit, OCR, and more with AI. No sign-up required. Enterprise-grade security.',
  keywords: 'PDF converter, PDF editor, merge PDF, compress PDF, PDF to Word, OCR, free PDF tools',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.png?v=3',
        type: 'image/png',
      },
    ],
    apple: '/favicon.png?v=3',
  },
  authors: [
    {
      name: 'PDFilio Team',
      url: 'https://pdfilio.com',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pdfilio.com',
    title: 'PDFilio - Free AI-Powered PDF Tools & Editor',
    description: 'Complete PDF solution with 19+ free tools. Convert, merge, split, compress, edit, and OCR PDFs online.',
    siteName: 'PDFilio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFilio - Free PDF Tools with AI',
    description: 'Convert, merge, compress, edit PDFs and more.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: 'https://pdfilio.com',
  },
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
        {children}
        <LiveChatWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
