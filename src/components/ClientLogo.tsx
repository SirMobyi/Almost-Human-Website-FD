import { useTiltEffect } from "@/hooks/useTiltEffect";

interface ClientLogoProps {
  name: string;
  logo: string;
  index: number;
  scale?: number;
}

const ClientLogo = ({ name, logo, index, scale = 1 }: ClientLogoProps) => {
  const [ref, tilt, handleMouseMove, handleMouseLeave] = useTiltEffect<HTMLDivElement>(15);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-[120px] h-[80px] sm:w-[140px] sm:h-[90px] md:w-[160px] md:h-[100px] lg:w-[180px] lg:h-[110px] flex items-center justify-center transition-all duration-300 hover:z-10 rounded-2xl overflow-hidden px-4 md:px-6"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale * scale})`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-full h-full object-contain filter brightness-100 hover:brightness-125 transition-all"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
};

export default ClientLogo;
