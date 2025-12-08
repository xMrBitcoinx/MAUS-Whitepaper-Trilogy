// 01frontend/maus-ui/src/objects/SelectionHighlight.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SelectionHighlight({ target }) {
  const meshRef = useRef(null);

  useFrame(() => {
    if (!meshRef.current || !target) return;
    meshRef.current.position.copy(target.position);
  });

  if (!target) return null;

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial
        color="yellow"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
