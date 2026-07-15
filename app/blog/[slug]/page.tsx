import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/content/blog-posts-1000';
import Link from 'next/link';
import { getRelatedBlogPosts } from '@/lib/blog-utils';

export const dynamicParams = true;
export const revalidate = 3600; // ISR: revalidate every hour

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const url = `https://pdfilio.com/blog/${post.slug}`;

  return {
    title: `${post.title} | PDFilio Blog`,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [
        {
          url: post.image || 'https://pdfilio.com/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || 'https://pdfilio.com/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post, 4);

  const jsonLd = {
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://pdfilio.com/logo.png',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'PDFilio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pdfilio.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pdfilio.com/blog/${post.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 py-4 text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground line-clamp-1">{post.title}</li>
        </ol>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8 pb-8 border-b border-border">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
              <span className="capitalize bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full">
                {post.tool.replace('-', ' ')}
              </span>
              <span>{post.readTime} min read</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">By {post.author}</p>
              <p className="text-xs text-muted-foreground">Updated {new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden bg-muted h-96">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Meta Info */}
        <div className="border-t border-border pt-8">
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span key={keyword} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
            <div className="flex gap-4 flex-wrap">
              <a
                href={`https://twitter.com/intent/tweet?url=https://pdfilio.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://pdfilio.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://pdfilio.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Author Info */}
          <div className="bg-muted rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-foreground mb-2">About the Author</h4>
            <p className="text-sm text-muted-foreground">
              {post.author} is a team of PDF experts dedicated to helping users master PDF tools and workflows.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border flex-wrap gap-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Blog
          </Link>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse Tools →
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                  <div className="bg-background rounded-lg p-4 hover:border-blue-500/50 transition-all border border-border hover:shadow-lg h-full">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{relatedPost.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{relatedPost.readTime} min</span>
                      <span className="capitalize">{relatedPost.tool.replace('-', ' ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to optimize your PDFs?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Try all PDFilio tools for free. No registration required. Start working with PDFs today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={`/tools?filter=${post.tool}`} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Try {post.tool.replace('-', ' ')}
            </Link>
            <Link href="/tools" className="px-6 py-3 border border-border hover:bg-muted rounded-lg font-semibold transition-colors">
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
