// 📁 03frontend/src/components/CameraRig.js

import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraRig = () => {
  const cameraRef = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      camera.position.set(0, 0, 5);  // Set initial camera position
    }
  }, [camera]);

  return (
    <group ref={cameraRef}>
      {/* The camera will follow the camera rig */}
      <perspectiveCamera ref={camera} makeDefault position={[0, 0, 5]} />
    </group>
  );
};

export default CameraRig;
