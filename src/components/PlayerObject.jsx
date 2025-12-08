// 01frontend/maus-ui/src/maus-engine/objects/PlayerObject.jsx
// -----------------------------------------------------------
// MAUS ENGINE 0.1 — PLAYER PHYSICAL BODY
// Capsule-style player collider used by PlayerController.
// This object is invisible but gives the player a presence
// in the 3D world.
// -----------------------------------------------------------

import React, { forwardRef } from "react";

const PlayerObject = forwardRef(function PlayerObject(props, ref) {
  return (
    <group ref={ref} position={[0, 1, 0]}>
      {/* Invisible capsule — used for debugging if needed */}
      <mesh visible={false}>
        {/* Capsule substitute (cylinder + spheres) */}
        <cylinderGeometry args={[0.35, 0.35, 1.2, 12]} />
        <meshStandardMaterial color="hotpink" transparent opacity={0.25} />
      </mesh>

      {/* Optional debug head — off by default */}
      {/* <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="yellow" />
      </mesh> */}
    </group>
  );
});

export default PlayerObject;
