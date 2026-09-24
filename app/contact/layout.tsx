import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact PDFilio Support | PDFilio',
  description: 'Contact PDFilio for product support, privacy questions, and help with online PDF tools.',
  alternates: { canonical: 'https://pdfilio.com/contact' },
  openGraph: {
    title: 'Contact PDFilio Support | PDFilio',
    description: 'Contact PDFilio for product support, privacy questions, and help with online PDF tools.',
    url: 'https://pdfilio.com/contact',
    type: 'website',
  },
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
