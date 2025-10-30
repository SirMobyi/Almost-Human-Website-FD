import { useState, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ClientLogo from "./ClientLogo";
import amazonLogo from "@/assets/logos/amazon.webp";
import hotstarLogo from "@/assets/logos/hotstar.webp";
import philipsLogo from "@/assets/logos/philips.png";
import tataLogo from "@/assets/logos/tata.png";
import myntraLogo from "@/assets/logos/myntra.webp";
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
      className={`py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-700 relative overflow-hidden ${
        hasIntersected ? "animate-fade-in" : "opacity-0"
      }`}
      aria-label="Client showcase"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12">
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
            className={`flex gap-6 md:gap-8 lg:gap-12 ${
              isPaused ? "[animation-play-state:paused]" : ""
            }`}
            style={{
              animation: "scroll 30s linear infinite",
              width: "fit-content",
            }}
          >
            {/* First set */}
            {clients.map((client, index) => (
              <ClientLogo
                key={`${client.name}-1`}
                name={client.name}
                logo={client.logo}
                index={index}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => (
              <ClientLogo
                key={`${client.name}-2`}
                name={client.name}
                logo={client.logo}
                index={index}
              />
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
