// 📁 src/UI/Engine.js

import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Engine = () => {
  const meshRef = React.useRef();

  // Rotate the 3D object
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
};

export default Engine;
