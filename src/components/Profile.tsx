import React, { useState, useEffect } from 'react';
import { Camera, Edit3, MapPin, Briefcase, GraduationCap, Heart, Star, Settings, Shield, Bell, Save, X, Plus, Upload } from 'lucide-react';
import Footer from './Footer';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    age: 26,
    location: "Mumbai, Maharashtra",
    profession: "Software Engineer",
    education: "Graduate",
    bio: "Passionate about technology and innovation. Love exploring new places and trying different cuisines. Looking for someone genuine who shares similar values and interests.",
    interests: ["Technology", "Travel", "Photography", "Cricket", "Music", "Food"],
    photos: ['/indian-man-1.jpg', '/indian-man-2.avif', '/indian-man-3.jpg'],
    height: "5'10\"",
    relationshipGoals: "Long-term relationship",
    lifestyle: "Active",
    drinking: "Socially",
    smoking: "Never",
    pets: "Dog lover"
  });

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: false,
    superLikes: true,
    promotions: false
  });

  const [privacy, setPrivacy] = useState({
    showAge: true,
    showDistance: true,
    showOnline: false,
    readReceipts: true,
    incognito: false
  });

  // Check if user is visiting for first time
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedProfile');
    if (!hasVisited) {
      setShowImageUpload(true);
      localStorage.setItem('hasVisitedProfile', 'true');
    }
  }, []);

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setSelectedImage(imageUrl);
          setProfile(prev => ({
            ...prev,
            photos: [imageUrl, ...prev.photos]
          }));
          setShowImageUpload(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profile);
  };

  const handleAddInterest = () => {
    const newInterest = prompt('Enter a new interest:');
    if (newInterest && !profile.interests.includes(newInterest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest]
      }));
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-col gap-10 min-h-screen pt-10 bg-pink-50 relative">
      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <Upload className="w-12 h-12 text-pink-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Upload Your Photo</h3>
              <p className="text-gray-600 font-medium mb-4">
                Add a great photo to make your profile stand out and get more matches!
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={handleImageUpload}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  Upload Photo
                </button>
                <button 
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            Your Profile
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Make a great first impression
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-white rounded-xl p-2 shadow-lg max-w-2xl mx-auto">
            {[
              { id: 'profile', label: 'Profile', icon: Heart },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'privacy', label: 'Privacy', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                {/* Header with Photos */}
                <div className="relative">
                  <div className="grid grid-cols-3 gap-2 p-3">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-pink-50 rounded-lg overflow-hidden border-2 border-dashed border-pink-200">
                          {profile.photos[index] ? (
                            <img 
                              src={profile.photos[index]}
                              alt={`Profile ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Camera className="w-8 h-8 text-pink-400" />
                          )}
                        </div>
                        {isEditing && (
                          <button 
                            onClick={handleImageUpload}
                            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Camera className="w-8 h-8 text-white" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Edit Button */}
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isEditing ? <X className="w-4 h-4 text-gray-700" /> : <Edit3 className="w-4 h-4 text-gray-700" />}
                  </button>
                </div>

                {/* Profile Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input 
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="text-2xl md:text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 w-full"
                          />
                          <input 
                            type="number"
                            value={profile.age}
                            onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                            className="text-lg text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-500 w-16"
                          />
                        </div>
                      ) : (
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {profile.name}, {profile.age}
                        </h2>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-700">4.8</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Profile Score</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-pink-500" />
                      {isEditing ? (
                        <input 
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="font-medium text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-500 flex-1"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{profile.location}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-4 h-4 text-purple-500" />
                      {isEditing ? (
                        <input 
                          type="text"
                          value={profile.profession}
                          onChange={(e) => setProfile({...profile, profession: e.target.value})}
                          className="font-medium text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-500 flex-1"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{profile.profession}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      {isEditing ? (
                        <input 
                          type="text"
                          value={profile.education}
                          onChange={(e) => setProfile({...profile, education: e.target.value})}
                          className="font-medium text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-pink-500 flex-1"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{profile.education}</span>
                      )}
                    </div>

                    {/* Additional Details */}
                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                          <input 
                            type="text"
                            value={profile.height}
                            onChange={(e) => setProfile({...profile, height: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship Goals</label>
                          <select 
                            value={profile.relationshipGoals}
                            onChange={(e) => setProfile({...profile, relationshipGoals: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          >
                            <option>Long-term relationship</option>
                            <option>Short-term dating</option>
                            <option>Friendship</option>
                            <option>Something casual</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">About Me</h3>
                      {isEditing ? (
                        <textarea 
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          rows={4}
                          className="w-full text-gray-700 leading-relaxed font-medium bg-transparent border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500 resize-none"
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {profile.bio}
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <span 
                            key={index}
                            className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium border border-pink-200 relative group"
                          >
                            {interest}
                            {isEditing && (
                              <button 
                                onClick={() => handleRemoveInterest(interest)}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              >
                                ×
                              </button>
                            )}
                          </span>
                        ))}
                        {isEditing && (
                          <button 
                            onClick={handleAddInterest}
                            className="bg-gray-200 text-gray-600 px-3 py-2 rounded-full text-sm font-medium border-2 border-dashed border-gray-300 hover:border-pink-300 hover:text-pink-600 transition-colors duration-300 flex items-center space-x-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Interest</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Profile Completion */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Profile Completion</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Overall</span>
                    <span className="text-xl font-bold text-pink-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full w-[85%]"></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Photos</span>
                      <span className="text-green-600 font-bold">Complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Bio</span>
                      <span className="text-green-600 font-medium">Complete</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Interests</span>
                      <span className="text-yellow-600 font-medium">Add More</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Profile Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Profile Views</span>
                    <span className="text-xl font-bold text-pink-600">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Likes Received</span>
                    <span className="text-xl font-bold text-purple-600">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Matches</span>
                    <span className="text-xl font-bold text-blue-600">23</span>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">AI Tips</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-bold text-gray-800 mb-2">Photo Tip</h4>
                    <p className="text-sm text-gray-700 font-medium">
                      Add a photo showing your hobbies to increase matches by 40%
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-bold text-gray-800 mb-2">Bio Suggestion</h4>
                    <p className="text-sm text-gray-700 font-medium">
                      Mention specific interests to attract more compatible matches
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Settings */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <Bell className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-semibold text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button 
                      onClick={() => toggleNotification(key as keyof typeof notifications)}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        enabled ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <Settings className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">Account</h3>
              </div>
              <div className="space-y-4">
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700">Change Password</span>
                </button>
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700">Email Preferences</span>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700">Subscription</span>
                </button>
                <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700 text-red-600">Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Privacy Controls */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <Shield className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">Privacy Controls</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(privacy).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button 
                      onClick={() => togglePrivacy(key as keyof typeof privacy)}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        enabled ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Data & Security */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <Shield className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800">Data & Security</h3>
              </div>
              <div className="space-y-4">
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700">Download My Data</span>
                </button>
                <button className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700">Block List</span>
                </button>
                <button className="w-full text-left p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300">
                  <span className="font-semibold text-gray-700">Report Issues</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;