// 01frontend/maus-ui/src/components/DebugHUD.jsx
import React from "react";

export default function DebugHUD({ selected, cameraPos }) {
  const camText =
    cameraPos && typeof cameraPos.x === "number"
      ? `${cameraPos.x.toFixed(2)}, ${cameraPos.y.toFixed(2)}, ${cameraPos.z.toFixed(2)}`
      : "0,0,0";

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "10px 14px",
        background: "rgba(0,0,0,0.65)",
        color: "#00eaff",
        fontFamily: "monospace",
        fontSize: "13px",
        lineHeight: "18px",
        border: "1px solid #00eaff",
        borderRadius: "6px",
        zIndex: 9999,
        pointerEvents: "none",
        minWidth: "260px",
      }}
    >
      <div style={{ fontWeight: "bold" }}>MAUS HUD</div>
      <div>────────────────────</div>
      <div>Cam: {camText}</div>
      <div>Selected: {selected || "none"}</div>

      <div style={{ marginTop: "6px", fontWeight: "bold" }}>Controls</div>
      <div>W / A / S / D — move cube</div>
      <div>Mouse — look around</div>
      <div>Click cube — enter FP mode</div>
      <div>Click viewport — lock cursor</div>
      <div>Esc — release cursor</div>
    </div>
  );
}
