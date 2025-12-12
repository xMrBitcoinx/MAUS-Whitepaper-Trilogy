// 📄 03frontend/src/camera/Camera.tsx
// MAUS Engine 0.1 — Camera System with onReady callback

import React, { useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface CameraProps {
  onReady?: (camera: THREE.PerspectiveCamera) => void;
}

export default function Camera({ onReady }: CameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Notify parent when camera is created
  useEffect(() => {
    if (cameraRef.current && onReady) {
      onReady(cameraRef.current);
    }
  }, [onReady]);

  // Dynamic aspect ratio + resize listener
  useEffect(() => {
    function handleResize() {
      if (!cameraRef.current) return;

      const cam = cameraRef.current;
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.updateProjectionMatrix();
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={75}               // Locked per MAUS rules
      position={[0, 2, 6]}   // Initial view
      near={0.1}
      far={2000}
    />
  );
}
