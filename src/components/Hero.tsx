import heroBg from "@/assets/hero-bg.png";
import heroBlur from "@/assets/hero-bg-blur.jpg";
import { useParallax } from "@/hooks/useParallax";
import { useState } from "react";
import GridBackground from "./GridBackground";
import ScrollIndicator from "./ScrollIndicator";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const parallaxOffset = useParallax(0.5);

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
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto h-full flex flex-col justify-between py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Top Section - Two Text Zones */}
        <div className="flex justify-between items-start gap-4 sm:gap-6 md:gap-8 animate-fade-in">
          {/* Left: Italic Serif Supporting Text */}
          <div className="max-w-md">
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 font-normal leading-relaxed tracking-wide">
              Making AI films feel human
            </p>
          </div>
          
          {/* Right: Company Text */}
          <div className="text-right max-w-xs hidden md:block">
            <p className="font-sans text-sm md:text-base lg:text-lg xl:text-xl text-white/80 font-light tracking-widest uppercase">
              A WLDD COMPANY
            </p>
          </div>
        </div>

        {/* Center Section - Hero Text */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black tracking-tighter leading-[0.85] md:leading-none bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
            ALMOSTHUMAN
          </h1>
        </div>

        {/* Mobile Company Text */}
        <div className="text-center md:hidden animate-fade-in">
          <p className="font-sans text-xs sm:text-sm text-white/70 tracking-widest uppercase">
            A WLDD COMPANY
          </p>
        </div>
      </div>

      <ScrollIndicator />
    </header>
  );
};

export default Hero;
