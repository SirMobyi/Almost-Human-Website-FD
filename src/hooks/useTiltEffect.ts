import { useState, useRef, useEffect, RefObject } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export const useTiltEffect = <T extends HTMLElement>(maxTilt: number = 15): [RefObject<T>, TiltState, (e: React.MouseEvent<T>) => void, () => void] => {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });
  const boundsRef = useRef({ left: 0, top: 0, centerX: 0, centerY: 0 });

  // Cache bounds on mount and updates
  useEffect(() => {
    if (!ref.current) return;

    const updateBounds = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        boundsRef.current = {
          left: rect.left,
          top: rect.top,
          centerX: rect.width / 2,
          centerY: rect.height / 2,
        };
      }
    };

    updateBounds();

    // Update on resize
    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(ref.current);

    // Update on scroll (debounced via RAF)
    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateBounds();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<T>) => {
    if (!ref.current) return;

    // Use cached bounds to avoid forced reflow
    const { left, top, centerX, centerY } = boundsRef.current;
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ rotateX, rotateY, scale: 1.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return [ref, tilt, handleMouseMove, handleMouseLeave];
};
