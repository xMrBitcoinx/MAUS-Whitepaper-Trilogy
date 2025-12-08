// 01frontend/maus-ui/src/objects/SelectionHighlight.jsx
import React from "react";

export default function SelectionHighlight({ target }) {
  if (!target) return null;

  return (
    <mesh position={target.position}>
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshBasicMaterial
        color="yellow"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}
