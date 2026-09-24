export interface Comparison {
  id: string
  slug: string
  title: string
  url: string
  competitor: string
  keywords: string[]
}

export const competitors = [
  'smallpdf', 'ilovepdf', 'adobe', 'pdf24', 'foxit', 'nitro', 'pdfsam',
  'qpdf', 'ghostscript', 'pdfsharp', 'docotic', 'leadtools', 'asposepdf',
  'imagemagick', 'poppler', 'fitz', 'pdfminer', 'pypdf', 'reportlab'
]

export const comparisons: Comparison[] = competitors.map((competitor, index) => ({
  id: `comp-${String(index + 1).padStart(3, '0')}`,
  slug: `${competitor}-vs-pdfilio`,
  title: `${competitor.charAt(0).toUpperCase() + competitor.slice(1)} vs PDFilio: Detailed Comparison 2024`,
  url: `/vs/${competitor}-vs-pdfilio`,
  competitor,
  keywords: [
    `${competitor} vs pdfilio`,
    `${competitor} alternative`,
    `pdfilio comparison`,
    `best pdf tool`,
    `${competitor} vs pdfilio 2024`
  ]
}))

export function getAllComparisonUrls(): string[] {
  return comparisons.map((comp) => comp.url)
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((comp) => comp.slug === slug)
}

export function getComparisonsByCompetitor(competitor: string): Comparison[] {
  return comparisons.filter((comp) => comp.competitor.toLowerCase().includes(competitor.toLowerCase()))
}
