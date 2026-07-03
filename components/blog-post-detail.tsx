'use client';

import { blogPosts } from '@/lib/blog-data';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

interface BlogPostDetailProps {
  postId: string;
  onBack?: () => void;
}

export default function BlogPostDetail({ postId, onBack }: BlogPostDetailProps) {
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="w-full py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h2>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="w-full">
      {/* Back Button */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-xs mb-4">
              {post.category.toUpperCase()}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">PDFilio Team</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              {post.readTime} min read
            </div>

            <button className="ml-auto p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600 hover:text-red-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Image */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-96 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-7xl font-black mb-4">📚</div>
              <p className="text-lg font-bold">{post.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1
                      key={idx}
                      className="text-4xl font-black text-gray-900 mt-12 mb-6 first:mt-0"
                    >
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl font-black text-gray-900 mt-8 mb-4"
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').map(line => line.replace('- ', ''));
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                      {items.map((item, i) => (
                        <li key={i} className="ml-4">{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-bold text-gray-900 mt-6 mb-3"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <article
                  key={relatedPost.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl font-black mb-2">📖</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-4">Ready to transform your PDF workflow?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start using PDFilio's professional tools today
          </p>
          <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
