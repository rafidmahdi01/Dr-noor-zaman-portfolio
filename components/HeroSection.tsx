import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Cloud, Lock, Network, Layers, Smartphone, Radio, ShieldAlert } from 'lucide-react';
import professorImg from '../src/assets/image/professor.jpg';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Enhanced Apple-style parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.6, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="pt-24 pb-16 bg-gradient-to-b from-accent/30 to-white lg:pl-4 relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/50 to-primary/30 backdrop-blur-3xl"
        style={{ filter: `blur(${blur}px)` }}
      ></motion.div>
      <motion.div 
        style={{ y, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center px-[-11px py-[0px]] p-[0px] mt-20">
          {/* Text Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] // Apple's cubic-bezier
            }}
            className="space-y-6"
          >
            <div className="space-y-6 p-[0px] mt-[0px] mr-[0px] mb-[28px] ml-[0px]">
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.2,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-center lg:text-left"
              >
                <h2 className="text-2xl text-primary font-medium mb-4">Curriculum Vitae</h2>
              </motion.div>
              
              <motion.h1
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-4xl lg:text-5xl font-medium text-foreground leading-tight"
              >
                Professor Dr. Noor Zaman
                <span className="text-primary block">Jhanjhi</span>
              </motion.h1>
              
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.5,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="space-y-2"
              >
                <p className="text-xl text-foreground font-medium">Professor</p>
                <p className="text-lg text-muted-foreground">School of Computer Science</p>
                <p className="text-lg text-muted-foreground">Faculty of Innovation & Technology</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.7,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="space-y-6"
            >
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Extension: 5277</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-primary">noorzaman.jhanjhi@taylors.edu.my</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Shield className="w-4 h-4" />
                    Security Protocols
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Cloud className="w-4 h-4" />
                    Cloud Computing
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Lock className="w-4 h-4" />
                    Data Security
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Network className="w-4 h-4" />
                    Ad-Hoc Computing
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Layers className="w-4 h-4" />
                    Middleware Technology
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile Computing
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <Radio className="w-4 h-4" />
                    Pervasive Computing
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-lg text-primary text-sm border border-white/30 rounded-xl shadow-lg shadow-black/5"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Intrusion Detection System
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Profile Image */}
          <motion.div
            initial={{ x: 60, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={ { 
              duration: 0.8, 
              delay: 0.4, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -12, rotateY: 5 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
              className="relative"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30">
                <img
                  src={professorImg}
                  alt="Professor Dr. Noor Zaman Jhanjhi"
                  className="w-72 h-80 object-cover rounded-2xl"
                />
                </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}