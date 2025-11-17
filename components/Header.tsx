import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
const taylorsLogo = "https://seeds.taylors.edu.my/img/taylors-logo-latest.png?1553524119";

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Header({
  activeSection,
  onSectionChange,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const navigation = [
    { name: "About Me", id: "personal-details" },
    { name: "Research Awards", id: "awards" },
    { name: "Contact Me", id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-3xl border-b border-white/40 z-50 shadow-lg shadow-primary/10"
    >
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        <div className="flex justify-between items-center py-4">
          {/* University Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center -ml-2 sm:-ml-1"
          >
            <div className="flex items-center">
              <img
                src={taylorsLogo}
                alt="Taylor's University"
                className="h-12 w-auto object-contain rounded-[0px]"
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 bg-white/30 backdrop-blur-lg rounded-2xl p-1 border border-white/20 shadow-lg shadow-black/5">
            {navigation.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSectionChange(item.id)}
                className={`px-3.5 py-1.5 text-sm rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-primary hover:bg-white/50 backdrop-blur-sm"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
          >
            {isMobileMenuOpen ? (
              <X size={17} />
            ) : (
              <Menu size={17} />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-white/20 mt-4 pt-4 bg-white/30 backdrop-blur-lg rounded-2xl mx-4 -mb-2"
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              {navigation.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-primary hover:bg-white/50 backdrop-blur-sm"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}