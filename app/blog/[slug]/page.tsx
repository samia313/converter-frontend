import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/content/blog-posts-1000';
import Link from 'next/link';

export const dynamicParams = true;
export const revalidate = 3600; // ISR: revalidate every hour

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function BlogPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden bg-muted">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Meta Info */}
        <div className="border-t border-border pt-8">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Related Posts</h3>
            <div className="space-y-2">
              {blogPosts
                .filter((p) => p.tool === post.tool && p.slug !== post.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="block p-3 bg-muted rounded hover:bg-muted/80 transition-colors"
                  >
                    <div className="font-semibold text-sm">{relatedPost.title}</div>
                    <div className="text-xs text-muted-foreground">{relatedPost.description}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Back to Blog
          </Link>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700">
            Browse Tools →
          </Link>
        </div>
      </article>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                url: 'https://pdfilio.com/logo.png',
              },
            },
          }),
        }}
      />
    </main>
  );
}
