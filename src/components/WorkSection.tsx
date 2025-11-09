import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { WORK_VIDEOS } from "@/config/constants";

const WorkSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section
      id="work"
      ref={targetRef as React.RefObject<HTMLElement>}
      className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 gradient-vintage"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-transparent p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Not Another<br className="sm:hidden" /> AI Studio
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              We don't chase trends. We chase emotion. AlmostHuman is built by creators who believe AI shouldn't replace creativity; it should amplify it.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {WORK_VIDEOS.map((video, index) => (
              <div
                key={video.id}
                className="group"
              >
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative mb-4">
                  {playingVideo === index ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://drive.google.com/file/d/${video.id}/preview`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://drive.google.com/thumbnail?id=${video.id}&sz=w1920`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <button
                        onClick={() => setPlayingVideo(index)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all group opacity-0 group-hover:opacity-100"
                        aria-label={`Play ${video.title}`}
                      >
                        <svg
                          className="w-16 h-16 md:w-20 md:h-20 text-white hover:text-primary transition-all hover:scale-110 drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{video.title}</h3>
                  <p className="text-lg md:text-xl text-muted-foreground">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
