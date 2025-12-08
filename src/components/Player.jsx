// 01frontend/src/components/Player.jsx
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Player() {
  const { camera } = useThree();

  // Player body collider
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const onGround = useRef(true);

  // Movement keys
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  // Key handling
  useEffect(() => {
    const down = (e) => {
      if (e.code === "KeyW") keys.current.forward = true;
      if (e.code === "KeyS") keys.current.backward = true;
      if (e.code === "KeyA") keys.current.left = true;
      if (e.code === "KeyD") keys.current.right = true;
      if (e.code === "ShiftLeft") keys.current.sprint = true;
    };
    const up = (e) => {
      if (e.code === "KeyW") keys.current.forward = false;
      if (e.code === "KeyS") keys.current.backward = false;
      if (e.code === "KeyA") keys.current.left = false;
      if (e.code === "KeyD") keys.current.right = false;
      if (e.code === "ShiftLeft") keys.current.sprint = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Mouse lock
  useEffect(() => {
    const handleClick = () => {
      document.body.requestPointerLock();
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Movement loop
  useFrame((_, delta) => {
    const SPEED = keys.current.sprint ? 18 : 10;

    direction.current.set(
      (keys.current.left ? 1 : 0) - (keys.current.right ? 1 : 0),
      0,
      (keys.current.forward ? 1 : 0) - (keys.current.backward ? 1 : 0)
    );

    direction.current.normalize();

    // Apply movement in camera-relative direction
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    velocity.current.x = right.x * direction.current.x * SPEED * delta * -1;
    velocity.current.z = forward.z * direction.current.z * SPEED * delta;

    camera.position.x += velocity.current.x;
    camera.position.z += velocity.current.z;

    // Ground lock
    camera.position.y = 3; // Height of capsule head
  });

  return null;
}
