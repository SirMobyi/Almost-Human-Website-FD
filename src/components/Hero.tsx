import heroBg from "@/assets/hero-bg.png";
import heroBlur from "@/assets/hero-bg-blur.jpg";
import { useParallax } from "@/hooks/useParallax";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useState } from "react";
import GridBackground from "./GridBackground";
import ScrollIndicator from "./ScrollIndicator";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const parallaxOffset = useParallax(0.5);
  const { displayedText } = useTypewriter({ 
    text: "Making AI films feel human", 
    speed: 80, 
    delay: 1000 
  });

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image with parallax overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        >
          {/* Blur placeholder - loads instantly */}
          <img
            src={heroBlur}
            alt=""
            className={`absolute inset-0 w-full h-[110vh] object-cover blur-2xl scale-110 transition-opacity duration-700 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            loading="eager"
            aria-hidden="true"
          />
          {/* Main hero image */}
          <img
            src={heroBg}
            alt="Cinematic grainy gradient background in purple and black tones"
            className={`w-full h-[110vh] object-cover transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.error('Failed to load hero image');
              setImageLoaded(true); // Show blur image as fallback
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <GridBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight text-white">
          ALMOSTHUMAN
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light max-w-4xl mx-auto min-h-[2.5rem] sm:min-h-[3rem]">
          {displayedText}
        </p>
      </div>

      <ScrollIndicator />
    </header>
  );
};

export default Hero;
