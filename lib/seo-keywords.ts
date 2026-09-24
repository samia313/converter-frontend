export const seoKeywords = {
  primary: ['PDF Converter','PDF Editor','Merge PDF','Compress PDF','Split PDF','PDF to Word','Word to PDF','OCR PDF','Protect PDF','Unlock PDF'],
  secondary: ['Best PDF Converter','Free PDF Converter','Fast PDF Converter','Secure PDF Converter','Convert PDF Online','Edit PDF Online','Compress PDF Free','Merge PDF Online','Split PDF Online','PDF Merge Tool','Online PDF Editor','PDF Management Tool','Document Converter Online','Batch PDF Converter'],
  longTail: ['How to compress PDF without losing quality','How to merge PDFs online free','Convert PDF to Word without formatting loss','Best PDF editor online','Compress PDF to 200KB','Compress PDF to 100KB','Reduce PDF size online','Merge multiple PDFs','OCR scanned PDF online','Edit PDF text online','How to protect PDF with password','Unlock password protected PDF','Convert DOCX to PDF online','Split large PDF files','Batch convert PDF to Word'],
  toolLinks: {
    'pdf-to-word': { title: 'PDF to Word Converter', description: 'Convert PDF documents to editable Word files online.', relatedTools: ['word-to-pdf','pdf-editor','ocr-pdf'], keywords: ['PDF to Word','convert PDF to Word','PDF to DOC'] },
    'word-to-pdf': { title: 'Word to PDF Converter', description: 'Convert Word documents into PDF files online.', relatedTools: ['pdf-to-word','compress-pdf','protect-pdf'], keywords: ['Word to PDF','DOC to PDF','DOCX to PDF'] },
    'merge-pdf': { title: 'Merge PDF', description: 'Combine multiple PDF files into one document online.', relatedTools: ['split-pdf','compress-pdf','pdf-editor'], keywords: ['Merge PDF','combine PDF','join PDF files'] },
    'split-pdf': { title: 'Split PDF', description: 'Split PDF files into separate pages or custom sections.', relatedTools: ['merge-pdf','compress-pdf','rotate-pdf'], keywords: ['Split PDF','separate PDF pages','extract PDF pages'] },
    'compress-pdf': { title: 'Compress PDF', description: 'Reduce PDF file size while keeping documents readable.', relatedTools: ['merge-pdf','split-pdf','pdf-to-word'], keywords: ['Compress PDF','reduce PDF size','shrink PDF'] },
    'ocr': { title: 'OCR PDF', description: 'Extract searchable text from scanned PDF documents.', relatedTools: ['pdf-to-word','compress-pdf','merge-pdf'], keywords: ['OCR PDF','extract text from PDF','PDF text recognition'] },
    'pdf-editor': { title: 'PDF Editor', description: 'Edit and annotate PDF documents online.', relatedTools: ['pdf-to-word','merge-pdf','protect-pdf'], keywords: ['PDF Editor','edit PDF online','modify PDF'] },
    'protect-pdf': { title: 'Protect PDF', description: 'Protect PDF files with available password and security options.', relatedTools: ['unlock-pdf','pdf-editor','compress-pdf'], keywords: ['Protect PDF','password protect PDF','secure PDF'] },
    'unlock-pdf': { title: 'Unlock PDF', description: 'Unlock PDFs when you have the required password or authorization.', relatedTools: ['protect-pdf','pdf-editor','merge-pdf'], keywords: ['Unlock PDF','remove PDF password','unlock PDF'] },
    'rotate-pdf': { title: 'Rotate PDF', description: 'Rotate PDF pages to the correct orientation online.', relatedTools: ['split-pdf','merge-pdf','compress-pdf'], keywords: ['Rotate PDF','turn PDF pages','fix PDF orientation'] },
    'remove-pages': { title: 'Remove Pages from PDF', description: 'Delete unwanted pages from PDF documents online.', relatedTools: ['split-pdf','rotate-pdf','merge-pdf'], keywords: ['remove pages from PDF','delete PDF pages','PDF page remover'] },
    'crop-pdf': { title: 'Crop PDF', description: 'Crop PDF pages to remove unwanted margins and areas.', relatedTools: ['rotate-pdf','remove-pages','compress-pdf'], keywords: ['Crop PDF','crop PDF pages','trim PDF'] },
    'page-numbers': { title: 'Add Page Numbers to PDF', description: 'Add page numbers to PDF documents online.', relatedTools: ['merge-pdf','pdf-editor','rotate-pdf'], keywords: ['add page numbers to PDF','number PDF pages','PDF page numbering'] },
    'watermark-pdf': { title: 'Watermark PDF', description: 'Add watermarks to PDF documents online.', relatedTools: ['pdf-editor','protect-pdf','sign-pdf'], keywords: ['Watermark PDF','add watermark to PDF','PDF watermark'] },
    'redact-pdf': { title: 'Redact PDF', description: 'Redact sensitive information from PDF documents.', relatedTools: ['pdf-editor','protect-pdf','ocr-pdf'], keywords: ['Redact PDF','PDF redaction','remove sensitive information from PDF'] },
    'sign-pdf': { title: 'Sign PDF', description: 'Add signatures to PDF documents online.', relatedTools: ['pdf-editor','protect-pdf','watermark-pdf'], keywords: ['Sign PDF','sign PDF online','add signature to PDF'] },
    'excel-to-pdf': { title: 'Excel to PDF Converter', description: 'Convert Excel spreadsheets to PDF documents online.', relatedTools: ['word-to-pdf','powerpoint-to-pdf','pdf-to-excel'], keywords: ['Excel to PDF','XLSX to PDF','convert Excel to PDF'] },
    'powerpoint-to-pdf': { title: 'PowerPoint to PDF Converter', description: 'Convert PowerPoint presentations to PDF documents online.', relatedTools: ['word-to-pdf','excel-to-pdf','pdf-to-powerpoint'], keywords: ['PowerPoint to PDF','PPT to PDF','PPTX to PDF'] },
    'jpg-to-pdf': { title: 'JPG to PDF Converter', description: 'Convert JPG images to PDF documents online.', relatedTools: ['image-to-pdf','pdf-to-jpg','compress-pdf'], keywords: ['JPG to PDF','JPEG to PDF','convert image to PDF'] },
    'image-to-pdf': { title: 'Image to PDF Converter', description: 'Convert images into PDF documents online.', relatedTools: ['jpg-to-pdf','pdf-to-jpg','compress-pdf'], keywords: ['Image to PDF','convert images to PDF','photos to PDF'] },
    'html-to-pdf': { title: 'HTML to PDF Converter', description: 'Convert HTML content and web pages to PDF documents online.', relatedTools: ['word-to-pdf','image-to-pdf','compress-pdf'], keywords: ['HTML to PDF','web page to PDF','convert HTML to PDF'] },
    'pdf-to-excel': { title: 'PDF to Excel Converter', description: 'Convert PDF tables and documents to editable Excel spreadsheets online.', relatedTools: ['pdf-to-word','excel-to-pdf','ocr-pdf'], keywords: ['PDF to Excel','PDF to XLSX','convert PDF to Excel'] },
    'pdf-to-powerpoint': { title: 'PDF to PowerPoint Converter', description: 'Convert PDF documents to editable PowerPoint presentations online.', relatedTools: ['pdf-to-word','powerpoint-to-pdf','pdf-to-jpg'], keywords: ['PDF to PowerPoint','PDF to PPT','convert PDF to PPTX'] },
    'pdf-to-jpg': { title: 'PDF to JPG Converter', description: 'Convert PDF pages into JPG images online.', relatedTools: ['pdf-to-png','jpg-to-pdf','compress-pdf'], keywords: ['PDF to JPG','PDF to JPEG','convert PDF to image'] },
    'pdf-to-png': { title: 'PDF to PNG Converter', description: 'Convert PDF pages into PNG images online.', relatedTools: ['pdf-to-jpg','image-to-pdf','compress-pdf'], keywords: ['PDF to PNG','convert PDF to PNG','PDF page to PNG'] },
  },
  linkChains: [
    ['pdf-to-word','word-to-pdf','compress-pdf','merge-pdf','split-pdf'],
    ['merge-pdf','split-pdf','compress-pdf','pdf-editor','ocr-pdf'],
    ['protect-pdf','unlock-pdf','pdf-editor','compress-pdf','merge-pdf'],
    ['ocr-pdf','pdf-to-word','pdf-editor','compress-pdf','merge-pdf'],
  ],
};

export function getRelatedTools(toolSlug: string): Array<{ name: string; slug: string; description: string; keyword: string }> {
  const tool = seoKeywords.toolLinks[toolSlug as keyof typeof seoKeywords.toolLinks];
  if (!tool) return [];
  return tool.relatedTools.flatMap((slug) => {
    const relatedTool = seoKeywords.toolLinks[slug as keyof typeof seoKeywords.toolLinks];
    return relatedTool ? [{ name: relatedTool.title, slug, description: relatedTool.description, keyword: relatedTool.keywords[0] }] : [];
  });
}
