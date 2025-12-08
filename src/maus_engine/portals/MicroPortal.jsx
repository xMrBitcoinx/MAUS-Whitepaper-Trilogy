// C:\Users\MrBitcoin\Documents\GitHub\maus\01frontend\maus-ui\src\maus-engine\portals\MicroPortal.jsx
// MAUS ENGINE — Micro-Portal node (spherical portal) using identity + access rules

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  canEnterPortal,
  resolvePortalVisuals,
} from "../access/AccessRules";

function MicroPortal({
  position = [0, 1, 0],
  identity = null,
  portalConfig = {},
  activationRadius = 3.0,
  onActivate,
  label = "Micro Portal",
}) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const baseRef = useRef(null);
  const { camera } = useThree();

  const [isActive, setIsActive] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const visuals = resolvePortalVisuals(identity);
  const baseColor = new THREE.Color(visuals.color || "#00F6FF");

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current) return;

    const t = state.clock.getElapsedTime();

    // Floating motion
    const floatHeight = Math.sin(t * 1.2) * 0.15;
    groupRef.current.position.y = position[1] + floatHeight;

    // Core rotation
    coreRef.current.rotation.y += delta * 0.6;

    // Ring + base subtle rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
    if (baseRef.current) {
      baseRef.current.rotation.y -= delta * 0.25;
    }

    // Founder special: pulsating brightness
    const isFounderStyle =
      visuals.styleKey && visuals.styleKey.indexOf("founder") === 0;
    const emissiveBoost = isFounderStyle
      ? 0.6 + Math.sin(t * 2.0) * 0.4
      : 0.0;

    const intensity = (visuals.glowIntensity || 1.0) + emissiveBoost;
    const material = coreRef.current.material;
    if (material) {
      material.emissive = baseColor.clone();
      material.emissiveIntensity = intensity;
    }

    // Activation logic based on camera proximity + permissions
    const portalPos = new THREE.Vector3().setFromMatrixPosition(
      groupRef.current.matrixWorld
    );
    const camPos = camera.position.clone();
    const distance = portalPos.distanceTo(camPos);

    const canUse = canEnterPortal(identity, portalConfig);

    // If close enough and allowed, mark active
    const shouldBeActive = distance <= activationRadius && canUse;
    if (shouldBeActive && !isActive) {
      setIsActive(true);
    } else if (!shouldBeActive && isActive && !hasTriggered) {
      // leaving area without triggering fully
      setIsActive(false);
    }

    // Once active and not yet triggered, fire onActivate
    if (isActive && !hasTriggered) {
      setHasTriggered(true);
      if (typeof onActivate === "function") {
        onActivate({
          identity,
          portalConfig,
          distance,
          visuals,
        });
      }
    }

    // Active visual expansion (pre-morph state)
    if (isActive && coreRef.current) {
      const scalePulse = 1.0 + Math.sin(t * 5.0) * 0.2;
      coreRef.current.scale.set(1.6 * scalePulse, 1.6 * scalePulse, 1.6 * scalePulse);

      if (ringRef.current) {
        const ringScale = 1.8 + Math.sin(t * 4.0) * 0.3;
        ringRef.current.scale.set(ringScale, ringScale, ringScale);
      }
    } else {
      // idle scale
      coreRef.current.scale.set(1, 1, 1);
      if (ringRef.current) {
        ringRef.current.scale.set(1.4, 1.4, 1.4);
      }
    }
  });

  const canUse = canEnterPortal(identity, portalConfig);
  const ringColor = baseColor.clone();
  const baseColorMuted = baseColor.clone().multiplyScalar(0.4);

  return (
    <group ref={groupRef} position={position}>
      {/* Core holographic sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={0.2}
          roughness={0.1}
          emissive={baseColor}
          emissiveIntensity={visuals.glowIntensity || 1.0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Rotating energy ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.0, 64]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating fractal-ish base disc */}
      <mesh ref={baseRef} position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.08, 24]} />
        <meshStandardMaterial
          color={baseColorMuted}
          metalness={0.6}
          roughness={0.4}
          emissive={baseColorMuted}
          emissiveIntensity={(visuals.glowIntensity || 1.0) * 0.5}
        />
      </mesh>

      {/* Floating label + status */}
      <Html
        position={[0, 1.4, 0]}
        style={{
          pointerEvents: "none",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "11px",
          textAlign: "center",
          color: "#E0FFF9",
        }}
      >
        <div
          style={{
            padding: "4px 8px",
            borderRadius: "10px",
            border: "1px solid rgba(0,255,200,0.4)",
            background:
              "linear-gradient(135deg, rgba(3,5,10,0.9), rgba(12,0,40,0.9))",
          }}
        >
          <div style={{ fontWeight: 600 }}>{label}</div>
          <div style={{ opacity: 0.8 }}>
            {canUse ? "Access: Granted" : "Access: Restricted"}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default MicroPortal;
