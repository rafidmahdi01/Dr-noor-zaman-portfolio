import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './images/ImageWithFallback';

// Import presentation data
import {
  keynoteData,
  invitedSpeakerData,
  eventOrganiserData,
  oralPresenterData,
} from '../data/presentations';

// Import supervision data
import { ongoingSupervisions, completedSupervisions } from '../data/supervision';

// Import evaluation data
import { evaluationActivities } from '../data/evaluation';

// Import awards and memberships data
import { partnerOrganizations, awardsData, membershipsData } from '../data/awards';

// Import publications data
import { books, bookChapters, journalArticles, proceedingsArticles } from '../data/publications';

// Import research projects data
import { researchProjects } from '../data/research-projects';

import { 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Presentation,
  Shield,
  Heart,
  Briefcase,
  Book,
  FileText,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Code,
  Cpu,
  Brain,
  Cloud,
  Radio,
  Network,
  Lock,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface ContentSectionProps {
  activeSection: string;
  onSectionChange?: (section: string) => void;
}

// Certificate Preview Component
function CertificatePreview({ image, awardName }: { image: string; awardName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-shrink-0 ml-4">
      <div className="w-48 space-y-2">
        <motion.div 
          className="aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted relative group cursor-pointer" 
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src={image} 
            alt={`${awardName} certificate`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Hover overlay with eye icon */}
          <motion.div 
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Eye className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-2 px-4 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
        >
          View Certificate
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent 
              className="max-w-4xl border-0 p-0 overflow-hidden rounded-3xl [&>button]:hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(40, 20, 20, 0.98) 0%, rgba(20, 10, 10, 0.98) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(220, 38, 38, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ 
                  delay: isOpen ? 0.1 : 0,
                  duration: 0.3
                }}
                className="p-6"
              >
                
                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-base font-medium text-white mb-3 tracking-wide drop-shadow-lg">{awardName}</DialogTitle>
                  <DialogDescription className="text-sm text-white/95 leading-relaxed">Award Certificate</DialogDescription>
                </DialogHeader>
                <div className="mt-4 relative z-10 group">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
                  }}>
                    <img 
                      src={image} 
                      alt={`${awardName} certificate`}
                      className="w-full h-auto object-contain max-h-[60vh]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex justify-center mt-8 space-x-4"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 px-6 py-3 text-base rounded-lg font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.open(image, '_blank')}
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] px-6 py-3 text-base rounded-lg font-medium flex items-center"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Open in New Tab
                  </button>
                </motion.div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced Apple-style scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Apple's signature cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}

