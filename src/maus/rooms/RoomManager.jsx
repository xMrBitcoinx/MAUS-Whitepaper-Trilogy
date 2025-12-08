// 01frontend/maus-ui/src/maus-engine/managers/PlayerManager.jsx
// --------------------------------------------------------------
// MAUS ENGINE — Central Player State Manager
// Provides the shared playerRef for movement, camera control, 
// and room systems. Required for PlayerController and all rooms.
// --------------------------------------------------------------

import React, { createContext, useContext, useRef } from "react";

// Create context
const PlayerContext = createContext(null);

// Provider component
export function PlayerProvider({ children }) {
  // This is the master player object that controllers and rooms share.
  // PlayerController.jsx moves this mesh and attaches the camera to it.
  const playerRef = useRef(null);

  const api = {
    playerRef,
  };

  return (
    <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>
  );
}

// Hook to use player state
export function usePlayer() {
  const ctx = useContext(PlayerContext);

  if (!ctx) {
    throw new Error("usePlayer must be used inside <PlayerProvider>");
  }

  return ctx;
}

export default PlayerProvider;
