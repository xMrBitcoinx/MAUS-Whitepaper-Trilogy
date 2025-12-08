// 01frontend/maus-ui/src/maus-engine/camera/CameraRig.jsx
// ------------------------------------------------------------------
// MAUS ENGINE 0.1 — CAMERA RIG
// Smooth FPS camera follow system with:
// - Cinematic damping
// - Tilt on movement
// - Sprint tilt boost
// - Independent pitch/yaw sync
// - Fully compatible with PlayerManager + PlayerController
// ------------------------------------------------------------------

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePlayer } from "../state/PlayerManager";

export default function CameraRig() {
  const { camera } = useThree();
  const { playerRef, velocity } = usePlayer();

  const smoothedPos = useRef(new THREE.Vector3());
  const smoothedRot = useRef(new THREE.Euler(0, 0, 0, "YXZ")); // FPS rotation order

  // Tilt amount
  const tiltRef = useRef(0);

  useFrame((_, delta) => {
    const player = playerRef.current;
    if (!player) return;

    const [vx, vy, vz] = velocity;

    // ----------------------------------------------
    // CAMERA TARGET POSITION (eye level)
    // ----------------------------------------------
    const targetPos = new THREE.Vector3(
      player.position.x,
      player.position.y + 0.65,
      player.position.z
    );

    // Smooth follow (LERP)
    smoothedPos.current.lerp(targetPos, 1.8 * delta);
    camera.position.copy(smoothedPos.current);

    // ----------------------------------------------
    // CAMERA ROTATION — sync to player yaw/pitch
    // (Pitch is applied in PlayerController)
    // ----------------------------------------------
    const targetRot = new THREE.Euler(
      camera.rotation.x, // pitch stays controlled by PlayerController
      player.rotation.y, // yaw synced to player
      0,
      "YXZ"
    );

    smoothedRot.current.x = THREE.MathUtils.lerp(
      smoothedRot.current.x,
      targetRot.x,
      10 * delta
    );

    smoothedRot.current.y = THREE.MathUtils.lerp(
      smoothedRot.current.y,
      targetRot.y,
      10 * delta
    );

    // ----------------------------------------------
    // MOVEMENT-BASED CAMERA TILT (leaning effect)
    // ----------------------------------------------
    const speed = Math.sqrt(vx * vx + vz * vz);
    const maxTilt = 0.055; // subtle, FPS-style tilt

    // Tilt when strafing left/right
    const tiltTarget = THREE.MathUtils.clamp(-vx * 0.015, -maxTilt, maxTilt);

    tiltRef.current = THREE.MathUtils.lerp(
      tiltRef.current,
      tiltTarget,
      6 * delta
    );

    smoothedRot.current.z = tiltRef.current;

    // Apply the final rotation to the camera
    camera.rotation.set(
      smoothedRot.current.x,
      smoothedRot.current.y,
      smoothedRot.current.z
    );
  });

  return null;
}
