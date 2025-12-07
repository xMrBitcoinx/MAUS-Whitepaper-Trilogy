// 01frontend/maus-ui/src/maus-engine/planets/SpaceXPlatformScene.jsx
// COMPLETE • CLEAN • CORRECTED • NO DUPLICATE IMPORTS

import React from "react";
import { OrbitControls } from "@react-three/drei";
import PortalManager from "../portals/PortalManager";

export default function SpaceXPlatformScene() {
  return (
    <>
      <group>
        {/* Platform */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 0.5, 6]} />
          <meshStandardMaterial color={"#222"} />
        </mesh>

        {/* Rocket Body */}
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 6]} />
          <meshStandardMaterial color={"#aaaaaa"} />
        </mesh>

        {/* Rocket Nose */}
        <mesh position={[0, 6.5, 0]}>
          <coneGeometry args={[0.7, 1.5]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        {/* Text label */}
        <mesh position={[0, 8, 0]}>
          <textGeometry args={["SpaceX Platform", { size: 0.6, height: 0.1 }]} />
          <meshBasicMaterial color={"white"} />
        </mesh>
      </group>

      {/* Portal to Founder Realm */}
      <PortalManager targetPlanet="founder" position={[6, 0, 0]} />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1.4} position={[5, 5, 5]} />

      {/* Orbit controls */}
      <OrbitControls />
    </>
  );
}
