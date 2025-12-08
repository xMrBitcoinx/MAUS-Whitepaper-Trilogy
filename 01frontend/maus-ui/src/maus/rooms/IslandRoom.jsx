// 01frontend/maus-ui/src/maus/rooms/IslandRoom.jsx

import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import portalRegistry from "./portalRegistry";

export default function IslandRoom({
  playerRef,
  updatePortalTarget,
  environmentStyle,
}) {
  const portals = (portalRegistry && portalRegistry["island_hq"]) || [];

  const skyColor =
    environmentStyle === "realistic"
      ? "#87CEEB"
      : environmentStyle === "neon"
      ? "#001122"
      : "#7ec8e3";

  const sandColor =
    environmentStyle === "stylized"
      ? "#fffaf0"
      : environmentStyle === "realistic"
      ? "#f5deb3"
      : "#66e0ff";

  const waterColor =
    environmentStyle === "stylized"
      ? "#4dcfe0"
      : environmentStyle === "realistic"
      ? "#3bbfd1"
      : "#00aaff";

  // Portal detection (safe-guarded)
  useFrame(() => {
    if (!playerRef?.current || typeof updatePortalTarget !== "function") {
      return;
    }

    const playerPos = new THREE.Vector3().copy(playerRef.current.position);

    let nearest = null;
    let nearestDist = Infinity;

    portals.forEach((p) => {
      if (!p.position) return;
      const dist = playerPos.distanceTo(p.position);
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
      <color attach="background" args={[skyColor]} />

      {/* Lights */}
      <directionalLight
        intensity={1.3}
        position={[5, 12, 8]}
        color={"white"}
      />
      <ambientLight intensity={0.45} />

      {/* Beach sand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={sandColor} />
      </mesh>

      {/* Water */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color={waterColor}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Palms */}
      <group>
        <Palm position={[-5, 0, -3]} />
        <Palm position={[6, 0, -2]} />
        <Palm position={[4, 0, 3]} />
        <Palm position={[-3, 0, 6]} />
      </group>

      {/* Portals */}
      {portals.map((portal, i) => (
        <PortalGate key={i} portal={portal} />
      ))}
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

function Palm({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.25, 3, 12]} />
        <meshStandardMaterial color={"#8b5a2b"} />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[1.2, 12, 12]} />
        <meshStandardMaterial
          color={"#2ecc71"}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
