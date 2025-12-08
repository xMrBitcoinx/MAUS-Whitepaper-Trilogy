// 📄 03frontend/src/App.tsx
// MAUS Engine 0.1 — Neon Grid Scene + Camera + CameraController Integration (TSX)

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import Camera from './camera/Camera';
import CameraController from './controls/CameraController';

// === Scene Component ===
const Scene = ({ controller }: { controller: CameraController | null }) => {
  useFrame((_, delta) => {
    if (controller) controller.update(delta);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.0} />

      <gridHelper args={[80, 80, '#00ffff', '#003366']} />

      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="deepskyblue"
          emissive="blue"
          emissiveIntensity={0.6}
        />
      </mesh>
    </>
  );
};

export default function App() {
  const [controller, setController] = useState<CameraController | null>(null);

  const handleCameraReady = (cam: THREE.PerspectiveCamera) => {
    const ctrl = new CameraController(cam);
    setController(ctrl);   // 🔥 KEY FIX — triggers rerender
  };

  return (
    <Canvas shadows gl={{ antialias: true }}>
      <Camera onReady={handleCameraReady} />
      <Scene controller={controller} />
    </Canvas>
  );
}
