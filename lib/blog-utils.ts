import { blogPosts, BlogPost } from '@/lib/content/blog-posts-1000'

/**
 * Get related blog posts based on tool and category
 */
export function getRelatedBlogPosts(currentPost: BlogPost, limit = 4): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentPost.slug)
    .sort((a, b) => {
      // Prioritize same tool
      const aSameTool = a.tool === currentPost.tool ? 1 : 0
      const bSameTool = b.tool === currentPost.tool ? 1 : 0

      if (aSameTool !== bSameTool) {
        return bSameTool - aSameTool
      }

      // Then prioritize same category
      const aSameCategory = a.category === currentPost.category ? 1 : 0
      const bSameCategory = b.category === currentPost.category ? 1 : 0

      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory
      }

      // Finally prioritize featured posts and newer posts
      if (a.featured !== b.featured) {
        return Number(b.featured) - Number(a.featured)
      }

      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
    .slice(0, limit)
}

/**
 * Get blog posts by tool category
 */
export function getBlogPostsByTool(tool: string): BlogPost[] {
  return blogPosts.filter(post => post.tool === tool)
}

/**
 * Get blog posts by user category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/**
 * Get blog posts by search query
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
      post.tool.toLowerCase().includes(lowerQuery) ||
      post.category.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get recent blog posts
 */
export function getRecentBlogPosts(limit = 10): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/**
 * Get all blog post slugs for sitemap
 */
export function getAllBlogPostSlugs(): string[] {
  return blogPosts.map(post => `/blog/${post.slug}`)
}

/**
 * Get all blog posts with pagination
 */
export function getPaginatedBlogPosts(page: number = 1, postsPerPage: number = 20): {
  posts: BlogPost[]
  total: number
  pages: number
  currentPage: number
} {
  const total = blogPosts.length
  const pages = Math.ceil(total / postsPerPage)
  const start = (page - 1) * postsPerPage
  const posts = blogPosts.slice(start, start + postsPerPage)

  return {
    posts,
    total,
    pages,
    currentPage: page,
  }
}

/**
 * Get all tools for filtering
 */
export function getAllTools(): string[] {
  return [...new Set(blogPosts.map(post => post.tool))].sort()
}

/**
 * Get all categories for filtering
 */
export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map(post => post.category))].sort()
}

/**
 * Get blog statistics
 */
export function getBlogStatistics() {
  return {
    totalPosts: blogPosts.length,
    totalTools: getAllTools().length,
    totalCategories: getAllCategories().length,
    featuredPosts: blogPosts.filter(p => p.featured).length,
    averageReadTime: Math.round(
      blogPosts.reduce((sum, p) => sum + p.readTime, 0) / blogPosts.length
    ),
  }
}

/**
 * Generate structured data for blog post
 */
export function generateBlogPostSchema(post: BlogPost, baseUrl = 'https://pdfilio.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PDFilio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    articleBody: post.content,
    keywords: post.keywords,
  }
}
