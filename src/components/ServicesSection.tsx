import { useState } from "react";
import { Film, Clapperboard, Music, Sparkles, ChevronDown } from "lucide-react";

interface Service {
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

const services: Service[] = [
  {
    title: "AI Commercials",
    description: "Cinematic brand commercials crafted to go viral.",
    icon: Film,
    deliverables: [
      "Concept Brief",
      "Pre-Execution Doc",
      "AI-Generated Production",
      "Social & Platform-Ready Edits",
    ],
  },
  {
    title: "AI Films",
    description: "Films to make your brand unforgettable.",
    icon: Clapperboard,
    deliverables: [
      "Content Strategy",
      "AI Character & Scene Creation",
      "AI Cinematic Production",
      "Editing & Color Finishing",
    ],
  },
  {
    title: "AI Music Videos",
    description: "Stunning music videos powered by AI technology.",
    icon: Music,
    deliverables: [
      "Video Concept",
      "AI Visual & Motion Design",
      "Dynamic Editing",
      "Optimized Cuts for Multiple Platforms",
    ],
  },
  {
    title: "Miscellaneous",
    description: "Experimental creatives, visual tests, and creative projects.",
    icon: Sparkles,
    deliverables: [
      "Digital Avatars",
      "Branded IPs",
      "Concept Visualization",
      "R&D and Consulting",
    ],
  },
];

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-4 sm:p-8 lg:p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-3 sm:mb-4 animate-fade-in">
            What Do We Do
          </h2>
          <p className="text-center text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 md:mb-16">
            Our range of services includes-
          </p>

          <div className="space-y-4" role="list">
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
                    className="w-full px-4 py-4 sm:px-6 sm:py-6 flex justify-between items-center text-left hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
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
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{service.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground text-balance">{service.description}</p>
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
                    <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 bg-gradient-to-br from-primary/10 to-accent/5">
                      <h4 className="text-base sm:text-lg font-semibold mb-3 text-gradient">Deliverables:</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, i) => (
                          <li 
                            key={i} 
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: `${i * 0.05}s` }}
                          >
                            <span className="text-primary mt-1" aria-hidden="true">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
