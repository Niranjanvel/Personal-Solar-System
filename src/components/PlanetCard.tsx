import { X } from "lucide-react";
import { Button } from "./ui/button";

interface Planet {
  id: string;
  name: string;
  quality: string;
  description: string;
  color: string;
}

interface PlanetCardProps {
  planet: Planet;
  onClose: () => void;
}

export const PlanetCard = ({ planet, onClose }: PlanetCardProps) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-cosmic-black/80 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Card */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div 
          className="relative max-w-2xl w-full bg-card/90 backdrop-blur-md border-2 border-electric-cyan 
                     rounded-2xl p-8 md:p-12 shadow-2xl box-glow-cyan animate-scale-in pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 border-2 border-electric-cyan rounded-lg 
                       hover:bg-electric-cyan hover:text-cosmic-black transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Color Accent */}
          <div 
            className="absolute top-0 left-0 w-full h-2 rounded-t-2xl"
            style={{ backgroundColor: planet.color }}
          />

          {/* Content */}
          <div className="space-y-6 mt-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-glow-purple mb-2">
                {planet.name}
              </h2>
              <h3 
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: planet.color }}
              >
                {planet.quality}
              </h3>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-electric-cyan to-transparent" />

            <p className="text-lg text-foreground/90 leading-relaxed">
              {planet.description}
            </p>

            {/* Visual Elements */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div 
                className="w-16 h-16 rounded-full animate-pulse-glow"
                style={{ backgroundColor: planet.color }}
              />
              <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-1 rounded-full bg-electric-cyan/30"
                    style={{ 
                      width: `${100 - i * 20}px`,
                      animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={onClose}
              className="px-8 py-3 bg-transparent border-2 border-electric-purple text-foreground
                         hover:bg-electric-purple hover:text-cosmic-black rounded-xl transition-all 
                         duration-300 text-lg font-semibold box-glow-purple"
            >
              Back to Solar System
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
