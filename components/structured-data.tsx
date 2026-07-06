export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDFilio',
    description: 'Complete PDF solution with 60+ free professional tools',
    url: 'https://pdfilio.com',
    image: 'https://pdfilio.com/og-image.png',
    applicationCategory: 'Utility',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'PDFilio Team',
      url: 'https://pdfilio.com',
      logo: 'https://pdfilio.com/logo.png',
      sameAs: [
        'https://twitter.com/PDFilio',
        'https://facebook.com/PDFilio',
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
    },
  };

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

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PDFilio',
    url: 'https://pdfilio.com',
    logo: 'https://pdfilio.com/logo.png',
    description: 'Free online PDF converter, editor, and management tool with AI capabilities',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Online Service',
      addressCountry: 'Global',
    },
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

  const faqs = [
    {
      question: 'Is PDFilio free to use?',
      answer: 'Yes, PDFilio is completely free. All 60+ tools are available without any cost or registration required.',
    },
    {
      question: 'Is my data secure on PDFilio?',
      answer: 'Absolutely. All files are encrypted with 256-bit encryption and automatically deleted within 1 hour.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No, PDFilio requires no registration. You can start using tools immediately.',
    },
    {
      question: 'What PDF tools does PDFilio offer?',
      answer: 'PDFilio offers 60+ tools including PDF conversion, compression, merging, splitting, editing, OCR, AI features, and more.',
    },
    {
      question: 'Can I use PDFilio on mobile?',
      answer: 'Yes, PDFilio works on all devices including mobile phones, tablets, and desktops.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
