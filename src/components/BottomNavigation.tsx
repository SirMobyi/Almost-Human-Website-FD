import { useScrollDirection } from '@/hooks/useScrollDirection';
import { NAV_LINKS } from '@/config/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Briefcase, Mail, Clapperboard } from 'lucide-react';

const iconMap = {
  work: Clapperboard,
  services: Briefcase,
  contact: Mail,
};

const BottomNavigation = () => {
  const scrollDirection = useScrollDirection();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) => link.href.replace('#', ''));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {scrollDirection === 'up' && (
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/80 backdrop-blur-lg border-t border-border"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <div className="flex items-center justify-around px-4 py-3">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = iconMap[link.id as keyof typeof iconMap];
              
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="flex flex-col items-center gap-1 min-w-[60px] relative"
                  aria-label={link.label}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                  <span
                    className={`text-xs transition-colors ${
                      isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default BottomNavigation;
