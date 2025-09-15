import React, { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, Heart, MessageCircle, Share, BookOpen, User, Tag } from 'lucide-react';
import Footer from './Footer';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  likes: number;
  comments: number;
  image: string;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock blog posts data
  const [posts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "The Science Behind Digital Body Language in Dating",
      date: "September 14, 2025",
      excerpt: "Discover how AI analyzes your typing patterns, response times, and micro-interactions to find your perfect match. Learn about the revolutionary technology that's changing how we connect.",
      author: "Dr. Sarah Chen",
      readTime: "5 min read",
      category: "AI & Technology",
      likes: 124,
      comments: 23,
      image: "/blog-1.jpg"
    },
    {
      id: 2,
      title: "Building Authentic Connections in the Digital Age",
      date: "September 12, 2025",
      excerpt: "Explore strategies for creating meaningful relationships online. From profile optimization to conversation starters, learn how to be your authentic self while dating digitally.",
      author: "Marcus Johnson",
      readTime: "7 min read",
      category: "Dating Tips",
      likes: 89,
      comments: 15,
      image: "/blog-2.jpg"
    },
    {
      id: 3,
      title: "Understanding Emotional Intelligence in Modern Relationships",
      date: "September 10, 2025",
      excerpt: "How emotional intelligence plays a crucial role in successful dating and relationships. Learn to recognize emotional cues and build deeper connections with your matches.",
      author: "Dr. Emily Rodriguez",
      readTime: "6 min read",
      category: "Psychology",
      likes: 156,
      comments: 31,
      image: "/blog-3.jpg"
    }
  ]);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["All", "AI & Technology", "Dating Tips", "Psychology", "Success Stories"];

  return (
    <>
      <div className="min-h-screen py-8 bg-pink-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">SoulSync Blog</h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Insights, tips, and stories about AI-powered dating, relationships, and digital connection
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  searchTerm === '' && category === 'All'
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
                }`}
                onClick={() => setSearchTerm(category === 'All' ? '' : category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse all articles</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full aspect-square rounded-l-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="w-full md:w-2/3 p-4 md:p-6 mt-0 md:mt-6">
                      {/* Category Tag */}
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                          <Tag className="w-3 h-3 mr-1" />
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300 mb-4">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Engagement + CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 transition-colors duration-300">
                            <Share className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>

                        <button className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 font-medium transition-colors duration-300">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      
      </div>
      <Footer />
    </>
  );
};

export default Blog;
