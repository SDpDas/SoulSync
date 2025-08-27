import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, Activity, MessageSquare, Plus, History, Sparkles, Zap, User, Bot, Trash2, Settings, X, Menu } from 'lucide-react';
import Footer from './Footer';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typingSpeed?: number;
  sentiment?: string;
  aiAnalysis?: {
    confidence: number;
    engagement: string;
    suggestions: string[];
  };
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

interface UserStats {
  totalMessages: number;
  averageTypingSpeed: number;
  dominantSentiment: string;
  sessionDuration: number;
  typingSpeeds: number[];
  sentiments: string[];
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [currentTypingSpeed, setCurrentTypingSpeed] = useState(0);
  const [currentSentiment, setCurrentSentiment] = useState('neutral');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalMessages: 0,
    averageTypingSpeed: 0,
    dominantSentiment: 'neutral',
    sessionDuration: 0,
    typingSpeeds: [],
    sentiments: []
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingStartTime = useRef<number>(0);
  const lastKeystroke = useRef<number>(0);
  const sessionStartTime = useRef<number>(Date.now());
  const firstRender = useRef(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    const savedStats = localStorage.getItem('userStats');
    const savedActiveSession = localStorage.getItem('activeSessionId');

    if (savedSessions) {
      const sessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        timestamp: new Date(session.timestamp),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setChatSessions(sessions);
    }

    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    if (savedActiveSession && savedSessions) {
      const sessions = JSON.parse(savedSessions);
      const activeSession = sessions.find((s: any) => s.id === savedActiveSession);
      if (activeSession) {
        setActiveSessionId(savedActiveSession);
        setMessages(activeSession.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } else {
        startNewChat();
      }
    } else {
      startNewChat();
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('activeSessionId', activeSessionId);
    }
  }, [activeSessionId]);

  const calculateRealTypingSpeed = (text: string, timeInSeconds: number): number => {
    if (timeInSeconds <= 0) return 0;
    
    const words = text.trim().split(/\s+/).length;
    const wpm = (words / timeInSeconds) * 60;
    
    // Cap at realistic human typing speeds (10-120 WPM)
    return Math.min(Math.max(Math.round(wpm), 10), 120);
  };

