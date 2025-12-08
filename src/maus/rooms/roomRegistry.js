// 01frontend/src/maus/rooms/roomRegistry.js

import IslandRoom from "./IslandRoom";
import GridRoom from "./GridRoom";
import GreenvilleRoom from "./GreenvilleRoom";

// placeholder for rooms we will build next
const PlaceholderRoom = () => {
  return (
    <mesh>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const roomRegistry = {
  // -------------------------------------------
  // 🌴 Island HQ (Room 0)
  // -------------------------------------------
  island_hq: {
    id: "island_hq",
    component: IslandRoom,
    spawn: {
      x: 0,
      y: 2,
      z: 10,
      ry: 0,
    },
  },

  // -------------------------------------------
  // 🌐 Neon Grid Room
  // -------------------------------------------
  grid_room: {
    id: "grid_room",
    component: GridRoom,
    spawn: {
      x: 0,
      y: 2,
      z: 4,
      ry: 0,
    },
  },

  // -------------------------------------------
  // 🌆 MAUS Greenville Falls District (Earth Node 01)
  // -------------------------------------------
  earth_city_portal: {
    id: "earth_city_portal",
    component: GreenvilleRoom,
    spawn: {
      x: 0,
      y: 2.2,
      z: 2.5, // approaching the center of the bridge
      ry: Math.PI, // face toward the city
    },
  },

  // -------------------------------------------
  // 🌙 Moon Base (coming soon)
  // -------------------------------------------
  moon_base: {
    id: "moon_base",
    component: PlaceholderRoom,
    spawn: {
      x: 0,
      y: 2,
      z: 0,
      ry: Math.PI,
    },
  },

  // -------------------------------------------
  // 🌀 4D Chamber (coming soon)
  // -------------------------------------------
  chamber_4d: {
    id: "chamber_4d",
    component: PlaceholderRoom,
    spawn: {
      x: 0,
      y: 2,
      z: 0,
      ry: 0,
    },
  },

  // -------------------------------------------
  // 🔐 Archive Vault (coming soon)
  // -------------------------------------------
  archive_vault: {
    id: "archive_vault",
    component: PlaceholderRoom,
    spawn: {
      x: 0,
      y: 2,
      z: 0,
      ry: 0,
    },
  },
};

export default roomRegistry;
