import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PERSONAL_PROJECTS_VIDEOS } from "@/config/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const PersonalProjectsSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { targetRef, hasIntersected } = useIntersectionObserver();
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setPlayingVideo(null); // Stop playing video when carousel changes
    });
  }, [api]);

  const handleVideoHover = (index: number, isHovering: boolean) => {
    if (isHovering) {
      autoplayPlugin.current.stop();
      setPlayingVideo(index);
    } else {
      setPlayingVideo(null);
      autoplayPlugin.current.play();
    }
  };

  return (
    <section
      id="personal-projects"
      ref={targetRef as React.RefObject<HTMLElement>}
      className="pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 gradient-vintage"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-transparent p-4 sm:p-6 md:p-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              From the lab
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
                containScroll: false,
              }}
            >
              <CarouselContent className="-ml-4">
                {PERSONAL_PROJECTS_VIDEOS.map((video, index) => (
                  <CarouselItem
                    key={video.id}
                    className="pl-4 basis-[85%] md:basis-[90%]"
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                  >
                    <div className="group">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-3">
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
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all">
                              <svg
                                className="w-16 h-16 md:w-20 md:h-20 text-white hover:text-primary transition-all hover:scale-110 drop-shadow-lg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-just-sans">{video.title}</h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {PERSONAL_PROJECTS_VIDEOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