export function ContentSection({ activeSection, onSectionChange }: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Publication filter state
  const [publicationFilter, setPublicationFilter] = useState<'books' | 'chapters' | 'journals' | 'proceedings'>('journals');
  
  // Modal state
  const [isPublicationsModalOpen, setIsPublicationsModalOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState<'all' | 'books' | 'chapters' | 'journals' | 'proceedings'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Carousel refs
  const bookScrollRef = useRef<HTMLDivElement>(null);
  const chapterScrollRef = useRef<HTMLDivElement>(null);
  const journalScrollRef = useRef<HTMLDivElement>(null);
  const proceedingsScrollRef = useRef<HTMLDivElement>(null);

  // Enhanced multi-layer parallax for Apple-style depth
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  
  // Custom smooth scroll with visible animation (Apple-style easing)
  const smoothScrollTo = (element: HTMLDivElement, targetPosition: number, duration: number = 600) => {
    const startPosition = element.scrollLeft;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Apple's signature easing function (ease-in-out cubic)
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easeInOutCubic(progress);
      element.scrollLeft = startPosition + distance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Scroll functions for carousels with custom animation
  const scrollBooks = (direction: 'left' | 'right') => {
    if (bookScrollRef.current) {
      const scrollAmount = 350;
      const newScrollPosition = direction === 'left' 
        ? bookScrollRef.current.scrollLeft - scrollAmount
        : bookScrollRef.current.scrollLeft + scrollAmount;
      
      smoothScrollTo(bookScrollRef.current, newScrollPosition, 600);
    }
  };

  const scrollChapters = (direction: 'left' | 'right') => {
    if (chapterScrollRef.current) {
      const scrollAmount = 350;
      const newScrollPosition = direction === 'left' 
        ? chapterScrollRef.current.scrollLeft - scrollAmount
        : chapterScrollRef.current.scrollLeft + scrollAmount;
      
      smoothScrollTo(chapterScrollRef.current, newScrollPosition, 600);
    }
  };

  const scrollJournals = (direction: 'left' | 'right') => {
    if (journalScrollRef.current) {
      const scrollAmount = 350;
      const newScrollPosition = direction === 'left' 
        ? journalScrollRef.current.scrollLeft - scrollAmount
        : journalScrollRef.current.scrollLeft + scrollAmount;
      
      smoothScrollTo(journalScrollRef.current, newScrollPosition, 600);
    }
  };

  const scrollProceedings = (direction: 'left' | 'right') => {
    if (proceedingsScrollRef.current) {
      const scrollAmount = 350;
      const newScrollPosition = direction === 'left' 
        ? proceedingsScrollRef.current.scrollLeft - scrollAmount
        : proceedingsScrollRef.current.scrollLeft + scrollAmount;
      
      smoothScrollTo(proceedingsScrollRef.current, newScrollPosition, 600);
    }
  };

  const researchAreas = [
      {
        title: "Agentic AI",
        description: "Research on agent-based artificial intelligence, autonomous systems, and intelligent agents for adaptive and collaborative problem-solving.",
        icon: <Brain className="w-6 h-6" />
      },
      {
        title: "AI",
        description: "Artificial Intelligence: Developing intelligent systems, machine learning models, and advanced analytics for real-world applications.",
        icon: <Cpu className="w-6 h-6" />
      },
      {
        title: "Cybersecurity",
        description: "Advanced security frameworks, threat intelligence, and protection mechanisms for modern computing environments.",
        icon: <Shield className="w-6 h-6" />
      },
      {
        title: "Software Engineering",
        description: "Advanced software development methodologies, processes, and quality assurance for modern applications.",
        icon: <Code className="w-6 h-6" />
      },
    {
      title: "Remote Process Automation",
      description: "Automating business processes and workflows using intelligent automation technologies and RPA platforms.",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "Machine Learning",
      description: "Developing intelligent algorithms and models for pattern recognition, prediction, and decision-making systems.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Mobile and Cloud Computing",
      description: "Research in mobile application development, cloud infrastructure, and distributed computing architectures.",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      title: "Wireless Sensor Networks",
      description: "Energy-efficient protocols, routing mechanisms, and reliability enhancement for sensor network deployments.",
      icon: <Radio className="w-6 h-6" />
    },
    {
      title: "Ad hoc Network",
      description: "Dynamic routing protocols, self-organizing network architectures, and communication optimization for mobile ad hoc networks.",
      icon: <Network className="w-6 h-6" />
    },
    {
      title: "Wireless Security",
      description: "Secure communication protocols, authentication mechanisms, and threat mitigation in wireless environments.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Internet of Things Security",
      description: "Developing secure frameworks, authentication protocols, and threat detection systems for IoT ecosystems.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
  ];

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="py-16 bg-gradient-to-b from-white/50 to-white lg:pl-4 relative"
    >
      <motion.div 
        style={{ y }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <ScrollReveal>
          <Tabs value={activeSection} onValueChange={onSectionChange} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="relative"
            >
              <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3 mx-auto bg-white/60 backdrop-blur-xl border-2 border-white/30 shadow-2xl shadow-primary/5 relative overflow-hidden !h-auto !p-3 gap-2.5">
                {/* Animated red glow background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <TabsTrigger 
                  value="personal-details" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 text-xs hover:bg-white/70 hover:text-primary transition-all duration-150 relative z-10 data-[state=active]:scale-105"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    About Me
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger 
                  value="awards" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 text-xs hover:bg-white/70 hover:text-primary transition-all duration-150 relative z-10 data-[state=active]:scale-105"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    Research Awards
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger 
                  value="contact" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 text-xs hover:bg-white/70 hover:text-primary transition-all duration-150 relative z-10 data-[state=active]:scale-105"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    Contact Me
                  </motion.span>
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="personal-details" id="section-personal-details" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                {/* Glassmorphism Container */}
                <motion.div 
                  className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 shadow-2xl shadow-black/10 relative overflow-hidden"
                  whileHover={{ 
                    boxShadow: "0 32px 64px rgba(96,165,250,0.2), 0 0 0 2px rgba(96,165,250,0.1)",
                    backdropFilter: "blur(24px)",
                    scale: 1.01
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Animated Light Blue Gradient Border Glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(96,165,250,0) 0%, rgba(96,165,250,0) 100%)",
                        "linear-gradient(45deg, rgba(96,165,250,0.1) 0%, rgba(96,165,250,0) 50%, rgba(96,165,250,0.1) 100%)",
                        "linear-gradient(45deg, rgba(96,165,250,0) 0%, rgba(96,165,250,0) 100%)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Background Glass Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <motion.h2 
                      className="text-2xl font-medium text-blue-400 mb-8 border-b border-white/20 pb-4 relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      PERSONAL DETAILS
                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                      />
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column Cards */}
                      <div className="space-y-4">
                        {[
                          { label: "Full Name", value: "Professor Dr. Noor Zaman Jhanjhi", icon: "👤" },
                          { label: "Position", value: "Professor | Director for Research Center (CII) | Program Director for PG Research Degree Programmes", icon: "🎓" },
                          { label: "School", value: "School of Computer Science", icon: "🏫" },
                          { label: "Faculty", value: "Faculty of Innovation & Technology, Taylor's University", icon: "🏛️" },
                          { label: "LinkedIn", value: "linkedin.com/in/noorzaman", icon: "🔗", isLink: true, href: "https://www.linkedin.com/in/noorzaman/" },
                          { label: "ResearchGate", value: "View Profile", icon: "🔬", isLink: true, href: "https://www.researchgate.net/profile/Noor-Jhanjhi" }
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -40, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ 
                              delay: 0.1 + index * 0.1, 
                              duration: 0.6,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                            whileHover={{ 
                              scale: 1.04, 
                              rotateY: 5,
                              boxShadow: "0 20px 40px rgba(96,165,250,0.15), 0 0 0 1px rgba(96,165,250,0.2)",
                              backdropFilter: "blur(20px)",
                              borderColor: "rgba(96,165,250,0.3)"
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative bg-white/30 backdrop-blur-lg border-2 border-white/40 rounded-2xl p-5 cursor-pointer transition-all duration-150 hover:bg-white/50 hover:border-blue-400/30"
                            style={{ 
                              transformStyle: "preserve-3d",
                              perspective: "1000px"
                            }}
                            onClick={() => {
                              if (item.href) {
                                window.open(item.href, '_blank', 'noopener,noreferrer');
                              }
                            }}
                          >
                            {/* Faster shine effect with blue tint */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.4 }}
                            />
                            
                            {/* Blue glow pulse on hover */}
                            <motion.div 
                              className="absolute inset-0 rounded-2xl bg-blue-400/5 opacity-0 group-hover:opacity-100"
                              animate={{
                                opacity: [0, 0.3, 0]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            
                            <div className="relative z-10 flex items-start space-x-4">
                              <motion.div 
                                className="text-2xl"
                                animate={{
                                  y: [0, -4, 0],
                                  rotate: [0, -5, 5, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.3, rotate: 15 }}
                              >
                                {item.icon}
                              </motion.div>
                              <div className="flex-1">
                                <motion.h3 
                                  className="font-medium text-foreground mb-1 group-hover:text-blue-400 transition-colors duration-150"
                                  whileHover={{ x: 3 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  {item.label}
                                </motion.h3>
                                <motion.p 
                                  className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-150"
                                  whileHover={{ x: 3 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  {item.value}
                                </motion.p>
                              </div>
                              
                              {/* Blue corner accent */}
                              <motion.div
                                className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-400/0 to-blue-400/20 rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Right Column Cards */}
                      <div className="space-y-4">
                        {[
                          { label: "Extension", value: "5277", icon: "📞", isLink: false },
                          { label: "Email", value: "noorzaman.jhanjhi@taylors.edu.my | profjhanjhi@gmail.com", icon: "📧", isLink: true },
                          { label: "ResearcherID", value: "F-3051-2011", icon: "🔬", isLink: true, href: "http://www.researcherid.com/rid/F-3051-2011" },
                          { label: "Scopus ID", value: "36088700700", icon: "📊", isLink: true, href: "http://www.scopus.com/authid/detail.url?authorId=36088700700" },
                          { label: "Personal Homepage", value: "noorzaman.com", icon: "🌐", isLink: true, href: "https://noorzaman.com/profile/" },
                          { label: "Google Scholar", value: "View Profile", icon: "🔍", isLink: true, href: "https://scholar.google.com/citations?hl=en&user=J6QVIncAAAAJ&view_op=list_works" }
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 40, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ 
                              delay: 0.1 + index * 0.1, 
                              duration: 0.6,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                            whileHover={{ 
                              scale: 1.04, 
                              rotateY: -5,
                              boxShadow: "0 20px 40px rgba(96,165,250,0.15), 0 0 0 1px rgba(96,165,250,0.2)",
                              backdropFilter: "blur(20px)",
                              borderColor: "rgba(96,165,250,0.3)"
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative bg-white/30 backdrop-blur-lg border-2 border-white/40 rounded-2xl p-5 cursor-pointer transition-all duration-150 hover:bg-white/50 hover:border-blue-400/30"
                            style={{ 
                              transformStyle: "preserve-3d",
                              perspective: "1000px"
                            }}
                            onClick={() => {
                              if (item.href) {
                                window.open(item.href, '_blank', 'noopener,noreferrer');
                              }
                            }}
                          >
                            {/* Faster shine effect with blue tint */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                              initial={{ x: "100%" }}
                              whileHover={{ x: "-100%" }}
                              transition={{ duration: 0.4 }}
                            />
                            
                            {/* Blue glow pulse on hover */}
                            <motion.div 
                              className="absolute inset-0 rounded-2xl bg-blue-400/5 opacity-0 group-hover:opacity-100"
                              animate={{
                                opacity: [0, 0.3, 0]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            
                            <div className="relative z-10 flex items-start space-x-4">
                              <motion.div 
                                className="text-2xl"
                                animate={{
                                  y: [0, -4, 0],
                                  rotate: [0, -5, 5, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.3, rotate: -15 }}
                              >
                                {item.icon}
                              </motion.div>
                              <div className="flex-1">
                                <motion.h3 
                                  className="font-medium text-foreground mb-1 group-hover:text-blue-400 transition-colors duration-150"
                                  whileHover={{ x: -3 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  {item.label}
                                </motion.h3>
                                <motion.p 
                                  className={`text-sm transition-colors duration-150 ${
                                    item.isLink ? 'text-blue-400 hover:underline cursor-pointer font-medium' : 'text-muted-foreground group-hover:text-foreground'
                                  }`}
                                  whileHover={{ x: -3 }}
                                  transition={{ duration: 0.1 }}
                                >
                                  {item.value}
                                </motion.p>
                              </div>
                              
                              {/* Blue corner accent */}
                              <motion.div
                                className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-bl from-blue-400/0 to-blue-400/20 rounded-tl-2xl rounded-br-full opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="biography" id="section-biography" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">BIOGRAPHY</h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="leading-relaxed">
                    Professor Dr Noor Zaman Jhanjhi is currently working as a Professor | Director for Research Center CII | Programme Director - of Postgraduate Research Programmes [Computing] at the School of Computer Science, Faculty of Innovation and Technology, Taylor's University, Malaysia. Highlights of the research profile summary are as follows:
                  </p>

                  <h3 className="text-xl font-medium text-primary mt-8">Highlights of Profile Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">1.</span>
                      <p><strong>World's Top 2% Scientist</strong> for two consecutive years: <strong>2022, 2023, 2024, and 2025</strong>.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">2.</span>
                      <p><strong>Vice Chancellor's Award, Taylor's University, Most Cited Researcher for 2023</strong></p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">3.</span>
                      <p><strong>Outstanding Faculty Member</strong> nominated by <strong>MDEC, Malaysia</strong>, for the year <strong>2022</strong></p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">4.</span>
                      <p><strong>Top One Computer Science Researchers/Scientists in Malaysia</strong> based on AD Scientific Index data <strong>2025</strong></p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">5.</span>
                      <p><strong>24 years of Teaching, Research, and development Experience</strong> in the fields of Cybersecurity, Security, Internet of Things (IoT) security, Wireless Networks, 
                      Wireless Sensor Networks, Ad hoc Networks, Machine Learning, and Software Engineering at Taylor's University, Malaysia, King Faisal University, Saudi Arabia, 
                      ILMA University, British University Vietnam.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">6.</span>
                      <p><strong>More than 24 years of experience in academics, research, and the IT industry</strong> in different academic and management positions such as Professor., Director Research Center, 
                      Center for Intelligent Innovation, Director CSS5, Cluster Head Cybersecurity, Dean's Coordinator, Head of IT, etc.</p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">7.</span>
                      <p><strong>Google Scholar H-Index Hundred (100)</strong> and <strong>(462) I-10 Index</strong>, with <strong>26800 plus citations</strong>.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">8.</span>
                      <p><strong>Scopus H-Index Seventy Five (75)</strong> and <strong>(260) I-10 Index</strong>, with <strong>15400 plus citations</strong>.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">9.</span>
                      <p><strong>Research Gate H-Index Eighty Three (83)</strong>, with <strong>20800 plus citations</strong>.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">10.</span>
                      <p><strong>Ninety (90) plus Keynotes/Invited talks</strong> around the globe, including Europe, Malaysia, China, Indonesia, India, Pakistan, UK, Singapore, etc.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">11.</span>
                      <p><strong>Fifteen (15) plus International Patents</strong>, including Australian, German, Japanese, UK, etc., on his account.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">12.</span>
                      <p><strong>Forty (40) plus International/National research grants/funds</strong> achieved as PI and Co-PI</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">13.</span>
                      <p><strong>Eighty (80) plus edited/authored research books</strong> with highly reputed publishers, including Springer, Elsevier, IGI Global USA, Willeys, Taylor's & Frances, Intech Open, Eliva Press, IET, Benthem, etc.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">14.</span>
                      <p><strong>Seven hundred (700) plus research publications</strong> internationally.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">15.</span>
                      <p><strong>Four hundred (450) plus SCIE high-indexed Impact Factor (Q1-Q3) journal publications</strong>.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">16.</span>
                      <p><strong>One Thousand (1000) plus cumulative impact factor points</strong> to date</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">17.</span>
                      <p><strong>Five Hundred (500) plus Scopus and ESCI-indexed journal publications</strong></p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">18.</span>
                      <p><strong>One hundred fifty (150) plus international Conferences (IEEE, ACM, Springer) publications</strong>.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">19.</span>
                      <p><strong>One Hundred (100) plus Research Book Chapters</strong> (Springer, Elsevier, Willeys, Taylor's & Frances, IGI Global USA, Intech Open, Benthem, etc.)</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">20.</span>
                      <p><strong>Guest Editor and Series Editor</strong> for several reputed high-indexed SCIE journals and book series.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">21.</span>
                      <p><strong>Editorial Board</strong> for several reputed journals, including PEERJ Computer Science, Computers, Materials & Continua CMC, Computer Systems Science and Engineering CSSE, 
                      Intelligent Automation and Soft Computing IASC, Frontier in Artificial Intelligence, Frontiers in the Internet of Things, Frontiers in Communications and Networks, etc. 
                      <strong>Best Associate Editor award IEEE ACCESS for the year 2020</strong>.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">22.</span>
                      <p><strong>PhD. Examiner/Evaluator for (80) plus international Universities</strong> globally, including Finland, India, Malaysia, Pakistan, Australia, South Africa, Europe, etc.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">23.</span>
                      <p><strong>Five (5) Consultancy projects</strong> internationally.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">24.</span>
                      <p><strong>Expertise in curriculum program design and development</strong> as a head and member of academic and research committees.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">25.</span>
                      <p><strong>Forty-Five (45) plus PG supervision (28 PhD and 17 MSc)</strong> successfully completed and under supervision.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">26.</span>
                      <p><strong>Experience in academic planning and management</strong>, academic processes, policy implementation, and administration.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">27.</span>
                      <p><strong>Six (6) years (2019-2022) consecutive top performers</strong> at Taylor's University, Malaysia</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">28.</span>
                      <p><strong>Ten (10) years of Academic quality accreditation experience</strong> for ABET (Successfully achieved ABET accreditation for Three 3 programs twice) NCAAA, NCEAC, etc.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">29.</span>
                      <p><strong>Twenty Five (25) plus conference/session chairs</strong> internationally.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">30.</span>
                      <p><strong>One Hundred (100) plus Technical Program Committee (TPC) members</strong> for international IEEE conferences globally.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">31.</span>
                      <p><strong>Strong team-leading capabilities</strong> earned during supervision of several projects from inception to implementation in numerous capacities � Program Director for 
                      Postgraduate Research Degree Programmes, Acting Program Director MAC, Director of Center for Smart Society 5.0 (CSS5), Cluster Head for Cybersecurity Research Cluster, 
                      School Coordinator for the Industrial Revolution IR4.0, and United Nations Sustainable Development Goals (SDG), Deans Coordinator at CSSIT, KFU.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">32.</span>
                      <p><strong>Excellent public speaking and communication skills</strong> developed during industrial/ conference presentations - received the best paper and best speaker awards.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">33.</span>
                      <p><strong>Top 1% reviewer globally by Publons (Web of Science)</strong>, awarded in 2019.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">34.</span>
                      <p><strong>Research Grant and Academic Promotion evaluator</strong> for several universities globally.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">35.</span>
                      <p><strong>Reviewer for more than (100) top-ranked journals</strong>, including IEEE Transactions, IEEE ACCESS, IEEE Internet of Things Journal, Future Generation, 
                      IEEE Sensors Journal, MDPI Sensors, Electronics, Healthcare, Sustainability, Journal of Network and Computer Applications, Computers and Electronics, 
                      Wireless Personal Communications, Multimedia Systems, Multimedia Tools and Applications, IEEE Transaction on Industrial Informatics, Computer Communications, 
                      Journal of Information Security and Applications, etc.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="font-medium text-primary min-w-fit">36.</span>
                      <p><strong>Strong Research collaboration network with Fifty (50) plus Universities and industries</strong> globally.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-primary mt-8">Research Interests and Expertise</h3>
                  <p className="leading-relaxed">
                    Cybersecurity, Artificial Intelligence (AI), Agentic AI, Machine Learning, Internet of Things Security, Wireless Security, Software Engineering, 
                    Wireless Sensor Networks, Mobile and Cloud Computing, Big Data, RPA Remote Process Automation
                  </p>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="research" id="section-research" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary border-b border-border pb-4 mb-8">RESEARCH AREAS</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {researchAreas.map((area, index) => (
                    <ScrollReveal key={area.title} delay={index * 0.1}>
                      <Card className="h-full border-l-4 border-l-primary bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                              {area.icon}
                            </div>
                            <CardTitle className="text-lg">{area.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm leading-relaxed">
                            {area.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal delay={0.3}>
                  <div className="mt-12 space-y-6">
                    <h3 className="text-xl font-medium text-foreground">Research Statistics</h3>
                    <div className="grid md:grid-cols-3 gap-4 px-4">
                      <Card className="text-center p-6 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:shadow-lg transition-all duration-300">
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-medium text-primary">26902</p>
                            <p className="text-sm text-muted-foreground">Total Citations</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center p-6 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:shadow-lg transition-all duration-300">
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-medium text-primary">100</p>
                            <p className="text-sm text-muted-foreground">H-Index</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center p-6 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:shadow-lg transition-all duration-300">
                        <CardContent className="space-y-2">
                            <p className="text-3xl font-medium text-primary">462</p>
                            <p className="text-sm text-muted-foreground">i10-Index</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </ScrollReveal>
              </motion.div>
            </TabsContent>

            <TabsContent value="research-projects" id="section-research-projects" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-xl sm:text-2xl font-medium text-primary mb-6 sm:mb-8 border-b border-border pb-4">RESEARCH PROJECTS</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <Card className="text-center p-4 sm:p-6">
                    <CardContent className="space-y-2">
                      <p className="text-2xl sm:text-3xl font-medium text-primary">36+</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Projects</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 sm:p-6">
                    <CardContent className="space-y-2">
                      <p className="text-2xl sm:text-3xl font-medium text-primary">~5M</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Funding (SAR)</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4 sm:p-6 col-span-2 sm:col-span-1">
                    <CardContent className="space-y-2">
                      <p className="text-2xl sm:text-3xl font-medium text-primary">15+</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Years of Research</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {researchProjects.map((project, index) => (
                    <ScrollReveal key={project.id} delay={0.05 * (index + 1)}>
                      <Card className="p-4 sm:p-5 hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm sm:text-base font-medium text-foreground">{project.title}</h4>
                            {project.description && (
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{project.description}</p>
                            )}
                            <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-2 flex-shrink-0" />
                              <span>{project.period}</span>
                            </div>
                            {project.grantNumber && (
                              <p className="text-xs text-muted-foreground mt-1">Grant No: {project.grantNumber}</p>
                            )}
                            {project.funding && (
                              <p className="text-xs text-muted-foreground">Funding: {project.funding}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge variant={project.role === 'Project Leader' ? 'default' : 'outline'} className="text-xs">
                                {project.role}
                              </Badge>
                              <Badge variant={project.type === 'International' ? 'default' : 'secondary'} className="text-xs">
                                {project.type}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">{project.institution}</Badge>
                            </div>
                          </div>
                          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        </div>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="teaching" id="section-teaching" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">TEACHING EXPERIENCE</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">37</p>
                      <p className="text-sm text-muted-foreground">Total Courses Taught</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">30</p>
                      <p className="text-sm text-muted-foreground">Bachelor Degree</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">7</p>
                      <p className="text-sm text-muted-foreground">Master Degree</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <ScrollReveal delay={0.05}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Capstone I</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2023</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Master Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.1}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Cloud Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2023</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Application Development</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2023</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Capstone II</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2023</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Master Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.25}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Applications Development</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2022</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software Systems</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2022</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.35}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Cloud Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2022</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.4}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">FIT</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2022</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Master Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.45}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Research Skills for Post Graduate</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2022</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Master Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.5}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Application Development</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.55}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Application Development</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.6}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Cloud Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.65}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software Systems</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.7}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software Systems</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>January 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.75}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Cloud Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.8}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software Systems</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2021</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.85}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Cloud Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2020</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.9}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Wireless Networks and Security</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>January 2020</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.95}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Computer and Network Security</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2020</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.0}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Wireless Networks and Security</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2020</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.05}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software Systems</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2020</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.1}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Applications Development</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2020</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.15}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Mobile Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2019</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.2}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Computer and Network Security</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>March 2019</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.25}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software System</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2019</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.3}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Wireless Networks and Security</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2019</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.35}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Introduction to Mobile Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2019</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.4}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Application Programming (Android Base)</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>January 2018</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.45}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Data Mining</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2018</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.5}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Project Implementation</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>January 2018</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.55}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Advance Programming Languages</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>January 2018</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.6}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">New Trends In Computer Networks</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>January 2018</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Master Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.65}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Data Structures</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>September 2017</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.7}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Project Proposal</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>September 2017</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.75}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Mobile Computing</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>September 2017</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">King Faisal University, Saudi Arabia</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={1.8}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Secured Software Systems</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>August 2000</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Bachelor Degree</Badge>
                            <Badge variant="secondary">Taylor's University</Badge>
                          </div>
                        </div>
                        <GraduationCap className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="publications" id="section-publications" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary border-b border-border pb-4 mb-8">PUBLICATIONS</h2>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{books.length + bookChapters.length + journalArticles.length + proceedingsArticles.length}</p>
                      <p className="text-sm text-muted-foreground">Total Publications</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{books.length}</p>
                      <p className="text-sm text-muted-foreground">Books</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{journalArticles.length}</p>
                      <p className="text-sm text-muted-foreground">Journal Articles</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{bookChapters.length}</p>
                      <p className="text-sm text-muted-foreground">Book Chapters</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Filter Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-2 sm:gap-4 mb-8 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => setPublicationFilter('books')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 overflow-hidden ${
                      publicationFilter === 'books'
                        ? 'bg-primary text-white shadow-xl shadow-primary/30'
                        : 'bg-white/60 backdrop-blur-xl border-2 border-white/40 text-foreground hover:border-primary/30'
                    }`}
                  >
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                      <Book className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="whitespace-nowrap">BOOKS</span>
                    </div>
                    {publicationFilter !== 'books' && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setPublicationFilter('chapters')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 overflow-hidden ${
                      publicationFilter === 'chapters'
                        ? 'bg-primary text-white shadow-xl shadow-primary/30'
                        : 'bg-white/60 backdrop-blur-xl border-2 border-white/40 text-foreground hover:border-primary/30'
                    }`}
                  >
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="whitespace-nowrap">BOOK CHAPTERS</span>
                    </div>
                    {publicationFilter !== 'chapters' && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setPublicationFilter('journals')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 overflow-hidden ${
                      publicationFilter === 'journals'
                        ? 'bg-primary text-white shadow-xl shadow-primary/30'
                        : 'bg-white/60 backdrop-blur-xl border-2 border-white/40 text-foreground hover:border-primary/30'
                    }`}
                  >
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                      <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="whitespace-nowrap">JOURNALS</span>
                    </div>
                    {publicationFilter !== 'journals' && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setPublicationFilter('proceedings')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 overflow-hidden ${
                      publicationFilter === 'proceedings'
                        ? 'bg-primary text-white shadow-xl shadow-primary/30'
                        : 'bg-white/60 backdrop-blur-xl border-2 border-white/40 text-foreground hover:border-primary/30'
                    }`}
                  >
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                      <Presentation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="whitespace-nowrap">PROCEEDINGS</span>
                    </div>
                    {publicationFilter !== 'proceedings' && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                </motion.div>

                {/* Books Content - Horizontal Carousel */}
                {publicationFilter === 'books' && (
                  <motion.div
                    key="books"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {/* Carousel Navigation Buttons */}
                    <div className="flex items-center justify-end gap-2 mb-4 sm:absolute sm:-top-16 sm:right-0 z-10">
                      <motion.button
                        onClick={() => scrollBooks('left')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        onClick={() => scrollBooks('right')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                    </div>

                    {/* Horizontal Scrollable Book Gallery */}
                    <div 
                      ref={bookScrollRef}
                      className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-8"
                      style={{ 
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                    >
                      <div className="flex gap-8 px-4">
                        {books.map((book, index) => (
                          <motion.div
                            key={`${book.isbn}-${index}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex-shrink-0"
                          >
                            <motion.div
                              whileHover={{ y: -12, scale: 1.02 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="group cursor-pointer"
                              onClick={() => book.pdfUrl && window.open(book.pdfUrl, '_blank')}
                            >
                              {/* Book Cover */}
                              <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/40 mb-4">
                                <ImageWithFallback
                                  src={book.imageUrl}
                                  alt={book.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                
                                {/* Glossy overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/30 pointer-events-none" />
                                
                                {/* Book spine effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-black/40 via-black/15 to-black/40" />
                                
                                {/* Hover overlay with details */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end"
                                >
                                  <div className="space-y-2">
                                    <Badge className="bg-primary text-white text-xs mb-2">
                                      {book.impact}
                                    </Badge>
                                    <p className="text-white/90 text-sm">
                                      {book.publisher}
                                    </p>
                                    <p className="text-white/70 text-xs">
                                      ISBN: {book.isbn}
                                    </p>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Book Info Below Cover */}
                              <div className="space-y-2 w-40 sm:w-56">
                                <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                  {book.title}
                                </h3>
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{book.publisher}</span>
                                  <span className="text-muted-foreground">({book.year})</span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none" />
                  </motion.div>
                )}

                {/* Book Chapters Content - Horizontal Carousel */}
                {publicationFilter === 'chapters' && (
                  <motion.div
                    key="chapters"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {/* Carousel Navigation Buttons */}
                    <div className="flex items-center justify-end gap-2 mb-4 sm:absolute sm:-top-16 sm:right-0 z-10">
                      <motion.button
                        onClick={() => scrollChapters('left')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        onClick={() => scrollChapters('right')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                    </div>

                    {/* Horizontal Scrollable Chapter Gallery */}
                    <div 
                      ref={chapterScrollRef}
                      className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-8"
                      style={{ 
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                    >
                      <div className="flex gap-8 px-4">
                        {bookChapters.map((chapter, index) => (
                          <motion.div
                            key={`${chapter.title}-${index}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex-shrink-0"
                          >
                            <motion.div
                              whileHover={{ y: -12, scale: 1.02 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="group cursor-pointer"
                              onClick={() => chapter.pdfUrl && window.open(chapter.pdfUrl, '_blank')}
                            >
                              {/* Chapter Book Cover */}
                              <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/40 mb-4">
                                <ImageWithFallback
                                  src={chapter.imageUrl}
                                  alt={chapter.book}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                
                                {/* Glossy overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/30 pointer-events-none" />
                                
                                {/* Book spine effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-black/40 via-black/15 to-black/40" />
                                
                                {/* Hover overlay with details */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end"
                                >
                                  <div className="space-y-2">
                                    <Badge className="bg-primary text-white text-xs mb-2">
                                      {chapter.impact}
                                    </Badge>
                                    <p className="text-white/90 text-sm">
                                      {chapter.publisher}
                                    </p>
                                    <p className="text-white/70 text-xs">
                                      Pages: {chapter.pages}
                                    </p>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Chapter Info Below Cover */}
                              <div className="space-y-2 w-40 sm:w-56">
                                <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                  {chapter.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                                  In: {chapter.book}
                                </p>
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{chapter.publisher}</span>
                                  <span className="text-muted-foreground">({chapter.year})</span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none" />
                  </motion.div>
                )}

                {/* Journal Articles Content - Horizontal Carousel */}
                {publicationFilter === 'journals' && (
                  <motion.div
                    key="journals"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {/* Carousel Navigation Buttons */}
                    <div className="flex items-center justify-end gap-2 mb-4 sm:absolute sm:-top-16 sm:right-0 z-10">
                      <motion.button
                        onClick={() => scrollJournals('left')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        onClick={() => scrollJournals('right')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                    </div>

                    {/* Horizontal Scrollable Journal Gallery */}
                    <div 
                      ref={journalScrollRef}
                      className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-8"
                      style={{ 
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                    >
                      <div className="flex gap-8 px-4">
                        {journalArticles.map((article, index) => (
                          <motion.div
                            key={`${article.pdfUrl}-${index}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex-shrink-0"
                          >
                            <motion.div
                              whileHover={{ y: -12, scale: 1.02 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="group cursor-pointer"
                              onClick={() => article.pdfUrl && window.open(article.pdfUrl, '_blank')}
                            >
                              {/* Journal Cover */}
                              <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/40 mb-4">
                                {/* Journal Article Cover Image */}
                                <ImageWithFallback
                                  src={article.imageUrl && (article.imageUrl.startsWith('/') || article.imageUrl.startsWith('http')) ? article.imageUrl : '/assets/image/Journals/01.png'}
                                  alt={article.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                
                                {/* Glossy overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/30 pointer-events-none" />
                                
                                {/* Magazine spine effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-black/40 via-black/15 to-black/40" />
                                
                                {/* Hover overlay with details */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end"
                                >
                                  <div className="space-y-2">
                                    <Badge className="bg-white text-primary text-xs mb-2">
                                      {article.impact}
                                    </Badge>
                                    <p className="text-white/90 text-sm font-medium">
                                      {article.journal}
                                    </p>
                                    <p className="text-white/70 text-xs">
                                      Published {article.year}
                                    </p>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Article Info Below Cover */}
                              <div className="space-y-2 w-40 sm:w-56">
                                <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                  {article.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                                  {article.journal}
                                </p>
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{article.impact}</span>
                                  <span className="text-muted-foreground">({article.year})</span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none" />
                  </motion.div>
                )}

                {/* Proceedings Content - Horizontal Carousel */}
                {publicationFilter === 'proceedings' && (
                  <motion.div
                    key="proceedings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {/* Carousel Navigation Buttons */}
                    <div className="flex items-center justify-end gap-2 mb-4 sm:absolute sm:-top-16 sm:right-0 z-10">
                      <motion.button
                        onClick={() => scrollProceedings('left')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-blue-500/30 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        onClick={() => scrollProceedings('right')}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg hover:border-blue-500/30 transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                      </motion.button>
                    </div>

                    {/* Horizontal Scrollable Proceedings Gallery */}
                    <div 
                      ref={proceedingsScrollRef}
                      className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-8"
                      style={{ 
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                    >
                      <div className="flex gap-4 sm:gap-8 px-4">
                        {proceedingsArticles.map((article, index) => (
                          <motion.div
                            key={`${article.pdfUrl}-${index}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex-shrink-0"
                          >
                            <motion.div
                              whileHover={{ y: -12, scale: 1.02 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="group cursor-pointer"
                              onClick={() => article.pdfUrl && window.open(article.pdfUrl, '_blank')}
                            >
                              {/* Proceedings Cover - Landscape */}
                              <div className="relative w-72 h-44 sm:w-96 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/40 mb-4">
                                {/* Article Title as Cover - Blue Gradient */}
                                <div className="w-full h-full bg-gradient-to-br from-blue-600/90 via-blue-500 to-blue-700/80 p-4 sm:p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 group-hover:scale-105">
                                  <h3 className="text-white text-sm sm:text-base font-semibold leading-tight">
                                    {article.imageUrl}
                                  </h3>
                                </div>
                                
                                {/* Glossy overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/30 pointer-events-none" />
                                
                                {/* Conference badge effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-black/40 via-black/15 to-black/40" />
                                
                                {/* Hover overlay with details */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end"
                                >
                                  <div className="space-y-2">
                                    <Badge className="bg-white text-blue-600 text-xs mb-2">
                                      {article.impact}
                                    </Badge>
                                    <p className="text-white/90 text-sm font-medium">
                                      {article.conference}
                                    </p>
                                    <p className="text-white/70 text-xs">
                                      Published {article.year}
                                    </p>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Article Info Below Cover */}
                              <div className="space-y-2 w-72 sm:w-96">
                                <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                  {article.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                                  {article.conference}
                                </p>
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="text-muted-foreground">{article.impact}</span>
                                  <span className="text-muted-foreground">({article.year})</span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none" />
                  </motion.div>
                )}

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">80+</p>
                      <p className="text-sm text-muted-foreground">Books Published</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">100+</p>
                      <p className="text-sm text-muted-foreground">Book Chapters</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">400+</p>
                      <p className="text-sm text-muted-foreground">Journal Articles</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <motion.button
                    onClick={() => setIsPublicationsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View All Publications
                  </motion.button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="qualifications" id="section-qualifications" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary border-b border-border pb-4 mb-8">ACADEMIC QUALIFICATIONS</h2>
                <div className="space-y-6">
                  {[
                    {
                      degree: "Ph.D. in IT",
                      institution: "UNIVERSITY TEKNOLOGI PETRONAS (UTP)",
                        year: "2014",
                      specialization: "Cybersecurity and Network Security",
                      location: "Malaysia"
                    },
                    {
                       degree: "MS in CS",
                       institution: "UAF, Pakistan",
                        year: "2000",
                        specialization: "Computer Science",
                      location: "Pakistan"
                    },
                    {
                       degree: "BS in Engineering",
                       institution: "UAF, Pakistan",
                        year: "1998",
                        specialization: "Engineering",
                      location: "Pakistan"
                    }
                  ].map((qualification, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <GraduationCap className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <h3 className="text-lg font-medium text-foreground">{qualification.degree}</h3>
                              <p className="text-primary font-medium">{qualification.institution}</p>
                              <p className="text-muted-foreground">{qualification.specialization}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{qualification.year}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{qualification.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="awards" id="section-awards" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">Adjunct Professor / Visiting Professor</h2>
                
                <div className="mb-16">
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                    {partnerOrganizations.map((org, index) => (
                      <ScrollReveal key={index} delay={index * 0.05}>
                        <a href={org.url} target="_blank" rel="noopener noreferrer" className="block">
                          <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:border-primary/30 group cursor-pointer">
                            <CardContent className="p-0 flex flex-col items-center justify-center space-y-3">
                              <div className="w-full h-24 flex items-center justify-center p-2 bg-white rounded-lg group-hover:scale-105 transition-transform">
                                <img 
                                  src={org.logo} 
                                  alt={org.alt}
                                  className="max-w-full max-h-full object-contain"
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      const placeholder = document.createElement('div');
                                      placeholder.className = 'w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center';
                                      placeholder.innerHTML = `<Building className="w-8 h-8 text-primary" />`;
                                      parent.appendChild(placeholder);
                                    }
                                  }}
                                />
                              </div>
                              <p className="text-xs text-center text-muted-foreground font-medium group-hover:text-primary transition-colors">{org.name}</p>
                            </CardContent>
                          </Card>
                        </a>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">AWARDS AND STEWARDSHIP</h2>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{awardsData.length}</p>
                      <p className="text-sm text-muted-foreground">Total Awards</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{awardsData.filter(a => a.year && parseInt(a.year) >= 2020).length}</p>
                      <p className="text-sm text-muted-foreground">Recent (2020+)</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{awardsData.filter(a => a.name.toLowerCase().includes('best') || a.name.toLowerCase().includes('outstanding') || a.name.toLowerCase().includes('top')).length}</p>
                      <p className="text-sm text-muted-foreground">Excellence Awards</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  {awardsData.map((award, index) => (
                    <ScrollReveal key={index} delay={index * 0.03}>
                      <Card className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:border-primary/30">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                              <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <h3 className="text-lg font-medium text-foreground">{award.name}</h3>
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Institution</p>
                                  <p className="text-foreground font-medium">{award.institution}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                                  <Badge className="bg-primary/10 text-primary border-primary/20">{award.year}</Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                                  <Badge variant="secondary">{award.category}</Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                                  <p className="text-foreground text-sm">{award.type}</p>
                                </div>
                              </div>
                            </div>
                            {award.certificateImage && (
                              <CertificatePreview 
                                image={award.certificateImage} 
                                awardName={award.name}
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="memberships" id="section-memberships" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">PROFESSIONAL MEMBERSHIPS</h2>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{membershipsData.length}</p>
                      <p className="text-sm text-muted-foreground">Total Memberships</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{membershipsData.filter(m => m.role.includes('Professional')).length}</p>
                      <p className="text-sm text-muted-foreground">Professional Members</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{membershipsData.filter(m => m.organisation === 'IEEE' || m.organisation === 'ACM').length}</p>
                      <p className="text-sm text-muted-foreground">IEEE/ACM Members</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  {membershipsData.map((membership, index) => (
                    <ScrollReveal key={index} delay={index * 0.05}>
                      <Card className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:border-primary/30">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <h3 className="text-xl font-medium text-foreground">{membership.organisation}</h3>
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Role</p>
                                  <p className="text-foreground font-medium">{membership.role}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Level</p>
                                  <Badge className="bg-primary/10 text-primary border-primary/20">{membership.level}</Badge>
                                </div>
                                <div className="sm:col-span-2">
                                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                                  <p className="text-foreground">{membership.duration}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="administrative" id="section-administrative" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">ADMINISTRATIVE DUTIES</h2>
                <div className="space-y-4">
                  {[
                    {
                      role: "Acting Program Director of Master in Applied Computing MAC",
                      level: "School of Computer Science, Faculty of Innovation and Technology",
                      duration: "15/03/2023 to present"
                    },
                    {
                      role: "Programme Director - Postgraduate Research Programmes [Computing]",
                      level: "School of Computer Science",
                      duration: "01/11/2022 to present"
                    },
                    {
                      role: "4IR and SDG Coordinator",
                      level: "School of Computer Science",
                      duration: "08/04/2022 to 08/04/2025"
                    },
                    {
                      role: "Cluster Head for Cyber Security Research Cluster",
                      level: "School of Computer Science and Engineering, SCE, Taylor's University, Malaysia",
                      duration: "05/08/2021 to 04/08/2023"
                    },
                    {
                      role: "Director Center for Smart Society 5.0 [CSS5]",
                      level: "School of Computer Science and Engineering, SCE, Taylor's University, Malaysia",
                      duration: "05/08/2021 to 04/08/2023"
                    },
                    {
                      role: "School Research Committee for the School of Computing and IT",
                      level: "School of Computing and IT, Taylor's University, Malaysia",
                      duration: "12/11/2018 to 31/12/2019"
                    },
                    {
                      role: "Student Disciplinary Committee",
                      level: "School of Computing and IT, Taylor's University",
                      duration: "01/11/2018 to 31/10/2019"
                    },
                    {
                      role: "Scientific Research Committee",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "15/09/2015 to 14/08/2018"
                    },
                    {
                      role: "Secretary Quality Assurance Committee",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "04/09/2009 to 14/08/2018"
                    },
                    {
                      role: "EECHES formerly NCAAA committee at University level for standard 5",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "07/03/2016 to 06/03/2018"
                    },
                    {
                      role: "CIRS Committee : CCSIT Innovation and Research Showcase",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "14/09/2015 to 14/09/2016"
                    },
                    {
                      role: "Chairman Documentation and Follow up Committee",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "15/10/2014 to 14/10/2015"
                    },
                    {
                      role: "Local Programming Contest Committee",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "15/09/2009 to 26/08/2010"
                    },
                    {
                      role: "Chairman Lab Committee",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "14/10/2008 to 26/08/2010"
                    },
                    {
                      role: "Dean's coordinator",
                      level: "King Faisal University, Al Ahsa, Kingdom of Saudi Arabia",
                      duration: "04/09/2008 to 29/07/2010"
                    },
                    {
                      role: "Head of IT",
                      level: "ILMA University, formerly Institute of Business & Technology IBT, Karachi Pakistan",
                      duration: "07/03/2005 to 07/08/2008"
                    },
                    {
                      role: "Chairman Computer Networks & Communication Department",
                      level: "ILMA University, formerly Institute of Business & Technology IBT, Karachi Pakistan",
                      duration: "07/03/2005 to 07/08/2008"
                    },
                    {
                      role: "Coordinator MS/MPhil Program",
                      level: "ILMA University, formerly Institute of Business & Technology IBT, Karachi Pakistan",
                      duration: "07/03/2005 to 07/08/2008"
                    },
                    {
                      role: "Member Academic Council",
                      level: "ILMA University, formerly Institute of Business & Technology IBT, Karachi Pakistan",
                      duration: "07/03/2005 to 07/08/2008"
                    },
                    {
                      role: "Member Selection Board",
                      level: "ILMA University, formerly Institute of Business & Technology IBT, Karachi Pakistan",
                      duration: "07/03/2005 to 07/08/2008"
                    },
                    {
                      role: "Headed software development department",
                      level: "ILMA University, formerly Institute of Business & Technology IBT, Karachi Pakistan",
                      duration: "07/03/2005 to 07/08/2008"
                    },
                    {
                      role: "Coordinator for Virtual University (VU)",
                      level: "APTECH worldwide Inc. (Azfam Technologies), Karachi",
                      duration: "01/01/2003 to 28/02/2005"
                    }
                  ].map((duty, index) => (
                    <ScrollReveal key={index} delay={index * 0.03}>
                      <Card className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:border-primary/30">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                              <Building className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <h3 className="text-lg font-medium text-foreground">{duty.role}</h3>
                              <p className="text-sm text-muted-foreground">{duty.level}</p>
                              <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-foreground font-medium">{duty.duration}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="evaluation" id="section-evaluation" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">EVALUATION ACTIVITIES</h2>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{evaluationActivities?.length || 0}</p>
                      <p className="text-sm text-muted-foreground">Total Evaluations</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{evaluationActivities?.filter(e => e.category === 'Article in Journal').length || 0}</p>
                      <p className="text-sm text-muted-foreground">Journal Reviews</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{evaluationActivities?.filter(e => e.category === 'Thesis').length || 0}</p>
                      <p className="text-sm text-muted-foreground">Thesis Evaluations</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{evaluationActivities?.filter(e => e.category === 'Academic Promotion Evaluator').length || 0}</p>
                      <p className="text-sm text-muted-foreground">Promotions</p>
                    </CardContent>
                  </Card>
                </div>
                
                {!evaluationActivities ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading evaluation data...</p>
                  </div>
                ) : (
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/40 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-lg gap-2" style={{ paddingBottom: '50px' }}>
                    <TabsTrigger 
                      value="all"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      All Activities
                    </TabsTrigger>
                    <TabsTrigger 
                      value="journal"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Journal Editorial
                    </TabsTrigger>
                    <TabsTrigger 
                      value="thesis"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Thesis Evaluation
                    </TabsTrigger>
                    <TabsTrigger 
                      value="promotion"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Academic Promotion
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {evaluationActivities?.length || 0} evaluation activities across multiple categories
                    </p>
                    <div className="space-y-4">
                      {(evaluationActivities || []).map((evaluation, index) => (
                        <ScrollReveal key={index} delay={index * 0.02}>
                          <Card className="p-4 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{evaluation.activity}</h4>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{evaluation.duration}</span>
                                  </div>
                                  <Badge variant="outline">{evaluation.category}</Badge>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </ScrollReveal>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="journal" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {(evaluationActivities || []).filter(e => e.category === "Article in Journal").length} journal editorial positions
                    </p>
                    <div className="space-y-4">
                      {(evaluationActivities || [])
                        .filter(e => e.category === "Article in Journal")
                        .map((evaluation, index) => (
                          <ScrollReveal key={index} delay={index * 0.05}>
                            <Card className="p-4 hover:shadow-md transition-all">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground">{evaluation.activity}</h4>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{evaluation.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </ScrollReveal>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="thesis" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {(evaluationActivities || []).filter(e => e.category === "Thesis").length} thesis evaluation assignments
                    </p>
                    <div className="space-y-4">
                      {(evaluationActivities || [])
                        .filter(e => e.category === "Thesis")
                        .map((evaluation, index) => (
                          <ScrollReveal key={index} delay={index * 0.03}>
                            <Card className="p-4 hover:shadow-md transition-all">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground">{evaluation.activity}</h4>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{evaluation.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </ScrollReveal>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="promotion" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {(evaluationActivities || []).filter(e => e.category === "Academic Promotion Evaluator").length} academic promotion evaluations
                    </p>
                    <div className="space-y-4">
                      {(evaluationActivities || [])
                        .filter(e => e.category === "Academic Promotion Evaluator")
                        .map((evaluation, index) => (
                          <ScrollReveal key={index} delay={index * 0.1}>
                            <Card className="p-4 hover:shadow-md transition-all">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground">{evaluation.activity}</h4>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{evaluation.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </ScrollReveal>
                        ))}
                    </div>
                  </TabsContent>

                  {(evaluationActivities || []).filter(e => e.category === "Project").length > 0 && (
                    <TabsContent value="project" className="space-y-4 mt-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        {(evaluationActivities || []).filter(e => e.category === "Project").length} project evaluations
                      </p>
                      <div className="space-y-4">
                        {(evaluationActivities || [])
                          .filter(e => e.category === "Project")
                          .map((evaluation, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                              <Card className="p-4 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-foreground">{evaluation.activity}</h4>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                                      <Calendar className="w-4 h-4 text-primary" />
                                      <span>{evaluation.duration}</span>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </ScrollReveal>
                          ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="supervision" id="section-supervision" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">STUDENT SUPERVISION</h2>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{(ongoingSupervisions?.length || 0) + (completedSupervisions?.length || 0)}</p>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{completedSupervisions?.length || 0}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{ongoingSupervisions?.length || 0}</p>
                      <p className="text-sm text-muted-foreground">Ongoing</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{completedSupervisions?.filter(s => s.level === 'PhD/Doctoral').length || 0}</p>
                      <p className="text-sm text-muted-foreground">PhD Graduated</p>
                    </CardContent>
                  </Card>
                </div>
                
                {!ongoingSupervisions && !completedSupervisions ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading supervision data...</p>
                  </div>
                ) : (
                <Tabs defaultValue="ongoing" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/40 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-lg gap-2" style={{ paddingBottom: '50px' }}>
                    <TabsTrigger 
                      value="ongoing"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Ongoing Supervision
                    </TabsTrigger>
                    <TabsTrigger 
                      value="completed"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Completed Supervision
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ongoing" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <Card className="text-center p-6">
                        <CardContent className="space-y-2">
                          <p className="text-3xl font-medium text-primary">{ongoingSupervisions?.length || 0}</p>
                          <p className="text-sm text-muted-foreground">Active Supervisions</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center p-6">
                        <CardContent className="space-y-2">
                          <p className="text-3xl font-medium text-primary">
                            {(ongoingSupervisions || []).filter(s => s.role === "Main Supervisor").length}
                          </p>
                          <p className="text-sm text-muted-foreground">Main Supervisor</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center p-6">
                        <CardContent className="space-y-2">
                          <p className="text-3xl font-medium text-primary">
                            {(ongoingSupervisions || []).filter(s => s.role.includes("Co-supervisor")).length}
                          </p>
                          <p className="text-sm text-muted-foreground">Co-Supervisor</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      {(ongoingSupervisions || []).map((student, index) => (
                        <ScrollReveal key={index} delay={index * 0.03}>
                          <Card className="p-4 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{student.name}</h4>
                                <p className="text-sm text-primary mt-1">{student.level}</p>
                                {student.thesis && (
                                  <p className="text-sm text-muted-foreground mt-2 italic">"{student.thesis}"</p>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <Badge variant={student.role === "Main Supervisor" ? "default" : "secondary"}>
                                  {student.role}
                                </Badge>
                              </div>
                            </div>
                          </Card>
                        </ScrollReveal>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <Card className="text-center p-6">
                        <CardContent className="space-y-2">
                          <p className="text-3xl font-medium text-primary">{completedSupervisions?.length || 0}</p>
                          <p className="text-sm text-muted-foreground">Graduated Students</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center p-6">
                        <CardContent className="space-y-2">
                          <p className="text-3xl font-medium text-primary">
                            {(completedSupervisions || []).filter(s => s.level === "PhD/Doctoral").length}
                          </p>
                          <p className="text-sm text-muted-foreground">PhD Graduates</p>
                        </CardContent>
                      </Card>
                      <Card className="text-center p-6">
                        <CardContent className="space-y-2">
                          <p className="text-3xl font-medium text-primary">
                            {(completedSupervisions || []).filter(s => s.level.includes("Master")).length}
                          </p>
                          <p className="text-sm text-muted-foreground">Master's Graduates</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      {(completedSupervisions || []).map((student, index) => (
                        <ScrollReveal key={index} delay={index * 0.03}>
                          <Card className="p-4 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{student.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{student.level}</p>
                                {student.thesis && (
                                  <p className="text-sm text-muted-foreground mt-2 italic">"{student.thesis}"</p>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <Badge variant={student.role === "Main Supervisor" ? "default" : "secondary"}>
                                  {student.role}
                                </Badge>
                              </div>
                            </div>
                          </Card>
                        </ScrollReveal>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="presentations" id="section-presentations" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">KEYNOTE PRESENTATIONS & CONFERENCES</h2>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{(keynoteData?.length || 0) + (invitedSpeakerData?.length || 0) + (eventOrganiserData?.length || 0) + (oralPresenterData?.length || 0)}</p>
                      <p className="text-sm text-muted-foreground">Total Presentations</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{keynoteData?.length || 0}</p>
                      <p className="text-sm text-muted-foreground">Keynote Speaker</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{invitedSpeakerData?.length || 0}</p>
                      <p className="text-sm text-muted-foreground">Invited Speaker</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">{eventOrganiserData?.length || 0}</p>
                      <p className="text-sm text-muted-foreground">Event Organiser</p>
                    </CardContent>
                  </Card>
                </div>
                
                {!keynoteData && !invitedSpeakerData && !eventOrganiserData && !oralPresenterData ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading presentations data...</p>
                  </div>
                ) : (
                <Tabs defaultValue="keynote" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/40 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-lg gap-2" style={{ paddingBottom: '50px' }}>
                    <TabsTrigger 
                      value="keynote"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Keynote Speaker
                    </TabsTrigger>
                    <TabsTrigger 
                      value="invited"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Invited Speaker
                    </TabsTrigger>
                    <TabsTrigger 
                      value="organiser"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Event Organiser
                    </TabsTrigger>
                    <TabsTrigger 
                      value="oral"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-lg transition-all duration-300 hover:bg-white/60 py-2.5"
                    >
                      Oral Presenter
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="keynote" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Delivered {keynoteData?.length || 0} keynote presentations worldwide
                    </p>
                    {(keynoteData || []).map((presentation, index) => (
                      <ScrollReveal key={index} delay={index * 0.02}>
                        <Card 
                          className="p-4 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => presentation.url && window.open(presentation.url, '_blank')}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{presentation.title}</h4>
                              <p className="text-sm text-primary mt-1">{presentation.event}</p>
                              {presentation.location && (
                                <p className="text-sm text-muted-foreground">{presentation.location}</p>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <span>{presentation.date}</span>
                                <Badge variant="secondary">{presentation.year}</Badge>
                                <Badge variant={presentation.type === "International" ? "default" : "outline"}>
                                  {presentation.type}
                                </Badge>
                              </div>
                            </div>
                            {presentation.url && (
                              <div className="ml-4 text-primary">?</div>
                            )}
                          </div>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </TabsContent>

                  <TabsContent value="invited" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {invitedSpeakerData?.length || 0} invited speaking engagements
                    </p>
                    {(invitedSpeakerData || []).map((presentation, index) => (
                      <ScrollReveal key={index} delay={index * 0.05}>
                        <Card 
                          className="p-4 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => presentation.url && window.open(presentation.url, '_blank')}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{presentation.title}</h4>
                              <p className="text-sm text-primary mt-1">{presentation.event}</p>
                              {presentation.location && (
                                <p className="text-sm text-muted-foreground">{presentation.location}</p>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <span>{presentation.date}</span>
                                <Badge variant="secondary">{presentation.year}</Badge>
                                <Badge variant={presentation.type === "International" ? "default" : "outline"}>
                                  {presentation.type}
                                </Badge>
                              </div>
                            </div>
                            {presentation.url && (
                              <div className="ml-4 text-primary">?</div>
                            )}
                          </div>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </TabsContent>

                  <TabsContent value="organiser" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {eventOrganiserData?.length || 0} conference organizing roles
                    </p>
                    {(eventOrganiserData || []).map((presentation, index) => (
                      <ScrollReveal key={index} delay={index * 0.1}>
                        <Card 
                          className="p-4 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => presentation.url && window.open(presentation.url, '_blank')}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{presentation.title}</h4>
                              <p className="text-sm text-primary mt-1">{presentation.event}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <span>{presentation.date}</span>
                                <Badge variant="secondary">{presentation.year}</Badge>
                                <Badge variant={presentation.type === "International" ? "default" : "outline"}>
                                  {presentation.type}
                                </Badge>
                              </div>
                            </div>
                            {presentation.url && (
                              <div className="ml-4 text-primary">?</div>
                            )}
                          </div>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </TabsContent>

                  <TabsContent value="oral" className="space-y-4 mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {oralPresenterData?.length || 0} oral presentations at conferences
                    </p>
                    {(oralPresenterData || []).map((presentation, index) => (
                      <ScrollReveal key={index} delay={index * 0.01}>
                        <Card className="p-4 hover:shadow-md transition-all">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{presentation.title}</h4>
                              <p className="text-sm text-primary mt-1">{presentation.event}</p>
                              {presentation.location && (
                                <p className="text-sm text-muted-foreground">{presentation.location}</p>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <span>{presentation.date}</span>
                                <Badge variant="secondary">{presentation.year}</Badge>
                                <Badge variant={presentation.type === "International" ? "default" : "outline"}>
                                  {presentation.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </TabsContent>
                </Tabs>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="ipr" id="section-ipr" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">INTELLECTUAL PROPERTY RIGHTS (IPR)</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">15</p>
                      <p className="text-sm text-muted-foreground">Total Patents</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">15</p>
                      <p className="text-sm text-muted-foreground">International Patents</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4 mt-8">
                  <ScrollReveal delay={0.1}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">An IoT-powered pet monitoring and feeding system</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">EDGE PRESERVING IMAGE SMOOTHING BENCHMARK SYSTEM WITH DEEP CONVOLUTIONAL NEURAL NETWORK</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">DIGITAL IMAGING METHODS AND SYSTEM FOR PROCESSING AGAR PLATE IMAGES FOR AUTOMATED DIAGNOSTICS</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.25}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">A Wireless Networking of Medical Equipment's on Mobile Application for Paperless Clinic</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">A Compact Multiband Super Wideband Antenna for Body-centric Wireless Applications</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.35}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Semantic Segmentation Based Kinematic Tracking</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.4}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">The electric vehicle power generation/charging system using an electromagnetic suspension</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.45}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">An absorbent system for obtaining solar energy</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.5}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">IOT-based Innovative Actuator Design for Enhanced Performance</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.55}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Internet of Things Based Device for Monitoring and Control of Mechanical Systems</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.6}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">An IoT-based system to detect face masks and maintain social distancing in a building</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.65}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Quantum-Resistant Security Device for IoT Networks</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.7}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Smart Home Hub</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.75}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Autonomous Delivery Robot</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.8}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Predictive Maintenance Apparatus for IoT Devices</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Patent</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="more" id="section-more" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">ADDITIONAL INFORMATION</h2>
                
                <Accordion type="multiple" className="space-y-4">
                  <AccordionItem value="administrative">
                    <AccordionTrigger className="text-lg font-medium hover:text-primary">
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-primary" />
                        <span>Administrative Duties</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3">
                        {[
                          {
                            role: "Acting Program Director of Master in Applied Computing MAC",
                            level: "School of Computer Science, Faculty of Innovation and Technology",
                            duration: "15/03/2023 to present"
                          },
                          {
                            role: "Programme Director - Postgraduate Research Programmes [Computing]",
                            level: "School of Computer Science",
                            duration: "01/11/2022 to present"
                          },
                          {
                            role: "4IR and SDG Coordinator",
                            level: "School of Computer Science",
                            duration: "08/04/2022 to 08/04/2025"
                          },
                          {
                            role: "Director Center for Smart Society 5.0 [CSS5]",
                            level: "School of Computer Science and Engineering, Taylor's University",
                            duration: "05/08/2021 to 04/08/2023"
                          },
                          {
                            role: "Cluster Head for Cyber Security Research Cluster",
                            level: "School of Computer Science and Engineering, Taylor's University",
                            duration: "05/08/2021 to 04/08/2023"
                          }
                        ].map((duty, index) => (
                          <Card key={index} className="p-4 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70 hover:shadow-md transition-all duration-300">
                            <h4 className="font-medium text-foreground mb-1">{duty.role}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{duty.level}</p>
                            <p className="text-xs text-primary font-medium">{duty.duration}</p>
                          </Card>
                        ))}
                        <p className="text-sm text-muted-foreground text-center pt-2">
                          View all 22 administrative positions in the dedicated Administrative Duties section
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="memberships">
                    <AccordionTrigger className="text-lg font-medium hover:text-primary">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Professional Memberships</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        {[
                          {
                            organisation: "ACM",
                            role: "Professional Member",
                            duration: "2023 to 2023",
                            level: "International"
                          },
                          {
                            organisation: "IEEE",
                            role: "Professional Member",
                            duration: "2023 to 2023",
                            level: "International"
                          },
                          {
                            organisation: "ISOC Argentina Chapter",
                            role: "Member",
                            duration: "2011 to 2020",
                            level: "International"
                          },
                          {
                            organisation: "ISOC Chapter US New York",
                            role: "Member",
                            duration: "2011 to 2020",
                            level: "International"
                          },
                          {
                            organisation: "ISOC Global Member",
                            role: "Member",
                            duration: "2011 to 2020",
                            level: "International"
                          },
                          {
                            organisation: "ISOC Malaysia Chapter",
                            role: "Member",
                            duration: "2011 to 2020",
                            level: "International"
                          }
                        ].map((membership, index) => (
                          <ScrollReveal key={index} delay={index * 0.05}>
                            <Card className="hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/70">
                              <CardContent className="p-5">
                                <div className="flex items-start space-x-4">
                                  <div className="p-3 bg-primary/10 rounded-lg">
                                    <Users className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <h4 className="font-medium text-foreground text-lg">{membership.organisation}</h4>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Role: </span>
                                        <span className="text-foreground font-medium">{membership.role}</span>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Level: </span>
                                        <Badge variant="secondary" className="text-xs">{membership.level}</Badge>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-muted-foreground">Duration: </span>
                                        <span className="text-foreground">{membership.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </ScrollReveal>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="consultancy">
                    <AccordionTrigger className="text-lg font-medium hover:text-primary">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span>Consultancy & Industry Projects</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        {[
                          {
                            title: "Cybersecurity Assessment for Financial Institution",
                            client: "Major Malaysian Bank",
                            year: "2023-2024"
                          },
                          {
                            title: "IoT Security Framework Development",
                            client: "Smart City Initiative Malaysia",
                            year: "2022-2023"
                          },
                          {
                            title: "Network Security Audit",
                            client: "Government Agency",
                            year: "2021-2022"
                          }
                        ].map((project, index) => (
                          <Card key={index} className="p-4">
                            <h4 className="font-medium text-foreground">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.client}</p>
                            <Badge variant="secondary" className="mt-2">{project.year}</Badge>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ipr">
                    <AccordionTrigger className="text-lg font-medium hover:text-primary">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <span>Intellectual Property Rights</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        {[
                          {
                            title: "IoT Security Framework",
                            type: "Patent",
                            number: "US123456789",
                            year: "2024",
                            status: "Granted"
                          },
                          {
                            title: "Machine Learning Algorithm for Network Intrusion Detection",
                            type: "Patent",
                            number: "EP987654321",
                            year: "2023",
                            status: "Granted"
                          },
                          {
                            title: "Blockchain-based Data Privacy System",
                            type: "Patent",
                            number: "WO2023012345",
                            year: "2023",
                            status: "Pending"
                          }
                        ].map((ip, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-foreground">{ip.title}</h4>
                                <p className="text-sm text-primary">{ip.type}</p>
                                <p className="text-sm text-muted-foreground">{ip.number}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary">{ip.year}</Badge>
                                <p className="text-xs text-muted-foreground mt-1">{ip.status}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="social-impact">
                    <AccordionTrigger className="text-lg font-medium hover:text-primary">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-primary" />
                        <span>Social Contributions & Community Service</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        {[
                          {
                            title: "Cybersecurity Awareness Program",
                            description: "Conducted free cybersecurity workshops for SMEs and schools",
                            beneficiaries: "500+ participants",
                            year: "2023-2024"
                          },
                          {
                            title: "Digital Literacy Initiative",
                            description: "Training rural communities on internet safety and digital skills",
                            beneficiaries: "200+ community members",
                            year: "2022-2023"
                          },
                          {
                            title: "Open Source Security Tools",
                            description: "Developed and released free cybersecurity tools for public use",
                            beneficiaries: "Global community",
                            year: "2021-ongoing"
                          }
                        ].map((contribution, index) => (
                          <Card key={index} className="p-4">
                            <h4 className="font-medium text-foreground">{contribution.title}</h4>
                            <p className="text-sm text-muted-foreground mt-2">{contribution.description}</p>
                            <div className="flex justify-between items-center mt-3">
                              <Badge variant="outline">{contribution.beneficiaries}</Badge>
                              <span className="text-xs text-primary">{contribution.year}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </TabsContent>

            <TabsContent value="courses" id="section-courses" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">COURSES ATTENDED</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">5</p>
                      <p className="text-sm text-muted-foreground">Total Courses</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">2</p>
                      <p className="text-sm text-muted-foreground">Research Courses</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">3</p>
                      <p className="text-sm text-muted-foreground">Non-Research Courses</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <ScrollReveal delay={0.1}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">AWS Cloud Foundation Certification</h4>
                          <p className="text-sm text-muted-foreground mt-1">01/12/2020 to 01/12/2020</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Research</Badge>
                            <Badge variant="secondary">International</Badge>
                          </div>
                        </div>
                        <Calendar className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Apache Flume, Kafka and Saqoop Data Ingestion</h4>
                          <p className="text-sm text-muted-foreground mt-1">21/02/2019 to 22/02/2019</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">Non-Research</Badge>
                            <Badge variant="secondary">Private/Industrial Sector</Badge>
                          </div>
                        </div>
                        <Calendar className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Administrator Training for Cloudera Hadoop</h4>
                          <p className="text-sm text-muted-foreground mt-1">24/01/2019 to 25/01/2019</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">Non-Research</Badge>
                            <Badge variant="secondary">Private/Industrial Sector</Badge>
                          </div>
                        </div>
                        <Calendar className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.25}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">RapidMiner Studio and RapidMiner Radoop for data mining in Hadoop</h4>
                          <p className="text-sm text-muted-foreground mt-1">02/01/2019 to 04/05/2019</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="default">Research</Badge>
                            <Badge variant="secondary">Private/Industrial Sector</Badge>
                          </div>
                        </div>
                        <Calendar className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Teambuilding - Everyone Counts</h4>
                          <p className="text-sm text-muted-foreground mt-1">30/11/2018 to 01/12/2018</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">Non-Research</Badge>
                            <Badge variant="secondary">National</Badge>
                          </div>
                        </div>
                        <Calendar className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="consultancy" id="section-consultancy" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">CONSULTANCY PROJECTS</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">1</p>
                      <p className="text-sm text-muted-foreground">Total Projects</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">1</p>
                      <p className="text-sm text-muted-foreground">Private/Industrial</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Consultant Role</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <ScrollReveal delay={0.1}>
                    <Card className="p-6 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground text-lg">Data Science and Engineering (TUAMPDSE)</h4>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="w-4 h-4 text-primary mr-2" />
                              <span className="font-medium">Organisation:</span>
                              <span className="ml-2">CIMB Bank</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary mr-2" />
                              <span className="font-medium">Duration:</span>
                              <span className="ml-2">16/11/2018 to 27/11/2018</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Briefcase className="w-4 h-4 text-primary mr-2" />
                              <span className="font-medium">Role:</span>
                              <span className="ml-2">Consultant</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-4">
                            <Badge variant="default">Consultancy</Badge>
                            <Badge variant="secondary">Private/Industrial Sector</Badge>
                          </div>
                        </div>
                        <Briefcase className="w-6 h-6 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="technical-contributions" id="section-technical-contributions" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">ACADEMIC/TECHNICAL CONTRIBUTIONS</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">6</p>
                      <p className="text-sm text-muted-foreground">Total Contributions</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">4</p>
                      <p className="text-sm text-muted-foreground">Session Chair Roles</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">2</p>
                      <p className="text-sm text-muted-foreground">Co-Chair Roles</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <ScrollReveal delay={0.1}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Conference Session Chair</h4>
                          <p className="text-sm text-primary mt-1">Eureca 16 Conference at Taylor's University, 2021</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Chairman</Badge>
                            <Badge variant="secondary">2021</Badge>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Session Chair</h4>
                          <p className="text-sm text-primary mt-1">FTNCT, 2021 Nirma University, Ahmedabad</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Chairman</Badge>
                            <Badge variant="secondary">2021</Badge>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Session Chair</h4>
                          <p className="text-sm text-primary mt-1">Conference</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Chairman</Badge>
                            <Badge variant="secondary">2021</Badge>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.25}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Session Chair</h4>
                          <p className="text-sm text-primary mt-1">Conference</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Chairman</Badge>
                            <Badge variant="secondary">2021</Badge>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Publicity Co-Chair</h4>
                          <p className="text-sm text-primary mt-1">Internet of Medical Things For Smart Healthcare Applications</p>
                          <p className="text-sm text-muted-foreground mt-1">In Association With: IEEE International Conference On Internet Of Things (IThings-2019) At Atlanta, USA</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Chairman</Badge>
                            <Badge variant="secondary">2019</Badge>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.35}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">Co-Chair</h4>
                          <p className="text-sm text-primary mt-1">International Conference on Cyber Security Research and Innovation, Secure Conf 2019</p>
                          <p className="text-sm text-muted-foreground mt-1">Mutually organized with the corporate sector WS Conference and sponsored by CyberSecurity Malaysia</p>
                          <p className="text-sm text-muted-foreground mt-1">WSConferences, Sponsored by Cyber Security Malaysia</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="outline">Co-Chair</Badge>
                            <Badge variant="secondary">2019</Badge>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="social-contributions" id="section-social-contributions" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">CONTRIBUTION TO SOCIETY</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <p className="text-3xl font-medium text-primary">2</p>
                      <p className="text-sm text-muted-foreground">Total Contributions</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Community Service</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-6">
                    <CardContent className="space-y-2">
                      <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">International Impact</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <ScrollReveal delay={0.1}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">BenderaPutih (White Flag App for the Community during this pandemic situation)</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>14/08/2021 to 25/05/2023</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">Community</Badge>
                            <Badge variant="secondary">Pandemic Relief</Badge>
                          </div>
                        </div>
                        <Heart className="w-6 h-6 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <Card className="p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">IEEE Access Journal, Associate Editor</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="w-4 h-4 text-primary mr-2" />
                            <span>Since 17/10/2018</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <Badge variant="default">International</Badge>
                            <Badge variant="secondary">Editorial Board</Badge>
                          </div>
                        </div>
                        <BookOpen className="w-6 h-6 text-primary ml-4" />
                      </div>
                    </Card>
                  </ScrollReveal>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="contact" id="section-contact" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-medium text-primary mb-8 border-b border-border pb-4">CONTACT INFORMATION</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-accent/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-medium text-foreground">University Address</h3>
                      <div className="space-y-3 text-muted-foreground">
                        <p>School of Computer Science</p>
                        <p>Faculty of Innovation & Technology</p>
                        <p>Taylor's University</p>
                        <p>No. 1, Jalan Taylor's, 47500 Subang Jaya</p>
                        <p>Selangor, Malaysia</p>
                      </div>
                    </div>
                    
                    <div className="bg-accent/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Contact Details</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">Extension</p>
                          <p className="text-muted-foreground">5277</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Email</p>
                          <p className="text-primary">noorzaman.jhanjhi@taylors.edu.my | profjhanjhi@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-accent/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Academic Profiles</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">Google Scholar</p>
                          <a href="https://scholar.google.com/citations?hl=en&user=J6QVIncAAAAJ&view_op=list_works" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">View Publications</a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">ResearchGate</p>
                          <a href="https://www.researchgate.net/profile/Noor-Jhanjhi" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">View Profile</a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">LinkedIn</p>
                          <a href="https://www.linkedin.com/in/noorzaman/" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">Connect on LinkedIn</a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">ResearcherID</p>
                          <a href="#" className="text-primary text-sm hover:underline">P-5063-2017</a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Scopus Author ID</p>
                          <a href="#" className="text-primary text-sm hover:underline">56634885400</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-accent/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Office Hours</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p>Or by appointment</p>
                        <p className="text-sm text-primary">Please email to schedule a meeting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </motion.div>

      {/* Publications Modal */}
      <Dialog open={isPublicationsModalOpen} onOpenChange={setIsPublicationsModalOpen}>
        <DialogContent className="w-[95vw] sm:w-[95vw] max-w-[1600px] sm:max-w-[1600px] h-[85vh] p-0 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50/30 border-2 border-gray-200/80 shadow-2xl">
          {/* Accessible Header - Required for screen readers */}
          <DialogHeader className="sr-only">
            <DialogTitle>All Publications</DialogTitle>
            <DialogDescription>
              Browse all academic publications, books, chapters, and journal articles
            </DialogDescription>
          </DialogHeader>

          {/* Visual Header with Animations */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative px-12 pt-12 pb-8 border-b-2 border-gray-200/50 bg-white/80 backdrop-blur-sm"
            aria-hidden="true"
          >
            {/* Glassmorphism Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/40 to-red-50/20" />
            
            {/* Animated gradient orbs */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-red-100/30 to-transparent rounded-full blur-3xl"
            />
            
            {/* Subtle border glow */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.2 }}
                className="mb-8"
              >
                <h2 
                  className="text-5xl tracking-tight mb-3"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #1f2937 0%, #dc2626 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  All Publications
                </h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="text-lg text-gray-600"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  Browse all academic publications, books, chapters, and journal articles
                </motion.p>
              </motion.div>
              
              {/* Search and Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                className="space-y-5"
              >
                {/* Search Bar */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-150 z-10" />
                    <Input
                      placeholder="Search by title, author, publisher, or journal..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-14 py-7 text-base rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-primary/30 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                    
                    {/* Clear Button - Apple Style */}
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setSearchQuery('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors duration-200 z-10 group/clear"
                          aria-label="Clear search"
                        >
                          <X className="w-4 h-4 text-white group-hover/clear:rotate-90 transition-transform duration-200" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Filter Buttons */}
                <div className="flex gap-3 flex-wrap">
                  {(['all', 'books', 'chapters', 'journals', 'proceedings'] as const).map((filter, index) => (
                    <motion.button
                      key={filter}
                      onClick={() => setModalFilter(filter)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.4 + (index * 0.05),
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-7 py-4 rounded-xl capitalize overflow-hidden group ${
                        modalFilter === filter
                          ? 'text-white shadow-lg shadow-primary/25'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      {/* Active background */}
                      {modalFilter === filter && (
                        <motion.div
                          layoutId="activeFilter"
                          className="absolute inset-0 bg-gradient-to-r from-primary to-red-700"
                          transition={{ 
                            type: "spring", 
                            stiffness: 380, 
                            damping: 30 
                          }}
                        />
                      )}
                      
                      {/* Inactive background */}
                      {modalFilter !== filter && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-red-50 group-hover:to-gray-50 transition-all duration-300" />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "linear",
                              repeatDelay: 1
                            }}
                          />
                        </>
                      )}
                      
                      {/* Button text */}
                      <span className="relative z-10 flex items-center gap-2">
                        {filter === 'all' && <FileText className="w-4 h-4" />}
                        {filter === 'books' && <Book className="w-4 h-4" />}
                        {filter === 'chapters' && <BookOpen className="w-4 h-4" />}
                        {filter === 'journals' && <Newspaper className="w-4 h-4" />}
                        {filter}
                      </span>
                      
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        style={{ transform: 'skewX(-20deg)' }}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content Container with Border */}
          <div className="relative bg-white">
            <ScrollArea className="h-[calc(90vh-280px)]">
              <div className="px-12 py-8 space-y-10">
              {/* Books Section */}
              {(modalFilter === 'all' || modalFilter === 'books') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                      <Book className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                      Books
                      <span className="ml-3 text-base text-muted-foreground" style={{ fontWeight: 400 }}>
                        ({books.filter(book => 
                          searchQuery === '' || 
                          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.publisher.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length})
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {books
                      .filter(book => 
                        searchQuery === '' || 
                        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.publisher.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((book, index) => (
                        <motion.div
                          key={`${book.isbn}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.01, duration: 0.2 }}
                        >
                          <Card 
                            className={`hover:shadow-lg transition-shadow overflow-hidden ${book.pdfUrl ? 'cursor-pointer hover:border-primary/50' : ''}`}
                            onClick={() => book.pdfUrl && window.open(book.pdfUrl, '_blank')}
                          >
                            <div className="flex gap-4 p-5">
                              <div className="relative w-28 h-16 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm">
                                <ImageWithFallback
                                  src={book.imageUrl}
                                  alt={book.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                <div className="space-y-1">
                                  <h4 className={`text-sm text-foreground line-clamp-2 leading-snug ${book.pdfUrl ? 'group-hover:text-primary' : ''}` } style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                                    {book.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                    {book.publisher}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <Badge variant="secondary" className="text-xs shrink-0">{book.year}</Badge>
                                  <Badge variant="outline" className="text-xs shrink-0 truncate max-w-[120px]">{book.impact}</Badge>
                                  {book.pdfUrl && (
                                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs shrink-0">View</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Book Chapters Section */}
              {(modalFilter === 'all' || modalFilter === 'chapters') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                      Book Chapters
                      <span className="ml-3 text-base text-muted-foreground" style={{ fontWeight: 400 }}>
                        ({bookChapters.filter(chapter => 
                          searchQuery === '' || 
                          chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chapter.book?.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length})
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {bookChapters
                      .filter(chapter => 
                        searchQuery === '' || 
                        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (chapter.book && chapter.book.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((chapter, index) => (
                        <motion.div
                          key={`${chapter.title}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.01, duration: 0.2 }}
                        >
                          <Card 
                            className={`hover:shadow-lg transition-shadow overflow-hidden border-gray-200/60 ${(chapter as any).pdfUrl ? 'cursor-pointer hover:border-primary/50' : ''}`}
                            onClick={() => (chapter as any).pdfUrl && window.open((chapter as any).pdfUrl, '_blank')}
                          >
                            <div className="flex gap-4 p-5">
                              <div className="relative w-28 h-16 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm">
                                <ImageWithFallback
                                  src={chapter.imageUrl}
                                  alt={chapter.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                <div className="space-y-1">
                                  <h4 className={`text-sm text-foreground line-clamp-2 leading-snug ${(chapter as any).pdfUrl ? 'group-hover:text-primary' : ''}` } style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                                    {chapter.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                    {chapter.book}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                    {chapter.publisher}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <Badge variant="secondary" className="text-xs shrink-0">{chapter.year}</Badge>
                                  {(chapter as any).pdfUrl && (
                                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs shrink-0">View</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Journal Articles Section */}
              {(modalFilter === 'all' || modalFilter === 'journals') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                      <Newspaper className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                      Journal Articles
                      <span className="ml-3 text-base text-muted-foreground" style={{ fontWeight: 400 }}>
                        ({journalArticles.filter(article => 
                          searchQuery === '' || 
                          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.journal.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length})
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {journalArticles
                      .filter(article => 
                        searchQuery === '' || 
                        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.journal.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((article, index) => (
                        <motion.div
                          key={`${article.pdfUrl}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.01, duration: 0.2 }}
                        >
                          <Card 
                            className={`hover:shadow-lg transition-shadow overflow-hidden border-gray-200/60 ${article.pdfUrl ? 'cursor-pointer hover:border-primary/50' : ''}`}
                            onClick={() => article.pdfUrl && window.open(article.pdfUrl, '_blank')}
                          >
                            <div className="flex gap-4 p-5">
                              <div className="relative w-28 h-16 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm">
                                <ImageWithFallback
                                  src={article.imageUrl && (article.imageUrl.startsWith('/') || article.imageUrl.startsWith('http')) ? article.imageUrl : '/assets/image/Journals/01.png'}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                <div className="space-y-1">
                                  <h4 className={`text-sm text-foreground line-clamp-2 leading-snug ${article.pdfUrl ? 'group-hover:text-primary' : ''}` } style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                                    {article.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                    {article.journal}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <Badge variant="secondary" className="text-xs shrink-0">{article.year}</Badge>
                                  {article.pdfUrl && (
                                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs shrink-0">View</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Proceedings Articles Section */}
              {(modalFilter === 'all' || modalFilter === 'proceedings') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10">
                      <Presentation className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                      Proceedings Articles
                      <span className="ml-3 text-muted-foreground" style={{ fontWeight: 400 }}>
                        ({proceedingsArticles.filter(article => 
                          searchQuery === '' || 
                          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.conference.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length})
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {proceedingsArticles
                      .filter(article => 
                        searchQuery === '' || 
                        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.conference.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((article, index) => (
                        <motion.div
                          key={`${article.pdfUrl}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.01, duration: 0.2 }}
                        >
                          <Card 
                            className={`hover:shadow-lg transition-shadow overflow-hidden border-gray-200/60 ${article.pdfUrl ? 'cursor-pointer hover:border-blue-500/50' : ''}`}
                            onClick={() => article.pdfUrl && window.open(article.pdfUrl, '_blank')}
                          >
                            <div className="flex gap-4 p-5">
                              <div className="relative w-28 h-16 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-blue-600/10 to-blue-500/5 shadow-sm">
                                <ImageWithFallback
                                  src={article.imageUrl}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                <div className="space-y-1">
                                  <h4 className={`text-sm text-foreground line-clamp-2 leading-snug ${article.pdfUrl ? 'group-hover:text-blue-600' : ''}` } style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                                    {article.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                    {article.conference}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                  <Badge variant="secondary" className="text-xs shrink-0">{article.year}</Badge>
                                  <Badge variant="outline" className="text-xs shrink-0">{article.impact}</Badge>
                                  {article.pdfUrl && (
                                    <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 text-xs shrink-0">View</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}

                {/* No Results */}
                {searchQuery && 
                  books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 &&
                  bookChapters.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 &&
                  journalArticles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 &&
                  proceedingsArticles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      No publications found matching "{searchQuery}"
                    </p>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
