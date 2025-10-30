import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { WORK_VIDEOS } from "@/config/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver();
  
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => nextSlide(),
    onSwipeRight: () => prevSlide(),
  }) as React.RefObject<HTMLDivElement>;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % WORK_VIDEOS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + WORK_VIDEOS.length) % WORK_VIDEOS.length);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80; // Account for fixed header
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-scroll carousel every 5 seconds (pause on hover)
  useEffect(() => {
    if (isHovering) return; // Don't auto-scroll when hovering
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering]);

  const currentVideo = WORK_VIDEOS[currentIndex];

  return (
    <section
      id="work"
      ref={targetRef as React.RefObject<HTMLElement>}
      className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Not Another<br className="sm:hidden" /> AI Studio
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              We don't chase trends. We chase emotion. AlmostHuman is built by creators who believe AI shouldn't replace creativity; <span className="whitespace-nowrap">it should amplify it.</span>
            </p>
          </div>

          {/* Video Carousel */}
          <div 
            ref={swipeRef}
            className="relative max-w-5xl mx-auto mb-12 touch-pan-y"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              {hasIntersected ? (
                <>
                  <iframe
                    className="w-full h-full"
                    src={`https://drive.google.com/file/d/${currentVideo.id}/preview?autoplay=1`}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-20 h-20 border-2 border-primary rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>


            {/* Video Title */}
            <div className="text-center mt-6">
              <h3 className="text-2xl font-semibold">{currentVideo.title}</h3>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8" role="tablist">
              {WORK_VIDEOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentIndex}
                />
              ))}
            </div>

            {/* Navigation Buttons - Centered */}
            <div className="flex justify-center items-center gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={prevSlide}
                className="w-11 h-11 md:w-16 md:h-16
                           bg-background/80 backdrop-blur-md
                           border border-primary/20
                           hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary/70
                           hover:scale-105 hover:shadow-xl hover:shadow-primary/40
                           rounded-full
                           flex items-center justify-center
                           transition-all duration-300
                           shadow-lg shadow-primary/20
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              
              <button
                onClick={nextSlide}
                className="w-11 h-11 md:w-16 md:h-16
                           bg-background/80 backdrop-blur-md
                           border border-primary/20
                           hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary/70
                           hover:scale-105 hover:shadow-xl hover:shadow-primary/40
                           rounded-full
                           flex items-center justify-center
                           transition-all duration-300
                           shadow-lg shadow-primary/20
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Next video"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
