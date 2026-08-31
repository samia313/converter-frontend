/**
 * Supplemental guide index.
 * The live guide pages are sourced from lib/content/how-to-guides.ts.
 * Keep this file free of unsupported claims about the total guide count.
 */

export interface Guide {
  id: string
  slug: string
  title: string
  url: string
  tool: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  keywords: string[]
}

export const guides: Guide[] = [
  { id: 'guide-001', slug: 'how-to-compress-pdf', title: 'How to Compress PDF', url: '/guides/how-to-compress-pdf', tool: 'Compress PDF', difficulty: 'beginner', keywords: ['compress', 'pdf', 'reduce size'] },
  { id: 'guide-002', slug: 'how-to-merge-pdf', title: 'How to Merge PDF', url: '/guides/how-to-merge-pdf', tool: 'Merge PDF', difficulty: 'beginner', keywords: ['merge', 'combine', 'pdf'] },
  { id: 'guide-003', slug: 'how-to-split-pdf', title: 'How to Split PDF', url: '/guides/how-to-split-pdf', tool: 'Split PDF', difficulty: 'beginner', keywords: ['split', 'divide', 'separate'] },
  { id: 'guide-004', slug: 'how-to-convert-pdf-to-word', title: 'How to Convert PDF to Word', url: '/guides/how-to-convert-pdf-to-word', tool: 'PDF to Word', difficulty: 'beginner', keywords: ['convert', 'word', 'docx'] },
  { id: 'guide-005', slug: 'how-to-convert-pdf-to-excel', title: 'How to Convert PDF to Excel', url: '/guides/how-to-convert-pdf-to-excel', tool: 'PDF to Excel', difficulty: 'beginner', keywords: ['convert', 'excel', 'spreadsheet'] },
  { id: 'guide-006', slug: 'how-to-convert-pdf-to-powerpoint', title: 'How to Convert PDF to PowerPoint', url: '/guides/how-to-convert-pdf-to-powerpoint', tool: 'PDF to PowerPoint', difficulty: 'beginner', keywords: ['convert', 'powerpoint', 'presentation'] },
  { id: 'guide-007', slug: 'how-to-remove-pdf-password', title: 'How to Remove PDF Password', url: '/guides/how-to-remove-pdf-password', tool: 'Unlock PDF', difficulty: 'intermediate', keywords: ['remove', 'password', 'unlock'] },
  { id: 'guide-008', slug: 'how-to-sign-pdf-digitally', title: 'How to Sign PDF Digitally', url: '/guides/how-to-sign-pdf-digitally', tool: 'Sign PDF', difficulty: 'intermediate', keywords: ['sign', 'digital signature', 'document'] },
  { id: 'guide-009', slug: 'how-to-rotate-pdf-pages', title: 'How to Rotate PDF Pages', url: '/guides/how-to-rotate-pdf-pages', tool: 'Rotate PDF', difficulty: 'beginner', keywords: ['rotate', 'orientation', 'page'] },
  { id: 'guide-010', slug: 'how-to-extract-images-from-pdf', title: 'How to Extract Images from PDF', url: '/guides/how-to-extract-images-from-pdf', tool: 'Extract Images', difficulty: 'beginner', keywords: ['extract', 'images', 'pictures'] },
  { id: 'guide-011', slug: 'how-to-add-watermark-to-pdf', title: 'How to Add Watermark to PDF', url: '/guides/how-to-add-watermark-to-pdf', tool: 'Watermark PDF', difficulty: 'intermediate', keywords: ['watermark', 'protect', 'branding'] },
  { id: 'guide-012', slug: 'how-to-convert-image-to-pdf', title: 'How to Convert Image to PDF', url: '/guides/how-to-convert-image-to-pdf', tool: 'Image to PDF', difficulty: 'beginner', keywords: ['convert', 'image', 'jpg png'] },
  { id: 'guide-013', slug: 'how-to-reduce-pdf-file-size', title: 'How to Reduce PDF File Size', url: '/guides/how-to-reduce-pdf-file-size', tool: 'Compress PDF', difficulty: 'beginner', keywords: ['reduce', 'size', 'compress'] },
  { id: 'guide-014', slug: 'how-to-extract-text-from-pdf', title: 'How to Extract Text from PDF', url: '/guides/how-to-extract-text-from-pdf', tool: 'Extract Text', difficulty: 'beginner', keywords: ['extract', 'text', 'copy'] },
  { id: 'guide-015', slug: 'how-to-edit-pdf-online', title: 'How to Edit PDF Online', url: '/guides/how-to-edit-pdf-online', tool: 'Edit PDF', difficulty: 'intermediate', keywords: ['edit', 'online', 'modify'] },
  { id: 'guide-016', slug: 'how-to-add-page-numbers-to-pdf', title: 'How to Add Page Numbers to PDF', url: '/guides/how-to-add-page-numbers-to-pdf', tool: 'PDF Tools', difficulty: 'intermediate', keywords: ['page numbers', 'numbering', 'format'] },
  { id: 'guide-017', slug: 'how-to-delete-pages-from-pdf', title: 'How to Delete Pages from PDF', url: '/guides/how-to-delete-pages-from-pdf', tool: 'Edit PDF', difficulty: 'beginner', keywords: ['delete', 'remove', 'pages'] },
  { id: 'guide-018', slug: 'how-to-protect-pdf-with-password', title: 'How to Protect PDF with Password', url: '/guides/how-to-protect-pdf-with-password', tool: 'Security', difficulty: 'intermediate', keywords: ['protect', 'password', 'security'] },
  { id: 'guide-019', slug: 'how-to-convert-pdf-to-png', title: 'How to Convert PDF to PNG', url: '/guides/how-to-convert-pdf-to-png', tool: 'PDF to PNG', difficulty: 'beginner', keywords: ['convert', 'png', 'image'] },
  { id: 'guide-020', slug: 'how-to-convert-pdf-to-jpg', title: 'How to Convert PDF to JPG', url: '/guides/how-to-convert-pdf-to-jpg', tool: 'PDF to JPG', difficulty: 'beginner', keywords: ['convert', 'jpg', 'image'] },
]

export function getAllGuideUrls(): string[] { return guides.map((guide) => guide.url) }
export function getGuideBySlug(slug: string): Guide | undefined { return guides.find((guide) => guide.slug === slug) }
export function getGuidesByTool(tool: string): Guide[] { return guides.filter((guide) => guide.tool === tool) }
export function getGuidesByDifficulty(difficulty: string): Guide[] { return guides.filter((guide) => guide.difficulty === difficulty) }
