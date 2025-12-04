// 01frontend/maus-ui/src/maus/rooms/DefaultRoom.jsx

import React from "react";

export default function DefaultRoom() {
  return (
    <group>
      {/* Background */}
      <color attach="background" args={["#000000"]} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 4, 2]} intensity={1.2} color="#ffffff" />

      {/* Center cube */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8888ff" />
      </mesh>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}
