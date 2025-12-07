// 01frontend/maus-ui/src/maus-engine/planets/EarthScene.jsx
// COMPLETE • CLEAN • CORRECTED • SYNTAX-CHECKED

import React from "react";
import { OrbitControls } from "@react-three/drei";
import PortalManager from "../portals/PortalManager";

export default function EarthScene() {
  return (
    <>
      {/* Earth Sphere */}
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial color={"#2288ff"} />
      </mesh>

      {/* Portals */}
      <PortalManager targetPlanet="gov" position={[6, 0, 0]} />
      <PortalManager targetPlanet="nasa" position={[-6, 0, 0]} />

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.2} position={[5, 5, 5]} />

      {/* Controls */}
      <OrbitControls />
    </>
  );
}
