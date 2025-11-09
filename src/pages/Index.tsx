import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { SolarSystem } from "@/components/SolarSystem";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { audioSystem } from "@/utils/audioSystem";

const Index = () => {
  const [showSolarSystem, setShowSolarSystem] = useState(false);

  const handleRestart = () => {
    audioSystem.stopAllSounds();
    setShowSolarSystem(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {!showSolarSystem ? (
        <LandingPage onExplore={() => setShowSolarSystem(true)} />
      ) : (
        <>
          <SolarSystem />
          
          {/* Re-experience Button */}
          <Button
            onClick={handleRestart}
            className="fixed top-6 right-6 z-50 gap-2 bg-transparent border-2 border-electric-purple 
                       text-foreground hover:bg-electric-purple hover:text-cosmic-black 
                       rounded-xl px-6 py-3 box-glow-purple transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden md:inline">Re-experience</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Index;
