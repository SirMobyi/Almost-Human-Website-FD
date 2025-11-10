import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { WORK_VIDEOS } from "@/config/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const WorkSection = () => {
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

  const handleVideoClick = (index: number) => {
    setPlayingVideo(index);
    autoplayPlugin.current.stop();
    // Prevent carousel from dragging when video is playing
    if (api) {
      api.on('pointerDown', (emblaApi) => {
        if (playingVideo !== null) {
          emblaApi.reInit({ watchDrag: false });
        }
      });
    }
  };

  const handleMouseEnter = () => {
    autoplayPlugin.current.stop();
  };

  const handleMouseLeave = () => {
    if (playingVideo === null) {
      autoplayPlugin.current.play();
    }
  };

  return (
    <section
      id="work"
      ref={targetRef as React.RefObject<HTMLElement>}
      className="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8 gradient-vintage"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-transparent p-4 sm:p-6 md:p-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Not Another<br className="sm:hidden" /> AI Studio
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              We don't chase trends. We chase emotion. AlmostHuman is built by creators who believe AI shouldn't replace creativity; <span className="whitespace-nowrap">it should amplify it.</span>
            </p>
          </div>

          {/* Carousel */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Carousel
              setApi={setApi}
              plugins={[autoplayPlugin.current]}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
                containScroll: false,
                watchDrag: playingVideo === null,
              }}
            >
              <CarouselContent className="-ml-4">
                {WORK_VIDEOS.map((video, index) => (
                  <CarouselItem
                    key={video.id}
                    className={`pl-4 basis-[85%] md:basis-[90%] ${playingVideo === index ? 'pointer-events-auto' : ''}`}
                  >
                    <div className="group">
                      <div className={`aspect-video bg-black rounded-lg overflow-hidden relative mb-3 ${playingVideo === index ? 'z-50' : ''}`}>
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
                              onClick={() => handleVideoClick(index)}
                              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all cursor-pointer group"
                              aria-label={`Play ${video.title}`}
                            >
                              <svg
                                className="w-16 h-16 md:w-20 md:h-20 text-white group-hover:text-primary transition-all group-hover:scale-110 drop-shadow-lg"
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
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-just-sans">{video.title}</h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {WORK_VIDEOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-6 w-6 rounded-full transition-all flex items-center justify-center ${
                    index === current
                      ? "bg-primary"
                      : "bg-transparent hover:bg-muted-foreground/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`rounded-full transition-all ${
                    index === current ? "h-3 w-10 bg-primary" : "h-3 w-3 bg-muted-foreground/40"
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
