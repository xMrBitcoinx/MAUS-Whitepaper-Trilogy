// src/maus-engine/planets/MarsScene.jsx

import React from "react";
import { Html } from "@react-three/drei";

export default function MarsScene() {
  return (
    <group>
      <color attach="background" args={["#2A0F0F"]} />
      <mesh>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial color="#7A2E1A" wireframe transparent opacity={0.25} />
      </mesh>

      <Html position={[0, 5, 0]}>
        <div style={{ color: "#FFB599", padding: "10px", background: "rgba(40,0,0,0.7)", borderRadius: "10px" }}>
          🔴 MARS — ACTIVE
        </div>
      </Html>
    </group>
  );
}
