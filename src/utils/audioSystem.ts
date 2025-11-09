export class PlanetAudioSystem {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeSounds: Map<string, OscillatorNode[]> = new Map();
  private volume: number = 0.3;

  constructor() {
    // Audio context will be initialized on first user interaction
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.audioContext.destination);
    }
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioContext!.currentTime, 0.1);
    }
  }

  getVolume(): number {
    return this.volume;
  }

  // Mercury - Metallic airy ping
  private createMercurySound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.3);
    
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1600, this.audioContext.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(2400, this.audioContext.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.6);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2];
  }

  // Venus - Warm harmonic hum
  private createVenusSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const osc3 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(220, this.audioContext.currentTime);
    
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(330, this.audioContext.currentTime);
    
    osc3.type = "triangle";
    osc3.frequency.setValueAtTime(440, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.4);
    gain.gain.setTargetAtTime(0.15, this.audioContext.currentTime + 0.4, 2);
    
    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2, osc3];
  }

  // Earth - Soft atmospheric chords
  private createEarthSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const osc3 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(261.63, this.audioContext.currentTime); // C4
    
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(329.63, this.audioContext.currentTime); // E4
    
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(392.00, this.audioContext.currentTime); // G4
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.audioContext.currentTime + 0.5);
    gain.gain.setTargetAtTime(0.12, this.audioContext.currentTime + 0.5, 2);
    
    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2, osc3];
  }

  // Mars - Deep desert-like synth
  private createMarsSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(110, this.audioContext.currentTime);
    
    osc2.type = "square";
    osc2.frequency.setValueAtTime(165, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.3);
    gain.gain.setTargetAtTime(0.1, this.audioContext.currentTime + 0.3, 1.5);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2];
  }

  // Jupiter - Powerful low rumble swell
  private createJupiterSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(55, this.audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(65, this.audioContext.currentTime + 2);
    
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(82.5, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, this.audioContext.currentTime + 0.6);
    gain.gain.setTargetAtTime(0.2, this.audioContext.currentTime + 0.6, 2);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2];
  }

  // Saturn - Shimmering ring-like chimes
  private createSaturnSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const oscs: OscillatorNode[] = [];
    const gain = this.audioContext.createGain();
    
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime + i * 0.1);
      osc.connect(gain);
      oscs.push(osc);
    });
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.audioContext.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 3);
    
    gain.connect(this.masterGain);
    
    return oscs;
  }

  // Uranus - Cold airy tone
  private createUranusSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(440, this.audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 1.5);
    
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(660, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2];
  }

  // Neptune - Deep oceanic pad
  private createNeptuneSound(): OscillatorNode[] {
    if (!this.audioContext || !this.masterGain) return [];
    
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const osc3 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(98, this.audioContext.currentTime);
    
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(146.83, this.audioContext.currentTime);
    
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(196, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.8);
    gain.gain.setTargetAtTime(0.15, this.audioContext.currentTime + 0.8, 2.5);
    
    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(this.masterGain);
    
    return [osc1, osc2, osc3];
  }

  playPlanetSound(planetId: string) {
    this.initAudioContext();
    this.stopPlanetSound(planetId); // Stop any existing sound for this planet
    
    if (!this.audioContext) return;

    let oscillators: OscillatorNode[] = [];

    switch (planetId) {
      case "mercury":
        oscillators = this.createMercurySound();
        break;
      case "venus":
        oscillators = this.createVenusSound();
        break;
      case "earth":
        oscillators = this.createEarthSound();
        break;
      case "mars":
        oscillators = this.createMarsSound();
        break;
      case "jupiter":
        oscillators = this.createJupiterSound();
        break;
      case "saturn":
        oscillators = this.createSaturnSound();
        break;
      case "uranus":
        oscillators = this.createUranusSound();
        break;
      case "neptune":
        oscillators = this.createNeptuneSound();
        break;
    }

    if (oscillators.length > 0) {
      oscillators.forEach((osc, i) => {
        osc.start(this.audioContext!.currentTime + (i * 0.1));
      });
      this.activeSounds.set(planetId, oscillators);

      // Auto-stop after duration
      setTimeout(() => {
        this.stopPlanetSound(planetId);
      }, 4000);
    }
  }

  stopPlanetSound(planetId: string) {
    const oscillators = this.activeSounds.get(planetId);
    if (oscillators && this.audioContext) {
      oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator already stopped
        }
      });
      this.activeSounds.delete(planetId);
    }
  }

  stopAllSounds() {
    this.activeSounds.forEach((_, planetId) => {
      this.stopPlanetSound(planetId);
    });
  }
}

// Singleton instance
export const audioSystem = new PlanetAudioSystem();
