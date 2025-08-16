import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Calendar, User, Tag, Eye, Clock, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import GlassCard from './ui/GlassCard';
import AnimatedButton from './ui/AnimatedButton';
import LoadingSpinner from './ui/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { 
    items, 
    setCurrentPage, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    isLoading
  } = useStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Lost & Found Dashboard
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Browse through reported items and help reunite people with their belongings
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Search items, locations, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/20 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center flex-wrap">
              <motion.select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-white/20 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </motion.select>

              <motion.select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 rounded-xl border border-white/20 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              >
                {statusTypes.map(status => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </motion.select>

              {/* View Toggle */}
              <div className="flex rounded-xl bg-white/10 dark:bg-gray-800/20 p-1 backdrop-blur-lg">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white/20 dark:bg-gray-700/50 shadow-md text-purple-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="h-5 w-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white/20 dark:bg-gray-700/50 shadow-md text-purple-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
          </GlassCard>
        </motion.div>

        {/* Results Info */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p 
            className="text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Showing {filteredItems.length} of {items.length} items
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatedButton
              onClick={() => setCurrentPage('report')}
              variant="success"
              icon={Plus}
            >
              Report Item
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Items Grid/List */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <GlassCard className="group overflow-hidden cursor-pointer">
                      {item.image && (
                        <div className="h-48 overflow-hidden">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
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
                          <AnimatedButton
                            variant="primary"
                            size="sm"
                            icon={Eye}
                            className="flex-1"
                          >
                            View Details
                          </AnimatedButton>
                          {item.status === 'found' && (
                            <AnimatedButton
                              variant="success"
                              size="sm"
                              icon={Heart}
                            >
                              Claim
                            </AnimatedButton>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <GlassCard className="p-6 cursor-pointer">
                      <div className="flex items-center gap-6">
                        {item.image && (
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
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
                            <AnimatedButton
                              variant="primary"
                              icon={Eye}
                            >
                              View Details
                            </AnimatedButton>
                            {item.status === 'found' && (
                              <AnimatedButton
                                variant="success"
                                icon={Heart}
                              >
                                Claim Item
                              </AnimatedButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Search className="h-12 w-12 text-white" />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              No items found
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Try adjusting your search filters or report a new item.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <AnimatedButton
                onClick={() => setCurrentPage('report')}
                variant="success"
                size="lg"
                icon={Plus}
              >
                Report an Item
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;