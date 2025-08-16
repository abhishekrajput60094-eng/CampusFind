import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  onClick 
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 
        border border-white/20 dark:border-gray-700/20 
        rounded-2xl shadow-xl
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={hover ? {
        scale: 1.02,
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Shine effect */}
        {hover && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.6 }}
          />
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;