import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Search, 
  FileText, 
  Award, 
  Users, 
  Building, 
  Heart, 
  Calendar, 
  ClipboardCheck, 
  Shield, 
  Presentation, 
  Briefcase, 
  Target, 
  GraduationCap as TeachingIcon,
  UserPlus,
  Phone,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSectionHover?: (section: {id: string, name: string, summary: string} | null) => void;
}

// Section summaries for hover popups
const sectionSummaries: Record<string, string> = {
  'personal-details': 'View comprehensive personal information and professional profile',
  'biography': 'Explore detailed academic journey and career milestones',
  'qualifications': 'Review educational background and academic credentials',
  'contact': 'Access contact details and professional network',
  'research': 'Discover primary research interests and focus areas',
  'research-projects': 'Browse current and completed research initiatives',
  'publications': 'Explore published works and scholarly contributions',
  'presentations': 'View conference talks and academic presentations',
  'ipr': 'Check patents, copyrights, and intellectual property',
  'awards': 'See recognition, honors, and achievements',
  'memberships': 'View professional affiliations and memberships',
  'administrative': 'Review administrative roles and responsibilities',
  'evaluation': 'Check evaluation and assessment activities',
  'teaching': 'Explore courses taught and teaching philosophy',
  'supervision': 'View student supervision and mentoring',
  'courses': 'See professional development and training',
  'consultancy': 'Browse consulting projects and industry work',
  'technical-contributions': 'View technical reviews and contributions',
  'social-contributions': 'Explore community service and social impact'
};

const groupSummaries: Record<string, string> = {
  'Personal Information': 'Core personal and professional details',
  'Academic & Research': 'Research work, publications, and scholarly activities',
  'Recognition & Service': 'Awards, memberships, and professional service',
  'Teaching & Mentoring': 'Educational activities and student supervision',
  'Professional Work': 'Industry consulting and technical contributions'
};

