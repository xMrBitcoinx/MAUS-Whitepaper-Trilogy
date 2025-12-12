// 📄 01frontend/maus-ui/src/engine/PlayerController.jsx
// MAUS ENGINE 0.1 — FPS MOVEMENT + POINTER LOCK + GENESIS TRANSITIONS

import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const EYE_HEIGHT = 1.7;
const MOVE_SPEED = 0.12;

// Genesis portal position (must match App.jsx)
const GENESIS_EXIT_POS = new THREE.Vector3(0, 2, 12);
const GENESIS_TRIGGER_DISTANCE = 6.5;

export default function PlayerController({
  worldMode,
  onEnterGenesis,
  onExitGenesis,
}) {
  const { camera, gl } = useThree();
  const keys = useRef({});

  // Track mouse look movement
  const rotation = useRef({ x: 0, y: 0 });

  // -----------------------------
  // KEYBOARD INPUT HANDLING
  // -----------------------------
  useEffect(() => {
    const down = (e) => (keys.current[e.code] = true);
    const up = (e) => (keys.current[e.code] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // -----------------------------
  // MOUSE LOOK — POINTER LOCK
  // -----------------------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement === gl.domElement) {
        rotation.current.y -= e.movementX * 0.002;
        rotation.current.x -= e.movementY * 0.002;

        rotation.current.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, rotation.current.x)
        );

        camera.rotation.set(rotation.current.x, rotation.current.y, 0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gl, camera]);

  // -----------------------------
  // MAIN FPS MOVEMENT LOOP
  // -----------------------------
  useFrame(() => {
    // Keep player at eye level
    camera.position.y = EYE_HEIGHT;

    // GENESIS ROOM LOGIC
    if (worldMode === "GENESIS_ROOM") {
      const dist = camera.position.distanceTo(GENESIS_EXIT_POS);

      // Press E near portal = exit Genesis
      if (dist < GENESIS_TRIGGER_DISTANCE && keys.current["KeyE"]) {
        onExitGenesis();
      }

      return; // Skip grid movement while in Genesis
    }

    // GRID MODE — normal movement
    let forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    let right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize();

    if (keys.current["KeyW"]) camera.position.addScaledVector(forward, MOVE_SPEED);
    if (keys.current["KeyS"]) camera.position.addScaledVector(forward, -MOVE_SPEED);
    if (keys.current["KeyA"]) camera.position.addScaledVector(right, MOVE_SPEED);
    if (keys.current["KeyD"]) camera.position.addScaledVector(right, -MOVE_SPEED);

    // ENTER GENESIS (click cyan sphere handled in App.jsx)
  });

  return null;
}
