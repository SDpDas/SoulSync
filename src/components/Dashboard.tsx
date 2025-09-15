import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Users, TrendingUp, Activity, Brain, Zap, Star, Award, Target, Eye, ThumbsUp, BarChart3, Gift, Crown, Sparkles, ArrowUp, ArrowDown, Minus, Trophy, CheckCircle, Users2, BarChart2, Menu, X } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, Legend } from 'recharts';
import Footer from './Footer';
import aiService from '../services/aiService';
import { Link } from 'react-router-dom';

interface DashboardStats {
  profileViews: number;
  likes: number;
  matches: number;
  messages: number;
  responseRate: number;
  averageResponseTime: number;
  compatibilityScore: number;
  profileCompleteness: number;
}

interface ActivityData {
  date: string;
  views: number;
  likes: number;
  messages: number;
}

interface CompatibilityTrend {
  date: string;
  compatibility: number;
  emotional_health: number;
  communication: number;
}

interface ABTestData {
  test: string;
  variant_a: number;
  variant_b: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  completed: boolean;
}

interface LiveActivityItem {
  id: number;
  text: string;
  user: string;
  time: string;
  confidence?: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    profileViews: 247,
    likes: 89,
    matches: 23,
    messages: 156,
    responseRate: 85,
    averageResponseTime: 3.2,
    compatibilityScore: 87,
    profileCompleteness: 85
  });

  const [activityData, setActivityData] = useState<ActivityData[]>([
    { date: '2025-09-08', views: 12, likes: 5, messages: 8 },
    { date: '2025-09-09', views: 18, likes: 7, messages: 12 },
    { date: '2025-09-10', views: 15, likes: 4, messages: 6 },
    { date: '2025-09-11', views: 22, likes: 9, messages: 15 },
    { date: '2025-09-12', views: 28, likes: 12, messages: 18 },
    { date: '2025-09-13', views: 25, likes: 8, messages: 14 },
    { date: '2025-09-14', views: 31, likes: 15, messages: 22 }
  ]);

  const [realtimeStats, setRealtimeStats] = useState<{
    average_wpm: number;
    dominant_sentiment: string;
    engagement_trend: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for enhanced features
  const [compatibilityTrends, setCompatibilityTrends] = useState<CompatibilityTrend[]>([
    { date: '2025-09-08', compatibility: 75, emotional_health: 82, communication: 88 },
    { date: '2025-09-09', compatibility: 78, emotional_health: 85, communication: 90 },
    { date: '2025-09-10', compatibility: 80, emotional_health: 87, communication: 92 },
    { date: '2025-09-11', compatibility: 82, emotional_health: 89, communication: 94 },
    { date: '2025-09-12', compatibility: 85, emotional_health: 91, communication: 96 },
    { date: '2025-09-13', compatibility: 87, emotional_health: 93, communication: 98 },
    { date: '2025-09-14', compatibility: 89, emotional_health: 95, communication: 100 }
  ]);

  const [abTestData, setABTestData] = useState<ABTestData[]>([
    { test: 'Profile Photo A vs B', variant_a: 65, variant_b: 78 },
    { test: 'Bio Length Test', variant_a: 72, variant_b: 68 },
    { test: 'Message Timing', variant_a: 58, variant_b: 82 },
    { test: 'Interest Tags', variant_a: 45, variant_b: 67 }
  ]);

  const [missions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Profile Perfection',
      description: 'Complete your profile to 100%',
      progress: 85,
      target: 100,
      reward: 'Premium Badge',
      icon: Target,
      color: 'pink',
      completed: false
    },
    {
      id: '2',
      title: 'Conversation Starter',
      description: 'Send 10 messages this week',
      progress: 7,
      target: 10,
      reward: 'Chat Boost',
      icon: MessageCircle,
      color: 'purple',
      completed: false
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Like 25 profiles',
      progress: 18,
      target: 25,
      reward: 'Super Like',
      icon: Heart,
      color: 'red',
      completed: false
    },
    {
      id: '4',
      title: 'Response Champion',
      description: 'Maintain 90% response rate',
      progress: 85,
      target: 90,
      reward: 'Priority Matching',
      icon: Zap,
      color: 'yellow',
      completed: false
    }
  ]);

  const [emotionalHealthData] = useState([
    { name: 'Happiness', value: 85, fullMark: 100 },
    { name: 'Confidence', value: 78, fullMark: 100 },
    { name: 'Openness', value: 92, fullMark: 100 },
    { name: 'Empathy', value: 88, fullMark: 100 },
    { name: 'Communication', value: 94, fullMark: 100 }
  ]);

  // Live activity mock data
  const [liveActivity, setLiveActivity] = useState<LiveActivityItem[]>([
    { id: 1, text: 'AI mapped "romantic dinner" to Compatibility-11', user: 'Dr. Watson', time: '2 mins ago', confidence: 94 },
    { id: 2, text: 'New match registered with profile', user: 'Alex Johnson', time: '5 mins ago' },
    { id: 3, text: 'Research on conversation starters uploaded', user: 'Dr. Mike', time: '12 mins ago' }
  ]);

  // Today's activity mock data
  const [todaysActivity, setTodaysActivity] = useState([
    { name: 'Interests', count: 23, color: 'pink' },
    { name: 'Profession', count: 12, color: 'purple' },
    { name: 'Education', count: 8, color: 'blue' }
  ]);

  // Mapping accuracy mock data
  const [mappingAccuracyData] = useState([
    { name: 'Positive', value: 92, color: 'green' },
    { name: 'Neutral', value: 85, color: 'gray' },
    { name: 'Tensed', value: 78, color: 'red' }
  ]);

  // System distribution mock data
  const [systemDistributionData] = useState([
    { name: 'Interests', value: 63, color: 'pink' },
    { name: 'Profession', value: 22, color: 'purple' },
    { name: 'Education', value: 15, color: 'red' }
  ]);

  useEffect(() => {
    loadRealtimeStats();
    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      updateRealtimeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadRealtimeStats = async () => {
    try {
      const stats = await aiService.getRealtimeStats();
      setRealtimeStats(stats);
    } catch (error) {
      console.error('Failed to load realtime stats:', error);
    }
  };

  // Math functions to simulate real-time updates
  const updateRealtimeData = () => {
    setStats(prev => ({
      ...prev,
      profileViews: Math.floor(prev.profileViews + Math.random() * 5 + 1),
      likes: Math.floor(prev.likes + Math.random() * 2),
      matches: Math.floor(prev.matches + Math.random() * 1),
      messages: Math.floor(prev.messages + Math.random() * 3),
      responseRate: Math.min(100, Math.floor(prev.responseRate + (Math.random() - 0.5) * 2)),
      averageResponseTime: Math.max(1, prev.averageResponseTime + (Math.random() - 0.5) * 0.5),
      compatibilityScore: Math.min(100, Math.floor(prev.compatibilityScore + (Math.random() - 0.5) * 3)),
      profileCompleteness: Math.min(100, Math.floor(prev.profileCompleteness + Math.random() * 1))
    }));

    setActivityData(prev => {
      const newData = [...prev];
      newData[newData.length - 1] = {
        ...newData[newData.length - 1],
        views: newData[newData.length - 1].views + Math.floor(Math.random() * 3),
        likes: newData[newData.length - 1].likes + Math.floor(Math.random() * 1),
        messages: newData[newData.length - 1].messages + Math.floor(Math.random() * 2)
      };
      return newData;
    });

    setCompatibilityTrends(prev => {
      const newTrends = [...prev];
      newTrends[newTrends.length - 1] = {
        ...newTrends[newTrends.length - 1],
        compatibility: Math.min(100, newTrends[newTrends.length - 1].compatibility + Math.floor(Math.random() * 2)),
        emotional_health: Math.min(100, newTrends[newTrends.length - 1].emotional_health + Math.floor(Math.random() * 1)),
        communication: Math.min(100, newTrends[newTrends.length - 1].communication + Math.floor(Math.random() * 1))
      };
      return newTrends;
    });

    setABTestData(prev => prev.map(item => ({
      ...item,
      variant_a: Math.floor(item.variant_a + (Math.random() - 0.5) * 2),
      variant_b: Math.floor(item.variant_b + (Math.random() - 0.5) * 2)
    })));

    setTodaysActivity(prev => prev.map(item => ({
      ...item,
      count: item.count + Math.floor(Math.random() * 2)
    })));

    // Update liveActivity to simulate real-time changes
    setLiveActivity(prev => {
      const newItems = [...prev];
      // Update times (simple simulation)
      newItems.forEach(item => {
        item.time = `Just Now`;
      });
      // Occasionally add a new item
      if (Math.random() > 0.4) {
        const newId = Math.max(...newItems.map(i => i.id)) + 1;
        newItems.unshift({
          id: newId,
          text: `New like from ${['Sarah', 'Ron', 'Emma'][Math.floor(Math.random() * 3)]}`,
          user: 'System',
          time: 'Just now'
        });
        if (newItems.length > 5) newItems.pop(); // Keep limited
      }
      return newItems;
    });
  };

  const suggestions = [
    {
      icon: Heart,
      title: 'Add More Photos',
      description: 'Profiles with 4+ photos get 40% more matches',
      action: 'Upload Photos',
      priority: 'high',
      color: 'pink'
    },
    {
      icon: MessageCircle,
      title: 'Improve Response Time',
      description: 'Faster responses increase match success by 60%',
      action: 'Set Notifications',
      priority: 'medium',
      color: 'blue'
    },
    {
      icon: Star,
      title: 'Update Your Bio',
      description: 'Mention your hobbies to attract similar interests',
      action: 'Edit Profile',
      priority: 'medium',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Be More Active',
      description: 'Daily activity increases visibility by 3x',
      action: 'Browse Matches',
      priority: 'low',
      color: 'green'
    }
  ];

  const achievements = [
    { icon: Crown, title: 'Profile Star', description: '4.8/5 rating', unlocked: true },
    { icon: Award, title: 'Great Conversationalist', description: '85% response rate', unlocked: true },
    { icon: Sparkles, title: 'Popular Profile', description: '200+ views', unlocked: true },
    { icon: Gift, title: 'Match Maker', description: '20+ matches', unlocked: true },
    { icon: Heart, title: 'Heartbreaker', description: '100+ likes', unlocked: false },
    { icon: TrendingUp, title: 'Rising Star', description: 'Top 10% profiles', unlocked: false }
  ];

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="w-3 h-3 text-green-500" />;
    if (change < 0) return <ArrowDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: number;
    change: number;
    color: string;
  }) => (
    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className="flex items-center space-x-1">
          {getChangeIcon(change)}
          <span className={`text-xs font-medium ${getChangeColor(change)}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>
    </div>
  );

  const SimpleChart = ({ data, type }: { data: ActivityData[], type: 'views' | 'likes' | 'messages' }) => {
    const maxValue = Math.max(...data.map(d => d[type]));
    
    return (
      <div className="flex items-end space-x-1 h-20">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-full rounded-t ${
                type === 'views' ? 'bg-blue-400' : 
                type === 'likes' ? 'bg-pink-400' : 'bg-purple-400'
              }`}
              style={{ 
                height: `${(item[type] / maxValue) * 60}px`,
                minHeight: '4px'
              }}
            />
            <span className="text-xs text-gray-500 mt-1">
              {new Date(item.date).getDate()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Dynamic header based on tab
  const getHeader = (tab: string) => {
    switch (tab) {
      case 'overview':
        return { title: 'Dating Overview', subtitle: 'Real-time analytics and AI-powered match mapping' };
      case 'analytics':
        return { title: 'Advanced Analytics', subtitle: 'Deep insights into your dating performance' };
      case 'insights':
        return { title: 'AI Insights', subtitle: 'Personalized recommendations for better matches' };
      case 'missions':
        return { title: 'Missions & Challenges', subtitle: 'Level up your dating game' };
      case 'achievements':
        return { title: 'Achievements & Rewards', subtitle: 'Celebrate your successes' };
      default:
        return { title: 'Dashboard', subtitle: 'Welcome to your dating hub' };
    }
  };

  const header = getHeader(activeTab);

  const chartHeight = window.innerWidth < 768 ? 250 : 300;

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`w-64 bg-white shadow-lg fixed h-full overflow-y-auto transition-all duration-300 z-50 ${isSidebarOpen ? 'left-0' : '-left-64'} md:left-0 md:translate-x-0`}>
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Heart className="w-10 h-10 text-pink-700" />
              <div className='flex flex-col justify-start'>
                <span className="text-lg font-bold text-pink-500">SoulSync</span>
                <span className='text-[10px] font-normal tracking-wide text-black'>AI Powered Dating Platform</span>
              </div>
              
            </Link>
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'insights', label: 'AI Insights', icon: Brain },
                { id: 'missions', label: 'Missions', icon: Target },
                { id: 'achievements', label: 'Rewards', icon: Award },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false); // Close on mobile
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                    activeTab === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 text-pink-300" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-lg"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Main Content */}
        <div className={`flex flex-col gap-4 flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-64'}`}>
          <div className='pl-6 pt-4 md:pt-6'>
            {/* Dynamic Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{header.title}</h1>
                  <p className="text-base md:text-lg text-gray-600">{header.subtitle}</p>
                </div>
                <div className="text-sm text-gray-500 pr-4">Last updated {new Date().toLocaleTimeString()}</div>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6 md:space-y-8 px-4 md:px-0">
                {/* Main Stats Grid - Adapted to image style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={Eye}
                    title="Profile Views"
                    value={stats.profileViews}
                    change={12}
                    color="blue"
                  />
                  <StatCard
                    icon={ThumbsUp}
                    title="Likes Received"
                    value={stats.likes}
                    change={8}
                    color="pink"
                  />
                  <StatCard
                    icon={Users}
                    title="Total Matches"
                    value={stats.matches}
                    change={15}
                    color="purple"
                  />
                  <StatCard
                    icon={MessageCircle}
                    title="Messages Sent"
                    value={stats.messages}
                    change={-3}
                    color="green"
                  />
                </div>

                {/* Live Activity - Similar to image */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>Live Activity</span>
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {liveActivity.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">{item.text}</p>
                            <p className="text-xs text-gray-500">{item.user} • {item.time}</p>
                            {item.confidence && <p className="text-xs text-green-600">Confidence: {item.confidence}%</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mapping Accuracy - Bar Chart like image */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Match Accuracy</h3>
                    <ResponsiveContainer width="100%" height={chartHeight}>
                      <BarChart data={mappingAccuracyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* System Distribution - Pie Chart like image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Compatibility Distribution</h3>
                    <ResponsiveContainer width="100%" height={chartHeight}>
                      <PieChart>
                        <Pie data={systemDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                          {systemDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Performance Metrics with realtimeStats */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="w-6 h-6 text-pink-500" />
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">Performance</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Response Rate</span>
                        <span className="text-2xl font-bold text-green-600">{stats.responseRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stats.responseRate}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Avg Response Time</span>
                        <span className="text-2xl font-bold text-blue-600">{stats.averageResponseTime.toFixed(1)}h</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Compatibility Score</span>
                        <span className="text-2xl font-bold text-purple-600">{stats.compatibilityScore}%</span>
                      </div>
                    </div>
                    {realtimeStats && (
                      <div className="mt-4 space-y-2 text-sm">
                        <p><strong>Typing Speed:</strong> {realtimeStats.average_wpm} WPM</p>
                        <p><strong>Sentiment:</strong> {realtimeStats.dominant_sentiment}</p>
                        <p><strong>Trend:</strong> {realtimeStats.engagement_trend}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Today's Activity & Quick Actions - Like image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Today's Match Activity</h3>
                    <div className="space-y-4">
                      {todaysActivity.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                            <span className="font-medium text-gray-900">{item.name}</span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors text-sm">
                        <Users2 className="w-4 h-4 inline mr-2" /> Add New Profile
                      </button>
                      <button className="w-full bg-purple-50 border border-purple-200 rounded-lg p-3 hover:bg-purple-100 transition-colors text-sm">
                        <Heart className="w-4 h-4 inline mr-2" /> Add Match Profile
                      </button>
                      <button className="w-full bg-green-50 border border-green-200 rounded-lg p-3 hover:bg-green-100 transition-colors text-sm">
                        <Brain className="w-4 h-4 inline mr-2" /> AI Match Assistant
                      </button>
                      <button className="w-full bg-pink-50 border border-pink-200 rounded-lg p-3 hover:bg-pink-100 transition-colors text-sm">
                        <BarChart2 className="w-4 h-4 inline mr-2" /> Generate Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg mt-8">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 text-green-500" />
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">Profile Completion</h3>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{stats.profileCompleteness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${stats.profileCompleteness}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">✓</div>
                      <p className="text-sm font-medium text-gray-700">Photos Added</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">✓</div>
                      <p className="text-sm font-medium text-gray-700">Bio Written</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">!</div>
                      <p className="text-sm font-medium text-gray-700">Add Interests</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6 md:space-y-8 px-4 md:px-0">
                {/* Compatibility Trends Chart */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-pink-500" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Compatibility Trends</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={chartHeight}>
                    <RechartsLineChart data={compatibilityTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value, name) => [`${value}%`, typeof name === 'string' ? name.replace('_', ' ').toUpperCase() : name]}
                      />
                      <Line type="monotone" dataKey="compatibility" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="emotional_health" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="communication" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>

                {/* A/B Testing Insights */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">A/B Testing Insights</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart data={abTestData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="test" type="category" width={150} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                      <Bar dataKey="variant_a" fill="#ec4899" name="Variant A" />
                      <Bar dataKey="variant_b" fill="#8b5cf6" name="Variant B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Emotional Health Radar */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <Brain className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Emotional Health Gauge</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={chartHeight}>
                    <RadarChart data={emotionalHealthData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar 
                        name="Emotional Health" 
                        dataKey="value" 
                        stroke="#ec4899" 
                        fill="#ec4899" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Activity Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-bold text-gray-900">Profile Views</h3>
                    </div>
                    <SimpleChart data={activityData} type="views" />
                    <p className="text-sm text-gray-600 mt-2 text-center">Last 7 days</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Heart className="w-5 h-5 text-pink-500" />
                      <h3 className="text-lg font-bold text-gray-900">Likes Received</h3>
                    </div>
                    <SimpleChart data={activityData} type="likes" />
                    <p className="text-sm text-gray-600 mt-2 text-center">Last 7 days</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <MessageCircle className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-bold text-gray-900">Messages</h3>
                    </div>
                    <SimpleChart data={activityData} type="messages" />
                    <p className="text-sm text-gray-600 mt-2 text-center">Last 7 days</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-6 md:space-y-8 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className={`w-12 h-12 bg-${suggestion.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <suggestion.icon className={`w-6 h-6 text-${suggestion.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center space-x-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{suggestion.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                              suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {suggestion.priority}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{suggestion.description}</p>
                          <button className={`bg-${suggestion.color}-500 hover:bg-${suggestion.color}-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300`}>
                            {suggestion.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Recommendations */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 md:p-6 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">AI Recommendations</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-2">Optimize Your Photos</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Add a photo showing your hobbies. Profiles with activity photos get 40% more matches.
                      </p>
                      <button className="text-purple-600 font-medium text-sm hover:underline">
                        Upload Photo →
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-2">Improve Your Bio</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Mention specific interests like "hiking" or "cooking" to attract compatible matches.
                      </p>
                      <button className="text-purple-600 font-medium text-sm hover:underline">
                        Edit Bio →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'missions' && (
              <div className="space-y-6 md:space-y-8 px-4 md:px-0">
                <div className="text-center mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Complete Missions & Earn Rewards</h2>
                  <p className="text-gray-600">Level up your dating game with gamified challenges</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {missions.map((mission) => (
                    <div key={mission.id} className={`bg-white rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 ${
                      mission.completed ? 'ring-2 ring-green-400 bg-green-50' : 'hover:shadow-xl'
                    }`}>
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className={`w-12 h-12 bg-${mission.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <mission.icon className={`w-6 h-6 text-${mission.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h3 className="text-lg font-bold text-gray-900">{mission.title}</h3>
                            {mission.completed && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-medium">Completed</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{mission.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">Progress</span>
                              <span className="text-sm font-bold text-gray-900">{mission.progress}/{mission.target}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`bg-${mission.color}-500 h-3 rounded-full transition-all duration-500`}
                                style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Reward */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Gift className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium text-gray-700">Reward: {mission.reward}</span>
                            </div>
                            {!mission.completed && mission.progress < mission.target && (
                              <button className={`bg-${mission.color}-500 hover:bg-${mission.color}-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-sm`}>
                                Continue
                              </button>
                            )}
                            {mission.completed && (
                              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-sm">
                                Claimed
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mission Stats */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 md:p-6 border border-pink-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Mission Stats</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600 mb-1">
                        {missions.filter(m => m.completed).length}
                      </div>
                      <p className="text-sm font-medium text-gray-700">Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {Math.round((missions.filter(m => m.completed).length / missions.length) * 100)}%
                      </div>
                      <p className="text-sm font-medium text-gray-700">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {missions.reduce((sum, m) => sum + m.progress, 0)}
                      </div>
                      <p className="text-sm font-medium text-gray-700">Total Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6 md:space-y-8 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'bg-white hover:shadow-xl' 
                        : 'bg-gray-100 opacity-60'
                    }`}>
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          achievement.unlocked 
                            ? 'bg-yellow-100' 
                            : 'bg-gray-200'
                        }`}>
                          <achievement.icon className={`w-8 h-8 ${
                            achievement.unlocked 
                              ? 'text-yellow-600' 
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {achievement.description}
                        </p>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          achievement.unlocked 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {achievement.unlocked ? 'Unlocked' : 'Locked'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress to Next Achievement */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Next Achievement</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">Heartbreaker</h4>
                      <p className="text-sm text-gray-600 mb-2">Get 100+ likes on your profile</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${(stats.likes / 100) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{stats.likes}/100 likes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;