import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star, MapPin, Briefcase, GraduationCap, X, Check, Filter, Search, Sliders, Brain, Zap, Send, ArrowLeft, Phone, Video, MoreHorizontal, Smile } from 'lucide-react';
import geminiService, { UserProfile, MatchingPreferences } from '../services/geminiService';
import Footer from './Footer';

interface Match extends UserProfile {
  lastActive: string;
  distance: number;
  profileImage: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'match';
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  matchId: number;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
}

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [conversations, setConversations] = useState<{ [key: number]: Conversation }>({});
  const [newMessage, setNewMessage] = useState('');
  const [filters, setFilters] = useState({
    ageRange: [18, 50] as [number, number],
    distance: 50,
    profession: '',
    interests: [] as string[],
    education: ''
  });

  const allInterests = ['Technology', 'Travel', 'Photography', 'Cricket', 'Bollywood', 'Music', 'Art', 'Fitness', 'Cooking', 'Reading', 'Movies', 'Dancing', 'Yoga', 'Fashion', 'Food', 'Spirituality'];
  const professions = ['Software Engineer', 'Doctor', 'Teacher', 'Business Owner', 'CA', 'Lawyer', 'Designer', 'Marketing', 'Banker', 'Consultant'];
  const educationLevels = ['12th Pass', 'Graduate', 'Post Graduate', 'PhD', 'Diploma'];

  // Indian profile images
  const profileImages = [
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [matches, searchTerm, filters]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      // Indian names
      const names = ['Priya Sharma', 'Ananya Gupta', 'Kavya Patel', 'Riya Singh', 'Sneha Agarwal', 'Pooja Mehta', 'Nisha Jain', 'Divya Reddy', 'Shreya Iyer', 'Aditi Verma'];
      
      const cities = ['Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh'];
      
      const bios = [
        'Love exploring new places and trying different cuisines. Looking for someone genuine.',
        'Passionate about technology and innovation. Seeking meaningful connections.',
        'Fitness enthusiast who enjoys yoga and meditation. Love peaceful conversations.',
        'Creative soul with love for art and music. Looking for someone who appreciates culture.',
        'Travel lover who enjoys discovering new cultures and experiences.',
        'Book lover and coffee enthusiast. Enjoy deep, intellectual conversations.',
        'Bollywood fan who loves dancing and celebrating life with family.',
        'Foodie who enjoys cooking traditional recipes and trying new restaurants.',
        'Tech professional who believes in work-life balance and family values.',
        'Nature lover who finds peace in mountains and enjoys spiritual journeys.'
      ];

      const mockProfiles: Match[] = [];

      for (let i = 0; i < 10; i++) {
        const randomAge = Math.floor(Math.random() * 10) + 22; // 22-32
        const randomCity = cities[i % cities.length];
        const randomProfession = professions[Math.floor(Math.random() * professions.length)];
        const randomEducation = educationLevels[Math.floor(Math.random() * educationLevels.length)];
        const randomBio = bios[i % bios.length];
        const randomInterests = allInterests.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 3);
        const randomCompatibility = Math.floor(Math.random() * 25) + 70; // 70-95%
        const randomDistance = Math.round((Math.random() * 15 + 1) * 10) / 10; // 0.1-15.0 km
        const randomImage = profileImages[i % profileImages.length];

        mockProfiles.push({
          id: i + 1,
          name: names[i % names.length],
          age: randomAge,
          location: randomCity,
          profession: randomProfession,
          education: randomEducation,
          bio: randomBio,
          interests: randomInterests,
          photos: [randomImage],
          compatibility: randomCompatibility,
          distance: randomDistance,
          lastActive: `${Math.floor(Math.random() * 24) + 1} hours ago`,
          profileImage: randomImage
        });
      }

      // Use Gemini AI for intelligent matching
      const userProfile = {
        age: 26,
        interests: ['Technology', 'Travel', 'Music'],
        profession: 'Software Engineer',
        education: 'Graduate'
      };

      const preferences: MatchingPreferences = {
        ageRange: [22, 32],
        location: 'Mumbai',
        interests: ['Technology', 'Travel', 'Art'],
        profession: 'Engineer'
      };

      const intelligentMatches = await geminiService.generateMatches(userProfile, preferences, mockProfiles);
      
      // Get AI insights
      const insights = await geminiService.getMatchingInsights(userProfile, intelligentMatches);
      setAiInsights(insights);
      
      setMatches(intelligentMatches);
    } catch (error) {
      console.error('Failed to load matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = matches.filter(match => {
      // Age filter
      if (match.age < filters.ageRange[0] || match.age > filters.ageRange[1]) return false;
      
      // Distance filter
      if (match.distance > filters.distance) return false;
      
      // Profession filter
      if (filters.profession && !match.profession.toLowerCase().includes(filters.profession.toLowerCase())) return false;
      
      // Education filter
      if (filters.education && match.education !== filters.education) return false;
      
      // Interests filter
      if (filters.interests.length > 0) {
        const hasCommonInterest = filters.interests.some(interest => 
          match.interests.some(matchInterest => 
            matchInterest.toLowerCase().includes(interest.toLowerCase())
          )
        );
        if (!hasCommonInterest) return false;
      }
      
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return match.name.toLowerCase().includes(searchLower) ||
               match.profession.toLowerCase().includes(searchLower) ||
               match.interests.some(interest => interest.toLowerCase().includes(searchLower));
      }
      
      return true;
    });

    setFilteredMatches(filtered);
  };

  const handleLike = async (matchId: number) => {
    const match = filteredMatches.find(m => m.id === matchId);
    if (match) {
      // Analyze compatibility with Gemini AI
      const compatibility = await geminiService.analyzeCompatibility(
        { age: 26, interests: ['Technology', 'Travel'] },
        match
      );
      console.log(`AI Compatibility Score for ${match.name}: ${Math.round(compatibility * 100)}%`);
    }
  };

  const toggleInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const openChat = (match: Match) => {
    setActiveMatch(match);
    setShowChat(true);
    
    // Initialize conversation if it doesn't exist
    if (!conversations[match.id]) {
      setConversations(prev => ({
        ...prev,
        [match.id]: {
          matchId: match.id,
          messages: [
            {
              id: 1,
              text: `Hi! I saw we matched. I love your profile! 😊`,
              sender: 'match',
              timestamp: new Date(Date.now() - 3600000), // 1 hour ago
              read: true
            }
          ]
        }
      }));
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeMatch) return;

    const message: ChatMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };

    setConversations(prev => ({
      ...prev,
      [activeMatch.id]: {
        ...prev[activeMatch.id],
        messages: [...(prev[activeMatch.id]?.messages || []), message]
      }
    }));

    setNewMessage('');

    // Simulate match response after 2-5 seconds
    setTimeout(() => {
      const responses = [
        "That's so interesting! Tell me more 😊",
        "I completely agree with you!",
        "Haha, you're funny! 😄",
        "I'd love to know more about that",
        "That sounds amazing! I'm jealous 😍",
        "You seem like such a fun person!",
        "I love your perspective on things",
        "We should definitely talk more about this!"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const matchMessage: ChatMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'match',
        timestamp: new Date(),
        read: true
      };

      setConversations(prev => ({
        ...prev,
        [activeMatch.id]: {
          ...prev[activeMatch.id],
          messages: [...(prev[activeMatch.id]?.messages || []), matchMessage]
        }
      }));
    }, Math.random() * 3000 + 2000); // 2-5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Finding Your Perfect Matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 min-h-screen pt-10 bg-pink-50 relative">
      {/* Chat Modal */}
      {showChat && activeMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button 
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <img 
                  src={activeMatch.profileImage} 
                  alt={activeMatch.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{activeMatch.name}</h3>
                  <p className="text-sm text-green-600">Online now</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversations[activeMatch.id]?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            Your Matches
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            AI-curated profiles based on compatibility ({filteredMatches.length} matches found)
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white rounded-xl p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, profession, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2 w-full md:w-auto justify-center"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Age Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={filters.ageRange[0]}
                      onChange={(e) => setFilters(prev => ({ ...prev, ageRange: [parseInt(e.target.value), prev.ageRange[1]] }))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">{filters.ageRange[0]} - {filters.ageRange[1]}</span>
                    <input
                      type="range"
                      min="18"
                      max="50"
                      value={filters.ageRange[1]}
                      onChange={(e) => setFilters(prev => ({ ...prev, ageRange: [prev.ageRange[0], parseInt(e.target.value)] }))}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Distance: {filters.distance} km</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={filters.distance}
                    onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Profession</label>
                  <select
                    value={filters.profession}
                    onChange={(e) => setFilters(prev => ({ ...prev, profession: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Any Profession</option>
                    {professions.map(prof => (
                      <option key={prof} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
                  <select
                    value={filters.education}
                    onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Any Education</option>
                    {educationLevels.map(edu => (
                      <option key={edu} value={edu}>{edu}</option>
                    ))}
                  </select>
                </div>

                {/* Interests */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {allInterests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                          filters.interests.includes(interest)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <div className="mb-6 bg-purple-50 rounded-xl p-4 shadow-lg border-2 border-purple-100">
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-purple-800">AI Matching Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-700 font-medium text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMatches.map((match) => (
            <div 
              key={match.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Profile Image */}
              <div className="relative h-48 bg-white">
                <img 
                  src={match.profileImage} 
                  alt={match.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center bg-pink-50">
                  <Heart className="w-12 h-12 text-pink-400" />
                </div>
                
                {/* Compatibility Badge */}
                <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {match.compatibility}%
                </div>
                
                {/* Online Status */}
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {match.name}, {match.age}
                  </h3>
                  <div className="flex items-center space-x-1 text-gray-600 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium">{match.distance} km away</span>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Briefcase className="w-3 h-3 text-pink-500" />
                    <span className="font-medium text-gray-800">{match.profession}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <GraduationCap className="w-3 h-3 text-purple-500" />
                    <span className="font-medium text-gray-800">{match.education}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                  {match.bio}
                </p>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {match.interests.slice(0, 2).map((interest, index) => (
                      <span 
                        key={index}
                        className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                    {match.interests.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        +{match.interests.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleLike(match.id)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Heart className="w-3 h-3" />
                    <span>Like</span>
                  </button>
                  
                  <button 
                    onClick={() => openChat(match)}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700 mb-4">No matches found</p>
            <button 
              onClick={() => setFilters({ ageRange: [18, 50], distance: 50, profession: '', interests: [], education: '' })}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Matches;