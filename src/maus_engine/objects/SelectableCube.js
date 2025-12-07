// 01frontend/maus-ui/src/objects/SelectableCube.jsx
import React, { useState } from "react";

export default function SelectableCube(props) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      name="MAUS_CUBE"
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setActive((prev) => !prev);
        console.log("MAUS CUBE CLICKED");
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        emissive={active ? "lime" : hovered ? "deepskyblue" : "#00eaff"}
        color="black"
      />
    </mesh>
  );
}
