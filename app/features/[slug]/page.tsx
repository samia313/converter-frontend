import { notFound } from 'next/navigation';
import { featurePages, getFeatureBySlug, getAllFeatureSlugs } from '@/lib/content/features';
import Link from 'next/link';

export const dynamicParams = true;
export const revalidate = 3600;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllFeatureSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const feature = getFeatureBySlug(params.slug);

  if (!feature) {
    return { title: 'Feature Not Found' };
  }

  return {
    title: feature.title,
    description: feature.description,
    keywords: feature.keywords.join(', '),
  };
}

export default function FeaturePage({ params }: Props) {
  const feature = getFeatureBySlug(params.slug);

  if (!feature) {
    notFound();
  }

  const relatedFeatures = featurePages
    .filter((f) => f.tool === feature.tool && f.slug !== feature.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{feature.title}</h1>
          <p className="text-lg text-muted-foreground">{feature.description}</p>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: feature.content }} />
        </div>

        {/* Related Features */}
        {relatedFeatures.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedFeatures.map((f) => (
                <Link
                  key={f.slug}
                  href={`/features/${f.slug}`}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <h4 className="font-semibold text-sm text-foreground">{f.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/tools" className="text-blue-600 hover:text-blue-700">
            ← Back to Tools
          </Link>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Home →
          </Link>
        </div>
      </article>
    </main>
  );
}
