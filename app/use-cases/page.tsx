import { useCases } from '@/lib/content/use-cases';
import Link from 'next/link';

export const metadata = {
  title: 'PDF Use Cases - Real-World PDF Solutions',
  description: 'Explore real-world PDF use cases for students, professionals, businesses, and more. Find your use case and learn solutions.',
};

export default function UseCasesPage() {
  const tools = [...new Set(useCases.map((u) => u.tool))];

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Use Cases</h1>
          <p className="text-xl text-muted-foreground">
            Discover how different groups use PDFilio to solve their challenges
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {tools.map((tool) => {
          const toolUseCases = useCases.filter((u) => u.tool === tool);
          return (
            <div key={tool} className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 capitalize">
                {tool.replace('-', ' ')} Use Cases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolUseCases.slice(0, 12).map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/use-cases/${useCase.slug}`}
                    className="group"
                  >
                    <div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors">
                      <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {useCase.tool.replace('-', ' ')} - {useCase.category.replace('-', ' ')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {toolUseCases.length > 12 && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/use-cases?filter=${tool}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all {toolUseCases.length} use cases →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
