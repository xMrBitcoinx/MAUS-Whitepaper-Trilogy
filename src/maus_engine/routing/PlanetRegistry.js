// C:\Users\MrBitcoin\Documents\GitHub\maus\01frontend\maus-ui\src\maus-engine\routing\PlanetRegistry.js
// MAUS ENGINE — REGISTER ALL PLANETS + DIMENSIONS HERE

import EarthLayerScene from "../planets/EarthScene";
import MarsScene from "../planets/MarsScene";
import JupiterScene from "../planets/JupiterScene";
import SaturnScene from "../planets/SaturnScene";
import NasaNodeScene from "../planets/NasaNodeScene";
import SpaceXPlatformScene from "../planets/SpaceXPlatformScene";
import GovernmentSectorScene from "../planets/GovernmentSectorScene";
import FounderRealmScene from "../planets/FounderRealmScene";

export const PlanetRegistry = {
  "Earth Layer": {
    name: "Earth Layer",
    component: EarthLayerScene,
  },
  Mars: {
    name: "Mars",
    component: MarsScene,
  },
  Jupiter: {
    name: "Jupiter",
    component: JupiterScene,
  },
  Saturn: {
    name: "Saturn",
    component: SaturnScene,
  },
  NASA: {
    name: "NASA Orbital Node",
    component: NasaNodeScene,
  },
  SpaceX: {
    name: "SpaceX Launch Platform",
    component: SpaceXPlatformScene,
  },
  Government: {
    name: "Government Secure Sector",
    component: GovernmentSectorScene,
  },
  Founder: {
    name: "Founder Realm",
    component: FounderRealmScene,
  },
};
