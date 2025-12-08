// 01frontend/maus-ui/src/controls/FlyControlsRig.jsx
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function FlyControlsRig() {
  const { camera } = useThree();
  const keys = useRef({});

  // Track keyboard inputs
  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // WASD + Space + Shift movement
  useFrame(() => {
    const speed = 0.15;       // Base movement speed
    const fast = 0.35;        // Shift = faster
    const moveSpeed = keys.current["shift"] ? fast : speed;

    if (keys.current["w"]) camera.position.z -= moveSpeed;
    if (keys.current["s"]) camera.position.z += moveSpeed;
    if (keys.current["a"]) camera.position.x -= moveSpeed;
    if (keys.current["d"]) camera.position.x += moveSpeed;

    if (keys.current[" "]) camera.position.y += moveSpeed;    // space = ascend  
    if (keys.current["control"]) camera.position.y -= moveSpeed;  // ctrl = descend
  });

  return null;
}
