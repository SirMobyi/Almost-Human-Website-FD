import { useMousePosition } from '@/hooks/useMousePosition';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsHidden(true);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, [role="button"]');
      setIsPointer(!!isClickable);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    if (isHidden) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    style.setAttribute('data-cursor-style', 'true');
    document.head.appendChild(style);
    
    return () => {
      document.body.style.cursor = '';
      const existingStyle = document.querySelector('[data-cursor-style]');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Arrow pointer with gradient and glow */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] cursor-glow cursor-custom will-change-transform"
        style={{ 
          clipPath: 'polygon(0 0, 100% 50%, 0 100%, 15% 50%)',
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)',
          display: 'block',
          visibility: 'visible',
        }}
        animate={{
          x: x - 2.5,
          y: y - 2.5,
          scale: isPointer ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 400,
          mass: 0.5,
        }}
      />
      
      {/* Glow orb */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] will-change-transform ${isPointer ? 'cursor-glow-intense' : 'cursor-glow'}`}
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)',
          display: 'block',
          visibility: 'visible',
        }}
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isPointer ? 1.8 : 1.2,
          opacity: isPointer ? 0.9 : 0.6,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      />
      
      {/* Secondary glow layer for depth */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9997] will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 80%)',
          display: 'block',
          visibility: 'visible',
        }}
        animate={{
          x: x - 24,
          y: y - 24,
          scale: isPointer ? 2 : 1.5,
          opacity: isPointer ? 0.8 : 0.4,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 250,
        }}
      />
      
      {/* Trail dots */}
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996] opacity-30"
          style={{ 
            width: 6 - i * 2,
            height: 6 - i * 2,
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%)',
            display: 'block',
            visibility: 'visible',
          }}
          animate={{
            x: x - 3 - i * 2,
            y: y - 3 - i * 2,
          }}
          transition={{
            type: 'spring',
            damping: 25 + i * 15,
            stiffness: 300 - i * 80,
            mass: 0.5 + i * 0.3,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
