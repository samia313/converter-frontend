import { blogPosts } from '@/lib/content/blog-posts-1000';
import Link from 'next/link';

export const metadata = {
  title: 'PDF Tips, Tutorials & Guides - PDFilio Blog',
  description: 'Learn how to compress, merge, split, and convert PDFs. Read expert tutorials, guides, and best practices for all your PDF needs.',
  keywords: 'PDF tutorials, PDF guides, PDF tips, how to use PDF tools',
  openGraph: {
    title: 'PDFilio Blog - PDF Tutorials & Guides',
    description: 'Expert PDF tutorials and guides for all skill levels',
    type: 'website',
    url: 'https://pdfilio.com/blog',
  },
};

export default function BlogPage() {
  // Group posts by tool for better organization
  const tools = [...new Set(blogPosts.map((p) => p.tool))];
  const postsByTool = tools.map((tool) => ({
    tool,
    posts: blogPosts.filter((p) => p.tool === tool),
  }));

  // Get featured posts
  const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">PDFilio Blog</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master PDF tools with expert tutorials, best practices, and insider tips
          </p>
          <div className="flex gap-4">
            <Link
              href="/?scroll=tools"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Explore Tools
            </Link>
            <Link
              href="/guides"
              className="px-6 py-2 border border-border hover:bg-muted rounded-lg transition-colors"
            >
              View Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors h-full">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.readTime} min read</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts by Tool */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-12">Blog Posts by Tool</h2>
        <div className="space-y-12">
          {postsByTool.map((category) => (
            <div key={category.tool}>
              <h3 className="text-xl font-semibold text-foreground mb-6 capitalize">
                {category.tool.replace('-', ' ')} Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.posts.slice(0, 6).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors">
                      <h4 className="font-medium text-sm text-foreground group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{post.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {category.posts.length > 6 && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/blog?filter=${category.tool}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all {category.posts.length} articles →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{blogPosts.length}</div>
              <div className="text-sm text-muted-foreground">Blog Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{tools.length}</div>
              <div className="text-sm text-muted-foreground">PDF Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Start Optimizing Your PDFs</h2>
          <p className="text-muted-foreground mb-6">Try all PDFilio tools completely free. No credit card required.</p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  );
}
