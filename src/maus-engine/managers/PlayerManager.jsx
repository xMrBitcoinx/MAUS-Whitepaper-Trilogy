// 01frontend/maus-ui/src/maus-engine/state/PlayerManager.jsx
import React, { createContext, useContext, useRef, useState } from "react";

// -------------------------------------------
// PLAYER CONTEXT
// -------------------------------------------
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  // Player world position
  const position = useRef([0, 1.6, 0]);

  // Player velocity (movement speed)
  const velocity = useRef([0, 0, 0]);

  // Player rotation (camera direction)
  const rotation = useRef([0, 0, 0]);

  // Is player grounded?
  const onGround = useRef(true);

  // Keys being held down
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    shift: false,
    ctrl: false,
  });

  // Currently targeted portal (null if none)
  const [portalTarget, setPortalTarget] = useState(null);

  // Active room (GridRoom, IslandRoom, PortalRoom, etc.)
  const [activeRoom, setActiveRoom] = useState("GridRoom");

  const value = {
    position,
    velocity,
    rotation,
    onGround,
    keys,
    portalTarget,
    setPortalTarget,
    activeRoom,
    setActiveRoom,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

// -------------------------------------------
// HOOK — usePlayer()
// -------------------------------------------
export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer() must be used inside <PlayerProvider>");
  }
  return ctx;
}

export default PlayerProvider;
