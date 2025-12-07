// 01frontend/maus-ui/src/maus-engine/portals/PortalManager.jsx
// PORTAL LOGIC: INVENTORY CHECK + TRAVEL START

import React, { useMemo } from "react";
import Portal from "./Portal";
import { usePlanetRouter } from "../routing/PlanetRouter";
import { useMausInventoryStore } from "../../maus/inventory/inventoryStore";

const OWNER_ID = "identity:local-user"; // temporary local dev identity

const UNLOCK_RULES = {
  gov: {
    itemId: "item:genesis-portal-key",
    amount: 1,
  },
  nasa: {
    itemId: "item:starlight-shard",
    amount: 3,
  },
  spacex: {
    itemId: "item:launch-clearance-badge",
    amount: 1,
  },
  founder: {
    itemId: "item:founder-realm-key",
    amount: 1,
  },
  earth: null, // free return
};

export default function PortalManager({ targetPlanet, position = [0, 0, 0] }) {
  const { beginTravel } = usePlanetRouter();
  const getQty = useMausInventoryStore((s) => s.getOwnerItemQuantity);
  const items = useMausInventoryStore((s) => s.items);

  const requirement = UNLOCK_RULES[targetPlanet] ?? null;

  const requirementLabel = useMemo(() => {
    if (!requirement) return "No key required";
    const def = items[requirement.itemId];
    const name = def?.name ?? requirement.itemId;
    return `${requirement.amount}× ${name}`;
  }, [requirement, items]);

  const locked = useMemo(() => {
    if (!requirement) return false;
    const have = getQty(OWNER_ID, requirement.itemId);
    return have < requirement.amount;
  }, [requirement, getQty]);

  const handleActivate = () => {
    if (locked) {
      console.warn("[MAUS Portal] Locked portal, missing requirement:", {
        targetPlanet,
        requirement,
      });
      return;
    }
    beginTravel(targetPlanet);
  };

  return (
    <group position={position}>
      <Portal onActivate={handleActivate} />
      {/* Small “tooltip” marker above portal */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[2.5, 0.3, 0.3]} />
        <meshStandardMaterial color={locked ? "red" : "lime"} />
      </mesh>
      {/* We only visually show locked/unlocked with color here */}
    </group>
  );
}