export function Sidebar({ activeSection, onSectionChange, onSectionHover }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const sectionGroups = [
    {
      title: "Personal Information",
      sections: [
        { name: 'Personal Details', id: 'personal-details', icon: <User className="w-4 h-4" /> },
        { name: 'Biography', id: 'biography', icon: <BookOpen className="w-4 h-4" /> },
        { name: 'Academic Qualifications', id: 'qualifications', icon: <GraduationCap className="w-4 h-4" /> },
        { name: 'Contact Information', id: 'contact', icon: <Phone className="w-4 h-4" /> },
      ]
    },
    {
      title: "Academic & Research",
      sections: [
        { name: 'Research Areas', id: 'research', icon: <Search className="w-4 h-4" /> },
        { name: 'Research Projects', id: 'research-projects', icon: <Target className="w-4 h-4" /> },
        { name: 'Publications', id: 'publications', icon: <FileText className="w-4 h-4" /> },
        { name: 'Presentations', id: 'presentations', icon: <Presentation className="w-4 h-4" /> },
        { name: 'Intellectual Property', id: 'ipr', icon: <Shield className="w-4 h-4" /> },
      ]
    },
    {
      title: "Recognition & Service",
      sections: [
        { name: 'Awards & Recognition', id: 'awards', icon: <Award className="w-4 h-4" /> },
        { name: 'Professional Memberships', id: 'memberships', icon: <Users className="w-4 h-4" /> },
        { name: 'Administrative Duties', id: 'administrative', icon: <Building className="w-4 h-4" /> },
        { name: 'Evaluation Activities', id: 'evaluation', icon: <ClipboardCheck className="w-4 h-4" /> },
      ]
    },
    {
      title: "Teaching & Mentoring",
      sections: [
        { name: 'Teaching Experience', id: 'teaching', icon: <TeachingIcon className="w-4 h-4" /> },
        { name: 'Supervision', id: 'supervision', icon: <UserPlus className="w-4 h-4" /> },
        { name: 'Courses Attended', id: 'courses', icon: <Calendar className="w-4 h-4" /> },
      ]
    },
    {
      title: "Professional Work",
      sections: [
        { name: 'Consultancy Projects', id: 'consultancy', icon: <Briefcase className="w-4 h-4" /> },
        { name: 'Technical Contributions', id: 'technical-contributions', icon: <Search className="w-4 h-4" /> },
        { name: 'Social Contributions', id: 'social-contributions', icon: <Heart className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="w-72 sm:w-80 bg-white/80 backdrop-blur-xl border-r border-white/20 h-screen flex flex-col shadow-2xl shadow-black/5 relative">
      {/* Background Blur Overlay - Enhanced */}
      <AnimatePresence>
        {(hoveredGroup || hoveredSection) && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/10 pointer-events-none z-[5]"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              willChange: 'backdrop-filter, opacity'
            }}
          />
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-6 border-b border-white/20 bg-white/30 backdrop-blur-lg flex-shrink-0 relative z-10">
        <h2 className="text-base sm:text-lg font-medium text-foreground">Curriculum Vitae</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Navigate through sections</p>
      </div>
      
      <ScrollArea className="flex-1 overflow-y-auto relative z-10">
        <div className="p-4 space-y-4 pb-20">
          {sectionGroups.map((group, groupIndex) => {
            const isExpanded = expandedSections[group.title];
            const isGroupHovered = hoveredGroup === group.title;
            
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
                className="relative"
                onMouseEnter={() => {
                  setHoveredGroup(group.title);
                  if (!isExpanded) {
                    onSectionHover?.({
                      id: group.title.toLowerCase().replace(/ /g, '-'),
                      name: group.title,
                      summary: groupSummaries[group.title] || 'Click to expand and explore sections'
                    });
                  }
                }}
                onMouseLeave={() => {
                  setHoveredGroup(null);
                  onSectionHover?.(null);
                }}
              >
                {/* 3D Hover Popup Summary for Group - RED BOX */}
                <AnimatePresence>
                  {isGroupHovered && !isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -30, scale: 0.85, rotateY: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1, 
                        rotateY: 0,
                        z: 60
                      }}
                      exit={{ opacity: 0, x: -30, scale: 0.85, rotateY: -20 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.34, 1.56, 0.64, 1],
                        scale: { type: "spring", stiffness: 280, damping: 18 }
                      }}
                      className="hidden lg:block absolute left-full ml-6 top-0 w-80 bg-primary backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-[0_20px_60px_rgba(220,38,38,0.6)] z-[100] pointer-events-none"
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: 800,
                        willChange: 'transform, opacity'
                      }}
                    >
                      {/* Subtle darker red gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-800/20 via-transparent to-transparent rounded-2xl" />
                      
                      {/* Glossy overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl pointer-events-none" />
                      
                      <div className="relative">
                        <h4 className="text-base font-medium text-white mb-3 tracking-wide drop-shadow-lg">{group.title}</h4>
                        <p className="text-sm text-white/95 leading-relaxed">
                          {groupSummaries[group.title]}
                        </p>
                        <div className="mt-4 flex items-center text-xs text-white font-medium">
                          <span>Click to expand</span>
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                      
                      {/* 3D Arrow pointer - RED */}
                      <div className="absolute right-full top-8 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-primary" 
                           style={{ filter: 'drop-shadow(-2px 0 4px rgba(220,38,38,0.4))' }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glass Container with 3D Transform */}
                <motion.div
                  className={`relative transition-all duration-500 border shadow-lg rounded-2xl ${
                    isExpanded 
                      ? 'bg-white/30 backdrop-blur-lg border-white/40 shadow-2xl shadow-black/10' 
                      : 'bg-white/15 backdrop-blur-sm border-white/20 shadow-lg shadow-black/5'
                  }`}
                  animate={{ 
                    scale: isExpanded ? 1.02 : isGroupHovered ? 1.01 : 1,
                    rotateX: isGroupHovered && !isExpanded ? 2 : 0,
                    rotateY: isGroupHovered && !isExpanded ? 2 : 0,
                    z: isGroupHovered ? 20 : 0,
                    boxShadow: isExpanded 
                      ? '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)' 
                      : isGroupHovered
                      ? '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.15)'
                      : '0 10px 25px rgba(0,0,0,0.05)'
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 800,
                    willChange: 'transform'
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none rounded-2xl"
                    animate={{ 
                      opacity: isExpanded ? 1 : isGroupHovered ? 0.8 : 0.5,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Section Header Button */}
                  <motion.button
                    onClick={() => toggleSection(group.title)}
                    className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-t-2xl relative z-10"
                    whileHover={{ 
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      scale: 1.005,
                    }}
                    whileTap={{ scale: 0.995 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{ 
                            rotate: isExpanded ? 90 : 0,
                            scale: isExpanded ? 1.1 : isGroupHovered ? 1.05 : 1 
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="text-primary"
                        >
                          {isExpanded ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </motion.div>
                        
                        <motion.h3 
                          className="text-xs font-medium text-primary uppercase tracking-wider"
                          animate={{ 
                            textShadow: isExpanded || isGroupHovered ? '0 0 10px rgba(220,38,38,0.3)' : 'none'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {group.title}
                        </motion.h3>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          rotate: isExpanded ? 180 : 0,
                          scale: isExpanded ? 1.2 : isGroupHovered ? 1.1 : 1 
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-primary/70"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* Collapsible Content */}
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ 
                          height: 0, 
                          opacity: 0,
                          backdropFilter: 'blur(0px)',
                        }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          backdropFilter: 'blur(16px)',
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          backdropFilter: 'blur(0px)',
                        }}
                        transition={{ 
                          duration: 0.5, 
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden relative"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="p-3 pt-0 space-y-2 relative z-10"
                        >
                          {group.sections.map((section, sectionIndex) => {
                            const isSectionHovered = hoveredSection === section.id;
                            
                            return (
                              <motion.div
                                key={section.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: sectionIndex * 0.05 + 0.15,
                                  ease: "easeOut"
                                }}
                                className="relative"
                                onMouseEnter={() => {
                                  setHoveredSection(section.id);
                                  onSectionHover?.({
                                    id: section.id,
                                    name: section.name,
                                    summary: sectionSummaries[section.id] || 'Click to view details'
                                  });
                                }}
                                onMouseLeave={() => {
                                  setHoveredSection(null);
                                  onSectionHover?.(null);
                                }}
                              >
                                {/* 3D Hover Popup Summary for Section Item - RED BOX */}
                                <AnimatePresence>
                                  {isSectionHovered && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -25, scale: 0.9, rotateY: -15 }}
                                      animate={{ 
                                        opacity: 1, 
                                        x: 0, 
                                        scale: 1, 
                                        rotateY: 0,
                                        z: 50
                                      }}
                                      exit={{ opacity: 0, x: -25, scale: 0.9, rotateY: -15 }}
                                      transition={{ 
                                        duration: 0.4, 
                                        ease: [0.34, 1.56, 0.64, 1],
                                        scale: { type: "spring", stiffness: 300, damping: 20 }
                                      }}
                                      className="hidden lg:block absolute left-full ml-6 top-0 w-72 bg-primary backdrop-blur-2xl border border-white/30 rounded-xl p-4 shadow-[0_15px_45px_rgba(220,38,38,0.5)] z-[100] pointer-events-none"
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
                                        <div className="flex items-center space-x-2 mb-2">
                                          <span className="text-white">{section.icon}</span>
                                          <h5 className="text-sm font-medium text-white drop-shadow-lg">{section.name}</h5>
                                        </div>
                                        <p className="text-xs text-white/95 leading-relaxed">
                                          {sectionSummaries[section.id] || 'Click to view details'}
                                        </p>
                                      </div>
                                      
                                      {/* 3D Arrow pointer - RED */}
                                      <div className="absolute right-full top-5 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-primary"
                                           style={{ filter: 'drop-shadow(-2px 0 3px rgba(220,38,38,0.4))' }} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <motion.div
                                  whileHover={{ 
                                    x: 8, 
                                    scale: 1.03,
                                    rotateY: 3,
                                    z: 15,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                  }}
                                  style={{
                                    transformStyle: 'preserve-3d',
                                  }}
                                >
                                  <Button
                                    variant="ghost"
                                    className={`w-full justify-start h-auto p-3 text-left transition-all duration-300 rounded-xl relative overflow-hidden ${
                                      activeSection === section.id
                                        ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm'
                                        : 'hover:bg-white/40 text-muted-foreground hover:text-foreground backdrop-blur-sm border border-transparent hover:border-white/30'
                                    }`}
                                    onClick={() => onSectionChange(section.id)}
                                  >
                                    {/* Shine effect */}
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                      initial={{ x: '-100%' }}
                                      whileHover={{ x: '100%' }}
                                      transition={{ duration: 0.6 }}
                                    />
                                    
                                    <div className="flex items-center justify-between w-full relative z-10">
                                      <div className="flex items-center space-x-3">
                                        <motion.span 
                                          className={activeSection === section.id ? 'text-white' : 'text-primary'}
                                          whileHover={{ scale: 1.15, rotate: 5 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          {section.icon}
                                        </motion.span>
                                        <span className="text-sm">{section.name}</span>
                                      </div>
                                      <motion.div
                                        animate={{ 
                                          rotate: activeSection === section.id ? 90 : 0,
                                          scale: activeSection === section.id ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <ChevronRight className={`w-3 h-3 transition-colors duration-300 ${
                                          activeSection === section.id ? 'text-white' : 'text-muted-foreground'
                                        }`} />
                                      </motion.div>
                                    </div>
                                  </Button>
                                </motion.div>
                              </motion.div>
                            );
                          })}
                        </motion.div>

                        {/* Bottom gradient fade */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
