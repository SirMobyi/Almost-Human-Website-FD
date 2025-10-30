import { useTiltEffect } from "@/hooks/useTiltEffect";

interface ClientLogoProps {
  name: string;
  logo: string;
  index: number;
}

const ClientLogo = ({ name, logo, index }: ClientLogoProps) => {
  const [ref, tilt, handleMouseMove, handleMouseLeave] = useTiltEffect<HTMLDivElement>(15);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-48 h-20 md:w-64 md:h-28 lg:w-72 lg:h-32 flex items-center justify-center transition-all duration-300 hover:z-10 rounded-2xl overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain filter brightness-90 hover:brightness-110 transition-all"
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
