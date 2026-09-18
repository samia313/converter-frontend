import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDFilio Test Page',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function TestCompressLayout({ children }: { children: React.ReactNode }) {
  return children
}
