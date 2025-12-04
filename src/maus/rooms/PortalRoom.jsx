// 01frontend/maus-ui/src/maus/rooms/PortalRoom.jsx

import React from "react";

export default function PortalRoom() {
  return (
    <group>
      {/* Background */}
      <color attach="background" args={["#000000"]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 2]} intensity={1.4} color="#00ffff" />

      {/* Portal Cube */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={"#00aaff"}
          emissive={"#0066ff"}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Floor Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial
          color={"#003333"}
          wireframe
          emissive={"#00ffff"}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
