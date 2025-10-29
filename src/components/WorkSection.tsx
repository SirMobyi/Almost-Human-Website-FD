import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { WORK_VIDEOS } from "@/config/constants";

const WorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { targetRef, hasIntersected } = useIntersectionObserver();
  
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => nextSlide(),
    onSwipeRight: () => prevSlide(),
  }) as React.RefObject<HTMLDivElement>;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % WORK_VIDEOS.length);
    setIsLoading(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + WORK_VIDEOS.length) % WORK_VIDEOS.length);
    setIsLoading(true);
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

  const currentVideo = WORK_VIDEOS[currentIndex];

  return (
    <section
      id="work"
      ref={targetRef as React.RefObject<HTMLElement>}
      className={`py-20 px-6 bg-background transition-opacity duration-700 ${
        hasIntersected ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">Not Another AI Studio</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
            We don't chase trends. We chase emotion. AlmostHuman is built by creators who believe AI shouldn't replace creativity; it should amplify it.
          </p>
        </div>

        {/* Video Carousel */}
        <div 
          ref={swipeRef}
          className="relative max-w-5xl mx-auto mb-12 touch-pan-y"
        >
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            {hasIntersected ? (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                  </div>
                )}
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.id}?controls=1&modestbranding=1&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
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

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary hover:bg-primary/10"
            onClick={prevSlide}
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary hover:bg-primary/10"
            onClick={nextSlide}
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Video Title */}
          <div className="text-center mt-6">
            <h3 className="text-2xl font-semibold">{currentVideo.title}</h3>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6" role="tablist">
            {WORK_VIDEOS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsLoading(true);
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
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
          >
            Let's Create Together
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
