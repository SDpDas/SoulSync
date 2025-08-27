import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Users, TrendingUp, Activity, Brain, Zap, Star, Award, Target, Calendar, Clock, Eye, ThumbsUp, BarChart3, PieChart, LineChart, Settings, Bell, Gift, Crown, Sparkles, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import Footer from './Footer';
import aiService from '../services/aiService';

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
    { date: '2024-01-15', views: 12, likes: 5, messages: 8 },
    { date: '2024-01-16', views: 18, likes: 7, messages: 12 },
    { date: '2024-01-17', views: 15, likes: 4, messages: 6 },
    { date: '2024-01-18', views: 22, likes: 9, messages: 15 },
    { date: '2024-01-19', views: 28, likes: 12, messages: 18 },
    { date: '2024-01-20', views: 25, likes: 8, messages: 14 },
    { date: '2024-01-21', views: 31, likes: 15, messages: 22 }
  ]);

  const [realtimeStats, setRealtimeStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadRealtimeStats();
  }, []);

  const loadRealtimeStats = async () => {
    try {
      const stats = await aiService.getRealtimeStats();
      setRealtimeStats(stats);
    } catch (error) {
      console.error('Failed to load realtime stats:', error);
    }
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

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
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

  return (
    <div className="flex flex-col gap-10 min-h-screen pt-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Dashboard
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Track your dating journey and optimize your success
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center space-x-1 bg-white rounded-xl p-2 shadow-lg max-w-2xl mx-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'suggestions', label: 'Tips', icon: Brain },
              { id: 'achievements', label: 'Rewards', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="w-6 h-6 text-pink-500" />
                  <h3 className="text-xl font-bold text-gray-900">Performance</h3>
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
                    <span className="text-2xl font-bold text-blue-600">{stats.averageResponseTime}h</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Compatibility Score</span>
                    <span className="text-2xl font-bold text-purple-600">{stats.compatibilityScore}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
                </div>
                {realtimeStats ? (
                  <div className="space-y-3">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="font-bold text-purple-800 mb-1">Communication Style</h4>
                      <p className="text-sm text-gray-700">
                        Your {realtimeStats.average_wpm} WPM typing speed shows confident communication
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="font-bold text-blue-800 mb-1">Emotional Tone</h4>
                      <p className="text-sm text-gray-700 capitalize">
                        Predominantly {realtimeStats.dominant_sentiment} sentiment in conversations
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-bold text-green-800 mb-1">Engagement Level</h4>
                      <p className="text-sm text-gray-700">
                        {realtimeStats.engagement_trend === 'increasing' ? 'Growing' : 'Stable'} engagement with matches
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-bold text-gray-900">Profile Completion</h3>
                </div>
                <span className="text-2xl font-bold text-green-600">{stats.profileCompleteness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.profileCompleteness}%` }}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
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
          <div className="space-y-8">
            {/* Activity Charts */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-900">Profile Views</h3>
                </div>
                <SimpleChart data={activityData} type="views" />
                <p className="text-sm text-gray-600 mt-2 text-center">Last 7 days</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <h3 className="text-lg font-bold text-gray-900">Likes Received</h3>
                </div>
                <SimpleChart data={activityData} type="likes" />
                <p className="text-sm text-gray-600 mt-2 text-center">Last 7 days</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-bold text-gray-900">Messages</h3>
                </div>
                <SimpleChart data={activityData} type="messages" />
                <p className="text-sm text-gray-600 mt-2 text-center">Last 7 days</p>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Analytics</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Peak Activity Times</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Morning (6-12 PM)</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Afternoon (12-6 PM)</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Evening (6-12 AM)</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full w-full"></div>
                        </div>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Match Success Rate</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Profile Views → Likes</span>
                      <span className="text-lg font-bold text-pink-600">36%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Likes → Matches</span>
                      <span className="text-lg font-bold text-purple-600">26%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Matches → Conversations</span>
                      <span className="text-lg font-bold text-blue-600">68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-${suggestion.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <suggestion.icon className={`w-6 h-6 text-${suggestion.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
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
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
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

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
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
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next Achievement</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">Heartbreaker</h4>
                  <p className="text-sm text-gray-600 mb-2">Get 100+ likes on your profile</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">89/100 likes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;