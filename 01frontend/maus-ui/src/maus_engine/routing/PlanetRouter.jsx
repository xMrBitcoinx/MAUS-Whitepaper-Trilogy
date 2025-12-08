// 01frontend/maus-ui/src/maus-engine/routing/PlanetRouter.jsx
// ROUTER WITH TRAVEL STATE

import React, { createContext, useContext, useState, useCallback } from "react";

const PlanetRouterContext = createContext(null);

export function PlanetRouterProvider({ children }) {
  const [currentPlanet, setCurrentPlanet] = useState("earth");
  const [travelTarget, setTravelTarget] = useState(null);

  const beginTravel = useCallback((planetId) => {
    setTravelTarget(planetId);
  }, []);

  const completeTravel = useCallback(() => {
    if (travelTarget) {
      setCurrentPlanet(travelTarget);
    }
    setTravelTarget(null);
  }, [travelTarget]);

  return (
    <PlanetRouterContext.Provider
      value={{
        currentPlanet,
        travelTarget,
        beginTravel,
        completeTravel,
      }}
    >
      {children}
    </PlanetRouterContext.Provider>
  );
}

export function usePlanetRouter() {
  const ctx = useContext(PlanetRouterContext);
  if (!ctx) {
    throw new Error("usePlanetRouter must be used inside <PlanetRouterProvider>");
  }
  return ctx;
}
