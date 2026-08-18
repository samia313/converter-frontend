export interface Guide {
  slug: string; title: string; description: string; content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced'; readTime: number;
  keywords: string[]; tools: string[]; relatedGuides: string[]; publishedAt: string;
}

export const guides: Guide[] = [
  {
    slug: 'how-to-compress-pdf', title: 'How to Compress PDF Files: Complete Step-by-Step Guide',
    description: 'Learn practical ways to reduce PDF file size for email, uploads, storage, and sharing while checking the resulting quality.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compression', 'make pdf smaller'], tools: ['compress-pdf'],
    relatedGuides: ['how-to-merge-pdf', 'how-to-optimize-pdf'], publishedAt: '2024-01-15T00:00:00Z',
    content: `# How to Compress PDF Files\n\n## Why compress a PDF?\nA smaller PDF is easier to email, upload, store, and share. The amount of reduction depends on the document's images, fonts, embedded content, and current compression.\n\n## Method 1: PDFilio\n1. Open PDFilio's Compress PDF tool.\n2. Select or drop your PDF.\n3. Choose the available compression option.\n4. Review the output and download it when ready.\n\n## Method 2: Reduce the source document\nIf you still need a smaller file, reduce oversized images, remove unnecessary pages or embedded material, and export the source again with appropriate image quality.\n\n## Check quality after compression\nOpen the output and verify text readability, images, page order, and any forms or links you need. Keep the original when the document is important.\n\n## Common reasons a PDF stays large\n- High-resolution photographs\n- Scanned pages\n- Embedded fonts\n- Large graphics\n- Unnecessary metadata or embedded objects\n\n## Best practice\nChoose the smallest output that still meets your purpose. A PDF intended for email may need a different quality level from one intended for printing.`
  },
  {
    slug: 'how-to-merge-pdf', title: 'How to Merge PDF Files into One Document', description: 'Combine multiple PDF files into a single document while keeping the desired page order.', difficulty: 'beginner', readTime: 4,
    keywords: ['merge pdf', 'combine pdf', 'join pdf files'], tools: ['merge-pdf'], relatedGuides: ['how-to-compress-pdf'], publishedAt: '2024-01-16T00:00:00Z',
    content: `# How to Merge PDF Files\n\n## When should you merge PDFs?\nMerging is useful when several related files need to be submitted, shared, archived, or reviewed together.\n\n## Using PDFilio\n1. Open the Merge PDF tool.\n2. Upload the PDFs you want to combine.\n3. Arrange the files in the required order.\n4. Start the merge.\n5. Review the combined document before downloading it.\n\n## Before merging\nCheck page orientation, file names, page order, and whether any document contains sensitive information that should not be combined.\n\n## After merging\nOpen the resulting PDF and confirm that every page is present and readable.`
  },
  {
    slug: 'how-to-split-pdf', title: 'How to Split a PDF into Separate Files', description: 'Extract selected pages or divide a large PDF into smaller documents for sharing and organization.', difficulty: 'beginner', readTime: 4,
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages'], tools: ['split-pdf'], relatedGuides: ['how-to-compress-pdf'], publishedAt: '2024-01-17T00:00:00Z',
    content: `# How to Split a PDF\n\n## Why split a PDF?\nSplitting can help when only certain pages need to be submitted, shared, or archived.\n\n## Steps\n1. Open PDFilio's Split PDF tool.\n2. Upload the PDF.\n3. Select the page ranges or splitting option available in the tool.\n4. Start processing.\n5. Open the resulting files and verify the pages.\n\n## Tip\nUse page numbers carefully and review the output before sending an important document.`
  },
  {
    slug: 'how-to-convert-pdf-to-word', title: 'How to Convert PDF to Word for Editing', description: 'Turn a supported PDF into an editable Word document and review the formatting after conversion.', difficulty: 'beginner', readTime: 5,
    keywords: ['pdf to word', 'convert pdf to word', 'editable pdf'], tools: ['pdf-to-word'], relatedGuides: ['how-to-compress-pdf'], publishedAt: '2024-01-18T00:00:00Z',
    content: `# How to Convert PDF to Word\n\n## When is PDF to Word useful?\nConversion is useful when you need to revise text, reuse content, or continue editing a document in Word.\n\n## Steps\n1. Open PDFilio's PDF to Word tool.\n2. Upload the supported PDF.\n3. Start the conversion.\n4. Download the Word file using the download button when it is ready.\n5. Review headings, tables, spacing, images, and page breaks.\n\n## Why formatting can change\nPDFs store positioned page content, while Word documents use an editable document structure. Complex layouts, columns, tables, scans, and unusual fonts can therefore require manual cleanup.`
  },
  {
    slug: 'how-to-compress-pdf-for-email', title: 'How to Compress a PDF for Email', description: 'Reduce a PDF before emailing it and check the final size and readability.', difficulty: 'beginner', readTime: 4,
    keywords: ['compress pdf for email', 'pdf too large for email', 'email pdf size'], tools: ['compress-pdf'], relatedGuides: ['how-to-compress-pdf'], publishedAt: '2024-01-19T00:00:00Z',
    content: `# How to Compress a PDF for Email\n\nEmail providers can impose attachment-size limits, so reducing a large PDF can make sharing easier.\n\n## Steps\n1. Open the Compress PDF tool.\n2. Upload your PDF.\n3. Select an available compression level appropriate for screen viewing.\n4. Process the file.\n5. Check the resulting file size and open the PDF to verify readability.\n\n## If it is still too large\nConsider splitting the document into relevant sections or removing unnecessary pages and oversized images from the source.\n\n## Important\nAttachment limits vary by email service. Check the recipient's service if a file is still rejected.`
  },
  {
    slug: 'how-to-compress-pdf-on-mobile', title: 'How to Compress a PDF on Mobile', description: 'A practical workflow for reducing PDF size from a phone or tablet browser.', difficulty: 'beginner', readTime: 4,
    keywords: ['compress pdf on mobile', 'compress pdf android', 'compress pdf iphone'], tools: ['compress-pdf'], relatedGuides: ['how-to-compress-pdf-for-email'], publishedAt: '2024-01-20T00:00:00Z',
    content: `# How to Compress a PDF on Mobile\n\n## Mobile workflow\n1. Open PDFilio in your mobile browser.\n2. Open the Compress PDF tool.\n3. Select the PDF from your device.\n4. Choose the available compression setting.\n5. Wait for processing to finish.\n6. Use the download button to save the resulting file.\n\n## Mobile tips\nUse a stable connection for larger files, make sure your device has enough storage for the output, and review the compressed PDF before sharing it.\n\n## If the PDF is still large\nTry a stronger available compression setting or split the document when only part of it needs to be sent.`
  },
];

export function getGuideBySlug(slug: string) { return guides.find((guide) => guide.slug === slug); }
