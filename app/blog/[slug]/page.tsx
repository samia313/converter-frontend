import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { editorialBlogPosts, getEditorialPost } from '@/lib/content/editorial-blog-posts';

export const dynamicParams = false;
export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return editorialBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getEditorialPost(slug);
  if (!post) return { title: 'Article Not Found | PDFilio' };
  const url = `https://pdfilio.com/blog/${post.slug}`;
  return {
    title: `${post.title} | PDFilio Blog`, description: post.description, keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.description, type: 'article', url, publishedTime: post.publishedAt, modifiedTime: post.updatedAt, images: [{ url: post.image, width: 1600, height: 900, alt: post.title }] },
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = getEditorialPost(slug);
  if (!post) notFound();

  const related = editorialBlogPosts.filter((item) => item.slug !== post.slug && (item.tool === post.tool || item.category === post.category)).slice(0, 3);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, image: post.image, datePublished: post.publishedAt, dateModified: post.updatedAt, author: { '@type': 'Organization', name: post.author }, publisher: { '@type': 'Organization', name: 'PDFilio' }, mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pdfilio.com/blog/${post.slug}` } };

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mx-auto max-w-4xl px-4 py-5 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link href="/blog" className="hover:text-foreground">Blog</Link><span className="mx-2">/</span><span className="text-foreground">{post.title}</span>
      </nav>
      <article className="mx-auto max-w-4xl px-4 pb-16 pt-8">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"><span className="rounded-full bg-blue-600/10 px-3 py-1 font-medium capitalize text-blue-600">{post.category.replaceAll('-', ' ')}</span><span>{post.readTime} min read</span><span>Updated {new Date(post.updatedAt).toLocaleDateString()}</span></div>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">{post.title}</h1>
          <p className="text-xl leading-8 text-muted-foreground">{post.description}</p>
          <p className="mt-5 text-sm text-muted-foreground">By <strong className="text-foreground">{post.author}</strong></p>
        </header>
        <figure className="mb-10 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"><img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" /><figcaption className="px-4 py-3 text-xs text-muted-foreground">Illustration for this PDF guide.</figcaption></figure>
        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-12 border-t border-border pt-8"><p className="mb-3 text-sm font-semibold text-foreground">Related topics</p><div className="flex flex-wrap gap-2">{post.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{keyword}</span>)}</div></div>
      </article>
      {related.length > 0 && <section className="border-t border-border bg-muted/40 py-14"><div className="mx-auto max-w-6xl px-4"><h2 className="mb-7 text-2xl font-bold text-foreground">You may also find these useful</h2><div className="grid gap-5 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-xl border border-border bg-background p-5 hover:shadow-lg"><h3 className="mb-2 font-bold text-foreground">{item.title}</h3><p className="text-sm leading-6 text-muted-foreground">{item.description}</p></Link>)}</div></div></section>}
      <section className="mx-auto max-w-6xl px-4 py-12"><div className="rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 text-center"><h2 className="mb-3 text-2xl font-bold text-foreground">Need to work on a PDF?</h2><p className="mb-6 text-muted-foreground">Use PDFilio's online tools to handle common PDF tasks in a few clicks.</p><Link href="/tools" className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Explore PDF Tools</Link></div></section>
    </main>
  );
}
