// 01frontend/maus-ui/src/components/MausDashboard.jsx

import { useNavigate } from "react-router-dom";

export default function MausDashboard({ visible, onUniversePress }) {
  const navigate = useNavigate();

  return (
    <div className={`dashboard ${visible ? "visible" : ""}`}>
      <h1 style={{ color: "#00ff9e", textAlign: "center", marginTop: "20px" }}>
        MAUS OS Dashboard
      </h1>

      <div className="dashboard-panels">
        <div className="panel">Payments</div>
        <div className="panel">Legal</div>
        <div className="panel">Chat</div>
        <div className="panel">Notes</div>
        <div className="panel">System Status</div>
      </div>

      {/* Universe Overlay (Option B) */}
      <button className="universe-button" onClick={onUniversePress}>
        Enter Universe (Overlay)
      </button>

      {/* MAUS WORLD (Option C) */}
      <button
        onClick={() => navigate("/universe")}
        style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          padding: "16px 24px",
          fontSize: "18px",
          background: "black",
          color: "#00e5ff",
          border: "1px solid #00e5ff",
          cursor: "pointer",
        }}
      >
        MAUS World (3D Page)
      </button>
    </div>
  );
}
