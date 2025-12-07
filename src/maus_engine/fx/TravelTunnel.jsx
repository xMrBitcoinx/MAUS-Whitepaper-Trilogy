// 📄 C:\Users\MrBitcoin\Documents\GitHub\maus\01frontend\maus-ui\src\maus-engine\fx\TravelTunnel.jsx
// MAUS ENGINE — FRACTAL GRID TRAVEL TUNNEL EFFECT (Engine 0.1)
// Handles tunnel animation, progress tracking, and onComplete callback.

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function TravelTunnel({
  progress = 0,
  onProgress = () => {},
  onComplete = () => {},
  destination = "UNKNOWN",
  hasRings = false,
}) {
  const tunnelRef = useRef();

  // Smooth animation control
  useFrame((state, delta) => {
    const speed = 0.45; // Adjust for faster/slower tunnel travel
    const newProgress = Math.min(progress + delta * speed, 1);

    onProgress(newProgress);

    // Rotation FX
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z += delta * 0.6;
      tunnelRef.current.rotation.x += delta * 0.2;
      tunnelRef.current.rotation.y += delta * 0.3;

      tunnelRef.current.scale.setScalar(1 + newProgress * 3.5); // Expands as you travel
    }

    // When tunnel reaches full progress → arrival
    if (newProgress >= 1) {
      console.log(
        "%c[MAUS TUNNEL] Complete → Handing off to PortalManager for destination: " +
          destination,
        "color:#4ade80"
      );
      onComplete();
    }
  });

  return (
    <group ref={tunnelRef}>
      {/* Base tunnel geometry */}
      <mesh>
        <torusKnotGeometry args={[2, 0.35, 250, 20]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#0088ff"
          emissiveIntensity={2.0}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Optional planetary rings visual during travel */}
      {hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.5, 6, 64]} />
          <meshBasicMaterial
            color="#66ccff"
            transparent
            opacity={0.35}
            side={2}
          />
        </mesh>
      )}
    </group>
  );
}
