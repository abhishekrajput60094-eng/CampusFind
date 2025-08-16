import React, { useState, useEffect } from 'react';
import { Search, Plus, Upload, MapPin, TrendingUp, Users, Clock, Award, Zap } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [counters, setCounters] = useState({
    totalItems: 0,
    itemsClaimed: 0,
    successRate: 0
  });

  // Animated counter effect
  useEffect(() => {
    const animateCounters = () => {
      const targetValues = { totalItems: 2847, itemsClaimed: 2134, successRate: 87 };
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
  }, []);

  const quickActions = [
    {
      icon: Search,
      title: 'Search Lost Items',
      description: 'Browse through reported lost items',
      gradient: 'from-blue-500 to-cyan-600',
      onClick: () => onNavigate('dashboard')
    },
    {
      icon: Upload,
      title: 'Report Found Item',
      description: 'Help someone by reporting a found item',
      gradient: 'from-emerald-500 to-green-600',
      onClick: () => onNavigate('report')
    },
    {
      icon: Plus,
      title: 'Report Lost Item',
      description: 'Lost something? Report it here',
      gradient: 'from-purple-500 to-pink-600',
      onClick: () => onNavigate('report')
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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
              Never Lose
              <br />
              Anything Again
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The next-generation AI-powered Lost & Found system for your campus. 
              Report, search, and claim items with intelligent matching.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Try searching 'blue backpack in library'..."
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  onFocus={() => onNavigate('dashboard')}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  onClick={action.onClick}
                  className="group relative p-8 rounded-3xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${action.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {action.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Counter */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 rounded-3xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {counters.totalItems.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-lg">Items Reported</div>
            </div>
            <div className="text-center p-8 rounded-3xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                {counters.itemsClaimed.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-lg">Items Claimed</div>
            </div>
            <div className="text-center p-8 rounded-3xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {counters.successRate}%
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-lg">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Powered by Intelligence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced AI algorithms help match lost items with found ones, 
              making the recovery process faster and more efficient than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl backdrop-blur-lg bg-white/5 dark:bg-gray-800/5 border border-white/10 dark:border-gray-700/10 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of students and staff who never worry about losing their belongings again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Browse Lost Items
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Report an Item
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;