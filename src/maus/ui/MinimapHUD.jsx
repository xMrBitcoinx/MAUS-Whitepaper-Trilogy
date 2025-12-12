// 01frontend/src/ui/MinimapHUD.jsx
import React, { useEffect, useState } from "react";
import { useSettings } from "../managers/SettingsManager";

const MAP_SIZE = 500; // Example size of the map grid (1000 x 1000 units)

export default function MinimapHUD({ playerRef }) {
  const { environmentStyle } = useSettings();
  const [mapPosition, setMapPosition] = useState({ x: 0, z: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  // Update map position based on player's position
  useEffect(() => {
    const updatePosition = () => {
      setMapPosition({
        x: playerRef.current.position.x,
        z: playerRef.current.position.z,
      });
    };

    // Update every frame
    const interval = setInterval(updatePosition, 100);

    return () => clearInterval(interval);
  }, [playerRef]);

  // Update zoom level (for minimap zoom in and out)
  const handleZoom = (e) => {
    if (e.deltaY > 0) setZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Zoom in
    if (e.deltaY < 0) setZoomLevel(Math.max(zoomLevel - 0.1, 0.5)); // Zoom out
  };

  useEffect(() => {
    window.addEventListener("wheel", handleZoom);

    return () => {
      window.removeEventListener("wheel", handleZoom);
    };
  }, [zoomLevel]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        width: 200 * zoomLevel,
        height: 200 * zoomLevel,
        background: "rgba(0, 0, 0, 0.6)",
        borderRadius: "10px",
        padding: "10px",
        color: "white",
        boxShadow: "0 0 15px rgba(0,255,255,0.3)",
        zIndex: 99999,
      }}
    >
      <h4 style={{ textAlign: "center" }}>MAUS Minimap</h4>

      {/* Map background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#333",
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Player Marker */}
        <div
          style={{
            position: "absolute",
            top: `${(mapPosition.z / MAP_SIZE) * 100}%`,
            left: `${(mapPosition.x / MAP_SIZE) * 100}%`,
            width: "10px",
            height: "10px",
            backgroundColor: "cyan",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        ></div>

        {/* City Grid (simplified for now) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "2px solid rgba(0, 255, 255, 0.3)",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        ></div>
      </div>
    </div>
  );
}
