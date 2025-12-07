// 📁 03frontend/src/camera/Camera.js

import { PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Camera = () => {
  const cameraRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      const controls = new OrbitControls(cameraRef.current, controlsRef.current);
      controls.enableDamping = true;   // Smooth camera movement
      controls.dampingFactor = 0.25;   // Adjust the damping factor
      controls.screenSpacePanning = false;  // Prevent panning out of bounds
    }
  }, []);

  return (
    <>
      <PerspectiveCamera 
        ref={cameraRef} 
        makeDefault 
        position={[0, 0, 5]} 
        fov={75} 
      />
      <group ref={controlsRef} />
    </>
  );
};

export default Camera;
