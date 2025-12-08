// 01frontend/maus-ui/src/controls/FirstPersonCameraRig.jsx
import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FirstPersonCameraRig({ target }) {
  const { camera, gl } = useThree();
  const keys = useRef({});
  const isPointerLocked = useRef(false);

  // Keyboard tracking
  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Pointer lock (click to lock, Esc to unlock)
  useEffect(() => {
    const domElement = gl.domElement;

    const handleClick = () => {
      if (!isPointerLocked.current) {
        domElement.requestPointerLock?.();
      }
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current =
        document.pointerLockElement === domElement;
    };

    domElement.addEventListener("click", handleClick);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      domElement.removeEventListener("click", handleClick);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, [gl]);

  // Mouse look (yaw / pitch)
  const yaw = useRef(0);
  const pitch = useRef(0);

  useEffect(() => {
    const domElement = gl.domElement;

    const onMouseMove = (event) => {
      if (!isPointerLocked.current) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      const sensitivity = 0.002;
      yaw.current -= movementX * sensitivity;
      pitch.current -= movementY * sensitivity;

      const maxPitch = Math.PI / 2 - 0.01;
      pitch.current = Math.max(-maxPitch, Math.min(maxPitch, pitch.current));
    };

    domElement.addEventListener("mousemove", onMouseMove);

    return () => {
      domElement.removeEventListener("mousemove", onMouseMove);
    };
  }, [gl]);

  // Main first-person loop
  useFrame((_, delta) => {
    if (!target) return;

    const speed = 4; // units per second

    // Direction vector from yaw / pitch
    const direction = new THREE.Vector3(
      Math.sin(yaw.current) * Math.cos(pitch.current),
      Math.sin(pitch.current),
      Math.cos(yaw.current) * Math.cos(pitch.current)
    ).normalize();

    const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

    const move = new THREE.Vector3();

    if (keys.current["w"]) move.add(forward);
    if (keys.current["s"]) move.sub(forward);
    if (keys.current["a"]) move.sub(right);
    if (keys.current["d"]) move.add(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed * delta);
      target.position.add(move);
    }

    // Camera slightly above cube
    const eyeOffset = new THREE.Vector3(0, 1.2, 0);
    const cameraPos = new THREE.Vector3().copy(target.position).add(eyeOffset);

    camera.position.copy(cameraPos);
    camera.lookAt(target.position);
  });

  return null;
}
