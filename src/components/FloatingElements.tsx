import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute top-20 left-10 animate-float">
        <Heart className="w-6 h-6 text-pink-300 opacity-60" />
      </div>
      
      <div className="absolute top-40 right-20 animate-float-delayed">
        <Sparkles className="w-8 h-8 text-purple-300 opacity-50" />
      </div>
      
      <div className="absolute bottom-32 left-20 animate-float">
        <Star className="w-5 h-5 text-blue-300 opacity-70" />
      </div>
      
      <div className="absolute top-60 left-1/3 animate-float-delayed">
        <Heart className="w-4 h-4 text-purple-400 opacity-40" />
      </div>
      
      <div className="absolute bottom-20 right-1/4 animate-float">
        <Sparkles className="w-6 h-6 text-pink-300 opacity-60" />
      </div>
      
      <div className="absolute top-80 right-10 animate-float-delayed">
        <Star className="w-7 h-7 text-cyan-300 opacity-50" />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full animate-float blur-sm"></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full animate-float-delayed blur-sm"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full animate-float blur-sm"></div>
    </div>
  );
};

export default FloatingElements;