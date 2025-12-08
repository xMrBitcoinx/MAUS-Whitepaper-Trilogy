// 01frontend/maus-ui/src/maus/ui/MainMenu.jsx

import React from "react";
import { useSettings } from "../managers/SettingsManager";

export default function MainMenu() {
  const { settings, setMainMenuOpen } = useSettings();

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "12px 18px",
        background: "rgba(0, 0, 0, 0.65)",
        borderRadius: "8px",
        color: "#00ffea",
        fontFamily: "Arial, sans-serif",
        zIndex: 10,
        backdropFilter: "blur(6px)",
      }}
    >
      <h2 style={{ margin: 0, marginBottom: "10px", fontSize: "20px" }}>
        MAUS Main Menu
      </h2>

      <button
        onClick={() => setMainMenuOpen(!settings.mainMenuOpen)}
        style={{
          padding: "8px 14px",
          background: settings.mainMenuOpen ? "#ff0066" : "#00ffaa",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {settings.mainMenuOpen ? "Close Menu" : "Open Menu"}
      </button>

      {settings.mainMenuOpen && (
        <div style={{ marginTop: "12px", fontSize: "14px" }}>
          <p>Welcome to your MAUS environment.</p>
          <p>More menu controls will appear here soon.</p>
        </div>
      )}
    </div>
  );
}
