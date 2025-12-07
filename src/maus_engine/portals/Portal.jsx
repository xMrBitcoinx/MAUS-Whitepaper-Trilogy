// 01frontend/maus-ui/src/maus-engine/portals/Portal.jsx
// FRACTAL-STYLE MAUS PORTAL WITH SIMPLE SOUND TRIGGER

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Portal({ onActivate }) {
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.8;
      const pulse = 1 + Math.sin(t * 3) * 0.06;
      ringRef.current.scale.set(pulse, 1, pulse);
    }
  });

  const handleClick = () => {
    // Simple browser audio (you'll add actual file)
    const audio = new Audio("/sounds/portal-whoosh.mp3");
    audio.play().catch(() => {
      // ignore autoplay errors
    });
    onActivate();
  };

  return (
    <group onClick={handleClick}>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.25, 32, 96]} />
        <meshStandardMaterial
          color={"#73f7ff"}
          emissive={"#1b4bff"}
          emissiveIntensity={2}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={"white"}
          emissive={"#73f7ff"}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}
