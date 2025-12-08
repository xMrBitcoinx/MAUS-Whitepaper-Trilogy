// 01frontend/maus-ui/src/components/FlyUniverseScene.jsx

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function FlyUniverseScene() {
  const speed = 0.15;
  const keys = {};

  useEffect(() => {
    const down = (e) => (keys[e.key.toLowerCase()] = true);
    const up = (e) => (keys[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((state) => {
    const cam = state.camera;

    if (keys["w"]) cam.position.z -= speed;
    if (keys["s"]) cam.position.z += speed;
    if (keys["a"]) cam.position.x -= speed;
    if (keys["d"]) cam.position.x += speed;
  });

  return (
    <>
      <Stars radius={200} depth={50} count={6000} factor={6} fade speed={2} />

      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color={"#ffaa00"} emissive={"orange"} />
      </mesh>

      <pointLight position={[10, 10, 10]} intensity={2} />
      <ambientLight intensity={0.3} />
    </>
  );
}
