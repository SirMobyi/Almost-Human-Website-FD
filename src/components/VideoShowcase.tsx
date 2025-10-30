import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import showcaseReel from "@/assets/showcase-reel.mp4";
import showcasePoster from "@/assets/showcase-poster.jpg";

const VideoShowcase = () => {
  const isMobile = useIsMobile();
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: isMobile ? 0.1 : 0.3,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (hasIntersected && videoRef.current && !prefersReducedMotion) {
      videoRef.current.play().catch(err => {
        console.log("Video autoplay failed:", err);
      });
    }
  }, [hasIntersected, prefersReducedMotion]);

  return (
    <section
      ref={targetRef as React.RefObject<HTMLElement>}
      className="relative w-full h-screen bg-black"
      aria-label="Video showreel"
    >
      <div className="absolute inset-0">
        {hasIntersected && (
          <>
            <video
              ref={videoRef}
              src={showcaseReel}
              poster={showcasePoster}
              className="w-full h-full object-cover"
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="AlmostHuman Showreel Video"
              onLoadedData={() => setIsLoading(false)}
              onCanPlayThrough={() => setIsLoading(false)}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
            />
            {(isLoading || isBuffering) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                  <p className="text-sm text-muted-foreground">Loading video...</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VideoShowcase;
