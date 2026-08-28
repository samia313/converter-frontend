import Image from 'next/image';
import Link from 'next/link';
import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts';

export const metadata = {
  title: 'PDF Guides & Practical Tutorials | PDFilio Blog',
  description: 'Practical PDF guides covering compression, conversion, OCR, security, mobile workflows, and document management.',
  keywords: 'PDF guides, PDF tutorials, PDF tips, PDF conversion, PDF compression, OCR',
  alternates: { canonical: 'https://pdfilio.com/blog' },
  openGraph: {
    title: 'PDFilio Blog - Practical PDF Guides',
    description: 'Clear, practical guides for working with PDF documents.',
    type: 'website',
    url: 'https://pdfilio.com/blog',
    images: [{ url: editorialBlogPosts[0]?.image ?? 'https://pdfilio.com/logo.png', width: 1800, height: 900, alt: 'PDFilio practical PDF guides' }],
  },
};

export default function BlogPage() {
  const featured = editorialBlogPosts.filter((post) => post.featured);
  const latest = editorialBlogPosts.filter((post) => !post.featured);
  const categories = [...new Set(editorialBlogPosts.map((post) => post.category))];

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'PDFilio Blog',
        description: metadata.description, url: 'https://pdfilio.com/blog',
        publisher: { '@type': 'Organization', name: 'PDFilio', url: 'https://pdfilio.com' },
        mainEntity: { '@type': 'ItemList', numberOfItems: editorialBlogPosts.length, itemListElement: editorialBlogPosts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: `https://pdfilio.com/blog/${post.slug}`, name: post.title })) },
      }) }} />

      <section className="border-b border-border bg-gradient-to-br from-blue-600/10 via-background to-purple-600/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">PDFilio Editorial</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Practical PDF guides that help you get the job done</h1>
            <p className="mb-8 text-lg leading-8 text-muted-foreground">Straightforward tutorials, useful checks, and real document workflows — without filler.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">Explore PDF Tools</Link>
              <Link href="/faq" className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">Read FAQs</Link>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="featured-guides">
          <div className="mb-8"><p className="text-sm font-medium text-blue-600">Editor’s picks</p><h2 id="featured-guides" className="text-3xl font-bold text-foreground">Start here</h2></div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image src={post.image} alt={`${post.title} — PDFilio guide`} fill sizes="(max-width: 768px) 100vw, 33vw" priority={index === 0} className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">{post.category}</p><h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-blue-600">{post.title}</h3><p className="mb-5 text-sm leading-6 text-muted-foreground">{post.description}</p><span className="text-sm font-semibold text-blue-600">Read guide →</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-border bg-muted/40 py-14" aria-labelledby="latest-guides">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8"><p className="text-sm font-medium text-blue-600">Latest guides</p><h2 id="latest-guides" className="text-3xl font-bold text-foreground">Useful answers for everyday PDF work</h2></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-xl border border-border bg-background p-6 transition hover:border-blue-500/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                <div className="relative mb-5 aspect-[16/8] overflow-hidden rounded-lg bg-muted"><Image src={post.image} alt={`${post.title} — PDFilio guide`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{post.category}</p>
                <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-blue-600">{post.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{post.description}</p>
                <p className="mt-4 text-xs text-muted-foreground">{post.readTime} min read · Updated {new Date(post.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="blog-topics">
        <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
          <p className="mb-2 text-sm font-semibold text-blue-600">Browse by topic</p>
          <h2 id="blog-topics" className="mb-6 text-2xl font-bold text-foreground">PDF topics covered in the editorial section</h2>
          <div className="flex flex-wrap justify-center gap-2">{categories.map((category) => <span key={category} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">{category}</span>)}</div>
        </div>
      </section>
    </main>
  );
}
