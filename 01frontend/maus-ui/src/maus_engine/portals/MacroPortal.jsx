// C:\Users\MrBitcoin\Documents\GitHub\maus\01frontend\maus-ui\src\maus-engine\portals\MacroPortal.jsx
// MAUS ENGINE — MACRO PLANET PORTAL (planet-scale portal with morphing + access control)

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import {
  canEnterPortal,
  resolvePortalVisuals,
} from "../access/AccessRules";

export default function MacroPortal({
  position = [0, 5, -10],
  identity = null,
  portalConfig = {},
  scale = 3,
  planetName = "Unknown Planet",
  hasRings = false,
  ringColor = "#ffffff",
  onEnterPlanet,
}) {
  const sphereRef = useRef(null);
  const swirlRef = useRef(null);
  const ringRef = useRef(null);

  const visuals = resolvePortalVisuals(identity);
  const color = new THREE.Color(visuals.color || "#00F6FF");

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Rotate sphere (soft rotation)
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.1;
      sphereRef.current.scale.set(
        scale + Math.sin(t * 1.5) * 0.05,
        scale + Math.sin(t * 1.5) * 0.05,
        scale + Math.sin(t * 1.5) * 0.05
      );
    }

    // Swirl effect
    if (swirlRef.current) {
      swirlRef.current.rotation.z += delta * 0.25;
      swirlRef.current.material.opacity =
        0.5 + Math.sin(t * 2.0) * 0.2;
    }

    // Rings (if enabled)
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  const canUse = canEnterPortal(identity, portalConfig);

  return (
    <group position={position}>
      {/* Planet Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={visuals.glowIntensity || 1.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Swirling Portal Field */}
      <mesh ref={swirlRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.1, 1.4, 128]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Planet Rings (optional) */}
      {hasRings && (
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <ringGeometry args={[1.5, 2.5, 90]} />
          <meshStandardMaterial
            color={ringColor}
            transparent
            opacity={0.6}
            emissive={ringColor}
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Access Panel */}
      <Html
        position={[0, scale + 1.5, 0]}
        style={{
          pointerEvents: "none",
          textAlign: "center",
          color: "#E0FFF9",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            padding: "6px 12px",
            borderRadius: "12px",
            background: "rgba(0,0,20,0.85)",
            border: "1px solid rgba(0,255,200,0.4)",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "14px" }}>
            {planetName}
          </div>
          <div style={{ opacity: 0.8 }}>
            {canUse ? "Access: Granted" : "Access: Restricted"}
          </div>
        </div>
      </Html>

      {/* Entry Trigger */}
      {canUse && (
        <mesh
          position={[0, 0, 0]}
          onClick={() =>
            typeof onEnterPlanet === "function" &&
            onEnterPlanet({
              planet: planetName,
              identity,
              visuals,
            })
          }
        >
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial
            transparent
            opacity={0}
          />
        </mesh>
      )}
    </group>
  );
}
