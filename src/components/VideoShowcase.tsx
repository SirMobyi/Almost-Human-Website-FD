import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { SHOWCASE_VIDEO } from "@/config/constants";
import { Play } from "lucide-react";

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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
        {hasIntersected && isPlaying ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${SHOWCASE_VIDEO.id}?autoplay=1&mute=1&loop=1&playlist=${SHOWCASE_VIDEO.id}&controls=1&modestbranding=1&rel=0`}
            title={SHOWCASE_VIDEO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="group relative w-full h-full flex items-center justify-center cursor-pointer"
            aria-label="Play video showreel"
          >
            {/* YouTube thumbnail as background */}
            <img
              src={`https://img.youtube.com/vi/${SHOWCASE_VIDEO.id}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="relative z-10 text-center animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/90 group-hover:bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </div>
              <p className="text-white font-medium text-lg">
                Watch Showreel
              </p>
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoShowcase;
