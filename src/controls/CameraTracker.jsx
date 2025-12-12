// 01frontend/maus-ui/src/controls/CameraTracker.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraTracker({ onUpdate }) {
  const { camera } = useThree();
  const accum = useRef(0);

  useFrame((_, delta) => {
    if (typeof onUpdate !== "function") return;

    accum.current += delta;
    if (accum.current < 0.05) return; // ~20 updates/sec
    accum.current = 0;

    const { x, y, z } = camera.position;
    onUpdate({ x, y, z });
  });

  return null;
}
