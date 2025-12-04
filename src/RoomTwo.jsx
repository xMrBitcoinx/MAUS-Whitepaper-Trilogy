// 01frontend/src/RoomTwo.jsx

import React from "react";

export default function RoomTwo() {
  return (
    <>
      {/* Different grid tint so you know you're in Room 2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 150, 80, 80]} />
        <meshBasicMaterial wireframe color="#4444ff" />
      </mesh>

      {/* Central pillar */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#ff00ff" emissive="#550055" />
      </mesh>

      {/* A few floating cubes as landmarks */}
      <mesh position={[-3, 1.5, -2]}>
        <boxGeometry />
        <meshStandardMaterial color="#00ffff" />
      </mesh>

      <mesh position={[4, 1.5, 3]}>
        <boxGeometry />
        <meshStandardMaterial color="#ffff00" />
      </mesh>

      <mesh position={[-5, 2.5, 4]}>
        <boxGeometry />
        <meshStandardMaterial color="#ff8800" />
      </mesh>

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 6, 5]} intensity={1.1} />
    </>
  );
}
