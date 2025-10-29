import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Service {
  title: string;
  description: string;
  deliverables: string[];
}

const services: Service[] = [
  {
    title: "AI Commercials",
    description: "Cinematic brand commercials crafted to go viral",
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
    deliverables: [
      "Content Strategy",
      "AI Character & Scene Creation",
      "AI Cinematic Production",
      "Editing & Color Finishing",
    ],
  },
  {
    title: "AI Music Videos",
    description: "Rhythm-driven visually stunning music videos, powered by AI.",
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
    <section id="services" className="py-20 px-6 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 animate-fade-in">
          What Do We Do
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-16">
          Our range of services includes, but isn't limited to,
        </p>

        <div className="space-y-4" role="list">
          {services.map((service, index) => (
            <article
              key={index}
              className="border border-border rounded-lg overflow-hidden backdrop-blur-sm bg-card/50 hover:border-primary/50 transition-all duration-300"
              role="listitem"
            >
              <button
                onClick={() => toggleService(index)}
                className="w-full px-6 py-6 flex justify-between items-center text-left hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-expanded={expandedIndex === index}
                aria-controls={`service-content-${index}`}
              >
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                <ChevronDown
                  className={`w-6 h-6 ml-4 transition-transform duration-300 ${
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
                <div className="px-6 pb-6 pt-2 bg-primary/5">
                  <h4 className="text-lg font-semibold mb-3 text-primary">Deliverables:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-1" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
