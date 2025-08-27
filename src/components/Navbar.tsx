import React, { useState } from 'react';
import { Heart, User, MessageCircle, Sparkles, Users, Shield, Menu, X, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/dashboard', label: 'Dashboard', icon: User },
    { to: '/chat', label: 'AI', icon: MessageCircle },
    { to: '/matches', label: 'Matches', icon: Users },
    { to: '/profile', label: 'Profile', icon: Shield }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Heart className="w-6 h-6 text-pink-500" />
              <span className="text-xl font-bold text-pink-600">SoulSync</span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.to) 
                      ? 'bg-pink-100 text-pink-600' 
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                  onClick={() => setCurrentPage(item.label.toLowerCase())}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <Link 
                to="/matches"
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black bg-opacity-50 z-40" onClick={closeMenu}>
            <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive(item.to) 
                        ? 'bg-pink-100 text-pink-600' 
                        : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                    onClick={() => {
                      setCurrentPage(item.label.toLowerCase());
                      closeMenu();
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                <Link 
                  to="/matches"
                  className="block w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-center font-medium"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;