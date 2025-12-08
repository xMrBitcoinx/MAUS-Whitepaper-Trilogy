// 01frontend/src/maus/inventory/inventoryTypes.ts

export type MausOwnerId = string;      // e.g. "user:alice", "room:genesis:001"
export type MausItemId = string;       // global item id, e.g. "item:portal-key:alpha"

export interface MausItemDefinition {
  id: MausItemId;
  name: string;
  description?: string;
  rarity?: "common" | "uncommon" | "rare" | "epic" | "legendary";
  stackable?: boolean;
  maxStackSize?: number;               // only matters if stackable
  iconKey?: string;                    // for later UI / asset mapping
  tags?: string[];                     // e.g. ["portal", "key", "consumable"]
}

export interface MausInventoryStack {
  itemId: MausItemId;
  quantity: number;
}

export interface MausInventory {
  ownerId: MausOwnerId;
  stacks: MausInventoryStack[];
}

export interface MausOwnershipRecord {
  itemId: MausItemId;
  ownerId: MausOwnerId;
  quantity: number;
}

export interface GiveItemPayload {
  ownerId: MausOwnerId;
  itemId: MausItemId;
  quantity: number;
}

export interface TransferItemPayload {
  fromOwnerId: MausOwnerId;
  toOwnerId: MausOwnerId;
  itemId: MausItemId;
  quantity: number;
}

export interface ConsumeItemPayload {
  ownerId: MausOwnerId;
  itemId: MausItemId;
  quantity: number;
}
