// 01frontend/maus-ui/src/maus/inventory/inventoryStore.ts
// COMPLETE • CLEAN • PORTAL KEYS INCLUDED

import { create } from "zustand";
import {
  MausInventory,
  MausItemDefinition,
  MausItemId,
  MausOwnerId,
  GiveItemPayload,
  TransferItemPayload,
  ConsumeItemPayload,
} from "./inventoryTypes";
import {
  addToInventory,
  getItemQuantity,
  removeFromInventory,
} from "./ownershipUtils";

interface MausInventoryState {
  items: Record<MausItemId, MausItemDefinition>;
  inventories: Record<MausOwnerId, MausInventory>;

  registerItem: (def: MausItemDefinition) => void;
  registerItemsBulk: (defs: MausItemDefinition[]) => void;

  ensureInventory: (ownerId: MausOwnerId) => void;
  giveItem: (payload: GiveItemPayload) => void;
  transferItem: (payload: TransferItemPayload) => void;
  consumeItem: (payload: ConsumeItemPayload) => void;

  getInventory: (ownerId: MausOwnerId) => MausInventory;
  getOwnerItemQuantity: (ownerId: MausOwnerId, itemId: MausItemId) => number;
}

const defaultGenesisItems: MausItemDefinition[] = [
  {
    id: "item:genesis-portal-key",
    name: "Genesis Portal Key",
    description: "Primary access key to the MAUS Genesis Room.",
    rarity: "legendary",
    stackable: false,
    tags: ["portal", "key", "genesis"],
  },
  {
    id: "item:starlight-shard",
    name: "Starlight Shard",
    description: "Fragment of MAUS starlight for portal fuel.",
    rarity: "rare",
    stackable: true,
    maxStackSize: 99,
    tags: ["starlight", "fuel"],
  },
  {
    id: "item:launch-clearance-badge",
    name: "Launch Clearance Badge",
    description: "Authorized access to SpaceX Platform routes.",
    rarity: "epic",
    stackable: false,
    tags: ["clearance", "spacex"],
  },
  {
    id: "item:founder-realm-key",
    name: "Founder Realm Key",
    description: "Key to enter the Founder Realm.",
    rarity: "legendary",
    stackable: false,
    tags: ["portal", "founder"],
  },
];

export const useMausInventoryStore = create<MausInventoryState>((set, get) => ({
  items: defaultGenesisItems.reduce<Record<MausItemId, MausItemDefinition>>(
    (acc, def) => {
      acc[def.id] = def;
      return acc;
    },
    {}
  ),

  inventories: {},

  registerItem: (def: MausItemDefinition) =>
    set((state) => ({
      items: {
        ...state.items,
        [def.id]: def,
      },
    })),

  registerItemsBulk: (defs: MausItemDefinition[]) =>
    set((state) => {
      const items = { ...state.items };
      defs.forEach((def) => {
        items[def.id] = def;
      });
      return { items };
    }),

  ensureInventory: (ownerId: MausOwnerId) =>
    set((state) => {
      if (state.inventories[ownerId]) return state;
      return {
        inventories: {
          ...state.inventories,
          [ownerId]: { ownerId, stacks: [] },
        },
      };
    }),

  giveItem: ({ ownerId, itemId, quantity }: GiveItemPayload) =>
    set((state) => {
      const itemDef = state.items[itemId];
      if (!itemDef) {
        console.warn("[MAUS Inventory] Unknown item:", itemId);
        return state;
      }

      const existing = state.inventories[ownerId] ?? {
        ownerId,
        stacks: [],
      };

      const updatedInv = addToInventory(existing, itemDef, quantity);

      return {
        inventories: {
          ...state.inventories,
          [ownerId]: updatedInv,
        },
      };
    }),

  transferItem: ({
    fromOwnerId,
    toOwnerId,
    itemId,
    quantity,
  }: TransferItemPayload) =>
    set((state) => {
      if (quantity <= 0) return state;

      const itemDef = state.items[itemId];
      if (!itemDef) {
        console.warn("[MAUS Inventory] Unknown item:", itemId);
        return state;
      }

      const fromInv = state.inventories[fromOwnerId] ?? {
        ownerId: fromOwnerId,
        stacks: [],
      };
      const toInv = state.inventories[toOwnerId] ?? {
        ownerId: toOwnerId,
        stacks: [],
      };

      const available = getItemQuantity(fromInv, itemId);
      if (available < quantity) {
        console.warn(
          "[MAUS Inventory] Insufficient quantity to transfer",
          fromOwnerId,
          itemId,
          quantity,
          "available:",
          available
        );
        return state;
      }

      const fromUpdated = removeFromInventory(fromInv, itemId, quantity);
      const toUpdated = addToInventory(toInv, itemDef, quantity);

      return {
        inventories: {
          ...state.inventories,
          [fromOwnerId]: fromUpdated,
          [toOwnerId]: toUpdated,
        },
      };
    }),

  consumeItem: ({ ownerId, itemId, quantity }: ConsumeItemPayload) =>
    set((state) => {
      if (quantity <= 0) return state;

      const inv = state.inventories[ownerId] ?? {
        ownerId,
        stacks: [],
      };

      const available = getItemQuantity(inv, itemId);
      if (available < quantity) {
        console.warn(
          "[MAUS Inventory] Insufficient quantity to consume",
          ownerId,
          itemId,
          quantity,
          "available:",
          available
        );
        return state;
      }

      const updatedInv = removeFromInventory(inv, itemId, quantity);

      return {
        inventories: {
          ...state.inventories,
          [ownerId]: updatedInv,
        },
      };
    }),

  getInventory: (ownerId: MausOwnerId) => {
    const { inventories } = get();
    return (
      inventories[ownerId] ?? {
        ownerId,
        stacks: [],
      }
    );
  },

  getOwnerItemQuantity: (ownerId: MausOwnerId, itemId: MausItemId) => {
    const { inventories } = get();
    const inv =
      inventories[ownerId] ?? {
        ownerId,
        stacks: [],
      };
    return getItemQuantity(inv, itemId);
  },
}));
