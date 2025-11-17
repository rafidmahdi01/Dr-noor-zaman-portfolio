import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Enhanced3DHeaderProps {
  children: React.ReactNode;
  summary?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Enhanced3DHeader({ 
  children, 
  summary, 
  icon,
  className = '' 
}: Enhanced3DHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Hover Effect on Header */}
      <motion.div
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          z: 10,
          textShadow: '0 0 20px rgba(220,38,38,0.3)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="cursor-default"
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.3 }}
              className="text-primary"
            >
              {icon}
            </motion.div>
          )}
          {children}
        </div>
      </motion.div>

      {/* 3D Popup Summary - RED BOX */}
      <AnimatePresence>
        {isHovered && summary && (
          <motion.div
            initial={{ opacity: 0, x: -25, scale: 0.85, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              x: 15, 
              scale: 1,
              rotateY: 0,
              z: 50
            }}
            exit={{ opacity: 0, x: -25, scale: 0.85, rotateY: -15 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.34, 1.56, 0.64, 1],
              scale: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="absolute left-full top-0 ml-6 w-80 bg-primary backdrop-blur-2xl border border-white/30 rounded-xl p-4 shadow-[0_20px_60px_rgba(220,38,38,0.6)] z-[100] pointer-events-none whitespace-normal"
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            {/* Subtle darker red gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-800/20 via-transparent to-transparent rounded-xl" />
            
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl pointer-events-none" />
            
            <div className="relative">
              <p className="text-sm text-white leading-relaxed drop-shadow-lg">
                {summary}
              </p>
            </div>
            
            {/* 3D Arrow pointer - RED */}
            <div className="absolute right-full top-5 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-primary"
                 style={{ filter: 'drop-shadow(-2px 0 4px rgba(220,38,38,0.4))' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
