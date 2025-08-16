import React, { useState, useEffect } from 'react';
import { Search, Plus, MapPin, Users, Award, Zap, Menu, X, Moon, Sun, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import AdminPanel from './components/AdminPanel';
import UserProfile from './components/UserProfile';
import AnimatedBackground from './components/ui/AnimatedBackground';
import PageTransition from './components/ui/PageTransition';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { 
    currentPage, 
    setCurrentPage, 
    darkMode, 
    toggleDarkMode,
    notifications 
  } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Users },
    { id: 'dashboard', label: 'Browse Items', icon: Search },
    { id: 'report', label: 'Report Item', icon: Plus },
    { id: 'admin', label: 'Admin', icon: Award },
    { id: 'profile', label: 'Profile', icon: Zap }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'report':
        return <ReportForm />;
      case 'admin':
        return <AdminPanel />;
      case 'profile':
        return <UserProfile />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/20',
          duration: 4000,
        }}
      />
      
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-b border-white/20 dark:border-gray-700/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                whileHover={{ 
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
                  rotate: 5 
                }}
              >
                <MapPin className="h-6 w-6 text-white" />
              </motion.div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                CampusFind
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <motion.button
                className="relative p-2 rounded-xl transition-all duration-300 bg-white/10 dark:bg-gray-800/20 hover:bg-white/20 dark:hover:bg-gray-800/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {unreadNotifications > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {unreadNotifications}
                  </motion.span>
                )}
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl transition-all duration-300 bg-white/10 dark:bg-gray-800/20 hover:bg-white/20 dark:hover:bg-gray-800/30"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5 text-gray-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-xl ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-white/20 dark:border-gray-700/20 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16">
        <PageTransition pageKey={currentPage}>
          {renderPage()}
        </PageTransition>
      </main>
    </div>
  );
}

export default App;