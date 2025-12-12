// 📁 src/rooms/RoomTwo.js

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

const RoomTwo = () => {
  const meshRef = useRef();

  // Set up the room's geometry (e.g., a sphere for now)
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(3, 0, 0); // Offset position for variety
    }
  }, []);

  // Animation loop to update the room
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial color="lightgreen" />
    </mesh>
  );
};

export default RoomTwo;
