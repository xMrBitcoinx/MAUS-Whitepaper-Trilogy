// 01frontend/maus-ui/src/maus/rooms/GreenvilleRoom.jsx

import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import portalRegistry from "./portalRegistry";

export default function GreenvilleRoom({
  playerRef,
  updatePortalTarget,
  environmentStyle,
}) {
  const portals = (portalRegistry && portalRegistry["earth_city_portal"]) || [];

  const getSkyColor = () => {
    switch (environmentStyle) {
      case "realistic":
        return "#87CEEB";
      case "stylized":
        return "#E8A87C";
      case "neon":
        return "#00111A";
      default:
        return "#87CEEB";
    }
  };

  const getMainLight = () => {
    switch (environmentStyle) {
      case "realistic":
        return { intensity: 1.2, color: "white" };
      case "stylized":
        return { intensity: 1.0, color: "#FFDDC1" };
      case "neon":
        return { intensity: 0.4, color: "#00ffff" };
      default:
        return { intensity: 1, color: "white" };
    }
  };

  const mainLight = getMainLight();

  useFrame(() => {
    if (!playerRef?.current || typeof updatePortalTarget !== "function") {
      return;
    }

    const pos = new THREE.Vector3().copy(playerRef.current.position);

    let nearest = null;
    let nearestDist = Infinity;

    portals.forEach((p) => {
      if (!p.position) return;
      const dist = pos.distanceTo(p.position);
      if (dist < nearestDist && dist < 3.2) {
        nearest = p;
        nearestDist = dist;
      }
    });

    updatePortalTarget(nearest || null);
  });

  return (
    <group>
      {/* Sky */}
      <color attach="background" args={[getSkyColor()]} />

      {/* Lighting */}
      <directionalLight
        intensity={mainLight.intensity}
        color={mainLight.color}
        position={[5, 12, 8]}
      />
      <ambientLight intensity={0.45} />

      {/* Water plane */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color={"#44DDE8"}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Rock formations */}
      <group>
        <RockBlock position={[-4, 0, -2]} scale={[2, 1, 1.5]} />
        <RockBlock position={[3, 0, -1.5]} scale={[1.5, 1, 1.2]} />
        <RockBlock position={[-1, 0, 3]} scale={[1.8, 1, 1.3]} />
      </group>

      {/* City skyline */}
      <CitySkyline position={[0, 0, -25]} />

      {/* Futuristic bridge */}
      <LibertyBridge />

      {/* Portals */}
      {portals.map((portal, i) => (
        <PortalGate key={i} portal={portal} />
      ))}
    </group>
  );
}

function LibertyBridge() {
  return (
    <group position={[0, 1.2, 0]}>
      <mesh>
        <boxGeometry args={[12, 0.2, 2.5]} />
        <meshStandardMaterial
          color={"#2C2F33"}
          emissive={"#00ffff"}
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[0, 0.7, 1.3]}>
        <boxGeometry args={[12, 0.1, 0.1]} />
        <meshStandardMaterial
          color={"#00ffff"}
          emissive={"#00ffff"}
          emissiveIntensity={1.5}
        />
      </mesh>

      <mesh position={[0, 0.7, -1.3]}>
        <boxGeometry args={[12, 0.1, 0.1]} />
        <meshStandardMaterial
          color={"#00ffff"}
          emissive={"#00ffff"}
          emissiveIntensity={1.5}
        />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 2, 0]}>
        <torusGeometry args={[5, 0.1, 12, 48]} />
        <meshStandardMaterial
          color={"#00ffff"}
          emissive={"#00ffff"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function PortalGate({ portal }) {
  const position = portal.position || new THREE.Vector3(0, 1, -3);
  const rotation = portal.rotation || new THREE.Euler(0, 0, 0);

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[1.2, 0.1, 16, 32]} />
        <meshStandardMaterial
          color={"#00ffff"}
          emissive={"#00ffff"}
          emissiveIntensity={1.6}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.6, 2.6]} />
        <meshBasicMaterial
          color={"#003344"}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}

function RockBlock({ position, scale }) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#666666"} />
    </mesh>
  );
}

function CitySkyline({ position }) {
  return (
    <group position={position}>
      <Building pos={[-10, 6, 0]} size={[4, 12, 4]} />
      <Building pos={[5, 5, 0]} size={[3, 10, 3]} />
      <Building pos={[-3, 4, 0]} size={[2, 8, 2]} />
      <Building pos={[10, 6, 0]} size={[4, 12, 4]} />
    </group>
  );
}

function Building({ pos, size }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={"#1A1A1A"}
        emissive={"#002244"}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
