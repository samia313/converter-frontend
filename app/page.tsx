'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import HomePage from '@/components/home-page';
import BlogPage from '@/components/blog-page';
import BlogPostDetail from '@/components/blog-post-detail';
import ToolRouter from '@/components/tool-router';

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'blog'>('home');
  const [selectedBlogPost, setSelectedBlogPost] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSelectTool={setSelectedTool}
        onNavigateBlog={() => {
          setCurrentPage('blog');
          setSelectedTool(null);
          setSelectedBlogPost(null);
        }}
      />

      <main>
        {selectedTool ? (
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <ToolRouter
              toolId={selectedTool}
              onBack={() => setSelectedTool(null)}
            />
          </section>
        ) : currentPage === 'blog' ? (
          selectedBlogPost ? (
            <BlogPostDetail
              postId={selectedBlogPost}
              onBack={() => setSelectedBlogPost(null)}
            />
          ) : (
            <BlogPage onSelectPost={setSelectedBlogPost} />
          )
        ) : (
          <HomePage onSelectTool={setSelectedTool} />
        )}
      </main>
    </div>
  );
}
