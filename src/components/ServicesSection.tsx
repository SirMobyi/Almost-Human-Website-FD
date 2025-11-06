import { useEffect, useRef } from "react";
import filmsImg from "@/assets/services/films.png";
import animationImg from "@/assets/services/animation.png";
import socialImg from "@/assets/services/social.png";
import charactersImg from "@/assets/services/characters.png";
import worldsImg from "@/assets/services/worlds.png";
import experimentalImg from "@/assets/services/experimental.png";

interface Service {
  title: string;
  image: string;
  gridClass: string;
}

const services: Service[] = [
  {
    title: "AI Films & Commercials",
    image: filmsImg,
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "AI Animation & Visual Storytelling",
    image: animationImg,
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Social Media & Format Content",
    image: socialImg,
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Character Design & Avatars",
    image: charactersImg,
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    title: "World-Building",
    image: worldsImg,
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Experimental & IP Projects",
    image: experimentalImg,
    gridClass: "md:col-span-1 md:row-span-1",
  },
];

const ServicesSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return; // Only on mobile
      
      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionBottom = sectionRect.bottom;
      const sectionTop = sectionRect.top;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const offset = 80 + index * 60;
        
        // Only apply stacking when within section bounds
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
          if (rect.top <= offset && rect.top > 0) {
            card.style.transform = `translateY(${offset - rect.top}px)`;
            card.style.opacity = '1';
          } else if (rect.top <= 0) {
            // Card has scrolled past, reduce opacity
            const fadeStart = -100;
            const opacity = Math.max(0, 1 + rect.top / fadeStart);
            card.style.opacity = opacity.toString();
          } else {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
          }
        } else if (sectionBottom <= 0) {
          // Section has scrolled past completely, hide cards
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
        } else {
          // Section hasn't reached yet
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
        }
      });
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16">
          Made by Almost Human
        </h2>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid md:grid-cols-4 md:auto-rows-[250px] gap-4 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.gridClass} group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]`}
            >
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end z-10">
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-balance leading-tight">
                  {service.title}
                </h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-[5]" />
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Mobile Stacking Cards */}
        <div className="md:hidden relative space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="sticky rounded-3xl overflow-hidden backdrop-blur-xl bg-card/30 border border-border/50 shadow-2xl transition-opacity duration-300"
              style={{
                top: `${80 + index * 60}px`,
                zIndex: services.length - index,
              }}
            >
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-balance leading-tight">
                    {service.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-[5]" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
