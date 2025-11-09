import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GalaxyCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial 
        color="#FFB200" 
        transparent
        opacity={0.8}
      />
      <pointLight intensity={2} distance={50} decay={2} color="#FFB200" />
    </mesh>
  );
}

function GalaxyArms() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 15000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const arms = 2;
    const spin = 2;
    const randomness = 0.5;
    const randomnessPower = 3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 15;
      const spinAngle = radius * spin;
      const branchAngle = (i % arms) / arms * Math.PI * 2;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius * 0.3;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color based on distance from center
      const mixedColor = new THREE.Color();
      const innerColor = new THREE.Color('#14F2F2'); // Electric cyan
      const middleColor = new THREE.Color('#7A4FFF'); // Electric purple
      const outerColor = new THREE.Color('#4A90E2'); // Blue

      if (radius < 5) {
        mixedColor.lerpColors(innerColor, middleColor, radius / 5);
      } else {
        mixedColor.lerpColors(middleColor, outerColor, (radius - 5) / 10);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Size variation
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.0002;
      particlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          
          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float strength = 0.05 / distanceToCenter - 0.1;
            gl_FragColor = vec4(vColor, strength);
          }
        `}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
}

function BackgroundStars() {
  const starsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.00005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#E5EAF2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MilkyWayScene() {
  return (
    <>
      <color attach="background" args={["#0A0F1F"]} />
      <BackgroundStars />
      <GalaxyCore />
      <GalaxyArms />
    </>
  );
}

export const MilkyWay3D = () => {
  return (
    <div className="absolute inset-0">
      <Canvas 
        camera={{ 
          position: [0, 8, 20], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <MilkyWayScene />
      </Canvas>
    </div>
  );
};
