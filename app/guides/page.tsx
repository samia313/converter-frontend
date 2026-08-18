import { guides } from '@/lib/content/how-to-guides';
import Link from 'next/link';

export const metadata = {
  title: 'PDF How-To Guides | PDFilio',
  description: 'Practical step-by-step guides for compressing, merging, splitting, converting, editing, and working with PDF files.',
  keywords: 'PDF how-to guides, PDF tutorials, PDF instructions, PDF help',
  alternates: { canonical: 'https://pdfilio.com/guides' },
};

export default function GuidesPage() {
  const groups = {
    beginner: guides.filter((g) => g.difficulty === 'beginner'),
    intermediate: guides.filter((g) => g.difficulty === 'intermediate'),
    advanced: guides.filter((g) => g.difficulty === 'advanced'),
  };
  const config = {
    beginner: { color: 'text-green-600', bg: 'bg-green-500/10' },
    intermediate: { color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
    advanced: { color: 'text-red-600', bg: 'bg-red-500/10' },
  };
  return <main className="min-h-screen bg-background">
    <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border py-12"><div className="max-w-6xl mx-auto px-4"><h1 className="text-4xl font-bold text-foreground mb-4">PDF How-To Guides</h1><p className="text-xl text-muted-foreground mb-6">Practical instructions for common PDF tasks, with links to the relevant PDFilio tools.</p><div className="flex gap-4"><Link href="/tools" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Try PDF Tools</Link><Link href="/blog" className="px-6 py-2 border border-border hover:bg-muted rounded-lg">Read Blog</Link></div></div></section>
    {(['beginner','intermediate','advanced'] as const).map((level) => groups[level].length > 0 && <section key={level} className="max-w-6xl mx-auto px-4 py-12 border-b border-border"><div className="flex items-center gap-3 mb-8"><h2 className="text-2xl font-bold text-foreground capitalize">{level} Guides</h2><span className={`px-3 py-1 rounded-full text-sm font-semibold ${config[level].bg} ${config[level].color}`}>{groups[level].length} guides</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{groups[level].map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group"><div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors h-full"><div className="flex items-center gap-3 mb-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${config[level].bg} ${config[level].color}`}>{level}</span><span className="text-xs text-muted-foreground">{guide.readTime} min</span></div><h3 className="font-semibold text-foreground group-hover:text-blue-400 mb-2">{guide.title}</h3><p className="text-sm text-muted-foreground mb-4">{guide.description}</p><div className="flex flex-wrap gap-1">{guide.keywords.slice(0,3).map((keyword) => <span key={keyword} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">{keyword}</span>)}</div></div></Link>)}</div></section>)}
    <section className="max-w-6xl mx-auto px-4 py-12"><div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8 text-center"><h2 className="text-2xl font-bold text-foreground mb-4">Need to edit or convert a PDF?</h2><p className="text-muted-foreground mb-6">Choose a PDFilio tool and complete the task online.</p><Link href="/tools" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">Browse PDF Tools</Link></div></section>
  </main>;
}
