// 01frontend/maus-ui/src/maus-engine/portals/PortalNetworkMap.jsx

import React from "react";
import { usePlanetRouter } from "../routing/PlanetRouter";

const NODES = ["earth", "gov", "nasa", "spacex", "founder"];

export default function PortalNetworkMap() {
  const { currentPlanet } = usePlanetRouter();

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "8px 12px",
        background: "rgba(0,0,0,0.65)",
        borderRadius: 8,
        fontSize: 12,
        color: "#fff",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>MAUS Portal Network</div>
      {NODES.map((node) => (
        <div
          key={node}
          style={{
            opacity: node === currentPlanet ? 1 : 0.5,
            fontWeight: node === currentPlanet ? 700 : 400,
          }}
        >
          {node === currentPlanet ? "●" : "○"} {node}
        </div>
      ))}
    </div>
  );
}
