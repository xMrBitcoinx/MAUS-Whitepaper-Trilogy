// frontend/maus-ui/src/maus-engine/physics/TerrainSystem.js

import * as THREE from "three";

export default class TerrainSystem {
  constructor() {
    this.heightFunction = null;   // math-based terrain
    this.meshes = [];             // 3D terrain meshes
    this.raycaster = new THREE.Raycaster();
    this.downVector = new THREE.Vector3(0, -1, 0);
  }

  // Option 1: mathematical height function
  setHeightFunction(fn) {
    this.heightFunction = fn;
  }

  // Option 2: real geometry (terrain meshes, ramps, platforms, floors)
  addTerrainMesh(mesh) {
    this.meshes.push(mesh);
  }

  // RAYCAST: get mesh height under player
  _sampleMeshHeight(x, z) {
    if (this.meshes.length === 0) return null;

    this.raycaster.set(new THREE.Vector3(x, 1000, z), this.downVector);
    const hits = this.raycaster.intersectObjects(this.meshes, true);

    if (hits.length > 0) {
      return hits[0].point.y;
    }

    return null;
  }

  // Combined height sampling:
  // Mesh → heightFunction → fallback
  getHeightAt(x, z) {
    // 1. Try mesh terrain
    const meshHeight = this._sampleMeshHeight(x, z);
    if (meshHeight !== null) return meshHeight;

    // 2. Try height function
    if (this.heightFunction) {
      return this.heightFunction(x, z);
    }

    // 3. Default ground
    return 1;
  }

  isSlopeTooSteep(currentY, targetY, maxStep = 0.5) {
    return targetY - currentY > maxStep;
  }
}
