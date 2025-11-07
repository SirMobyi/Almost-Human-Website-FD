import filmsImg from "@/assets/services/films.png";
import animationImg from "@/assets/services/animation.png";
import socialImg from "@/assets/services/social.png";
import charactersImg from "@/assets/services/characters.png";
import worldsImg from "@/assets/services/worlds.png";
import experimentalImg from "@/assets/services/experimental.png";

interface Service {
  title: string;
  image: string;
  gridArea: string;
  aspectRatio?: string;
}

const services: Service[] = [
  {
    title: "AI Films & Commercials",
    image: filmsImg,
    gridArea: "a",
    aspectRatio: "66.66%", // 2:3 for mobile
  },
  {
    title: "AI Animation & Visual Storytelling",
    image: animationImg,
    gridArea: "b",
    aspectRatio: "33.33%", // Small tile
  },
  {
    title: "Social Media & Format Content",
    image: socialImg,
    gridArea: "c",
    aspectRatio: "125%", // Tall tile
  },
  {
    title: "Character Design & Avatars",
    image: charactersImg,
    gridArea: "d",
    aspectRatio: "56.25%", // 16:9
  },
  {
    title: "World-Building",
    image: worldsImg,
    gridArea: "e",
    aspectRatio: "56.25%", // 16:9
  },
  {
    title: "Experimental & IP Projects",
    image: experimentalImg,
    gridArea: "f",
    aspectRatio: "56.25%", // 16:9
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[42px] leading-[1.02] font-bold text-center mb-7 tracking-tight">
          Made by Almost Human
        </h2>

        {/* Desktop Bento Grid (≥1024px) */}
        <div className="hidden lg:grid gap-5 bento-grid-desktop">
          {services.slice(0, 5).map((service) => (
            <div
              key={service.gridArea}
              className="group relative overflow-hidden rounded-xl backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.01] shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
              style={{ gridArea: service.gridArea }}
            >
              <div className="absolute inset-0 p-3 flex flex-col justify-end z-10">
                <div className="p-3 rounded-lg bg-gradient-to-t from-black/20 to-transparent">
                  <h3 className="text-[20px] font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-[5]" />
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Tablet Grid (768-1023px) */}
        <div className="hidden md:grid lg:hidden gap-5 bento-grid-tablet">
          {services.map((service) => (
            <div
              key={service.gridArea}
              className="group relative overflow-hidden rounded-xl backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.01] shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
              style={{ gridArea: service.gridArea }}
            >
              <div className="absolute inset-0 p-3 flex flex-col justify-end z-10">
                <div className="p-3 rounded-lg bg-gradient-to-t from-black/20 to-transparent">
                  <h3 className="text-[18px] font-semibold leading-tight text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-[5]" />
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Mobile Stack (≤767px) */}
        <div className="md:hidden grid grid-cols-1 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-card/30 border border-border/50 shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
            >
              <div style={{ paddingTop: service.aspectRatio }} className="relative">
                <div className="absolute inset-0 p-3 flex flex-col justify-end z-10">
                  <div className="p-3 rounded-lg bg-gradient-to-t from-black/20 to-transparent">
                    <h3 className="text-[18px] font-semibold leading-tight text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-[5]" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop Grid Layout (≥1024px) */
        .bento-grid-desktop {
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 360px 220px 260px;
          grid-template-areas:
            "a a b"
            "a a c"
            "d e c";
        }

        /* Tablet Grid Layout (768-1023px) */
        .bento-grid-tablet {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 280px 280px 220px 220px;
          grid-template-areas:
            "a a"
            "c b"
            "d e"
            "f f";
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .bento-grid-tablet > div[style*="grid-area: a"] {
            grid-row: span 1;
          }
          .bento-grid-tablet > div[style*="grid-area: c"] {
            grid-row: span 2;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
