// src/maus-engine/planets/JupiterScene.jsx

import React from "react";
import { Html } from "@react-three/drei";

export default function JupiterScene() {
  return (
    <group>
      <color attach="background" args={["#1B0E00"]} />
      <mesh>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial color="#BA7D4D" wireframe opacity={0.2} transparent />
      </mesh>

      <Html position={[0, 5, 0]}>
        <div style={{ color: "#FFD9A6", padding: "10px", background: "rgba(50,20,0,0.8)", borderRadius: "10px" }}>
          🟠 JUPITER — ACTIVE
        </div>
      </Html>
    </group>
  );
}
