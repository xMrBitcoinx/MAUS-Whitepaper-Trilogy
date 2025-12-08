// 01frontend/maus-ui/src/maus/rooms/GridRoom.jsx

import React from "react";
import { useFrame } from "@react-three/fiber";

export default function GridRoom({ updatePortalTarget }) {
  const half = 6;
  const height = 4;

  // No portals here (safe no-op)
  useFrame(() => {
    if (typeof updatePortalTarget === "function") {
      updatePortalTarget(null);
    }
  });

  return (
    <group>
      {/* Background */}
      <color attach="background" args={["#000000"]} />

      {/* Glow lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#00ffff" />

      {/* Floor grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[half * 2, half * 2]} />
        <meshStandardMaterial
          color="#001111"
          emissive="#00ffff"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>

      {/* Walls */}
      <mesh position={[0, height / 2, -half]}>
        <boxGeometry args={[half * 2, height, 0.1]} />
        <meshStandardMaterial color="#001111" emissive="#00ffff" />
      </mesh>

      <mesh position={[0, height / 2, half]}>
        <boxGeometry args={[half * 2, height, 0.1]} />
        <meshStandardMaterial color="#001111" emissive="#00ffff" />
      </mesh>

      <mesh position={[-half, height / 2, 0]}>
        <boxGeometry args={[0.1, height, half * 2]} />
        <meshStandardMaterial color="#001111" emissive="#00ffff" />
      </mesh>

      <mesh position={[half, height / 2, 0]}>
        <boxGeometry args={[0.1, height, half * 2]} />
        <meshStandardMaterial color="#001111" emissive="#00ffff" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[half * 2, half * 2]} />
        <meshStandardMaterial
          color="#001111"
          emissive="#00ffff"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
    </group>
  );
}
