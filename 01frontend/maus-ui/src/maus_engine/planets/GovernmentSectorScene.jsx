// 01frontend/maus-ui/src/maus-engine/planets/GovernmentSectorScene.jsx

import React from "react";
import { OrbitControls } from "@react-three/drei";
import PortalManager from "../portals/PortalManager";

export default function GovernmentSectorScene() {
  return (
    <>
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color={"#4455aa"} />
        </mesh>

        {[-2, 0, 2].map((x, i) => (
          <mesh key={i} position={[x, -1, 2.5]}>
            <cylinderGeometry args={[0.3, 0.3, 2]} />
            <meshStandardMaterial color={"#ccccff"} />
          </mesh>
        ))}
      </group>

      {/* Portal to SpaceX */}
      <PortalManager targetPlanet="spacex" position={[6, 0, 0]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <OrbitControls />
    </>
  );
}
