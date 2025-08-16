import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Calendar, User, Tag, Eye, Clock } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

interface Item {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  status: 'lost' | 'found' | 'claimed';
  image?: string;
  reporter: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const items: Item[] = [
    {
      id: '1',
      title: 'Blue Backpack',
      category: 'bag',
      location: 'Library - 2nd Floor',
      date: '2025-01-10',
      description: 'Navy blue backpack with laptop compartment, found near study area',
      status: 'found',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?w=400',
      reporter: 'Sarah Chen'
    },
    {
      id: '2',
      title: 'iPhone 14 Pro',
      category: 'electronics',
      location: 'Student Center',
      date: '2025-01-09',
      description: 'Space Gray iPhone with cracked screen protector',
      status: 'lost',
      reporter: 'Mike Johnson'
    },
    {
      id: '3',
      title: 'Red Water Bottle',
      category: 'personal',
      location: 'Gym',
      date: '2025-01-08',
      description: 'Hydro Flask red water bottle with stickers',
      status: 'found',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?w=400',
      reporter: 'Alex Rivera'
    },
    {
      id: '4',
      title: 'Student ID Card',
      category: 'documents',
      location: 'Cafeteria',
      date: '2025-01-07',
      description: 'Student ID for Emma Wilson, Computer Science',
      status: 'claimed',
      reporter: 'David Park'
    },
    {
      id: '5',
      title: 'Wireless Earbuds',
      category: 'electronics',
      location: 'Engineering Building',
      date: '2025-01-06',
      description: 'AirPods Pro in white case',
      status: 'found',
      reporter: 'Lisa Garcia'
    },
    {
      id: '6',
      title: 'Black Hoodie',
      category: 'clothing',
      location: 'Sports Complex',
      date: '2025-01-05',
      description: 'Nike black hoodie, size Medium',
      status: 'lost',
      reporter: 'Tom Wilson'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'bag', label: 'Bags & Backpacks' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'documents', label: 'Documents' },
    { id: 'personal', label: 'Personal Items' }
  ];

  const statusTypes = [
    { id: 'all', label: 'All Status' },
    { id: 'lost', label: 'Lost', color: 'text-red-600 bg-red-100 dark:bg-red-900/20' },
    { id: 'found', label: 'Found', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20' },
    { id: 'claimed', label: 'Claimed', color: 'text-gray-600 bg-gray-100 dark:bg-gray-900/20' }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const statusType = statusTypes.find(s => s.id === status);
    return statusType?.color || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  };

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lost & Found Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Browse through reported items and help reunite people with their belongings
          </p>
        </div>

        {/* Search and Filters */}
        <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-3xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items, locations, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
              >
                {statusTypes.map(status => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-700 shadow-md text-purple-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-700 shadow-md text-purple-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredItems.length} of {items.length} items
          </p>
          <button
            onClick={() => onNavigate('report')}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Report Item
          </button>
        </div>

        {/* Items Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl overflow-hidden hover:bg-white/20 dark:hover:bg-gray-800/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {item.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">by {item.reporter}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                      <Eye className="h-4 w-4 mr-2 inline" />
                      View Details
                    </button>
                    {item.status === 'found' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>by {item.reporter}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {item.description}
                    </p>

                    <div className="flex gap-3">
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                        <Eye className="h-4 w-4 mr-2 inline" />
                        View Details
                      </button>
                      {item.status === 'found' && (
                        <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200">
                          Claim Item
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No items found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Try adjusting your search filters or report a new item.
            </p>
            <button
              onClick={() => onNavigate('report')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Report an Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;