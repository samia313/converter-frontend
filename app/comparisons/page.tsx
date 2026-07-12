import { comparisons } from '@/lib/content/comparisons';
import Link from 'next/link';

export const metadata = {
  title: 'PDFilio vs Competitors - Detailed Comparisons',
  description: 'Compare PDFilio with Smallpdf, ILovePDF, Adobe, PDF24, Foxit, Nitro, and more. See features, pricing, and why PDFilio is better.',
};

export default function ComparisonsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Comparisons</h1>
          <p className="text-xl text-muted-foreground">
            See how PDFilio compares to other PDF tools
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comp) => (
            <Link key={comp.slug} href={`/vs/${comp.slug}`} className="group">
              <div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors">
                <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2">
                  {comp.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{comp.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
