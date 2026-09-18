export default function StructuredData() {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PDFilio',
    url: 'https://pdfilio.com',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PDFilio',
    url: 'https://pdfilio.com',
    logo: 'https://pdfilio.com/icon-512x512.png',
    description: 'Online PDF tools for converting, editing, compressing, merging, splitting, OCR, and managing PDF files.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@pdfilio.com',
      availableLanguage: ['en'],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </>
  );
}
