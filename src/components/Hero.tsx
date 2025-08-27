import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Play, ArrowRight, MessageCircle, Users, Shield, Star, Brain, Zap, Target, Award, Globe, Sparkles, CheckCircle, Camera, Video } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Section 1: Main Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-pink-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-center lg:text-left lg:flex lg:flex-col lg:justify-left lg:items-center gap-4 lg:gap-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600">
                  Find Your Perfect
                  <span className="block text-purple-600">Soul Mate</span>
                </h1>
                
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium">
                  AI-Powered Dating with Digital Body Language Analysis
                </p>
                
                <p className="text-base md:text-lg text-gray-600 max-w-xl">
                  Revolutionary AI technology that analyzes your digital behavior patterns, typing speed, response times, and micro-interactions to find your perfect match.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link 
                  to="/matches"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg relative group"
                >
                  <Heart className="w-5 h-5" />
                  <span>Start Matching</span>
                  
                  {/* Hand pointer animation */}
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 animate-bounce group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">👉</span>
                  </div>
                </Link>
                
                <button className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 font-semibold">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center relative">
              <div className="relative">
                <div className="bg-white rounded-2xl p-4 shadow-xl">
                  <img 
                    src="/1.gif" 
                    alt="Happy Couple Connection" 
                    className="w-full h-64 object-cover rounded-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-64 flex items-center justify-center bg-pink-50 rounded-xl">
                    <Heart className="w-16 h-16 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Demo Video - Full Width */}
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-4 text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-4">
            See SoulSync in Action
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
            Watch how our AI analyzes digital body language to find perfect matches
          </p>
        </div>
        
        <div className="w-full flex justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl w-full mx-4">
            <video 
              className="w-full aspect-square object-cover"
              controls
              poster="/3.gif"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Section 3: Key Features */}
      <section className="bg-pink-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4">
              Revolutionary AI Features
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
              Advanced AI technology that understands human connection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI Analysis', desc: 'Deep learning algorithms analyze digital behavior patterns in real-time', color: 'pink-500' },
              { icon: Zap, title: 'Real-time Insights', desc: 'Instant feedback on conversation compatibility and engagement levels', color: 'purple-500' },
              { icon: Heart, title: 'Perfect Matches', desc: 'Find your soulmate through intelligent matching algorithms', color: 'pink-600' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-xl mb-3`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Statistics */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-12">
            Trusted by Millions
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '2M+', label: 'Active Users' },
              { number: '500K+', label: 'Successful Matches' },
              { number: '95%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'AI Support' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-pink-50 rounded-xl p-6 shadow-md"
              >
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg font-semibold text-gray-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="bg-pink-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              How SoulSync Works
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                { step: '01', title: 'Create Profile', desc: 'Set up your profile with AI-guided questions and personality analysis' },
                { step: '02', title: 'AI Analysis', desc: 'Our AI analyzes your digital behavior patterns and communication style' },
                { step: '03', title: 'Smart Matching', desc: 'Get matched with compatible partners using advanced algorithms' },
                { step: '04', title: 'Connect & Chat', desc: 'Start meaningful conversations with real-time AI insights' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-4 shadow-xl">

                <video src="/couple-gif.mp4" 
                className="w-full h-64 object-cover rounded-xl" 
                autoPlay loop muted playsInline
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}>
                </video>

                <div className="hidden w-full h-64 flex items-center justify-center bg-purple-50 rounded-xl">
                  <Sparkles className="w-16 h-16 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-2">
              Love Stories
            </h2>
            <p className="text-lg text-gray-600 font-medium">Real couples, real connections</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah & Mike', story: 'Found each other through AI analysis. Now married with a beautiful family!', rating: 5 },
              { name: 'Emma & James', story: 'The digital body language feature was amazing! It understood our compatibility perfectly.', rating: 5 },
              { name: 'Lisa & David', story: 'SoulSync\'s AI knew we were perfect for each other before we did. Thank you!', rating: 5 }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-pink-50 rounded-2xl p-6 shadow-md text-center"
              >
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 font-medium mb-3">"{testimonial.story}"</p>
                <h4 className="text-lg font-bold text-pink-600">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Security & Privacy */}
      <section className="bg-pink-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Shield className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Your Privacy Matters
            </h2>
            <p className="text-lg text-gray-600 font-medium mb-6">
              Bank-level security with end-to-end encryption
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                'End-to-End Encryption',
                'GDPR Compliant',
                '24/7 Security Monitoring'
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-bold text-gray-800">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Pricing */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-2">
              Choose Your Plan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Basic', price: 'Free', features: ['Basic Matching', 'Limited Messages', 'Profile Creation'] },
              { name: 'Premium', price: '$19/mo', features: ['AI Analysis', 'Unlimited Messages', 'Advanced Matching', 'Priority Support'], popular: true },
              { name: 'Elite', price: '$39/mo', features: ['Everything in Premium', 'Personal AI Coach', 'Video Calls', 'Exclusive Events'] }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`bg-pink-50 rounded-2xl p-6 shadow-md text-center relative ${
                  plan.popular ? 'ring-2 ring-pink-400 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-pink-600 mb-4">
                  {plan.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-600 font-medium">{feature}</li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                    : 'border-2 border-pink-400 text-pink-600 hover:bg-pink-50'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Community */}
      <section className="bg-pink-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 font-medium mb-8 max-w-2xl mx-auto">
            Connect with like-minded individuals and share your journey
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md">
                <Users className="w-12 h-12 text-pink-500" />
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Active Community</h3>
                  <p className="text-gray-600 font-medium">Join discussions and events</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md">
                <MessageCircle className="w-12 h-12 text-purple-500" />
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Expert Advice</h3>
                  <p className="text-gray-600 font-medium">Get dating tips from professionals</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <div className="w-full h-48 bg-pink-50 rounded-xl flex items-center justify-center">
                <Users className="w-16 h-16 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: CTA */}
      <section className="bg-pink-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Ready to Find Your Soulmate?
          </h2>
          <p className="text-lg text-white font-medium mb-6 max-w-2xl mx-auto">
            Join millions of users who found love through AI-powered matching
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 hover:bg-gray-50 px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 font-bold">
              <Heart className="w-5 h-5" />
              <span>Start Your Journey</span>
            </button>
            
            <button className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 font-bold">
              <ArrowRight className="w-5 h-5" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;