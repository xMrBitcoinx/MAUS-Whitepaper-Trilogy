// frontend/maus-ui/src/maus-engine/physics/ColliderSystem.js

// Simple AABB (axis-aligned bounding box) collision detection & resolution
export default class ColliderSystem {
  constructor() {
    this.colliders = [];
  }

  // World can add a new collider: { x, y, z, width, height, depth }
  addBoxCollider(box) {
    this.colliders.push(box);
  }

  // Player capsule represented as a tall bounding box for now
  resolveCollisions(playerPos, capsuleSize = { radius: 0.4, height: 1.8 }) {
    const halfW = capsuleSize.radius;
    const halfD = capsuleSize.radius;
    const halfH = capsuleSize.height / 2;

    // Player bounding box
    const playerBox = {
      minX: playerPos.x - halfW,
      maxX: playerPos.x + halfW,
      minY: playerPos.y - halfH,
      maxY: playerPos.y + halfH,
      minZ: playerPos.z - halfD,
      maxZ: playerPos.z + halfD,
    };

    // Check collisions with all scene colliders
    for (const box of this.colliders) {
      const obj = {
        minX: box.x - box.width / 2,
        maxX: box.x + box.width / 2,
        minY: box.y - box.height / 2,
        maxY: box.y + box.height / 2,
        minZ: box.z - box.depth / 2,
        maxZ: box.z + box.depth / 2,
      };

      const intersect =
        playerBox.minX <= obj.maxX &&
        playerBox.maxX >= obj.minX &&
        playerBox.minY <= obj.maxY &&
        playerBox.maxY >= obj.minY &&
        playerBox.minZ <= obj.maxZ &&
        playerBox.maxZ >= obj.minZ;

      if (!intersect) continue;

      const depthX =
        playerBox.maxX > obj.minX
          ? obj.minX - playerBox.maxX
          : obj.maxX - playerBox.minX;

      const depthZ =
        playerBox.maxZ > obj.minZ
          ? obj.minZ - playerBox.maxZ
          : obj.maxZ - playerBox.minZ;

      // Resolve shallowest axis → prevents “pop”
      if (Math.abs(depthX) < Math.abs(depthZ)) {
        playerPos.x += depthX;
      } else {
        playerPos.z += depthZ;
      }
    }

    return playerPos;
  }
}
