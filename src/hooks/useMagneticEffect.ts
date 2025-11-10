import { useState, useEffect, useRef, RefObject } from 'react';

export const useMagneticEffect = <T extends HTMLElement>(strength: number = 0.3): [RefObject<T>, { x: number; y: number }] => {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const boundsRef = useRef({ centerX: 0, centerY: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Cache bounds to avoid forced reflow on every mousemove
    const updateBounds = () => {
      const rect = element.getBoundingClientRect();
      boundsRef.current = {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    };

    updateBounds();

    const handleMouseMove = (e: MouseEvent) => {
      const { centerX, centerY } = boundsRef.current;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    // Update bounds on resize
    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(element);

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return [ref, position];
};
