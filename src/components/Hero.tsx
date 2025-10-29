import heroBg from "@/assets/hero-bg.png";
import { useParallax } from "@/hooks/useParallax";

const Hero = () => {
  const parallaxOffset = useParallax(0.5);

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image with parallax overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        >
          <img
            src={heroBg}
            alt="Cinematic grainy gradient background in purple and black tones"
            className="w-full h-[120vh] object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight">
          ALMOSTHUMAN
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-4xl mx-auto">
          Making AI films feel human
        </p>
      </div>

    </header>
  );
};

export default Hero;
