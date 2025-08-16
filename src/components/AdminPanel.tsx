import React, { useState } from 'react';
import { BarChart3, Users, Award, Settings, Search, Filter, MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalItems: 2847,
    pendingClaims: 23,
    resolvedClaims: 2134,
    successRate: 87,
    activeUsers: 1456,
    thisMonth: {
      reported: 156,
      claimed: 132,
      resolved: 128
    }
  };

  const recentItems = [
    {
      id: '1',
      title: 'Blue Backpack',
      status: 'found',
      location: 'Library',
      date: '2025-01-10',
      reporter: 'Sarah Chen',
      claims: 2
    },
    {
      id: '2',
      title: 'iPhone 14 Pro',
      status: 'lost',
      location: 'Student Center',
      date: '2025-01-09',
      reporter: 'Mike Johnson',
      claims: 0
    },
    {
      id: '3',
      title: 'Red Water Bottle',
      status: 'claimed',
      location: 'Gym',
      date: '2025-01-08',
      reporter: 'Alex Rivera',
      claims: 1
    }
  ];

  const pendingClaims = [
    {
      id: '1',
      itemTitle: 'Blue Backpack',
      claimant: 'Emma Wilson',
      date: '2025-01-10',
      status: 'pending_verification',
      confidence: 85
    },
    {
      id: '2',
      itemTitle: 'AirPods Pro',
      claimant: 'David Park',
      date: '2025-01-09',
      status: 'pending_verification',
      confidence: 92
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'items', label: 'Items', icon: Search },
    { id: 'claims', label: 'Claims', icon: CheckCircle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
              <Search className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalItems.toLocaleString()}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Total Items</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">All time</p>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.pendingClaims}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Pending Claims</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Need attention</p>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.resolvedClaims.toLocaleString()}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Resolved Claims</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Successfully returned</p>
        </div>

        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.successRate}%
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Success Rate</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Items returned</p>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Items */}
        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Items</h3>
          <div className="space-y-4">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 dark:bg-gray-800/5">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.location} • by {item.reporter}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'found' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
                    item.status === 'lost' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {item.status}
                  </span>
                  {item.claims > 0 && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.claims} claims
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Claims */}
        <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Pending Claims</h3>
          <div className="space-y-4">
            {pendingClaims.map((claim) => (
              <div key={claim.id} className="p-4 rounded-xl bg-white/5 dark:bg-gray-800/5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{claim.itemTitle}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Claimed by {claim.claimant}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {claim.confidence}% match
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'items':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Items Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Manage all reported items, approve/reject, and handle duplicates.</p>
          </div>
        );
      case 'claims':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Claims Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Review and process all item claims with verification tools.</p>
          </div>
        );
      case 'users':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Management</h3>
            <p className="text-gray-600 dark:text-gray-300">View user activity, manage accounts, and handle user reports.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">System Settings</h3>
            <p className="text-gray-600 dark:text-gray-300">Configure system settings, notifications, and integrations.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Monitor and manage the Lost & Found system
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
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
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

export default AdminPanel;