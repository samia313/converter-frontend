import { notFound } from 'next/navigation';
import { useCases, getUseCaseBySlug } from '@/lib/content/use-cases';
import Link from 'next/link';

export const dynamicParams = true;
export const revalidate = 3600;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return useCases.map((useCase) => ({
    slug: useCase.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const useCase = getUseCaseBySlug(params.slug);

  if (!useCase) {
    return { title: 'Use Case Not Found' };
  }

  return {
    title: useCase.title,
    description: `How to use ${useCase.tool} - PDFilio Use Case`,
    keywords: useCase.keywords.join(', '),
  };
}

export default function UseCasePage({ params }: Props) {
  const useCase = getUseCaseBySlug(params.slug);

  if (!useCase) {
    notFound();
  }

  const relatedUseCases = useCases
    .filter((u) => u.tool === useCase.tool && u.slug !== useCase.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{useCase.title}</h1>
          <p className="text-lg text-muted-foreground">Explore how to use {useCase.tool.replace('-', ' ')} with PDFilio</p>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/tools/${useCase.tool}`}
              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-colors"
            >
              {useCase.tool.replace('-', ' ')}
            </Link>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {useCase.category.replace('-', ' ')}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-4">
              Learn how to make the most of the {useCase.tool.replace('-', ' ')} tool with PDFilio. This comprehensive guide covers best practices, tips, and real-world applications.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Start Using {useCase.tool.replace('-', ' ')} Today</h2>
          <Link
            href={`/tools/${useCase.tool}`}
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Open {useCase.tool.replace('-', ' ')} Tool
          </Link>
        </div>

        {/* Related Use Cases */}
        {relatedUseCases.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedUseCases.map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/use-cases/${uc.slug}`}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <h4 className="font-semibold text-sm text-foreground mb-2">{uc.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">Using {uc.tool.replace('-', ' ')}</p>
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
