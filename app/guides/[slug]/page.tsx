import { notFound } from 'next/navigation';
import { guides as coreGuides, type Guide } from '@/lib/content/how-to-guides';
import { additionalGuides } from '@/lib/content/additional-guides';
import Link from 'next/link';

const guides: Guide[] = [...coreGuides, ...additionalGuides];
const getGuideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);

export const dynamicParams = true;
export const revalidate = 3600;
interface Props { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guide Not Found | PDFilio' };
  return { title: `${guide.title} | PDFilio Guides`, description: guide.description, keywords: guide.keywords.join(', '), alternates: { canonical: `https://pdfilio.com/guides/${guide.slug}` }, openGraph: { type: 'article', title: `${guide.title} | PDFilio Guides`, description: guide.description, url: `https://pdfilio.com/guides/${guide.slug}` } };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params; const guide = getGuideBySlug(slug); if (!guide) notFound();
  const relatedGuides = guides.filter((g) => guide.relatedGuides.includes(g.slug) && g.slug !== guide.slug);
  const difficultyColors = { beginner: 'bg-green-500/10 text-green-600', intermediate: 'bg-yellow-500/10 text-yellow-600', advanced: 'bg-red-500/10 text-red-600' };
  const publishedDate = new Date(guide.publishedAt).toISOString();
  const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(guide.publishedAt));
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: publishedDate, dateModified: publishedDate, author: { '@type': 'Organization', name: 'PDFilio Editorial Team', url: 'https://pdfilio.com/about' }, publisher: { '@type': 'Organization', name: 'PDFilio', url: 'https://pdfilio.com' }, mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pdfilio.com/guides/${guide.slug}` } };
  return <main className="min-h-screen bg-background"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><article className="max-w-4xl mx-auto px-4 py-12"><nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6"><Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/guides">Guides</Link> <span aria-hidden="true">/</span> <span>{guide.title}</span></nav><header className="mb-8"><div className="flex flex-wrap items-center gap-2 mb-4"><span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${difficultyColors[guide.difficulty]}`}>{guide.difficulty}</span><span className="text-sm text-muted-foreground">{guide.readTime} min read</span><span className="text-sm text-muted-foreground">Updated {formattedDate}</span></div><p className="text-sm text-muted-foreground mb-3">By PDFilio Editorial Team</p><h1 className="text-4xl font-bold text-foreground mb-4">{guide.title}</h1><p className="text-lg text-muted-foreground">{guide.description}</p></header><div className="prose prose-invert max-w-none mb-12"><div dangerouslySetInnerHTML={{ __html: guide.content }} /></div><div className="bg-muted p-6 rounded-lg mb-8"><h2 className="font-semibold text-foreground mb-4">Tools Used in This Guide</h2><div className="flex flex-wrap gap-2">{guide.tools.map((tool) => <Link key={tool} href={`/${tool}`} className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">{tool.replaceAll('-', ' ')}</Link>)}</div></div>{relatedGuides.length > 0 && <section className="mb-12"><h2 className="text-lg font-semibold text-foreground mb-4">Related Guides</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{relatedGuides.map((relatedGuide) => <Link key={relatedGuide.slug} href={`/guides/${relatedGuide.slug}`} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"><h3 className="font-semibold text-sm text-foreground mb-2">{relatedGuide.title}</h3><p className="text-xs text-muted-foreground">{relatedGuide.description}</p></Link>)}</div></section>}<div className="flex justify-between items-center mt-12 pt-8 border-t border-border"><Link href="/guides" className="text-blue-600 hover:text-blue-700">← Back to Guides</Link><Link href="/tools" className="text-blue-600 hover:text-blue-700">Browse Tools →</Link></div></article></main>;
}
