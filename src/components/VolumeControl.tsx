import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "./ui/slider";
import { useState, useEffect } from "react";
import { audioSystem } from "@/utils/audioSystem";

export const VolumeControl = () => {
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(30);

  useEffect(() => {
    audioSystem.setVolume(volume / 100);
  }, [volume]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-card/80 backdrop-blur-md 
                    border-2 border-electric-cyan rounded-xl px-4 py-3 box-glow-cyan">
      <button
        onClick={toggleMute}
        className="text-electric-cyan hover:text-electric-purple transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {volume === 0 || isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      
      <Slider
        value={[volume]}
        onValueChange={handleVolumeChange}
        max={100}
        step={1}
        className="w-24"
      />
      
      <span className="text-sm font-mono text-electric-cyan min-w-[3ch]">
        {Math.round(volume)}%
      </span>
    </div>
  );
};
