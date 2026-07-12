import { featurePages } from '@/lib/content/features';
import Link from 'next/link';

export const metadata = {
  title: 'PDF Tool Features - Explore PDFilio Capabilities',
  description: 'Discover PDFilio features: Best, Fast, Secure, Free, Unlimited PDF tools for every need.',
};

export default function FeaturesPage() {
  const toolFeatures = [...new Set(featurePages.map((f) => f.tool))];

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Features</h1>
          <p className="text-xl text-muted-foreground">
            Explore PDFilio's powerful features and capabilities
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {toolFeatures.map((tool) => {
          const toolFeatures = featurePages.filter((f) => f.tool === tool);
          return (
            <div key={tool} className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 capitalize">
                {tool.replace('-', ' ')} Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolFeatures.map((feature) => (
                  <Link key={feature.slug} href={`/features/${feature.slug}`} className="group">
                    <div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors">
                      <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
