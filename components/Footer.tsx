import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Mail, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const links = [
    {
      name: 'ResearcherID',
      href: 'http://www.researcherid.com/rid/F-3051-2011',
      icon: <ExternalLink className="w-4 h-4" />
    },
    {
      name: 'Scopus Profile',
      href: 'http://www.scopus.com/authid/detail.url?authorId=36088700700',
      icon: <ExternalLink className="w-4 h-4" />
    },
    {
      name: 'Personal Homepage',
      href: 'https://noorzaman.com/profile/',
      icon: <ExternalLink className="w-4 h-4" />
      },
      {
        name: 'ResearchGate',
        href: 'https://www.researchgate.net/profile/Noor-Jhanjhi?ev=hdr_xprf',
        icon: <ExternalLink className="w-4 h-4" />
      }
    ];

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:noorzaman.jhanjhi@taylors.edu.my,profjhanjhi@gmail.com',
      icon: <Mail className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/noorzaman/',
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: 'ResearchGate',
        href: 'https://www.researchgate.net/profile/Noor-Jhanjhi?ev=hdr_xprf',
      icon: <ExternalLink className="w-5 h-5" />
    }
  ];

  return (
    <footer ref={ref} className="bg-accent/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1] // Apple's cubic bezier
          }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Left Column - About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-[rgba(38,217,220,0)] rounded-sm flex items-center justify-center">
                <img src="/assets/image/logo.png" alt="Taylor's University" className="w-14 h-14 object-contain rounded-[19px] p-[0px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-foreground">Professor Dr. Noor Zaman Jhanjhi</span>
                <span className="text-sm text-muted-foreground">Taylor's University</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Leading researcher in AI, cybersecurity, IoT security, and wireless networks. 
              World's Top 2% Scientist for 2022, 2023, 2024, and 2025.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-muted-foreground hover:text-primary border border-border"
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Academic Profiles</h3>
            
            <div className="space-y-3">
              {links.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    variant="ghost"
                    className="justify-start w-full h-auto p-3 text-left hover:bg-white hover:shadow-sm border border-transparent hover:border-border"
                    asChild
                  >
                    <a href={link.href} className="flex items-center space-x-3">
                      <span className="text-primary">{link.icon}</span>
                      <span className="text-foreground">{link.name}</span>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Designed by section */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                Designed by
                <motion.a
                  href="https://www.linkedin.com/in/abdullah-al-mahdi-rafid-094418259"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-primary hover:underline font-medium"
                >
                  ABDULLAH AL MAHDI RAFID
                </motion.a>
                and
                <motion.a
                  href="https://www.linkedin.com/in/yasheer-sumun-33a2a82b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-primary hover:underline font-medium"
                >
                  YASHEER SUMUN
                </motion.a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025-2026 Professor Dr. Noor Zaman Jhanjhi - Taylor's University. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}