// 01frontend/maus-ui/src/objects/SelectableCube.jsx
import React, { useState } from "react";

export default function SelectableCube({ position = [0, 0.5, 0] }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const emissive = active ? "lime" : hovered ? "deepskyblue" : "hotpink";

  return (
    <mesh
      position={position}
      name="playerCube"
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setActive((prev) => !prev);
        console.log("MAUS CUBE CLICKED (playerCube)");
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial emissive={emissive} color="black" />
    </mesh>
  );
}
