// 📄 01frontend/maus-ui/src/rooms/GenesisRoom.jsx
// MAUS ENGINE 0.1 — GENESIS ROOM (FULL VERSION)
// Synthwave 84 Theme — Neon grid, glowing walls, identity orb mount

import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// Room constants
const ROOM_SIZE = 20;
const HALF = ROOM_SIZE / 2;

export default function GenesisRoom() {
  return (
    <group>
      {/* ------------------------------ */}
      {/* FLOOR — GLOWING NEON GRID */}
      {/* ------------------------------ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE, 20, 20]} />
        <meshStandardMaterial
          color="#0d0221"
          emissive="#6efaff"
          emissiveIntensity={0.03}
          wireframe={true}
        />
      </mesh>

      {/* ------------------------------ */}
      {/* WALLS — SOFT NEON PANELS */}
      {/* ------------------------------ */}
      {[
        { pos: [HALF, HALF, 0], rot: [0, Math.PI / 2, 0] }, // right
        { pos: [-HALF, HALF, 0], rot: [0, -Math.PI / 2, 0] }, // left
        { pos: [0, HALF, HALF], rot: [0, Math.PI, 0] }, // back
        { pos: [0, HALF, -HALF], rot: [0, 0, 0] }, // front
      ].map((wall, i) => (
        <mesh key={i} position={wall.pos} rotation={wall.rot}>
          <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
          <meshStandardMaterial
            color="#13012c"
            emissive="#ff00ff"
            emissiveIntensity={0.15}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* ------------------------------ */}
      {/* IDENTITY ORB MOUNT (NEON PEDESTAL) */}
      {/* ------------------------------ */}
      <group position={[0, 1.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
          <meshStandardMaterial
            color="#221133"
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#11ffee"
            emissive="#11ffee"
            emissiveIntensity={0.6}
          />
        </mesh>

        <Text
          position={[0, 1.9, 0]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          IDENTITY CORE
        </Text>
      </group>

      {/* ------------------------------ */}
      {/* PORTAL EXIT MARKER (MATCHES ENGINE FILES) */}
      {/* ------------------------------ */}
      <group position={[0, 2, 12]}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.4}
          />
        </mesh>

        <Text
          position={[0, 2.7, 0]}
          fontSize={0.45}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          EXIT TO GRID
        </Text>
      </group>
    </group>
  );
}
