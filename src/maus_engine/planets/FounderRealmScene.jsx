// 01frontend/maus-ui/src/maus-engine/planets/FounderRealmScene.jsx

import React from "react";
import { OrbitControls } from "@react-three/drei";
import PortalManager from "../portals/PortalManager";

export default function FounderRealmScene() {
  return (
    <>
      <group>
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color={"#8800ff"}
            emissive={"#5500aa"}
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[4, 4, 1]} />
          <meshStandardMaterial color={"#222222"} />
        </mesh>
      </group>

      {/* Portal back to Earth */}
      <PortalManager targetPlanet="earth" position={[6, 0, 0]} />

      <ambientLight intensity={0.7} />
      <directionalLight intensity={1.3} position={[5, 5, 5]} />
      <OrbitControls />
    </>
  );
}
