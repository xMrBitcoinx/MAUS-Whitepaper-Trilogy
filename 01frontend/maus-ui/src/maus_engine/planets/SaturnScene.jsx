// src/maus-engine/planets/SaturnScene.jsx

import React from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function SaturnScene() {
  return (
    <group>
      <color attach="background" args={["#140F0A"]} />

      {/* Saturn body */}
      <mesh>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial color="#C9A96A" wireframe opacity={0.25} transparent />
      </mesh>

      {/* Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[55, 75, 128]} />
        <meshBasicMaterial color="#E6D2A5" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      <Html position={[0, 5, 0]}>
        <div style={{ color: "#FFE7C2", padding: "10px", background: "rgba(50,40,20,0.8)", borderRadius: "10px" }}>
          🟡 SATURN — ACTIVE
        </div>
      </Html>
    </group>
  );
}
