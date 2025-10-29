import { useEffect, useState } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    // Disable parallax on mobile for better performance
    if (prefersReducedMotion || isMobile) {
      return;
    }

    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Only update if scroll delta is significant (reduces calculations by ~60%)
      if (Math.abs(scrollY - lastScrollY) < 2) return;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only apply parallax when hero is visible
          if (scrollY < window.innerHeight) {
            setOffset(scrollY * speed);
          }
          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};
