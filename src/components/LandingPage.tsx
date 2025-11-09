import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface LandingPageProps {
  onExplore: () => void;
}

export const LandingPage = ({ onExplore }: LandingPageProps) => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden gradient-cosmic">
      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-foreground animate-shimmer"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nebula-blue/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-glow-purple animate-float">
          Welcome to the Universe of <span className="text-electric-cyan">Alex</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl animate-float" style={{ animationDelay: "0.3s" }}>
          Explore a cosmic journey through personality, where each planet reveals a unique trait
        </p>

        <button
          onClick={onExplore}
          className="group relative px-8 py-4 text-lg font-semibold border-2 border-electric-cyan rounded-xl 
                     bg-transparent text-foreground transition-all duration-300 
                     hover:bg-electric-cyan hover:text-cosmic-black hover:scale-105 
                     box-glow-cyan animate-float"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="relative z-10">Explore the Solar System</span>
        </button>

        <div className="absolute bottom-12 animate-bounce">
          <ChevronDown className="w-8 h-8 text-electric-cyan" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
