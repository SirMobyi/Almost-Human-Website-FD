import filmsImg from "@/assets/services/films-new.png";
import animationImg from "@/assets/services/animation.png";
import socialImg from "@/assets/services/social.png";
import charactersImg from "@/assets/services/character-design-new.png";
import worldsImg from "@/assets/services/worlds-new.png";
import experimentalImg from "@/assets/services/experimental-new.png";

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
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Character Design & Avatars",
    image: charactersImg,
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "World-Building",
    image: worldsImg,
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Social Media & Format Content",
    image: socialImg,
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Experimental & IP Projects",
    image: experimentalImg,
    gridClass: "md:col-span-2 md:row-span-1",
  },
];

const ServicesSection = () => {

  return (
    <section id="services" className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16">
          Made by <br className="md:hidden" />Almost Human
        </h2>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid md:grid-cols-4 md:auto-rows-[280px] lg:auto-rows-[320px] gap-4 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.gridClass} group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]`}
            >
              <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-start z-10">
                <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-balance leading-tight text-gray-100">
                  {service.title}
                </h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-[5]" />
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-1 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-card/30 border border-border/50 shadow-lg"
            >
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 p-6 flex flex-col justify-start z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-balance leading-tight text-gray-100">
                    {service.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-[5]" />
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
