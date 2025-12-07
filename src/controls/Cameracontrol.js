// 📁 src/controls/CameraControl.js

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// CameraControl class to handle controls and camera logic
class CameraControl {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Enable damping for smooth movement
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2; // Lock vertical camera rotation
    this.controls.enableZoom = true; // Allow zooming
  }

  // Update camera controls
  update(deltaTime) {
    this.controls.update(); // Required if controls.enableDamping or controls.auto-rotation are enabled
  }
}

export default CameraControl;
