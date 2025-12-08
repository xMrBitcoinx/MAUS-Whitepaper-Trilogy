// 01frontend/maus-ui/src/components/UniverseOverlay.jsx

import { Canvas } from "@react-three/fiber";
import FlyUniverseScene from "./FlyUniverseScene";

export default function UniverseOverlay({ visible, onClose }) {
  return (
    <div className={`universe-overlay ${visible ? "visible" : ""}`}>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          background: "black",
          color: "#0f0",
          border: "1px solid #0f0",
          fontSize: "16px",
          zIndex: 10,
        }}
      >
        Exit Universe
      </button>

      <Canvas
        camera={{ position: [0, 2, 6], fov: 60 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <FlyUniverseScene />
      </Canvas>
    </div>
  );
}
