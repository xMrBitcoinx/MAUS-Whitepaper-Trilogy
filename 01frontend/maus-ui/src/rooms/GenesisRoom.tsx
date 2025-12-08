// 📁 src/rooms/GenesisRoom.tsx
// MAUS ALPHA 0.2 — GENESIS ROOM (TRON NEON GRID)

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef } from 'react';

export function GenesisRoom() {
  const cubeRef = useRef<THREE.Mesh>(null!);

  // 🔥 Cube Hover Animation
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.6;
    cubeRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1.2;
  });

  return (
    <>
      {/* 🌌 Ambient Light */}
      <ambientLight intensity={0.35} />

      {/* 🔷 Directional Light */}
      <directionalLight position={[5, 10, 5]} intensity={1.0} />

      {/* 🔵 Tron Grid Floor */}
      <gridHelper args={[200, 200, "#00c3ff", "#003366"]} />

      {/* 🔷 Glowing MAUS Cube */}
      <mesh ref={cubeRef} position={[0, 1.2, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#00c3ff"
          emissive="#0099ff"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* 🟣 Tron Floor Glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="black" transparent opacity={0.35} />
      </mesh>
    </>
  );
}

export default GenesisRoom;
