import { Metadata } from 'next';
import { getAIToolConfig, getAllAIToolSlugs, getRelatedAITools } from '@/lib/ai-tools-router';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllAIToolSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getAIToolConfig(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested AI tool was not found.',
    };
  }

  return {
    title: `${tool.name} - Advanced AI Tool | PDFilio`,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: 'website',
    },
  };
}

export default function AIToolPage({ params }: Props) {
  const tool = getAIToolConfig(params.slug);
  const relatedTools = getRelatedAITools(params.slug, 3);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
          <p className="text-gray-600 mb-8">The AI tool you are looking for does not exist.</p>
          <Link href="/tools" className="text-blue-600 hover:text-blue-700 font-semibold">
            Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  const Component = tool.component;

  return (
    <div className="bg-white">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/tools" className="hover:text-gray-900">
              Tools
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{tool.name}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{tool.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{tool.description}</p>
          <div className="flex flex-wrap gap-2">
            {tool.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm border border-blue-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Component />
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="bg-gray-50 border-t">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/ai/${relatedTool.slug}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 group"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{relatedTool.description}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
                    Try Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How does this tool work?</h3>
            <p className="text-gray-600">
              Our AI-powered tools use advanced language models to understand and process your documents.
              Simply upload your file and provide instructions or questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes. Files are processed securely and are not stored permanently on our servers.
              Your privacy is our top priority.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What file formats are supported?</h3>
            <p className="text-gray-600">
              We support PDF, DOCX, TXT, and other common document formats.
              Maximum file size is 50MB.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I batch process multiple files?</h3>
            <p className="text-gray-600">
              Currently, you can process one file at a time. We are working on batch processing features.
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
