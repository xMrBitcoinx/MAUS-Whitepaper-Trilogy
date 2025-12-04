// 01frontend/maus-ui/src/objects/SelectionHighlight.jsx
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SelectionHighlight({ target }) {
  const ringRef = useRef();

  useEffect(() => {
    if (ringRef.current && target) {
      ringRef.current.visible = true;
    } else if (ringRef.current) {
      ringRef.current.visible = false;
    }
  }, [target]);

  useFrame(() => {
    if (ringRef.current && target) {
      ringRef.current.position.copy(target.position);
      ringRef.current.position.y = target.position.y - 0.49; // Just under cube
    }
  });

  return (
    <mesh ref={ringRef} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.1, 1.25, 64]} />
      <meshBasicMaterial
        color="#00eaff"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
