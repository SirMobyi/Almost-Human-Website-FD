import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ClientLogo from "./ClientLogo";
import tataLogo from "@/assets/logos/tata.png";
import irctcLogo from "@/assets/logos/irctc.png";
import rapidoLogo from "@/assets/logos/rapido.png";
import jeevansathiLogo from "@/assets/logos/jeevansathi.png";
import philipsLogo from "@/assets/logos/philips-new.png";
import credLogo from "@/assets/logos/cred-new.png";
import myntraLogo from "@/assets/logos/myntra.png";
import primeLogo from "@/assets/logos/prime.png";
import hotstarLogo from "@/assets/logos/hotstar.png";

const clients = [
  { name: "Tata", logo: tataLogo },
  { name: "IRCTC", logo: irctcLogo },
  { name: "Rapido", logo: rapidoLogo },
  { name: "Jeevansathi", logo: jeevansathiLogo },
  { name: "Philips", logo: philipsLogo },
  { name: "CRED", logo: credLogo },
  { name: "Myntra", logo: myntraLogo },
  { name: "Amazon Prime Video", logo: primeLogo },
  { name: "Disney+ Hotstar", logo: hotstarLogo },
];

const ClientShowcase = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      ref={targetRef as React.RefObject<HTMLElement>}
      className={`py-8 md:py-12 lg:py-16 px-4 sm:px-6 bg-black transition-opacity duration-700 relative overflow-hidden ${
        hasIntersected ? "animate-fade-in" : "opacity-0"
      }`}
      aria-label="Client showcase"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-10 lg:mb-12 text-white">
          Trusted by Leading Brands
        </h2>

        <div
          className="relative overflow-hidden"
          role="region"
          aria-label="Scrolling client logos"
        >
          <div
            className="flex gap-3 md:gap-4 lg:gap-6"
            style={{
              animation: prefersReducedMotion ? 'none' : "scroll 28s linear infinite",
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
    </section>
  );
};

export default ClientShowcase;
