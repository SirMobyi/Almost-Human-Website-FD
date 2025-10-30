import { useState, useRef, RefObject } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export const useTiltEffect = <T extends HTMLElement>(maxTilt: number = 15): [RefObject<T>, TiltState, (e: React.MouseEvent<T>) => void, () => void] => {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<T>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ rotateX, rotateY, scale: 1.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return [ref, tilt, handleMouseMove, handleMouseLeave];
};
