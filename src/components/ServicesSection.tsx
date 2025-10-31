import { useState } from "react";
import { Film, Clapperboard, Smartphone, Users, Globe, Sparkles, ChevronDown } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    title: "AI Films & Commercials",
    description: "Cinematic stories and branded films that look human, feel emotional, and spread fast. Each frame powered by AI, every emotion shaped by instinct.",
    icon: Film,
  },
  {
    title: "AI Animation & Visual Storytelling",
    description: "From surreal motion to hyperreal visuals, we merge technology and art to build stunning narratives that stay with you.",
    icon: Clapperboard,
  },
  {
    title: "Social Media & Format Content",
    description: "Cultural content built for the feed. AI-crafted short videos, narrative reels, and format-based IPs engineered for attention.",
    icon: Smartphone,
  },
  {
    title: "Character Design & Avatars",
    description: "Digital beings with soul. From photoreal humans to stylized hybrids, we design avatars that express, move, and speak for your brand.",
    icon: Users,
  },
  {
    title: "World-Building & Lore Creation",
    description: "We architect universes. Every color, sound, and story connected through a coherent world system built to evolve and expand.",
    icon: Globe,
  },
  {
    title: "Experimental & IP Projects",
    description: "Where art meets algorithms. We create experimental visuals, AI explorations, and scalable narrative IPs that redefine creative frontiers.",
    icon: Sparkles,
  },
];

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-3 sm:mb-4 animate-fade-in">
            Made by Almost Human
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground mb-8 sm:mb-12 md:mb-16 text-balance">
            We are a next-gen creative studio that blends emotion, design, and AI to craft stories that feel alive.
            From films and characters to full-scale digital worlds, we build experiences that move hearts and pixels alike.
          </p>

          <div className="space-y-4 md:space-y-6" role="list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={index}
                  className="border border-border rounded-lg overflow-hidden backdrop-blur-sm bg-card/50 hover:border-primary/50 transition-all duration-300 hover-glow group"
                  role="listitem"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => toggleService(index)}
                    className="w-full p-6 sm:p-8 md:p-10 lg:p-12 flex justify-between items-center text-left hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-expanded={expandedIndex === index}
                    aria-controls={`service-content-${index}`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div className={`p-2 sm:p-3 rounded-lg bg-gradient-blue transition-all duration-300 ${
                        expandedIndex === index ? 'scale-110 rotate-3' : ''
                      }`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-balance">{service.title}</h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-4 transition-transform duration-300 ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`service-content-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    role="region"
                    aria-labelledby={`service-title-${index}`}
                  >
                    <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-3 md:px-10 md:pb-10 md:pt-4 lg:px-12 lg:pb-12 lg:pt-5 bg-gradient-to-br from-primary/10 to-accent/5">
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-balance animate-fade-in">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
