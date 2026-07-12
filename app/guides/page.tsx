import { guides } from '@/lib/content/how-to-guides';
import Link from 'next/link';

export const metadata = {
  title: 'PDF How-To Guides - Learn All PDF Operations',
  description: 'Complete step-by-step guides for compressing, merging, splitting, and converting PDFs. From beginner to advanced tutorials.',
  keywords: 'PDF how-to guides, PDF tutorials, PDF instructions, PDF steps',
  openGraph: {
    title: 'How-To Guides - PDF Operations Made Easy',
    description: 'Learn how to master every PDF operation with our comprehensive guides',
    type: 'website',
    url: 'https://pdfilio.com/guides',
  },
};

export default function GuidesPage() {
  // Group by difficulty
  const beginnerGuides = guides.filter((g) => g.difficulty === 'beginner');
  const intermediateGuides = guides.filter((g) => g.difficulty === 'intermediate');
  const advancedGuides = guides.filter((g) => g.difficulty === 'advanced');

  const difficultyConfig = {
    beginner: { color: 'text-green-600', bg: 'bg-green-500/10' },
    intermediate: { color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
    advanced: { color: 'text-red-600', bg: 'bg-red-500/10' },
  };

  const GuideCard = ({ guide }: { guide: (typeof guides)[0] }) => (
    <Link href={`/guides/${guide.slug}`} className="group">
      <div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors h-full">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyConfig[guide.difficulty].bg} ${difficultyConfig[guide.difficulty].color} capitalize`}>
            {guide.difficulty}
          </span>
          <span className="text-xs text-muted-foreground">{guide.readTime} min</span>
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
          {guide.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{guide.description}</p>
        <div className="flex flex-wrap gap-1">
          {guide.keywords.slice(0, 3).map((keyword) => (
            <span key={keyword} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">How-To Guides</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Learn how to compress, merge, split, convert, and edit PDFs with our comprehensive guides
          </p>
          <div className="flex gap-4">
            <Link
              href="/tools"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Tools
            </Link>
            <Link
              href="/blog"
              className="px-6 py-2 border border-border hover:bg-muted rounded-lg transition-colors"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Beginner Guides */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Beginner Guides</h2>
          <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
            {beginnerGuides.length} guides
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* Intermediate Guides */}
      {intermediateGuides.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12 border-t border-border">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Intermediate Guides</h2>
            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-semibold">
              {intermediateGuides.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Advanced Guides */}
      {advancedGuides.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12 border-t border-border">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Advanced Guides</h2>
            <span className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
              {advancedGuides.length} guides
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-muted py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{guides.length}</div>
              <div className="text-sm text-muted-foreground">Guides</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-muted-foreground">Topics Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600">1M+</div>
              <div className="text-sm text-muted-foreground">Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Master PDFs?</h2>
          <p className="text-muted-foreground mb-6">Follow our guides and become a PDF expert in minutes</p>
          <Link
            href="/tools"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Start Learning Free
          </Link>
        </div>
      </section>
    </main>
  );
}
