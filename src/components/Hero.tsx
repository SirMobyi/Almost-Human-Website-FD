import heroVideo from "@/assets/home-page-video.mp4";
import heroPoster from "@/assets/hero-bg.webp";
import logo from "@/assets/logo.svg";
import { useParallax } from "@/hooks/useParallax";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useState } from "react";
import GridBackground from "./GridBackground";
import ScrollIndicator from "./ScrollIndicator";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const parallaxOffset = useParallax(0.5);
  const { displayedText } = useTypewriter({ 
    text: "Born from emotion, built with AI", 
    speed: 80, 
    delay: 1000 
  });

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background video with parallax overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        >
          <video
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`w-full h-[110vh] object-cover transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(true)}
          />
        </div>
        <GridBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-[90vw] mx-auto animate-fade-in-up">
        <img 
          src={logo} 
          alt="AlmostHuman" 
          fetchPriority="high"
          className="w-[360px] sm:w-[500px] md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] h-auto mx-auto mb-6 sm:mb-6 lg:mb-8"
        />
        <p className="text-lg sm:text-3xl md:text-4xl lg:text-5xl text-white font-light max-w-4xl mx-auto min-h-[2.5rem] sm:min-h-[3.5rem] text-center">
          {displayedText}
        </p>
      </div>

      <ScrollIndicator />
    </header>
  );
};

export default Hero;
