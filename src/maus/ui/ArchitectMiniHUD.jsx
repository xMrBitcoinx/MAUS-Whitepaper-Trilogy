// 01frontend/src/ui/ArchitectMiniHUD.jsx
import React from "react";
import { useSettings } from "../managers/SettingsManager";

export default function ArchitectMiniHUD() {
  const {
    architectHUDVisible,
    setArchitectHUDVisible,
    architectHUDPosition,
    setArchitectHUDPosition,
    architectHUDSize,
    setArchitectHUDSize,
  } = useSettings();

  const toggleVisibility = () => {
    setArchitectHUDVisible(!architectHUDVisible);
  };

  const handlePositionChange = (x, y) => {
    setArchitectHUDPosition({ x, y });
  };

  const handleSizeChange = (width, height) => {
    setArchitectHUDSize({ width, height });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: architectHUDPosition.y,
        left: architectHUDPosition.x,
        width: architectHUDSize.width,
        height: architectHUDSize.height,
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
        borderRadius: "10px",
        padding: "10px",
        zIndex: 99999,
        display: architectHUDVisible ? "block" : "none",
      }}
    >
      <h4>Architect Mini HUD</h4>
      <div>
        <button onClick={toggleVisibility}>
          {architectHUDVisible ? "Hide" : "Show"} HUD
        </button>
      </div>
      <div>
        <button
          onClick={() => handlePositionChange(architectHUDPosition.x + 10, architectHUDPosition.y)}
        >
          Move Right
        </button>
        <button
          onClick={() => handlePositionChange(architectHUDPosition.x - 10, architectHUDPosition.y)}
        >
          Move Left
        </button>
        <button
          onClick={() => handlePositionChange(architectHUDPosition.x, architectHUDPosition.y + 10)}
        >
          Move Down
        </button>
        <button
          onClick={() => handlePositionChange(architectHUDPosition.x, architectHUDPosition.y - 10)}
        >
          Move Up
        </button>
      </div>
      <div>
        <button
          onClick={() => handleSizeChange(architectHUDSize.width + 10, architectHUDSize.height + 10)}
        >
          Enlarge HUD
        </button>
        <button
          onClick={() => handleSizeChange(architectHUDSize.width - 10, architectHUDSize.height - 10)}
        >
          Shrink HUD
        </button>
      </div>
    </div>
  );
}
