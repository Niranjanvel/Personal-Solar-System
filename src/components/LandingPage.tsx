import { ChevronDown } from "lucide-react";
import { ShootingStars } from "./ShootingStars";
import { MilkyWay3D } from "./MilkyWay3D";

interface LandingPageProps {
  onExplore: () => void;
}

export const LandingPage = ({ onExplore }: LandingPageProps) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Milky Way Background */}
      <MilkyWay3D />
      
      {/* Shooting Stars */}
      <ShootingStars />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nebula-blue/10 to-cosmic-black/50 pointer-events-none" />
      
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

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
