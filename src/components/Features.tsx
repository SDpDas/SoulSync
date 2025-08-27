import React from 'react';
import { Brain, Zap, Heart, Eye, Clock, MessageSquare } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Digital Body Language Analysis',
      description: 'Our AI analyzes typing patterns, response times, and micro-interactions to understand genuine emotions and interest levels.',
      gradient: 'from-purple-500 to-blue-500',
      delay: '0'
    },
    {
      icon: Zap,
      title: 'Real-time Sentiment Detection',
      description: 'Advanced ML algorithms decode hesitation, excitement, and emotional states from digital communication patterns.',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '200'
    },
    {
      icon: Eye,
      title: 'Micro-Interaction Tracking',
      description: 'Monitor scrolls, pauses, and engagement patterns to identify authentic connections and mutual attraction.',
      gradient: 'from-cyan-500 to-teal-500',
      delay: '400'
    },
    {
      icon: Clock,
      title: 'Response Time Analysis',
      description: 'Understand communication styles and interest levels through sophisticated timing pattern recognition.',
      gradient: 'from-teal-500 to-green-500',
      delay: '600'
    },
    {
      icon: MessageSquare,
      title: 'Conversation Quality Score',
      description: 'AI-powered scoring system that evaluates conversation depth, engagement, and compatibility indicators.',
      gradient: 'from-green-500 to-yellow-500',
      delay: '800'
    },
    {
      icon: Heart,
      title: 'Compatibility Prediction',
      description: 'Machine learning models predict long-term compatibility based on digital behavior patterns and communication styles.',
      gradient: 'from-yellow-500 to-pink-500',
      delay: '1000'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-blue-50/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Revolutionary AI Features
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the future of digital dating with our cutting-edge AI technology that reads between the lines of every interaction
          </p>
        </div>

        {/* Main Feature Highlight */}
        <div className="mb-20 relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border-2 border-purple-100 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-blue-400/5 animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-8 shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Digital Body Language 🌟
              </h3>
              
              <p className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-5xl mx-auto leading-relaxed font-medium">
                Decode hesitation, scrolls, pauses. Our revolutionary AI technology analyzes micro-interactions, 
                response times, typing patterns, and digital behavior to understand genuine interest and emotional states. 
                Create technology that reads between the lines of digital communication, detecting authenticity and mutual attraction through subtle digital cues.
              </p>
              
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110"></div>
                  <div className="relative bg-white rounded-3xl p-4 border-4 border-white shadow-2xl">
                    <img 
                      src="/2.gif" 
                      alt="AI Analysis" 
                      className="w-64 h-48 object-cover rounded-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-64 h-48 flex items-center justify-center bg-blue-50 rounded-2xl">
                      <Brain className="w-16 h-16 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/80 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden hover:border-purple-200`}
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r ${feature.gradient} rounded-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-9 h-9 text-white" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <button className="bg-gradient-to-r from-purple-700 to-blue-700 text-white px-16 py-6 rounded-full text-xl font-black hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group">
            <span className="flex items-center space-x-3">
              <span>Experience AI-Powered Dating</span>
              <Zap className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;