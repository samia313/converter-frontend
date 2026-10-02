import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'QR Code Generator Online | Create QR Codes | PDFilio',
  description: 'Create QR codes online for links, text, contact details, and other supported information. Generate a QR code and review it before sharing or printing.',
  keywords: ['QR code generator', 'QR code generator online', 'create QR code', 'QR code maker', 'free QR code generator', 'generate QR code online'],
  alternates: { canonical: 'https://pdfilio.com/qr-code-generator' },
  openGraph: { title: 'QR Code Generator Online | Create QR Codes | PDFilio', description: 'Create QR codes online for supported links, text, and information.', url: 'https://pdfilio.com/qr-code-generator', type: 'website' },
}

export default function QRCodeGeneratorPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'QR Code Generator', description: 'Online QR code generator for creating QR codes from supported information.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web' }
  return (
    <ToolLandingLayout
      toolName="QR Code Generator"
      toolSlug="tools"
      heroImage="/tool-images/qr-code-generator-hero.png"
      description="Create QR codes online from supported links, text, contact information, and other content, then review the generated code before sharing or printing."
      mainContent={`A QR code generator turns supported information into a scannable two-dimensional code. QR codes can make it easier for people to open a web address, access text, or use other supported information from a phone camera or QR scanner.

## Create a QR Code Online

Enter the supported information you want to encode, generate the QR code, and check the result before using it. For important campaigns, documents, signs, or printed materials, test the code with a phone before distribution.

## Useful for Digital and Printed Materials

QR codes can be used on business cards, flyers, posters, menus, presentations, documents, event materials, product information, and other places where a quick scan can connect people with additional information.

## Check Your QR Code Before Sharing

Always scan the generated QR code and confirm that it opens the intended information. For printed QR codes, check the final printed size, contrast, surrounding space, and readability before producing large quantities.`}
      useCase={'Website and landing-page links\nBusiness cards and contact information\nFlyers, posters, and brochures\nRestaurant menus and event materials\nPresentations and documents\nProduct and service information\nMarketing and promotional materials\nDigital-to-physical information sharing'}
      features={['QR code generation workflow', 'Support for common QR content', 'Scannable code output', 'Browser-based workflow', 'Preview and review guidance', 'Useful for digital and print materials', 'Simple sharing workflow', 'Mobile-friendly use guidance']}
      benefits={['Turn supported information into a scannable code', 'Make links easier to access from printed materials', 'Connect physical materials with digital content', 'Create QR codes for common business and personal uses', 'Test codes before sharing or printing', 'Use a browser-based generation workflow']}
      howitworks={'1. Open the QR Code Generator and enter the supported information you want to encode.\n2. Generate the QR code and review the displayed result.\n3. Scan the code with a phone or QR scanner to confirm it contains the intended information before sharing or printing it.'}
      faqs={[
        { q: 'What is a QR code generator?', a: 'A QR code generator creates a scannable QR code from supported information such as a web address, text, or other supported content.' },
        { q: 'Can I create a QR code online?', a: 'Yes. A browser-based QR code generator can create a QR code without requiring a separate desktop application.' },
        { q: 'What can I put in a QR code?', a: 'Supported content depends on the generator. Common QR uses include website URLs, text, contact information, and other supported data.' },
        { q: 'Can I create a QR code for a website?', a: 'Yes. A website URL is a common QR code use. After generating it, scan the code and verify that it opens the intended address.' },
        { q: 'Can I use a QR code on a flyer or poster?', a: 'Yes. QR codes can be placed on flyers, posters, brochures, business cards, menus, and other printed materials. Test the final printed version before distribution.' },
        { q: 'Can I use a QR code in a PDF?', a: 'A generated QR code can be used as an image in supported documents or PDF workflows. Check the final PDF and scan the code before sharing it.' },
        { q: 'Will a QR code expire?', a: 'A QR code that directly encodes information does not inherently have an expiration date. However, a QR code pointing to a website depends on that destination remaining available.' },
        { q: 'Do QR codes need to be tested?', a: 'Yes. Scan the generated code before publishing or printing it to confirm that it contains the correct information and works as expected.' },
        { q: 'Can I print a QR code?', a: 'Yes. For printing, make sure the code is large and clear enough to scan and has adequate contrast and surrounding space.' },
        { q: 'Can I create QR codes on a phone?', a: 'A browser-based QR code workflow can be used on supported mobile browsers. The exact experience depends on the device and browser.' },
        { q: 'Are QR codes safe?', a: 'A QR code is a way of encoding information; the destination or content it points to may still require normal security awareness. Verify links before sharing and encourage recipients to check destinations.' },
        { q: 'Is the QR Code Generator free?', a: 'Current pricing, usage limits, and available features depend on the product configuration shown by PDFilio.' },
      ]}
      relatedTools={[{ name: 'PDF to JPG', slug: 'pdf-to-jpg' }, { name: 'JPG to PDF', slug: 'jpg-to-pdf' }, { name: 'Image to PDF', slug: 'image-to-pdf' }, { name: 'Edit PDF', slug: 'edit-pdf' }, { name: 'Watermark PDF', slug: 'watermark-pdf' }, { name: 'PDF Metadata', slug: 'pdf-metadata' }]}
      primaryKeyword="QR code generator"
      secondaryKeywords={['QR code generator online', 'create QR code', 'QR code maker', 'free QR code generator', 'generate QR code online']}
      schema={schema}
    />
  )
}