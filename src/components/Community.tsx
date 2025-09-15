import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Send, MoreHorizontal, ThumbsUp, Reply, BookOpen, Users, TrendingUp, Clock } from 'lucide-react';
import Footer from './Footer';

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  text: string;
  timestamp: string;
  likes: number;
  replies: number;
  shares: number;
  liked: boolean;
  category: string;
}

interface Reply {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        name: "Sarah M.",
        avatar: "/community-1.jpg",
        verified: true
      },
      text: "Just had an amazing first date thanks to SoulSync's AI matching! We clicked instantly and the conversation flowed naturally. The digital body language analysis was spot on - we both type at similar speeds and have matching communication styles. Has anyone else experienced this kind of instant connection? 💕",
      timestamp: "2 hours ago",
      likes: 23,
      replies: 8,
      shares: 3,
      liked: false,
      category: "Success Story"
    },
    {
      id: 2,
      user: {
        name: "TechGuru_Mike",
        avatar: "/community-2.jpg",
        verified: false
      },
      text: "Fascinated by how SoulSync's AI analyzes response patterns! As a developer, I'm curious about the technical implementation. The way it tracks typing speed, pause patterns, and emotional tone is really impressive. Anyone else in tech interested in discussing the algorithms behind this?",
      timestamp: "5 hours ago",
      likes: 15,
      replies: 12,
      shares: 7,
      liked: true,
      category: "Discussion"
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showReplies, setShowReplies] = useState<Set<number>>(new Set());
  const [replies, setReplies] = useState<{ [key: number]: Reply[] }>({
    1: [
      {
        id: 1,
        user: { name: "Alex K.", avatar: "/indian-man-3.jpg" },
        text: "That's so wonderful! I've been using SoulSync for a month now and the matches are definitely more compatible. The AI really understands personality compatibility.",
        timestamp: "1 hour ago",
        likes: 5,
        liked: false
      },
      {
        id: 2,
        user: { name: "Emma L.", avatar: "/indian-man-1.jpg" },
        text: "Same experience here! The conversation quality is so much better when you're matched with someone who has similar communication patterns.",
        timestamp: "45 minutes ago",
        likes: 3,
        liked: true
      }
    ],
    2: [
      {
        id: 3,
        user: { name: "DataScientist_Anna", avatar: "/indian-man-2.avif" },
        text: "The natural language processing aspect is fascinating! They're likely using sentiment analysis and behavioral pattern recognition.",
        timestamp: "3 hours ago",
        likes: 8,
        liked: false
      }
    ]
  });

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleLikeReply = (postId: number, replyId: number) => {
    setReplies({
      ...replies,
      [postId]: replies[postId]?.map(reply =>
        reply.id === replyId
          ? { ...reply, liked: !reply.liked, likes: reply.liked ? reply.likes - 1 : reply.likes + 1 }
          : reply
      ) || []
    });
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        user: {
          name: "You",
          avatar: "/indian-man-3.jpg",
          verified: false
        },
        text: newPost,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        shares: 0,
        liked: false,
        category: "Discussion"
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const toggleReplies = (postId: number) => {
    const newShowReplies = new Set(showReplies);
    if (showReplies.has(postId)) {
      newShowReplies.delete(postId);
    } else {
      newShowReplies.add(postId);
    }
    setShowReplies(newShowReplies);
  };

  const handleAddReply = (postId: number, replyText: string) => {
    if (replyText.trim()) {
      const newReply: Reply = {
        id: Date.now(),
        user: {
          name: "You",
          avatar: "/indian-man-3.jpg"
        },
        text: replyText,
        timestamp: "Just now",
        likes: 0,
        liked: false
      };
      
      setReplies({
        ...replies,
        [postId]: [...(replies[postId] || []), newReply]
      });
      
      // Update post reply count
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, replies: post.replies + 1 }
          : post
      ));
    }
  };

  return (
    <>
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">SoulSync Community</h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Connect, share experiences, and learn from other SoulSync users
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <Users className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2.4K</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Posts Today</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleAddPost} className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, experiences, or ask questions..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Share your SoulSync journey</span>
              </div>
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Post</span>
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Post Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        {post.user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="text-pink-600 font-medium">{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <p className="text-gray-800 leading-relaxed mb-4">{post.text}</p>
                
                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center space-x-2 transition-colors duration-300 ${
                        post.liked ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => toggleReplies(post.id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.replies}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors duration-300">
                      <Share className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Replies Section */}
              {showReplies.has(post.id) && (
                <div className="border-t border-gray-100 bg-gray-50">
                  <div className="p-6">
                    {/* Reply Form */}
                    <div className="mb-4">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const replyText = formData.get('reply') as string;
                        handleAddReply(post.id, replyText);
                        (e.target as HTMLFormElement).reset();
                      }} className="flex space-x-3">
                        <img
                          src="/indian-man-3.jpg"
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 flex space-x-2">
                          <input
                            name="reply"
                            placeholder="Write a reply..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Replies List */}
                    <div className="space-y-4">
                      {replies[post.id]?.map((reply) => (
                        <div key={reply.id} className="flex space-x-3">
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="flex-1">
                            <div className="bg-white rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 text-sm">{reply.user.name}</h4>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{reply.timestamp}</span>
                                </div>
                              </div>
                              <p className="text-gray-800 text-sm mb-2">{reply.text}</p>
                              <button
                                onClick={() => handleLikeReply(post.id, reply.id)}
                                className={`flex items-center space-x-1 text-xs transition-colors duration-300 ${
                                  reply.liked ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'
                                }`}
                              >
                                <ThumbsUp className={`w-3 h-3 ${reply.liked ? 'fill-current' : ''}`} />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Community;
