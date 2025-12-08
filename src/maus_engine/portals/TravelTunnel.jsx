// 01frontend/maus-ui/src/maus-engine/portals/TravelTunnel.jsx
// COSMIC TUNNEL + ONE-SHOT WHOOSH

import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function TravelTunnel({ onEnd }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 1.2;
    }
  });

  useEffect(() => {
    const audio = new Audio("/sounds/travel-whoosh.mp3");
    audio.play().catch(() => {});
    const timer = setTimeout(onEnd, 1600);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[4, 4, 40, 64, 1, true]} />
        <meshStandardMaterial
          color="#73f7ff"
          transparent
          opacity={0.35}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}
