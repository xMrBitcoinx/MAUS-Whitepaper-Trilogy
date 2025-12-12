// 📄 03frontend/src/controls/CameraController.ts
// MAUS Engine 0.1 — Camera Controller
// Handles WASD movement, third-person toggle (V), dynamic update, TS-safe

import * as THREE from 'three';

interface KeyState {
  [key: string]: boolean;
}

export default class CameraController {
  private camera: THREE.PerspectiveCamera;
  private velocity: THREE.Vector3;
  private keyState: KeyState = {};

  private readonly moveSpeed = 6.0;   // WASD movement speed
  private readonly zoomDistance = 6;  // third-person camera distance
  private isThirdPerson = false;       // V toggle state
  private thirdPersonOffset = new THREE.Vector3(0, 2, this.zoomDistance);

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.velocity = new THREE.Vector3();

    // --- Key listeners ---
    window.addEventListener('keydown', (e) => (this.keyState[e.key.toUpperCase()] = true));
    window.addEventListener('keyup', (e) => (this.keyState[e.key.toUpperCase()] = false));
  }

  // --- Main update loop (called every frame) ---
  update(delta: number) {
    this.handleMovement(delta);
    this.handleViewMode();
  }

  // --- WASD Movement (local-space movement) ---
  private handleMovement(delta: number) {
    const direction = new THREE.Vector3();

    // forward / backward relative to camera direction
    if (this.keyState["W"]) direction.z -= 1;
    if (this.keyState["S"]) direction.z += 1;

    // strafing relative to camera rotation
    if (this.keyState["A"]) direction.x -= 1;
    if (this.keyState["D"]) direction.x += 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();
      direction.applyQuaternion(this.camera.quaternion);
      direction.y = 0; // prevent flying
      direction.multiplyScalar(this.moveSpeed * delta);
      this.camera.position.add(direction);
    }
  }

  // --- Third-person toggle with V ---
  private handleViewMode() {
    if (this.keyState["V"]) {
      this.isThirdPerson = !this.isThirdPerson;
      this.keyState["V"] = false;  // prevent held-key spam
    }

    if (this.isThirdPerson) {
      const target = new THREE.Vector3().copy(this.camera.position);
      const behind = this.thirdPersonOffset.clone().applyQuaternion(this.camera.quaternion);
      this.camera.position.copy(target.clone().add(behind));
    }
  }
}
