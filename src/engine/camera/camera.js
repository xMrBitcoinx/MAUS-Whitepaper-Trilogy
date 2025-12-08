// 📁 03frontend/src/engine/camera/Camera.js

import { PerspectiveCamera } from 'three';

class EngineCamera {
  constructor() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5); // Default camera position
  }

  // Method to update the camera aspect ratio on window resize
  updateAspectRatio() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix(); // Update the projection matrix to account for the new aspect ratio
  }

  // Method to update camera position manually (could be called from other parts of the engine)
  updatePosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  // Method to get the camera instance
  getCamera() {
    return this.camera;
  }
}

export default EngineCamera;
