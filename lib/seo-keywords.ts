export const seoKeywords = {
  // Primary Keywords
  primary: [
    'PDF Converter',
    'PDF Editor',
    'Merge PDF',
    'Compress PDF',
    'Split PDF',
    'PDF to Word',
    'Word to PDF',
    'OCR PDF',
    'Protect PDF',
    'Unlock PDF',
  ],

  // Secondary Keywords
  secondary: [
    'Best PDF Converter',
    'Free PDF Converter',
    'Fast PDF Converter',
    'Secure PDF Converter',
    'Convert PDF Online',
    'Edit PDF Online',
    'Compress PDF Free',
    'Merge PDF Online',
    'Split PDF Online',
    'PDF Merge Tool',
  ],

  // Long Tail Keywords
  longTail: [
    'How to compress PDF without losing quality',
    'How to merge PDFs online free',
    'Convert PDF to Word without formatting loss',
    'Best PDF editor online',
    'Compress PDF to 200KB',
    'Compress PDF to 100KB',
    'Reduce PDF size online',
    'Merge multiple PDFs',
    'OCR scanned PDF online',
    'Edit PDF text online',
    'How to protect PDF with password',
    'Unlock password protected PDF',
    'Convert DOCX to PDF online',
    'Split large PDF files',
    'Batch convert PDF to Word',
  ],

  // Internal Linking Strategy
  toolLinks: {
    'pdf-to-word': {
      title: 'PDF to Word Converter',
      description: 'Convert PDF documents to editable Word files with perfect formatting.',
      relatedTools: ['word-to-pdf', 'pdf-editor', 'ocr-pdf'],
      keywords: ['PDF to Word', 'convert PDF to Word', 'PDF to DOC'],
    },
    'word-to-pdf': {
      title: 'Word to PDF Converter',
      description: 'Transform Word documents into professional PDF files instantly.',
      relatedTools: ['pdf-to-word', 'compress-pdf', 'protect-pdf'],
      keywords: ['Word to PDF', 'DOC to PDF', 'DOCX to PDF'],
    },
    'merge-pdf': {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one organized document.',
      relatedTools: ['split-pdf', 'compress-pdf', 'pdf-editor'],
      keywords: ['Merge PDF', 'combine PDF', 'join PDF files'],
    },
    'split-pdf': {
      title: 'Split PDF',
      description: 'Divide PDF files into separate pages or custom sections.',
      relatedTools: ['merge-pdf', 'compress-pdf', 'rotate-pdf'],
      keywords: ['Split PDF', 'separate PDF pages', 'extract PDF pages'],
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality and clarity.',
      relatedTools: ['merge-pdf', 'split-pdf', 'pdf-to-word'],
      keywords: ['Compress PDF', 'reduce PDF size', 'shrink PDF'],
    },
    'ocr-pdf': {
      title: 'OCR PDF',
      description: 'Extract text from scanned PDFs using advanced AI recognition.',
      relatedTools: ['pdf-to-word', 'pdf-editor', 'compress-pdf'],
      keywords: ['OCR PDF', 'extract text from PDF', 'PDF text recognition'],
    },
    'pdf-editor': {
      title: 'PDF Editor',
      description: 'Edit, annotate, and modify PDF documents online easily.',
      relatedTools: ['pdf-to-word', 'merge-pdf', 'protect-pdf'],
      keywords: ['PDF Editor', 'edit PDF online', 'modify PDF'],
    },
    'protect-pdf': {
      title: 'Protect PDF',
      description: 'Secure your PDF files with password protection and encryption.',
      relatedTools: ['unlock-pdf', 'pdf-editor', 'compress-pdf'],
      keywords: ['Protect PDF', 'password protect PDF', 'encrypt PDF'],
    },
    'unlock-pdf': {
      title: 'Unlock PDF',
      description: 'Remove password protection and unlock encrypted PDF files.',
      relatedTools: ['protect-pdf', 'pdf-editor', 'merge-pdf'],
      keywords: ['Unlock PDF', 'remove PDF password', 'decrypt PDF'],
    },
    'rotate-pdf': {
      title: 'Rotate PDF',
      description: 'Rotate PDF pages to the correct orientation instantly.',
      relatedTools: ['split-pdf', 'merge-pdf', 'compress-pdf'],
      keywords: ['Rotate PDF', 'turn PDF pages', 'fix PDF orientation'],
    },
  },

  // Internal Link Chains (for SEO strategy)
  linkChains: [
    ['pdf-to-word', 'word-to-pdf', 'compress-pdf', 'merge-pdf', 'split-pdf'],
    ['merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-editor', 'ocr-pdf'],
    ['protect-pdf', 'unlock-pdf', 'pdf-editor', 'compress-pdf', 'merge-pdf'],
    ['ocr-pdf', 'pdf-to-word', 'pdf-editor', 'compress-pdf', 'merge-pdf'],
  ],
};

// Helper function to get related tools with proper internal links
export function getRelatedTools(toolSlug: string): Array<{
  name: string;
  slug: string;
  description: string;
  keyword: string;
}> {
  const tool = seoKeywords.toolLinks[toolSlug as keyof typeof seoKeywords.toolLinks];
  if (!tool) return [];

  return tool.relatedTools.map((slug) => {
    const relatedTool = seoKeywords.toolLinks[slug as keyof typeof seoKeywords.toolLinks];
    return {
      name: relatedTool.title,
      slug: slug,
      description: relatedTool.description,
      keyword: relatedTool.keywords[0],
    };
  });
}
