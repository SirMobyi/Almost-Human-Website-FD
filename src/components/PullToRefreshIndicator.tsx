import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  threshold?: number;
}

const PullToRefreshIndicator = ({
  pullDistance,
  isRefreshing,
  threshold = 80,
}: PullToRefreshIndicatorProps) => {
  const opacity = Math.min(pullDistance / threshold, 1);
  const scale = Math.min(pullDistance / threshold, 1);

  if (pullDistance === 0 && !isRefreshing) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 flex items-center justify-center h-20 z-50"
      style={{ y: Math.min(pullDistance, threshold) }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={{ opacity, scale }}
        className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border"
      >
        <Loader2
          className={`w-5 h-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`}
        />
        <span className="text-sm text-muted-foreground">
          {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default PullToRefreshIndicator;
