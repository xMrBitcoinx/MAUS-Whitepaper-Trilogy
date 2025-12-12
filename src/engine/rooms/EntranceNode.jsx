// src/engine/rooms/EntranceNode.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function EntranceNode() {
  const ringRef = useRef();
  const baseRef = useRef();
  const pulse = useRef(0);

  useFrame((state, delta) => {
    // Small hover / pulse
    pulse.current += delta * 2;

    // Subtle breathing glow
    const intensity = 0.6 + Math.sin(pulse.current) * 0.3;
    ringRef.current.material.emissiveIntensity = intensity;

    // Gentle rotation
    ringRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group position={[0, 0.05, 6]}>
      {/* Portal Base Disc */}
      <mesh ref={baseRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial color="#002a1e" />
      </mesh>

      {/* Neon Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.4, 64]} />
        <meshStandardMaterial
          emissive="#00ff88"
          emissiveIntensity={1.2}
          color="#003322"
        />
      </mesh>
    </group>
  );
}