  const analyzeSentiment = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Positive indicators
    const positiveWords = ['love', 'great', 'amazing', 'wonderful', 'happy', 'excited', 'fantastic', 'awesome', 'perfect', 'excellent', 'good', 'nice', 'beautiful'];
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    
    // Negative indicators
    const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'sad', 'angry', 'frustrated', 'disappointed', 'upset', 'horrible'];
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    // Question indicators (curious)
    const questionCount = (text.match(/\?/g) || []).length;
    
    // Excitement indicators
    const exclamationCount = (text.match(/!/g) || []).length;
    const excitedEmojis = ['😍', '🥰', '😘', '💕', '❤️', '✨', '🔥', '💖'];
    const hasExcitedEmoji = excitedEmojis.some(emoji => text.includes(emoji));
    
    // Determine sentiment
    if (hasExcitedEmoji || exclamationCount > 1) {
      return 'excited';
    } else if (positiveCount > negativeCount && positiveCount > 0) {
      return 'positive';
    } else if (negativeCount > positiveCount && negativeCount > 0) {
      return 'negative';
    } else if (questionCount > 0) {
      return 'curious';
    } else {
      return 'neutral';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const now = Date.now();
    const text = e.target.value;
    
    if (text.length === 1 && inputText.length === 0) {
      // Start typing
      typingStartTime.current = now;
    }
    
    if (text.length > 0) {
      const timeElapsed = (now - typingStartTime.current) / 1000;
      const speed = calculateRealTypingSpeed(text, timeElapsed);
      setCurrentTypingSpeed(speed);
      
      // Analyze sentiment in real-time
      const sentiment = analyzeSentiment(text);
      setCurrentSentiment(sentiment);
    }
    
    setInputText(text);
    lastKeystroke.current = now;
  };

  const updateUserStats = (typingSpeed: number, sentiment: string) => {
    setUserStats(prev => {
      const newTypingSpeeds = [...prev.typingSpeeds, typingSpeed].slice(-50); // Keep last 50
      const newSentiments = [...prev.sentiments, sentiment].slice(-50); // Keep last 50
      
      const averageTypingSpeed = Math.round(
        newTypingSpeeds.reduce((sum, speed) => sum + speed, 0) / newTypingSpeeds.length
      );
      
      // Calculate dominant sentiment
      const sentimentCounts: { [key: string]: number } = {};
      newSentiments.forEach(s => {
        sentimentCounts[s] = (sentimentCounts[s] || 0) + 1;
      });
      const dominantSentiment = Object.keys(sentimentCounts).reduce((a, b) => 
        sentimentCounts[a] > sentimentCounts[b] ? a : b
      );
      
      const sessionDuration = Math.round((Date.now() - sessionStartTime.current) / 60000); // minutes
      
      return {
        totalMessages: prev.totalMessages + 1,
        averageTypingSpeed,
        dominantSentiment,
        sessionDuration,
        typingSpeeds: newTypingSpeeds,
        sentiments: newSentiments
      };
    });
  };

  const generateAIResponse = (userInput: string, analysis: any): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('profile') || input.includes('bio')) {
      return "I'd be happy to help you optimize your dating profile! A great profile should showcase your personality authentically. Based on your communication style, I can see you have a unique voice. Would you like me to review your current bio or help you write a compelling new one that attracts the right matches?";
    }
    
    if (input.includes('match') || input.includes('compatibility')) {
      return `Based on your digital communication patterns, you show ${analysis.confidence_level} confidence in your interactions. Your ${analysis.emotional_state} communication style suggests you'd connect well with someone who appreciates genuine, thoughtful conversation. What qualities are most important to you in a potential match?`;
    }
    
    if (input.includes('conversation') || input.includes('chat') || input.includes('talk')) {
      return `Great question! Your typing speed of ${analysis.wpm} WPM and ${analysis.sentiment} sentiment show you're an engaged communicator. For meaningful conversations, try asking open-ended questions about their passions, sharing personal stories that reveal your values, and showing genuine curiosity about their experiences. What conversation topics do you find most engaging?`;
    }
    
    if (input.includes('advice') || input.includes('help') || input.includes('tip')) {
      return `I'm here to help you succeed in dating! Based on your communication patterns, you have authentic engagement. Some personalized tips: maintain your natural communication rhythm, ask follow-up questions to show interest, and don't be afraid to share what makes you unique. What specific dating challenge would you like advice on?`;
    }
    
    if (input.includes('analyze') || input.includes('analysis')) {
      return `Your current communication analysis shows: ${Math.round(analysis.compatibility_score * 100)}% compatibility potential, ${analysis.sentiment} emotional tone, and ${analysis.engagement_level} engagement style. This suggests you communicate authentically and would attract partners who value genuine connection. Would you like me to dive deeper into any specific aspect?`;
    }
    
    return `I understand you're looking to improve your dating experience. Your communication shows ${analysis.sentiment} sentiment with authentic engagement. I can provide personalized advice for profile optimization, conversation strategies, or matching insights. What would be most helpful for you right now?`;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const typingTime = (Date.now() - typingStartTime.current) / 1000;
    const finalTypingSpeed = calculateRealTypingSpeed(inputText, typingTime);
    const finalSentiment = analyzeSentiment(inputText);

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      typingSpeed: finalTypingSpeed,
      sentiment: finalSentiment
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    // Update user stats
    updateUserStats(finalTypingSpeed, finalSentiment);
    
    const messageText = inputText;
    setInputText('');
    setIsAiTyping(true);

    // Simulate AI analysis
    const analysis = {
      wpm: finalTypingSpeed,
      confidence_level: finalTypingSpeed > 40 ? 'high' : finalTypingSpeed > 20 ? 'medium' : 'low',
      emotional_state: finalSentiment,
      sentiment: finalSentiment,
      engagement_level: finalTypingSpeed > 30 ? 'engaged' : 'moderate',
      compatibility_score: Math.random() * 0.3 + 0.7
    };

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText, analysis);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        aiAnalysis: {
          confidence: 0.85,
          engagement: analysis.engagement_level,
          suggestions: [
            "Continue being authentic in your communication",
            "Ask follow-up questions to show interest",
            "Share personal experiences to build connection"
          ]
        }
      };
      
      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);
      
      // Update active session
      updateActiveSession(updatedMessages);
      setIsAiTyping(false);
    }, 1500);
  };

  const updateActiveSession = (newMessages: Message[]) => {
    setChatSessions(prev => {
      const updated = prev.map(session => 
        session.id === activeSessionId 
          ? { ...session, messages: newMessages }
          : session
      );
      return updated;
    });
  };

  const startNewChat = () => {
    const newSessionId = `session_${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Conversation',
      timestamp: new Date(),
      messages: [{
        id: 1,
        text: "Hello! I'm your AI dating assistant. I can help you optimize your profile, improve your conversation skills, and provide personalized dating advice. How can I assist you today?",
        sender: 'ai',
        timestamp: new Date()
      }]
    };
    
    setChatSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setMessages(newSession.messages);
    sessionStartTime.current = Date.now();
  };

  const loadSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setActiveSessionId(sessionId);
      setMessages(session.messages);
    }
  };

  const deleteSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if (sessionId === activeSessionId) {
      if (chatSessions.length > 1) {
        const remainingSessions = chatSessions.filter(s => s.id !== sessionId);
        loadSession(remainingSessions[0].id);
      } else {
        startNewChat();
      }
    }
  };

  const clearAllSessions = () => {
    setChatSessions([]);
    setUserStats({
      totalMessages: 0,
      averageTypingSpeed: 0,
      dominantSentiment: 'neutral',
      sessionDuration: 0,
      typingSpeeds: [],
      sentiments: []
    });
    localStorage.removeItem('chatSessions');
    localStorage.removeItem('userStats');
    localStorage.removeItem('activeSessionId');
    startNewChat();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-8 bg-white flex flex-col">
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative  z-40 w-80 h-full bg-pink-50 border-r border-pink-200 flex flex-col transition-transform duration-300`}>
          {/* Header */}
          <div className="p-3 border-b border-pink-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-pink-600" />
                <h2 className="text-base font-bold text-gray-800">AI Assistant</h2>
              </div>
              <button 
                onClick={() => setShowSidebar(false)}
                className="md:hidden p-1 rounded-lg hover:bg-pink-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button 
              onClick={startNewChat}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-xs"
            >
              <Plus className="w-3 h-3" />
              <span>New Chat</span>
            </button>
          </div>

          {/* User Stats */}
          <div className="p-3 border-b border-pink-200">
            <h3 className="text-xs font-bold text-gray-800 mb-2">Your Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-medium">Messages</span>
                <span className="text-xs text-pink-600 font-bold">{userStats.totalMessages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-medium">Avg Typing</span>
                <span className="text-xs text-purple-600 font-bold">{userStats.averageTypingSpeed} WPM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-medium">Sentiment</span>
                <span className="text-xs text-blue-600 font-bold capitalize">{userStats.dominantSentiment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 font-medium">Session</span>
                <span className="text-xs text-green-600 font-bold">{userStats.sessionDuration}m</span>
              </div>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <History className="w-3 h-3 text-gray-600" />
                  <h3 className="text-xs font-bold text-gray-800">History</h3>
                </div>
                <button
                  onClick={clearAllSessions}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
                  title="Clear all sessions"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-1">
                {chatSessions.map((session) => (
                  <div key={session.id} className="group relative">
                    <button
                      onClick={() => loadSession(session.id)}
                      className={`w-full text-left p-2 rounded-lg transition-all duration-300 ${
                        activeSessionId === session.id
                          ? 'bg-pink-200 border border-pink-400'
                          : 'bg-white hover:bg-pink-100 border border-pink-200'
                      }`}
                    >
                      <div className="font-medium text-gray-800 mb-1 truncate text-xs">
                        {session.messages.length > 1 ? session.messages[1].text.slice(0, 30) + '...' : session.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {session.messages.length} messages • {session.timestamp.toLocaleDateString()}
                      </div>
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowSidebar(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">AI Dating Assistant</h3>
                  <p className="text-gray-600 font-medium text-xs">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-xs text-gray-600 font-medium hidden sm:block">Current Session</div>
                  <div className="text-xs font-bold text-pink-600">{messages.length} messages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs sm:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-3 py-2 rounded-xl ${
                      message.sender === 'user'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="font-medium leading-relaxed text-xs sm:text-sm">{message.text}</p>
                    <div className="flex items-center justify-between mt-1 text-xs opacity-70">
                      <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {message.sender === 'user' && message.typingSpeed && (
                        <span className="hidden sm:inline">{message.typingSpeed} WPM • {message.sentiment}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* AI Analysis */}
                  {message.aiAnalysis && (
                    <div className="mt-2 bg-purple-50 rounded-lg p-2 border border-purple-200">
                      <div className="flex items-center space-x-1 mb-2">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-bold text-purple-800">AI Analysis</span>
                      </div>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p><strong>Engagement:</strong> {message.aiAnalysis.engagement}</p>
                        <div className="hidden sm:block">
                          <strong>Suggestions:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {message.aiAnalysis.suggestions.map((suggestion, index) => (
                              <li key={index} className="text-xs">{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'order-1 mr-3 bg-pink-100' : 'order-2 ml-3 bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-3 h-3 text-pink-600" />
                  ) : (
                    <Bot className="w-3 h-3 text-gray-600" />
                  )}
                </div>
              </div>
            ))}
            
            {isAiTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Live Analysis Panel */}
          <div className="bg-pink-50 border-t border-pink-200 p-2">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3 flex-wrap justify-center">
                <div className="flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-pink-600" />
                  <span className="text-xs font-medium text-gray-700">Typing:</span>
                  <span className="text-xs font-bold text-pink-600">{currentTypingSpeed} WPM</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Brain className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-medium text-gray-700">Sentiment:</span>
                  <span className="text-xs font-bold text-purple-600 capitalize">{currentSentiment}</span>
                </div>
                
                <div className="flex items-center space-x-1 hidden sm:flex">
                  <Zap className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Status:</span>
                  <span className="text-xs font-bold text-green-600">Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="flex space-x-2">
              <textarea
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about dating, relationships, or improving your profile..."
                className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-medium text-xs sm:text-sm"
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isAiTyping}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chat;