import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
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

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Dashboard', 'Matches', 'Chat', 'Profile'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Features</h3>
            <ul className="space-y-3">
              {['AI Analysis', 'Smart Matching', 'Real-time Chat', 'Privacy Protection', 'Mobile App'].map((feature) => (
                <li key={feature}>
                  <a href="#" className="text-gray-400 hover:text-pink-500 font-medium transition-colors duration-300">
                    {feature}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
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