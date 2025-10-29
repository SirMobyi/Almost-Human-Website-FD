import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import amazonLogo from "@/assets/logos/amazon.png";
import hotstarLogo from "@/assets/logos/hotstar.png";
import philipsLogo from "@/assets/logos/philips.png";
import tataLogo from "@/assets/logos/tata.png";
import myntraLogo from "@/assets/logos/myntra.png";
import credLogo from "@/assets/logos/cred.png";
import irctcLogo from "@/assets/logos/irctc.png";
import rapidoLogo from "@/assets/logos/rapido.png";
import jeevansathiLogo from "@/assets/logos/jeevansathi.png";

const clients = [
  { name: "Amazon", logo: amazonLogo },
  { name: "JioHotstar", logo: hotstarLogo },
  { name: "Philips", logo: philipsLogo },
  { name: "Tata", logo: tataLogo },
  { name: "Myntra", logo: myntraLogo },
  { name: "CRED", logo: credLogo },
  { name: "IRCTC", logo: irctcLogo },
  { name: "Rapido", logo: rapidoLogo },
  { name: "Jeevansathi", logo: jeevansathiLogo },
];

const ClientShowcase = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section
      ref={targetRef as React.RefObject<HTMLElement>}
      className={`py-16 px-6 bg-background transition-opacity duration-700 ${
        hasIntersected ? "animate-fade-in" : "opacity-0"
      }`}
      aria-label="Client showcase"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Trusted by Leading Brands
        </h2>

        <div
          className="relative overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-12 ${
              isPaused ? "[animation-play-state:paused]" : ""
            }`}
            style={{
              animation: "scroll 30s linear infinite",
              width: "fit-content",
            }}
          >
            {/* First set */}
            {clients.map((client) => (
              <div
                key={`${client.name}-1`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:z-10"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clients.map((client) => (
              <div
                key={`${client.name}-2`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:z-10"
                aria-hidden="true"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ClientShowcase;
