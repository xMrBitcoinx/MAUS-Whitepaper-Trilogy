// 01frontend/src/maus/rooms/portalRegistry.js
import * as THREE from "three";

const portalRegistry = {
  // ---------------------------------------------------
  // 🌴 ISLAND HQ PORTALS
  // ---------------------------------------------------
  island_hq: [
    // 1. Beach Portal → Grid Room
    {
      id: "beach_portal",
      position: new THREE.Vector3(0, 1.6, 2),
      rotation: new THREE.Euler(0, Math.PI, 0),
      destination: "grid_room",
      type: "fractal",
    },

    // 2. Shallow Water Portal → Moon Base (later)
    {
      id: "water_portal",
      position: new THREE.Vector3(-6, 1.4, 4),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
      destination: "moon_base",
      type: "fractal",
    },

    // 3. Palm Grove Portal → Earth (Greenville Falls District)
    {
      id: "palms_portal",
      position: new THREE.Vector3(6, 1.6, -2),
      rotation: new THREE.Euler(0, -Math.PI / 2, 0),
      destination: "earth_city_portal",
      type: "fractal",
    },

    // 4. Floating Water → 4D Chamber (future)
    {
      id: "floating_4d_portal",
      position: new THREE.Vector3(-3, 2.5, -6),
      rotation: new THREE.Euler(0, 0, 0),
      destination: "chamber_4d",
      type: "fractal",
    },

    // 5. Inland → Archive Vault (future)
    {
      id: "archive_portal",
      position: new THREE.Vector3(3, 1.6, -8),
      rotation: new THREE.Euler(0, Math.PI, 0),
      destination: "archive_vault",
      type: "fractal",
    },
  ],

  // ---------------------------------------------------
  // 🌆 MAUS GREENVILLE FALLS DISTRICT PORTALS
  // ---------------------------------------------------
  earth_city_portal: [
    {
      id: "falls_return_portal",
      position: new THREE.Vector3(0, 1.4, -1.5), // center of bridge
      rotation: new THREE.Euler(0, 0, 0),
      destination: "island_hq",
      type: "fractal",
    },
  ],

  // ---------------------------------------------------
  // OTHER ROOMS (placeholder)
  // ---------------------------------------------------
  grid_room: [],
  moon_base: [],
  chamber_4d: [],
  archive_vault: [],
};

export default portalRegistry;
