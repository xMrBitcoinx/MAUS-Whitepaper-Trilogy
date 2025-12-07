// 01frontend/maus-ui/src/maus-engine/planets/NasaNodeScene.jsx
// COMPLETE • CLEAN • CORRECTED • NO DUPLICATE IMPORTS

import React from "react";
import { OrbitControls } from "@react-three/drei";
import PortalManager from "../portals/PortalManager";

export default function NasaNodeScene() {
  return (
    <>
      {/* NASA Node Base */}
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5, 1.5, 5]} />
          <meshStandardMaterial color={"#1a2a6c"} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.2, 0.05, 4]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        {/* Label */}
        <mesh position={[0, 3.5, 0]}>
          <textGeometry args={["NASA Node", { size: 0.7, height: 0.1 }]} />
          <meshBasicMaterial color={"white"} />
        </mesh>
      </group>

      {/* Portal back to Earth */}
      <PortalManager targetPlanet="earth" position={[6, 0, 0]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1.2} position={[5, 5, 5]} />

      {/* Controls */}
      <OrbitControls />
    </>
  );
}
