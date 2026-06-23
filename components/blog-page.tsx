'use client';

import { blogPosts } from '@/lib/blog-data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface BlogPageProps {
  onSelectPost?: (postId: string) => void;
}

const POSTS_PER_PAGE = 12;

export default function BlogPage({ onSelectPost }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'organize', name: 'Organize' },
    { id: 'optimize', name: 'Optimize' },
    { id: 'convert_to', name: 'Convert To' },
    { id: 'convert_from', name: 'Convert From' },
    { id: 'edit', name: 'Edit & Manage' },
    { id: 'ai', name: 'AI Features' },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = filteredPosts.filter(post => !post.featured);
  
  const totalPages = Math.ceil(recentPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = recentPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
            PDFilio Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional insights and guides for mastering PDF tools and AI-powered document workflows
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 text-sm ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-10">Featured Story</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-2xl h-96 flex items-center justify-center shadow-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-black mb-4">✨</div>
                    <p className="text-lg font-bold">{featuredPost.title}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-xs mb-4">
                    FEATURED
                  </span>
                  <h3 className="text-4xl font-black text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-gray-600 mb-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} min read
                  </div>
                </div>
                <button
                  onClick={() => onSelectPost?.(featuredPost.id)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Read Article
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10">
            {selectedCategory === 'all' ? 'Latest Articles' : 'Related Articles'}
          </h2>
          
          {recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map(post => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => onSelectPost?.(post.id)}
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center text-white">
                      <div className="text-5xl font-black mb-2">📄</div>
                      <p className="font-bold text-sm">{post.category}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-red-600 font-bold text-sm group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? 'bg-red-600 text-white shadow-md'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Post count */}
              <div className="text-center mt-8 text-gray-600 text-sm">
                Showing {startIndex + 1} to {Math.min(startIndex + POSTS_PER_PAGE, recentPosts.length)} of {recentPosts.length} posts
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-6">Subscribe for Updates</h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest PDF tips, AI features, and productivity hacks delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
