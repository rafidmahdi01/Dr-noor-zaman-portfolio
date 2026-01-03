import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { Menu, X } from 'lucide-react';
import logoImg from './src/assets/image/logo.png';

// Lazy load ContentSection for better performance
const ContentSection = lazy(() => import('./components/ContentSection').then(module => ({
  default: module.ContentSection
})));

export default function App() {
  const [activeSection, setActiveSection] = useState(() => {
    // Check if there's a hash in the URL on initial load
    const hash = window.location.hash.slice(1);
    return hash || 'personal-details';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<{id: string, name: string, summary: string} | null>(null);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  useEffect(() => {
    // Simulate loading delay for smooth animations
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update URL hash when section changes
    window.location.hash = activeSection;
  }, [activeSection]);

  useEffect(() => {
    // Listen for hash changes (browser back/forward)
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Scroll to content section when activeSection changes
    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const contentSection = document.querySelector('main');
      if (contentSection) {
        const headerHeight = 80; // Fixed header height
        const elementPosition = contentSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

if (isLoading) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div 
          className="w-32 h-32 flex items-center justify-center mx-auto"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src={logoImg}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="min-h-screen bg-white"
    >
      <div className="flex">
        {/* Fixed Sidebar Toggle Button - Always Visible */}
        <motion.div 
          className="fixed top-1/2 left-0 z-50 -translate-y-1/2"
          initial={{ opacity: 0, x: -60, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            delay: 0.8, 
            duration: 1.2,
            type: "spring", 
            stiffness: 120,
            damping: 25
          }}
        >
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="group relative bg-white/20 backdrop-blur-lg border border-white/30 text-primary shadow-2xl shadow-black/10 rounded-r-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255,255,255,0.3)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Glass overlay effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Button content */}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <motion.div
                animate={{ 
                  rotate: sidebarOpen ? 180 : 0,
                  scale: sidebarOpen ? 1.1 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.div>
              
              {/* Indicator dots */}
              <div className="flex flex-col space-y-1">
                {[1, 2, 3].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-1 h-1 bg-primary rounded-full"
                    animate={{ 
                      scale: sidebarOpen ? [1, 1.5, 1] : 1,
                      opacity: sidebarOpen ? [0.5, 1, 0.5] : 0.7
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: sidebarOpen ? Infinity : 0,
                      delay: dot * 0.2
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-primary/10 rounded-r-2xl scale-0 group-active:scale-100"
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </motion.div>

        {/* Enhanced Sidebar with Glassmorphism */}
        <motion.div 
          className={`fixed top-0 left-0 h-screen z-40 transform transition-all duration-500 ease-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          animate={{ 
            x: sidebarOpen ? 0 : (window.innerWidth < 640 ? -288 : -320),
            boxShadow: sidebarOpen 
              ? '0 50px 100px rgba(0,0,0,0.2)' 
              : '0 0 0 rgba(0,0,0,0)'
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween"
          }}
        >
          {/* Glass backdrop */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-lg"
            animate={{ 
              backdropFilter: sidebarOpen ? 'blur(16px)' : 'blur(0px)',
              background: sidebarOpen 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)'
                : 'rgba(255,255,255,0)'
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          
          {/* Sidebar content */}
          <motion.div 
            className="relative z-10 pt-20 h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: sidebarOpen ? 1 : 0,
              x: sidebarOpen ? 0 : -20
            }}
            transition={{ 
              duration: 0.4, 
              delay: sidebarOpen ? 0.2 : 0,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={(section) => {
                setActiveSection(section);
                // Auto-close on mobile after selection
                if (window.innerWidth < 1024) {
                  setTimeout(() => setSidebarOpen(false), 300);
                }
              }}
              onSectionHover={setHoveredSection}
            />
          </motion.div>

          {/* Edge glow effect */}
          <motion.div
            className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
            animate={{ 
              opacity: sidebarOpen ? 1 : 0,
              scaleY: sidebarOpen ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Outer glow effect on right edge - enhanced on hover */}
          <motion.div
            className="absolute top-0 right-0 h-full pointer-events-none"
            style={{
              width: '60px',
              right: '-30px',
            }}
            animate={{ 
              opacity: sidebarOpen ? (sidebarHovered ? 1 : 0.3) : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-full h-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent blur-2xl" />
          </motion.div>

          {/* Additional outer glow layer for more intensity on hover */}
          <motion.div
            className="absolute top-0 right-0 h-full pointer-events-none"
            style={{
              width: '100px',
              right: '-50px',
            }}
            animate={{ 
              opacity: sidebarOpen ? (sidebarHovered ? 0.6 : 0.15) : 0,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-full h-full bg-gradient-to-r from-primary/30 via-primary/15 to-transparent blur-3xl" />
          </motion.div>
        </motion.div>

        {/* Enhanced Overlay with Blur Effect */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setSidebarOpen(false)}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}

        {/* Large Black Box Overlay - FIXED POSITION (always visible in viewport) */}
        <AnimatePresence>
          {hoveredSection && sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] items-center justify-center pointer-events-none hidden lg:flex"
              style={{
                left: '320px', // Start after sidebar width
              }}
            >
              {/* Backdrop Blur */}
              <motion.div
                initial={{ backdropFilter: 'blur(0px)' }}
                animate={{ backdropFilter: 'blur(8px)' }}
                exit={{ backdropFilter: 'blur(0px)' }}
                className="absolute inset-0 bg-black/40"
              />
              
              {/* Large Black Box with Information */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="relative max-w-2xl w-full mx-8 bg-black rounded-3xl p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10"
              >
                {/* Red accent glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-3xl" />
                
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl font-bold text-white mb-6"
                  >
                    {hoveredSection.name}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-white/90 leading-relaxed"
                  >
                    {hoveredSection.summary}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex items-center space-x-2 text-primary"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Click to view full details</span>
                  </motion.div>
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/50 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/50 rounded-br-3xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div 
          className="flex-1 transition-all duration-500 ease-out"
        >
          {/* Header Section - Hero/Profile Area */}
          <div className="relative">
            <Header activeSection={activeSection} onSectionChange={setActiveSection} />
            <HeroSection />
            
            {/* Separation Divider */}
            <div className="relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content Section - Main Academic Content */}
          <main className="relative bg-gradient-to-b from-white via-gray-50/30 to-white">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                  />
                </div>
              }>
                <ContentSection activeSection={activeSection} onSectionChange={setActiveSection} />
              </Suspense>
            </motion.div>
          </main>
          
          {/* Enhanced Footer */}
          <div className="relative z-10">
            <Footer />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}