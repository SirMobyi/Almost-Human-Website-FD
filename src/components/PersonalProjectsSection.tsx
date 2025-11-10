import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PERSONAL_PROJECTS_VIDEOS } from "@/config/constants";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
const PersonalProjectsSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const {
    targetRef,
    hasIntersected
  } = useIntersectionObserver();
  const autoplayPlugin = useRef(Autoplay({
    delay: 2000,
    stopOnInteraction: false
  }));
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
  return <section id="personal-projects" ref={targetRef as React.RefObject<HTMLElement>} className="pt-3 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 gradient-vintage">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-transparent p-4 sm:p-6 md:p-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">From the studio</h2>
          </div>

          {/* Carousel */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Carousel setApi={setApi} plugins={[autoplayPlugin.current]} className="w-full" opts={{
            align: "center",
            loop: true,
            containScroll: false,
            watchDrag: playingVideo === null
          }}>
              <CarouselContent className="-ml-4">
                {PERSONAL_PROJECTS_VIDEOS.map((video, index) => <CarouselItem key={video.id} className={`pl-4 basis-[85%] md:basis-[90%] ${playingVideo === index ? 'pointer-events-auto' : ''}`}>
                    <div className="group">
                      <div className={`aspect-video bg-black rounded-lg overflow-hidden relative mb-3 ${playingVideo === index ? 'z-50' : ''}`}>
                        {playingVideo === index ? <iframe className="w-full h-full" src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&vq=hd1080`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <>
                            <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
                            <button onClick={() => handleVideoClick(index)} className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group" aria-label={`Play ${video.title}`}>
                              <svg className="w-16 h-16 md:w-20 md:h-20 text-white group-hover:text-primary transition-colors drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </button>
                          </>}
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold font-just-sans">{video.title}</h3>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              
              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8">
                <CarouselPrevious className="relative static translate-y-0 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full bg-background/90 shadow-md border-2 border-border hover:bg-accent hover:border-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6 [&_svg]:stroke-[2.5] [&_svg]:text-foreground" />
                
                <CarouselNext className="relative static translate-y-0 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full bg-background/90 shadow-md border-2 border-border hover:bg-accent hover:border-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6 [&_svg]:stroke-[2.5] [&_svg]:text-foreground" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>;
};
export default PersonalProjectsSection;