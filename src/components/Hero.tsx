import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroBg}
          alt="Cinematic grainy gradient background in purple and black tones"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          ALMOSTHUMAN
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
          Making AI films feel human
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
