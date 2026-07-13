import { notFound } from 'next/navigation';
import { comparisons, getComparisonBySlug } from '@/lib/content/comparisons';
import Link from 'next/link';

export const dynamicParams = true;
export const revalidate = 3600;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const comparison = getComparisonBySlug(params.slug);

  if (!comparison) {
    return {
      title: 'Comparison Not Found',
    };
  }

  return {
    title: comparison.title,
    description: `Compare ${comparison.competitor} with PDFilio - See the differences`,
    keywords: comparison.keywords.join(', '),
  };
}

export default function ComparisonPage({ params }: Props) {
  const comparison = getComparisonBySlug(params.slug);

  if (!comparison) {
    notFound();
  }

  const relatedComparisons = comparisons
    .filter((c) => c.slug !== comparison.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{comparison.title}</h1>
          <p className="text-lg text-muted-foreground">{comparison.description}</p>
          <div className="mt-4 flex gap-4">
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
              Updated: {new Date(comparison.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: comparison.content }} />
        </div>

        {/* CTA */}
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Switch?</h2>
          <p className="text-muted-foreground mb-6">
            Join millions of users who have already made the switch to PDFilio. Start for free today.
          </p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Get Started for Free
          </Link>
        </div>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Other Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/vs/${comp.slug}`}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <h4 className="font-semibold text-sm text-foreground">{comp.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/comparisons" className="text-blue-600 hover:text-blue-700">
            ← All Comparisons
          </Link>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700">
            Browse Tools →
          </Link>
        </div>
      </article>
    </main>
  );
}
