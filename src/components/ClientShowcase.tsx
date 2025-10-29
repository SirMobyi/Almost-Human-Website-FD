import { useState, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ClientLogo from "./ClientLogo";
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
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSpotlight({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      ref={targetRef as React.RefObject<HTMLElement>}
      className={`py-16 px-6 bg-background transition-opacity duration-700 relative overflow-hidden ${
        hasIntersected ? "animate-fade-in" : "opacity-0"
      }`}
      aria-label="Client showcase"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <div
        ref={sectionRef}
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, hsl(var(--primary) / 0.15), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-glow-sm">
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
