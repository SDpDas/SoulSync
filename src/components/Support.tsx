import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, HelpCircle, ChevronDown, ChevronUp, Send, User, Mail as MailIcon, FileText, Shield, Zap } from 'lucide-react';
import Footer from './Footer';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Support: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How does SoulSync's AI analyze digital body language?",
      answer: "SoulSync uses advanced machine learning algorithms to analyze various digital behavior patterns including typing speed, response time, message length, punctuation usage, and emotional tone. Our AI processes these patterns to understand communication styles and compatibility between users, helping to create more meaningful matches.",
      category: "AI Technology"
    },
    {
      id: 2,
      question: "Is my personal data and conversation privacy protected?",
      answer: "Absolutely! SoulSync employs bank-level encryption and follows strict privacy protocols. Your conversations are encrypted end-to-end, and we never share your personal data with third parties. Our AI analysis is done locally on our secure servers, and we comply with GDPR and other international privacy regulations.",
      category: "Privacy & Security"
    }
  ];

  const handleFAQToggle = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Thank you for your message, ${contactForm.name}! We'll get back to you within 24 hours.`);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">Support Center</h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Get help, find answers, and connect with our support team
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-3">Get detailed help via email</p>
            <a href="mailto:support@soulsync.com" className="text-pink-600 font-medium hover:text-pink-700">
              support@soulsync.com
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-3">Chat with our support team</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-3">Call us for urgent issues</p>
            <a href="tel:+15551234567" className="text-green-600 font-medium hover:text-green-700">
              +1 (555) 123-4567
            </a>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Support Hours</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Live Chat & Phone</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM PST</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Email Support</h4>
              <p className="text-gray-600">Available 24/7</p>
              <p className="text-gray-600">Response within 24 hours</p>
              <p className="text-gray-600">Emergency support available</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <HelpCircle className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => handleFAQToggle(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full mb-2">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-gray-900">{item.question}</h4>
                  </div>
                  {expandedFAQ === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === item.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Send className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
          </div>
          
          <form onSubmit={handleContactFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <MailIcon className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="account">Account Support</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                placeholder="Please describe your question or issue in detail..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Documentation</h3>
            <p className="text-gray-600 mb-4">Comprehensive guides and tutorials</p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              View Docs →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Center</h3>
            <p className="text-gray-600 mb-4">Learn about our privacy policies</p>
            <button className="text-green-600 font-medium hover:text-green-700">
              Privacy Policy →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status Page</h3>
            <p className="text-gray-600 mb-4">Check system status and updates</p>
            <button className="text-purple-600 font-medium hover:text-purple-700">
              Check Status →
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Support;
