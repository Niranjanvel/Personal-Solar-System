import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { SolarSystem } from "@/components/SolarSystem";

const Index = () => {
  const [showSolarSystem, setShowSolarSystem] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {!showSolarSystem ? (
        <LandingPage onExplore={() => setShowSolarSystem(true)} />
      ) : (
        <SolarSystem />
      )}
    </div>
  );
};

export default Index;
