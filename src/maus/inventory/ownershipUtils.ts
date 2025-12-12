// 01frontend/src/maus/inventory/ownershipUtils.ts

import {
  MausInventory,
  MausInventoryStack,
  MausItemDefinition,
} from "./inventoryTypes";

export function findStackIndex(
  inventory: MausInventory,
  itemId: string
): number {
  return inventory.stacks.findIndex((s) => s.itemId === itemId);
}

export function addToInventory(
  inventory: MausInventory,
  itemDef: MausItemDefinition,
  quantity: number
): MausInventory {
  if (quantity <= 0) return inventory;

  const updated: MausInventory = {
    ...inventory,
    stacks: [...inventory.stacks],
  };

  const index = findStackIndex(updated, itemDef.id);
  const stackable = itemDef.stackable ?? true;
  const maxStackSize = itemDef.maxStackSize ?? Number.MAX_SAFE_INTEGER;

  if (!stackable) {
    // Non-stackable: one stack per item
    for (let i = 0; i < quantity; i += 1) {
      updated.stacks.push({ itemId: itemDef.id, quantity: 1 });
    }
    return updated;
  }

  if (index === -1) {
    updated.stacks.push({
      itemId: itemDef.id,
      quantity: Math.min(quantity, maxStackSize),
    });
  } else {
    const stack = updated.stacks[index];
    const newQty = Math.min(stack.quantity + quantity, maxStackSize);
    updated.stacks[index] = { ...stack, quantity: newQty };
  }

  return updated;
}

export function removeFromInventory(
  inventory: MausInventory,
  itemId: string,
  quantity: number
): MausInventory {
  if (quantity <= 0) return inventory;

  const updated: MausInventory = {
    ...inventory,
    stacks: [...inventory.stacks],
  };

  let remaining = quantity;

  for (let i = 0; i < updated.stacks.length && remaining > 0; i += 1) {
    const stack = updated.stacks[i];
    if (stack.itemId !== itemId) continue;

    if (stack.quantity > remaining) {
      updated.stacks[i] = {
        ...stack,
        quantity: stack.quantity - remaining,
      };
      remaining = 0;
    } else {
      remaining -= stack.quantity;
      updated.stacks.splice(i, 1);
      i -= 1;
    }
  }

  return updated;
}

export function getItemQuantity(
  inventory: MausInventory,
  itemId: string
): number {
  return inventory.stacks
    .filter((s: MausInventoryStack) => s.itemId === itemId)
    .reduce((sum, s) => sum + s.quantity, 0);
}
