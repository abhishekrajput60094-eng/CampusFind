import React, { useState } from 'react';
import { User, Award, Clock, CheckCircle, Star, Trophy, Gift, Settings, Bell } from 'lucide-react';

interface UserProfileProps {
  onNavigate: (page: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    joinDate: '2023-09-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
    stats: {
      itemsReported: 12,
      itemsClaimed: 8,
      helpfulReturns: 15,
      successRate: 87
    },
    badges: [
      { id: 'helper', name: 'Community Helper', description: 'Helped return 10+ items', icon: '🤝', earned: true },
      { id: 'reporter', name: 'Eagle Eye', description: 'Reported 10+ lost items', icon: '👁️', earned: true },
      { id: 'finder', name: 'Treasure Hunter', description: 'Found 5+ items', icon: '🔍', earned: true },
      { id: 'trusted', name: 'Trusted Member', description: 'High verification rate', icon: '⭐', earned: false }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'found',
        title: 'Blue Backpack',
        date: '2025-01-10',
        status: 'claimed',
        points: 50
      },
      {
        id: '2',
        type: 'lost',
        title: 'iPhone 14 Pro',
        date: '2025-01-08',
        status: 'pending',
        points: 0
      },
      {
        id: '3',
        type: 'claimed',
        title: 'Red Water Bottle',
        date: '2025-01-05',
        status: 'verified',
        points: 25
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'match',
        message: 'A blue backpack matching your report was found in Library',
        date: '2025-01-10',
        read: false
      },
      {
        id: '2',
        type: 'claim',
        message: 'Your claim for AirPods has been approved',
        date: '2025-01-09',
        read: true
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-white/20 dark:border-gray-700/20"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {userData.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{userData.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
              1,247
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 text-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mx-auto mb-4">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {userData.stats.itemsReported}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Items Reported</div>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 text-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 w-fit mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {userData.stats.itemsClaimed}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Items Claimed</div>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 text-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 w-fit mx-auto mb-4">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {userData.stats.helpfulReturns}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Helpful Returns</div>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 text-center">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 w-fit mx-auto mb-4">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {userData.stats.successRate}%
          </div>
          <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {userData.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 dark:bg-gray-800/5">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'found' ? 'bg-emerald-100 dark:bg-emerald-900/20' :
                  activity.type === 'lost' ? 'bg-red-100 dark:bg-red-900/20' :
                  'bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  {activity.type === 'found' && <Gift className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                  {activity.type === 'lost' && <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />}
                  {activity.type === 'claimed' && <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'claimed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
                  activity.status === 'verified' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  {activity.status}
                </div>
                {activity.points > 0 && (
                  <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    +{activity.points} points
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Achievement Badges
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Earn badges by helping the community and being an active member
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData.badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
              badge.earned
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`text-4xl p-3 rounded-xl ${
                badge.earned ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {badge.earned ? badge.icon : '🔒'}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 ${
                  badge.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {badge.name}
                </h3>
                <p className={`${
                  badge.earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {badge.description}
                </p>
                {badge.earned && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Earned
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'badges':
        return renderBadges();
      case 'activity':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Activity History</h3>
            <p className="text-gray-600 dark:text-gray-300">View your complete activity history and contributions.</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notifications</h3>
            <p className="text-gray-600 dark:text-gray-300">Manage your notification preferences and view recent alerts.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Settings</h3>
            <p className="text-gray-600 dark:text-gray-300">Update your profile information and account preferences.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track your activity and achievements in the community
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;