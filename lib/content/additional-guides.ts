import type { Guide } from './how-to-guides'

/** Additional original how-to guides covering distinct search intents. */
export const additionalGuides: Guide[] = [
  {
    slug: 'pdf-to-word-on-iphone',
    title: 'How to Convert PDF to Word on iPhone',
    description: 'Use an iPhone browser to convert a supported PDF to Word and review the resulting document before editing or sharing it.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['pdf to word iphone', 'convert pdf on iphone', 'pdf word iphone'],
    tools: ['pdf-to-word'], relatedGuides: ['how-to-convert-pdf-to-word'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Convert PDF to Word on iPhone\n\nYou can use a modern iPhone browser for a supported PDF-to-Word workflow without installing desktop software.\n\n## Steps\n1. Open PDFilio's PDF to Word tool in Safari or another supported browser.\n2. Choose the PDF from the Files app.\n3. Start the conversion.\n4. Wait for the result and use the download button.\n5. Open the DOCX in Microsoft Word, Pages, or another compatible app and review the layout.\n\n## Mobile tips\nKeep enough free device storage for the downloaded file and use a stable connection for larger documents. Complex tables, columns, scans, and unusual fonts may need manual cleanup after conversion.`
  },
  {
    slug: 'pdf-to-word-on-android',
    title: 'How to Convert PDF to Word on Android',
    description: 'Convert a supported PDF to an editable Word document from an Android browser and check the output before sharing it.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['pdf to word android', 'convert pdf android', 'pdf word phone'],
    tools: ['pdf-to-word'], relatedGuides: ['how-to-convert-pdf-to-word'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Convert PDF to Word on Android\n\nA supported Android phone can handle the browser-based PDF-to-Word workflow.\n\n## Steps\n1. Open PDFilio in your Android browser.\n2. Open PDF to Word.\n3. Select the PDF from your device.\n4. Start conversion and wait for processing.\n5. Download the DOCX and open it in a compatible document app.\n\n## Check the result\nReview headings, paragraphs, tables, images, page breaks, and special characters. PDF and Word use different document models, so complex layouts can require editing after conversion.`
  },
  {
    slug: 'convert-scanned-pdf-to-word',
    title: 'How to Convert a Scanned PDF to Word',
    description: 'Understand why scanned PDFs need OCR and how to choose an appropriate text-extraction workflow before creating an editable document.',
    difficulty: 'intermediate', readTime: 6,
    keywords: ['scanned pdf to word', 'ocr pdf to word', 'convert scanned pdf'],
    tools: ['pdf-to-word', 'ocr'], relatedGuides: ['how-to-convert-pdf-to-word'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Convert a Scanned PDF to Word\n\nA scanned PDF is often made of page images rather than selectable text. A normal text converter may therefore need OCR or a scan-aware workflow.\n\n## Recommended workflow\n1. Confirm that the PDF contains scanned pages.\n2. Use an OCR workflow when text recognition is required.\n3. Review the recognized text for spelling and layout errors.\n4. Convert or export to Word when the selected workflow supports it.\n5. Proofread the resulting DOCX before relying on it.\n\n## What affects OCR quality?\nScan resolution, contrast, page rotation, handwriting, unusual fonts, tables, and document noise can all affect recognition. Always compare important extracted information with the original scan.`
  },
  {
    slug: 'pdf-ocr-guide',
    title: 'How to OCR a PDF and Extract Text from Scans',
    description: 'Learn when OCR is useful, how to process a scanned PDF, and how to verify recognized text.',
    difficulty: 'intermediate', readTime: 6,
    keywords: ['pdf ocr', 'ocr pdf online', 'extract text scanned pdf'],
    tools: ['ocr'], relatedGuides: ['how-to-extract-text-from-pdf'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to OCR a PDF and Extract Text from Scans\n\nOCR, or optical character recognition, converts visible characters in document images into machine-readable text.\n\n## Steps\n1. Open the PDF OCR workflow.\n2. Upload the scan you are authorized to process.\n3. Start recognition.\n4. Review the recognized text or searchable output.\n5. Correct important names, numbers, dates, and table values against the original.\n\n## When OCR struggles\nLow-resolution scans, skewed pages, handwriting, complex tables, stamps, and noisy backgrounds can reduce accuracy. OCR is a convenience, not a substitute for checking important source documents.`
  },
  {
    slug: 'extract-tables-from-pdf',
    title: 'How to Extract Tables from a PDF',
    description: 'Prepare tables in a PDF for reuse in spreadsheets and understand why complex layouts may need manual cleanup.',
    difficulty: 'intermediate', readTime: 6,
    keywords: ['extract tables from pdf', 'pdf table extraction', 'pdf to excel tables'],
    tools: ['pdf-to-excel'], relatedGuides: ['how-to-convert-pdf-to-excel'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Extract Tables from a PDF\n\nTables can be difficult to extract because PDFs describe positioned page content rather than spreadsheet cells.\n\n## Workflow\n1. Identify whether the table contains selectable text or is an image.\n2. Open a PDF-to-Excel or table-extraction workflow that supports your document.\n3. Upload the source PDF.\n4. Process the table and download the spreadsheet output when available.\n5. Check column alignment, merged cells, numbers, dates, and totals against the source.\n\n## Scanned tables\nIf the table is an image, OCR may be required before structured extraction. Complex multi-line cells and merged columns can still need manual correction.`
  },
  {
    slug: 'reduce-pdf-under-1mb',
    title: 'How to Reduce a PDF Under 1MB',
    description: 'Practical steps for trying to meet a 1MB upload target without promising a fixed compression ratio.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['compress pdf under 1mb', 'reduce pdf to 1mb', 'pdf under 1mb'],
    tools: ['compress-pdf'], relatedGuides: ['how-to-compress-pdf-under-2mb'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Reduce a PDF Under 1MB\n\nA 1MB target may be required by an application or upload form. Whether a PDF can reach that size depends heavily on its contents.\n\n## Steps\n1. Check the destination's exact file-size limit.\n2. Open PDFilio's Compress PDF tool.\n3. Upload the PDF within the tool's current limit.\n4. Select an available compression level.\n5. Check the resulting size and review readability.\n\n## If it remains above 1MB\nRemove unnecessary pages, reduce oversized images in the source, or split the document if the destination allows multiple files. Do not sacrifice legibility just to reach an arbitrary size target.`
  },
  {
    slug: 'merge-pdf-on-mobile',
    title: 'How to Merge PDF Files on Mobile',
    description: 'Combine supported PDF files from a phone browser and verify the page order before downloading the result.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['merge pdf on mobile', 'combine pdf iphone android', 'merge pdf phone'],
    tools: ['merge-pdf'], relatedGuides: ['how-to-merge-pdf'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Merge PDF Files on Mobile\n\nA browser-based merge workflow can be useful when you need to combine documents from a phone or tablet.\n\n## Steps\n1. Open PDFilio's Merge PDF tool.\n2. Select the PDFs from your device.\n3. Arrange them in the required order.\n4. Start the merge.\n5. Review the combined document and download it.\n\n## Mobile checks\nMake sure every required file was selected and that the final page order is correct. Keep the original files until you have confirmed the merged output.`
  },
  {
    slug: 'split-pdf-on-mobile',
    title: 'How to Split a PDF on Mobile',
    description: 'Extract pages or sections from a PDF using a phone browser and check the resulting files before sharing them.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['split pdf mobile', 'split pdf iphone android', 'extract pdf pages phone'],
    tools: ['split-pdf'], relatedGuides: ['how-to-split-pdf'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Split a PDF on Mobile\n\nSplitting can help when a phone contains a large document but only a few pages need to be sent.\n\n## Steps\n1. Open the Split PDF tool in your mobile browser.\n2. Select the PDF from your device.\n3. Choose the available page or range option.\n4. Process the document.\n5. Open the resulting file and verify its pages.\n\n## Privacy tip\nBefore sharing an extracted section, check that it does not include pages or information that should remain private.`
  },
  {
    slug: 'remove-pdf-pages-before-submission',
    title: 'How to Remove Unwanted Pages from a PDF Before Submission',
    description: 'Create a cleaner submission by removing pages that are not required and checking the final document before upload.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['remove pdf pages', 'delete pdf pages', 'pdf submission'],
    tools: ['remove-pages'], relatedGuides: ['how-to-delete-pages-from-pdf'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Remove Unwanted Pages from a PDF Before Submission\n\nApplication portals often request specific pages or documents. Removing unnecessary pages can make the final submission easier to review.\n\n## Workflow\n1. Read the submission instructions carefully.\n2. Keep an original copy of the full PDF.\n3. Open the PDF page-removal workflow.\n4. Select only the pages that should be removed.\n5. Create the new PDF and review every page.\n\n## Final checklist\nConfirm that required signatures, attachments, page numbers, and supporting evidence remain present and in the correct order.`
  },
  {
    slug: 'how-to-check-pdf-before-upload',
    title: 'How to Check a PDF Before Uploading It',
    description: 'A practical pre-upload checklist for file size, page order, readability, metadata, and document completeness.',
    difficulty: 'beginner', readTime: 5,
    keywords: ['check pdf before upload', 'pdf upload checklist', 'prepare pdf for upload'],
    tools: ['compress-pdf', 'merge-pdf'], relatedGuides: ['how-to-reduce-pdf-size-for-upload'], publishedAt: '2026-08-31T00:00:00Z',
    content: `# How to Check a PDF Before Uploading It\n\nA short quality check can prevent avoidable submission problems.\n\n## Checklist\n- Confirm the destination's file type and size limit.\n- Open the PDF and check every page.\n- Confirm page order and orientation.\n- Check that text and images are readable.\n- Verify signatures, forms, tables, and links when relevant.\n- Remove pages that are not required.\n- Check the filename and avoid unnecessary personal information in the filename.\n- Keep an original backup before making changes.\n\n## Final step\nUpload only the version you have reviewed and are authorized to submit.`
  },
]
