import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { SHOWCASE_VIDEO } from "@/config/constants";

const VideoShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.3,
  });

  return (
    <section
      ref={targetRef as React.RefObject<HTMLElement>}
      className="relative w-full h-screen bg-black"
      aria-label="Video showreel"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {hasIntersected ? (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            )}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${SHOWCASE_VIDEO.id}?autoplay=1&mute=1&loop=1&playlist=${SHOWCASE_VIDEO.id}&controls=1&modestbranding=1&rel=0`}
              title={SHOWCASE_VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div
              className="w-20 h-20 mx-auto mb-4 border-2 border-primary rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                className="w-8 h-8 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-muted-foreground" role="status">
              Video Showreel
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoShowcase;
