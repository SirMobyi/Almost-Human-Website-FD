import { useState, useEffect, useRef } from "react";
import { WORK_VIDEOS } from "@/config/constants";

const WorkSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group videos into pairs for carousel slides
  const videoSlides = [];
  for (let i = 0; i < WORK_VIDEOS.length; i += 2) {
    if (i + 1 < WORK_VIDEOS.length) {
      videoSlides.push([WORK_VIDEOS[i], WORK_VIDEOS[i + 1]]);
    } else {
      videoSlides.push([WORK_VIDEOS[i]]);
    }
  }

  // Track active slide based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const slideHeight = container.clientHeight;
      const currentSlide = Math.round(scrollPosition / slideHeight);
      setActiveSlide(currentSlide);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="work"
      className="relative min-h-screen gradient-vintage"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header - Fixed at top */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-12 pb-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Not Another<br className="sm:hidden" /> AI Studio
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              We don't chase trends. We chase emotion. AlmostHuman is built by creators who believe AI shouldn't replace creativity; <span className="whitespace-nowrap">it should amplify it.</span>
            </p>
          </div>
        </div>

        {/* Scroll Progress Dots */}
        <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 flex flex-col gap-3">
          {videoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollTo({
                    top: index * container.clientHeight,
                    behavior: "smooth",
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "bg-primary scale-150"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scrollable Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth pt-48 md:pt-56"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            .scroll-container::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {videoSlides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="h-screen snap-start snap-always flex items-center justify-center px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-7xl w-full">
                <div
                  className={`grid gap-4 md:gap-6 ${
                    slide.length === 1
                      ? "grid-cols-1 max-w-3xl mx-auto"
                      : "grid-cols-1 lg:grid-cols-2"
                  }`}
                >
                  {slide.map((video) => {
                    const videoIndex = WORK_VIDEOS.findIndex((v) => v.id === video.id);
                    return (
                      <div key={video.id} className="group">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative mb-3">
                          {playingVideo === videoIndex ? (
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
                                onClick={() => setPlayingVideo(videoIndex)}
                                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all"
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
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-just-sans">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for smooth ending */}
          <div className="h-32" />
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
