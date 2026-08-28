import Link from 'next/link';
import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts';

export const metadata = {
  title: 'PDF Guides & Practical Tutorials | PDFilio Blog',
  description: 'Practical PDF guides covering compression, conversion, OCR, security, mobile workflows, and document management.',
  keywords: 'PDF guides, PDF tutorials, PDF tips, PDF conversion, PDF compression, OCR',
  openGraph: {
    title: 'PDFilio Blog - Practical PDF Guides',
    description: 'Clear, practical guides for working with PDF documents.',
    type: 'website',
    url: 'https://pdfilio.com/blog',
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
        publisher: { '@type': 'Organization', name: 'PDFilio' },
      }) }} />

      <section className="border-b border-border bg-gradient-to-br from-blue-600/10 via-background to-purple-600/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">PDFilio Editorial</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Practical PDF guides that help you get the job done</h1>
            <p className="mb-8 text-lg leading-8 text-muted-foreground">Straightforward tutorials, useful checks, and real document workflows — without filler.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Explore PDF Tools</Link>
              <Link href="/faq" className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted">Read FAQs</Link>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><p className="text-sm font-medium text-blue-600">Editor’s picks</p><h2 className="text-3xl font-bold text-foreground">Start here</h2></div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[16/9] overflow-hidden bg-muted"><img src={post.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
                <div className="p-6"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">{post.category.replaceAll('-', ' ')}</p><h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-blue-600">{post.title}</h3><p className="mb-5 text-sm leading-6 text-muted-foreground">{post.description}</p><span className="text-sm font-semibold text-blue-600">Read guide →</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-border bg-muted/40 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8"><p className="text-sm font-medium text-blue-600">Latest guides</p><h2 className="text-3xl font-bold text-foreground">Useful answers for everyday PDF work</h2></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-xl border border-border bg-background p-6 transition hover:border-blue-500/40 hover:shadow-lg">
                <div className="mb-5 aspect-[16/8] overflow-hidden rounded-lg bg-muted"><img src={post.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{post.category.replaceAll('-', ' ')}</p>
                <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-blue-600">{post.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
          <p className="mb-2 text-sm font-semibold text-blue-600">Browse by topic</p>
          <h2 className="mb-6 text-2xl font-bold text-foreground">PDF topics covered in the editorial section</h2>
          <div className="flex flex-wrap justify-center gap-2">{categories.map((category) => <span key={category} className="rounded-full border border-border px-4 py-2 text-sm capitalize text-muted-foreground">{category.replaceAll('-', ' ')}</span>)}</div>
        </div>
      </section>
    </main>
  );
}
