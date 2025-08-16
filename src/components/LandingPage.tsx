import React, { useState, useEffect } from 'react';
import { Search, Plus, Upload, MapPin, TrendingUp, Users, Clock, Award, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import GlassCard from './ui/GlassCard';
import AnimatedButton from './ui/AnimatedButton';

const LandingPage: React.FC = () => {
  const { setCurrentPage, items } = useStore();
  const [counters, setCounters] = useState({
    totalItems: 0,
    itemsClaimed: 0,
    successRate: 0
  });

  // Animated counter effect
  useEffect(() => {
    const animateCounters = () => {
      const targetValues = { 
        totalItems: items.length + 2844, 
        itemsClaimed: Math.floor((items.length + 2844) * 0.75), 
        successRate: 87 
      };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          totalItems: Math.floor(targetValues.totalItems * progress),
          itemsClaimed: Math.floor(targetValues.itemsClaimed * progress),
          successRate: Math.floor(targetValues.successRate * progress)
        });

        if (step >= steps) {
          clearInterval(interval);
          setCounters(targetValues);
        }
      }, stepDuration);

      return interval;
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, [items.length]);

  const quickActions = [
    {
      icon: Search,
      title: 'Search Lost Items',
      description: 'Browse through reported lost items',
      gradient: 'from-blue-500 to-cyan-600',
      onClick: () => setCurrentPage('dashboard')
    },
    {
      icon: Upload,
      title: 'Report Found Item',
      description: 'Help someone by reporting a found item',
      gradient: 'from-emerald-500 to-green-600',
      onClick: () => setCurrentPage('report')
    },
    {
      icon: Plus,
      title: 'Report Lost Item',
      description: 'Lost something? Report it here',
      gradient: 'from-purple-500 to-pink-600',
      onClick: () => setCurrentPage('report')
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Search',
      description: 'Smart suggestions and category detection'
    },
    {
      icon: MapPin,
      title: 'Location Tracking',
      description: 'Pinpoint where items were last seen'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get notified when matching items are found'
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn badges for helping the community'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Never Lose
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Anything Again
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The next-generation AI-powered Lost & Found system for your campus. 
              Report, search, and claim items with intelligent matching.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <motion.input
                  type="text"
                  placeholder="Try searching 'blue backpack in library'..."
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-white/20 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  onFocus={() => setCurrentPage('dashboard')}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <GlassCard 
                    className="group relative p-8 cursor-pointer"
                    onClick={action.onClick}
                  >
                    <motion.div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${action.gradient} mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                      {action.description}
                    </p>
                    <motion.div
                      className="flex items-center text-purple-600 dark:text-purple-400 font-medium"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Counter */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { value: counters.totalItems, label: 'Items Reported', gradient: 'from-blue-600 to-purple-600' },
              { value: counters.itemsClaimed, label: 'Items Claimed', gradient: 'from-emerald-600 to-green-600' },
              { value: `${counters.successRate}%`, label: 'Success Rate', gradient: 'from-purple-600 to-pink-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
              >
                <GlassCard className="text-center p-8">
                  <motion.div 
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 1.5 + index * 0.1 }}
                  >
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-300 text-lg">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Powered by Intelligence
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Advanced AI algorithms help match lost items with found ones, 
              making the recovery process faster and more efficient than ever.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className="text-center p-6">
                    <motion.div 
                      className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of students and staff who never worry about losing their belongings again.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatedButton
              onClick={() => setCurrentPage('dashboard')}
              variant="primary"
              size="lg"
              icon={Search}
            >
              Browse Lost Items
            </AnimatedButton>
            <AnimatedButton
              onClick={() => setCurrentPage('report')}
              variant="success"
              size="lg"
              icon={Plus}
            >
              Report an Item
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;