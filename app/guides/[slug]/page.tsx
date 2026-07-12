import { notFound } from 'next/navigation';
import { guides, getGuideBySlug, getAllGuideSlugs } from '@/lib/content/how-to-guides';
import Link from 'next/link';

export const dynamicParams = true;
export const revalidate = 3600;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords.join(', '),
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guides.filter(
    (g) => guide.relatedGuides.includes(g.slug) && g.slug !== guide.slug
  );

  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-600',
    intermediate: 'bg-yellow-500/10 text-yellow-600',
    advanced: 'bg-red-500/10 text-red-600',
  };

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${difficultyColors[guide.difficulty]}`}>
              {guide.difficulty}
            </span>
            <span className="text-sm text-muted-foreground">{guide.readTime} min read</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{guide.title}</h1>
          <p className="text-lg text-muted-foreground">{guide.description}</p>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>

        {/* Tools Used */}
        <div className="bg-muted p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-foreground mb-4">Tools Used in This Guide</h3>
          <div className="flex flex-wrap gap-2">
            {guide.tools.map((tool) => (
              <Link
                key={tool}
                href={`/tools/${tool}`}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
              >
                {tool.replace('-', ' ')}
              </Link>
            ))}
          </div>
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/guides/${relatedGuide.slug}`}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <h4 className="font-semibold text-sm text-foreground mb-2">{relatedGuide.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{relatedGuide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <Link href="/guides" className="text-blue-600 hover:text-blue-700">
            ← Back to Guides
          </Link>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700">
            Browse Tools →
          </Link>
        </div>
      </article>
    </main>
  );
}
