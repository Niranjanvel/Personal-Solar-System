import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { PlanetCard } from "./PlanetCard";

interface Planet {
  id: string;
  name: string;
  quality: string;
  description: string;
  color: string;
  size: number;
  distance: number;
  speed: number;
  sound?: string;
}

const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    quality: "Quick Thinking",
    description: "Fast-paced decision making and adaptability. Always ready to pivot and embrace change with lightning speed.",
    color: "#8C7853",
    size: 0.4,
    distance: 4,
    speed: 0.015,
  },
  {
    id: "venus",
    name: "Venus",
    quality: "Harmony & Beauty",
    description: "Creating balance and aesthetic excellence in everything. An eye for design and peaceful relationships.",
    color: "#FFC649",
    size: 0.9,
    distance: 6,
    speed: 0.012,
  },
  {
    id: "earth",
    name: "Earth",
    quality: "Grounded & Practical",
    description: "Down-to-earth approach with realistic goals. Building solid foundations for lasting success.",
    color: "#4A90E2",
    size: 1,
    distance: 8,
    speed: 0.01,
  },
  {
    id: "mars",
    name: "Mars",
    quality: "Passionate Drive",
    description: "Fierce determination and courage to tackle any challenge. Energy that fuels ambitious goals.",
    color: "#E27B58",
    size: 0.6,
    distance: 10,
    speed: 0.008,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    quality: "Leadership & Vision",
    description: "Big-picture thinking with expansive ideas. Natural leadership that inspires and guides others.",
    color: "#C88B3A",
    size: 2.2,
    distance: 14,
    speed: 0.005,
  },
  {
    id: "saturn",
    name: "Saturn",
    quality: "Discipline & Structure",
    description: "Masterful organization and long-term planning. Building systems that stand the test of time.",
    color: "#FAD5A5",
    size: 1.8,
    distance: 18,
    speed: 0.003,
  },
  {
    id: "uranus",
    name: "Uranus",
    quality: "Innovation & Originality",
    description: "Revolutionary thinking and unique perspectives. Breaking conventions to create something new.",
    color: "#4FD5D6",
    size: 1.4,
    distance: 22,
    speed: 0.002,
  },
  {
    id: "neptune",
    name: "Neptune",
    quality: "Intuition & Imagination",
    description: "Deep creative vision and emotional intelligence. Connecting with ideas beyond the obvious.",
    color: "#4A66E2",
    size: 1.3,
    distance: 26,
    speed: 0.001,
  },
];

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial 
        color="#FFB200" 
        emissive="#FFB200"
        emissiveIntensity={1.5}
      />
      <pointLight intensity={2} distance={100} decay={2} />
    </mesh>
  );
}

interface PlanetMeshProps {
  planet: Planet;
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

function PlanetMesh({ planet, onClick, isHovered, onHover }: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (orbitRef.current && meshRef.current) {
      orbitRef.current.rotation.y += planet.speed;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planet.distance, 0, 0]}
        onClick={onClick}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        scale={isHovered ? 1.2 : 1}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial 
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
        />
      </mesh>
      
      {/* Orbit Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
        <meshBasicMaterial 
          color="#14F2F2" 
          transparent 
          opacity={isHovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Scene({ onPlanetClick, hoveredPlanet, setHoveredPlanet }: any) {
  return (
    <>
      <color attach="background" args={["#0A0F1F"]} />
      <ambientLight intensity={0.2} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      <Sun />
      
      {planets.map((planet) => (
        <PlanetMesh
          key={planet.id}
          planet={planet}
          onClick={() => onPlanetClick(planet)}
          isHovered={hoveredPlanet === planet.id}
          onHover={(hovered) => setHoveredPlanet(hovered ? planet.id : null)}
        />
      ))}
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={10}
        maxDistance={50}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 15, 35], fov: 60 }}>
        <Scene 
          onPlanetClick={setSelectedPlanet}
          hoveredPlanet={hoveredPlanet}
          setHoveredPlanet={setHoveredPlanet}
        />
      </Canvas>

      {/* Hovering Planet Name */}
      {hoveredPlanet && !selectedPlanet && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="px-6 py-3 bg-card/80 backdrop-blur-sm border-2 border-electric-cyan rounded-lg box-glow-cyan">
            <p className="text-xl font-semibold text-electric-cyan">
              {planets.find(p => p.id === hoveredPlanet)?.name}
            </p>
          </div>
        </div>
      )}

      {/* Planet Detail Card */}
      {selectedPlanet && (
        <PlanetCard 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}

      {/* Instructions */}
      {!selectedPlanet && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          <p className="text-muted-foreground text-sm md:text-base">
            Click on planets to explore • Drag to rotate • Scroll to zoom
          </p>
        </div>
      )}
    </div>
  );
};
