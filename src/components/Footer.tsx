import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-5 gap-8 lg:gap-4">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold">SoulSync</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">
              AI-powered dating platform that analyzes digital body language to find your perfect match.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {/* Core Pages */}
          <div className="space-y-6 ml-0 md:ml-10">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Dashboard</Link></li>
              <li><Link to="/matches" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Matches</Link></li>
              <li><Link to="/chat" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Chat</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Profile</Link></li>
            </ul>
          </div>

          {/* Community & Content */}
          <div className="space-y-6 ml-0 md:ml-10">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Blog</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Events</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Community</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Support</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-6 ml-0 md:ml-10">
            <h3 className="text-xl font-bold">Features</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">AI Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Smart Matching</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Real-time Chat</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Privacy Protection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">Mobile App</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6 ml-0 md:ml-10">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-500" />
                <span className="text-gray-400 font-medium">support@soulsync.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-500" />
                <span className="text-gray-400 font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-pink-500" />
                <span className="text-gray-400 font-medium">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-medium">
            © 2025 SoulSync. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;