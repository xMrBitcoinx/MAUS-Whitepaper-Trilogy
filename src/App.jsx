// 01frontend/maus-ui/src/App.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";

// Providers
import { SettingsProvider } from "./maus/managers/SettingsManager";
import { PlayerProvider } from "./maus-engine/state/PlayerManager.jsx";

// Engine controllers
import PlayerController from "./maus-engine/controllers/PlayerController.jsx";
import CameraRig from "./maus-engine/controllers/CameraRig.jsx";

// Rooms
import RoomManager from "./maus/rooms/RoomManager.jsx";

export default function App() {
  return (
    <PlayerProvider>
      <SettingsProvider>
        <Canvas
          camera={{ position: [0, 1.6, 5], fov: 60 }}
          shadows
        >
          <CameraRig />
          <PlayerController />
          <RoomManager />
        </Canvas>
      </SettingsProvider>
    </PlayerProvider>
  );
}
