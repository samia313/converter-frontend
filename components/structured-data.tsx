export default function StructuredData() {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PDFilio',
    url: 'https://pdfilio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://pdfilio.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://twitter.com/PDFilio',
      'https://facebook.com/PDFilio',
      'https://instagram.com/PDFilio',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PDFilio',
    url: 'https://pdfilio.com',
    logo: 'https://pdfilio.com/logo.png',
    description: 'Free online PDF converter, editor, and management tool with AI capabilities',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@pdfilio.com',
      availableLanguage: ['en'],
    },
    sameAs: [
      'https://twitter.com/PDFilio',
      'https://facebook.com/PDFilio',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </>
  );
}
