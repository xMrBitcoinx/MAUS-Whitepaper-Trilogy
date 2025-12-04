// 01frontend/maus-ui/src/objects/NeonGrid.jsx
import React from "react";

export default function NeonGrid({
  size = 40,
  divisions = 40,
  color = "#00eaff",
}) {
  return (
    <gridHelper
      args={[size, divisions, color, color]}
      position={[0, 0, 0]}
    />
  );
}
