// 01frontend/maus-ui/src/maus-engine/routing/PlanetSceneLoader.jsx
// LOADS PLANET SCENE OR TRAVEL TUNNEL

import React from "react";
import { usePlanetRouter } from "./PlanetRouter";
import TravelTunnel from "../portals/TravelTunnel";

import EarthScene from "../planets/EarthScene";
import GovernmentSectorScene from "../planets/GovernmentSectorScene";
import NasaNodeScene from "../planets/NasaNodeScene";
import SpaceXPlatformScene from "../planets/SpaceXPlatformScene";
import FounderRealmScene from "../planets/FounderRealmScene";

const SCENE_MAP = {
  earth: <EarthScene />,
  gov: <GovernmentSectorScene />,
  nasa: <NasaNodeScene />,
  spacex: <SpaceXPlatformScene />,
  founder: <FounderRealmScene />,
};

export default function PlanetSceneLoader() {
  const { currentPlanet, travelTarget, completeTravel } = usePlanetRouter();

  if (travelTarget) {
    return <TravelTunnel onEnd={completeTravel} />;
  }

  return SCENE_MAP[currentPlanet] || null;
}
