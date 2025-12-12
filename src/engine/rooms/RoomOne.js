// 📁 src/rooms/RoomOne.js

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const RoomOne = () => {
  const meshRef = useRef();

  // Set up the room's geometry (e.g., a box for now)
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 4; // Example rotation
      meshRef.current.rotation.y = Math.PI / 4;
    }
  }, []);

  // Animation loop to update the room
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01; // Continuous rotation for dynamic effect
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[5, 5, 5]} />
      <meshBasicMaterial color="lightblue" />
    </mesh>
  );
};

export default RoomOne;
