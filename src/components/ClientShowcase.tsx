import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ClientLogo from "./ClientLogo";
import tataLogo from "@/assets/logos/tata.svg";
import irctcLogo from "@/assets/logos/irctc.svg";
import rapidoLogo from "@/assets/logos/rapido.svg";
import jeevansathiLogo from "@/assets/logos/jeevansathi.svg";
import philipsLogo from "@/assets/logos/philips.svg";
import credLogo from "@/assets/logos/cred.svg";
import myntraLogo from "@/assets/logos/myntra.svg";
import jiohotstarLogo from "@/assets/logos/jiohotstar.svg";
const clients = [{
  name: "Tata",
  logo: tataLogo,
  scale: 0.7
}, {
  name: "IRCTC",
  logo: irctcLogo,
  scale: 0.5
}, {
  name: "Rapido",
  logo: rapidoLogo,
  scale: 0.55
}, {
  name: "Jeevansathi",
  logo: jeevansathiLogo,
  scale: 0.65
}, {
  name: "Philips",
  logo: philipsLogo,
  scale: 0.5
}, {
  name: "CRED",
  logo: credLogo,
  scale: 0.85
}, {
  name: "Myntra",
  logo: myntraLogo,
  scale: 0.6
}, {
  name: "JioHotstar",
  logo: jiohotstarLogo,
  scale: 0.60
}];
const ClientShowcase = () => {
  const {
    targetRef,
    hasIntersected
  } = useIntersectionObserver();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return <section ref={targetRef as React.RefObject<HTMLElement>} className={`py-4 md:py-6 lg:py-8 px-4 sm:px-6 bg-black transition-opacity duration-700 relative overflow-hidden ${hasIntersected ? "animate-fade-in" : "opacity-0"}`} aria-label="Client showcase">

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10 mt-4 md:mt-6 lg:mt-8 text-white">Our partners</h2>

        <div className="relative overflow-hidden" role="region" aria-label="Scrolling client logos">
          <div className="inline-flex gap-4 md:gap-6 lg:gap-8" style={{
          animation: prefersReducedMotion ? 'none' : "scroll 20s linear infinite"
        }}>
            {/* First set */}
            {clients.map((client, index) => <ClientLogo key={`${client.name}-1`} name={client.name} logo={client.logo} index={index} scale={client.scale} />)}
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => <ClientLogo key={`${client.name}-2`} name={client.name} logo={client.logo} index={index} scale={client.scale} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default ClientShowcase;