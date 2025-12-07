// 01frontend/maus-ui/src/maus-engine/controllers/PlayerController.jsx
// -------------------------------------------------------------------
// MAUS ENGINE 0.1 — B3 Movement Controller
// Battlefield + Halo–inspired WASD physics with:
// - acceleration
// - friction
// - sprinting
// - jumping
// - gravity
// - mouse look
// - camera follow
// -------------------------------------------------------------------

import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePlayer } from "../state/PlayerManager";

export default function PlayerController() {
  const {
    playerRef,
    velocity,
    setVelocity,
    grounded,
    setGrounded,
    inputs,
    setInputs,
  } = usePlayer();

  const { camera } = useThree();
  const pitchRef = useRef(0); // vertical rotation

  // ----------------------------------------
  // MOVEMENT CONSTANTS (tunable)
  // ----------------------------------------
  const ACCEL = 18;
  const SPRINT_MULT = 1.7;
  const FRICTION = 9.5;
  const GRAVITY = -22;
  const JUMP_FORCE = 9;

  // ----------------------------------------
  // INPUT HANDLING
  // ----------------------------------------
  useEffect(() => {
    const down = (e) => {
      if (e.key === "w") inputs.forward = true;
      if (e.key === "s") inputs.backward = true;
      if (e.key === "a") inputs.left = true;
      if (e.key === "d") inputs.right = true;
      if (e.key === "Shift") inputs.sprint = true;
      if (e.key === " ") inputs.jump = true;
      setInputs({ ...inputs });
    };

    const up = (e) => {
      if (e.key === "w") inputs.forward = false;
      if (e.key === "s") inputs.backward = false;
      if (e.key === "a") inputs.left = false;
      if (e.key === "d") inputs.right = false;
      if (e.key === "Shift") inputs.sprint = false;
      if (e.key === " ") inputs.jump = false;
      setInputs({ ...inputs });
    };

    const mouseMove = (e) => {
      inputs.mouseDelta = [e.movementX, e.movementY];
      setInputs({ ...inputs });
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [inputs, setInputs]);

  // ----------------------------------------
  // MAIN PHYSICS LOOP
  // ----------------------------------------
  useFrame((_, delta) => {
    const body = playerRef.current;
    if (!body) return;

    let [vx, vy, vz] = velocity;
    const speedMult = inputs.sprint ? SPRINT_MULT : 1;

    // ----------------------------------------
    // CAMERA LOOK (Mouse movement)
    // ----------------------------------------
    const lookSpeed = 0.0025;

    body.rotation.y -= inputs.mouseDelta[0] * lookSpeed; // yaw
    pitchRef.current -= inputs.mouseDelta[1] * lookSpeed; // pitch

    pitchRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchRef.current));

    // attach camera to player's head
    camera.position.lerp(
      new THREE.Vector3(
        body.position.x,
        body.position.y + 0.6,
        body.position.z
      ),
      0.35
    );
    camera.rotation.set(pitchRef.current, body.rotation.y, 0);

    // reset mouse delta each frame
    inputs.mouseDelta = [0, 0];

    // ----------------------------------------
    // MOVEMENT FORCES
    // ----------------------------------------
    const dir = new THREE.Vector3();

    if (inputs.forward) dir.z -= 1;
    if (inputs.backward) dir.z += 1;
    if (inputs.left) dir.x -= 1;
    if (inputs.right) dir.x += 1;

    if (dir.length() > 0) dir.normalize();

    // Rotate movement by player's yaw
    dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), body.rotation.y);

    // Acceleration
    vx += dir.x * ACCEL * speedMult * delta;
    vz += dir.z * ACCEL * speedMult * delta;

    // ----------------------------------------
    // FRICTION
    // ----------------------------------------
    vx -= vx * FRICTION * delta;
    vz -= vz * FRICTION * delta;

    // ----------------------------------------
    // GRAVITY + JUMP
    // ----------------------------------------
    if (grounded) {
      vy = 0;
      if (inputs.jump) {
        vy = JUMP_FORCE;
        setGrounded(false);
      }
    } else {
      vy += GRAVITY * delta;
    }

    // ----------------------------------------
    // APPLY MOTION
    // ----------------------------------------
    body.position.x += vx * delta;
    body.position.y += vy * delta;
    body.position.z += vz * delta;

    // ----------------------------------------
    // GROUND CHECK
    // (Simple: if y <= 1, we consider grounded)
    // ----------------------------------------
    if (body.position.y <= 1) {
      body.position.y = 1;
      setGrounded(true);
    }

    // Update state
    setVelocity([vx, vy, vz]);
  });

  return null;
}
