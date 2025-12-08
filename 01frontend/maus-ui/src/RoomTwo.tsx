// src/RoomTwo.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';  // Import react-three/fiber for 3D rendering
import { Mesh, BoxGeometry, MeshStandardMaterial, AmbientLight, PointLight } from 'three';  // Import necessary three.js components

const RoomTwo = () => {
  return (
    <Canvas>
      {/* Lighting */}
      <ambientLight intensity={0.4} />  {/* Ambient light to illuminate the scene */}
      <pointLight position={[5, 6, 5]} intensity={1.1} />  {/* Point light for better visibility */}

      {/* First mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 150, 80, 80]} />  {/* Plane geometry for the surface */}
        <meshBasicMaterial wireframe color="#4444ff" />  {/* Material for the surface */}
      </mesh>

      {/* Second mesh (cylinder) */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />  {/* Cylinder geometry */}
        <meshStandardMaterial color="#ff00ff" emissive="#550055" />  {/* Material with color and emissive light */}
      </mesh>

      {/* Third mesh (box) */}
      <mesh position={[-3, 1.5, -2]}>
        <boxGeometry />  {/* Box geometry */}
        <meshStandardMaterial color="#00ffff" />  {/* Material for the box */}
      </mesh>

      {/* Fourth mesh (box) */}
      <mesh position={[4, 1.5, 3]}>
        <boxGeometry />  {/* Box geometry */}
        <meshStandardMaterial color="#ffff00" />  {/* Material for the box */}
      </mesh>
    </Canvas>
  );
};

export default RoomTwo;
