// components/Header.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["home", "services", "tech", "testimonials", "contact"];

const Header: React.FC = React.memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // lightweight scroll spy (optional) — could be moved to a hook
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems;
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl text-gray-900 shadow-2xl shadow-blue-900/50 justify-around"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center ">
        <img
          src="/images/nextratech-logo.png"
          alt="Logo"
          className="h-20 w-100 object-cover relative z-10"
          style={{ background: "transparent" }}
        />

        <nav className="hidden lg:flex gap-10 text-lg font-medium ml-70">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative transition-colors text-black hover:text-violet-600`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              {activeSection === item && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-[5px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                />
              )}
            </motion.a>
          ))}
        </nav>

        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-blue-900/50 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <motion.a 
                  key={item} 
                  href={`#${item}`} 
                  onClick={() => setMobileMenuOpen(false)} 
                  whileHover={{ x: 10 }} 
                  className="text-slate-300 hover:text-white transition-colors py-2 border-l-2 border-transparent hover:border-violet-500 pl-4"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

export default Header;