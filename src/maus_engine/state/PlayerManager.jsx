// 01frontend/maus-ui/src/maus-engine/state/PlayerManager.jsx
// ----------------------------------------------------------
// MAUS ENGINE 0.1 — PLAYER STATE MANAGER
// Keeps the player's position, velocity, inputs, and physics
// consistent across the entire engine.
// ----------------------------------------------------------

import React, { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  // ----------------------------------------------------------
  // REF: Player's 3D transform (position + rotation)
  // This ref is passed to the PlayerObject (actual body)
  // ----------------------------------------------------------
  const playerRef = useRef(null);

  // ----------------------------------------------------------
  // PHYSICS STATE
  // ----------------------------------------------------------
  const [velocity, setVelocity] = useState([0, 0, 0]); // vx, vy, vz
  const [grounded, setGrounded] = useState(false);

  // ----------------------------------------------------------
  // INPUT STATE
  // ----------------------------------------------------------
  const [inputs, setInputs] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    mouseDelta: [0, 0],
  });

  // ----------------------------------------------------------
  // EXPORTED CONTEXT VALUE
  // ----------------------------------------------------------
  const value = {
    playerRef,
    velocity,
    setVelocity,
    grounded,
    setGrounded,
    inputs,
    setInputs,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

// ----------------------------------------------------------
// HOOK: Use the player context anywhere in the engine
// ----------------------------------------------------------
export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used inside <PlayerProvider>");
  }
  return ctx;
}

export default PlayerProvider;
