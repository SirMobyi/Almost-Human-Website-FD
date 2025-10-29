import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';

const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary z-50 origin-left shadow-lg shadow-primary/20"
      style={{ scaleX: progress / 100 }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default ScrollProgressBar;
