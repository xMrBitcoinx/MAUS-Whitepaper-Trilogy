// 📁 E:\maus\01frontend\maus-ui\src\maus_engine 📄 mausEngine.jsx

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BoxBufferGeometry } from "three";
import { extend } from "@react-three/fiber";

// Extend THREE namespace for JSX
extend({ BoxBufferGeometry });

const MausEngine = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default MausEngine;
