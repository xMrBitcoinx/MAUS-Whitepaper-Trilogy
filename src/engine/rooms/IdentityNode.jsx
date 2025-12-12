// src/engine/rooms/IdentityNode.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function IdentityNode() {
  const ref = useRef();
  const pulseRef = useRef(0);

  useFrame((state, delta) => {
    // Floating animation
    ref.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;

    // Glow pulse animation
    pulseRef.current += delta;
    const intensity = 2.5 + Math.sin(pulseRef.current * 3) * 1.2;

    ref.current.material.emissiveIntensity = intensity;
  });

  return (
    <mesh ref={ref} position={[0, 1.2, 0]}>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={2.5}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}
