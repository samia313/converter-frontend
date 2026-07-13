export interface UseCase {
  id: string
  slug: string
  title: string
  url: string
  tool: string
  category: string
  keywords: string[]
}

const tools = ['compress-pdf', 'merge-pdf', 'split-pdf', 'convert-pdf', 'remove-password', 'sign-pdf', 'rotate-pdf', 'extract-images']
const categories = [
  'students', 'professionals', 'businesses', 'whatsapp', 'email',
  'printing', 'upload', 'government-jobs', 'passport', 'visa',
  'resume', 'college', 'archive', 'backup', 'sharing'
]

export const useCases: UseCase[] = tools.flatMap((tool, toolIdx) =>
  categories.map((category, catIdx) => ({
    id: `uc-${String(toolIdx * 100 + catIdx).padStart(4, '0')}`,
    slug: `${tool}-for-${category}`,
    title: `${tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} for ${category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    url: `/use-cases/${tool}-for-${category}`,
    tool,
    category,
    keywords: [tool, category, 'pdf', 'online tool']
  }))
)

export function getAllUseCaseUrls(): string[] {
  return useCases.map((uc) => uc.url)
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((uc) => uc.slug === slug)
}

export function getUseCasesByTool(tool: string): UseCase[] {
  return useCases.filter((uc) => uc.tool === tool)
}

export function getUseCasesByCategory(category: string): UseCase[] {
  return useCases.filter((uc) => uc.category === category)
}
