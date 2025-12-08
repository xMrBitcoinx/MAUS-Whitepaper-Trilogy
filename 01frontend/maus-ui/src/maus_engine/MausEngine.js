// 📁 src/maus_engine/MausEngine.js

import * as THREE from 'three';

class MausEngine {
  constructor() {
    this.scene = new THREE.Scene(); // The 3D scene
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Camera setup
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight); // Renderer setup
    document.body.appendChild(this.renderer.domElement); // Append renderer to the DOM

    this.objects = []; // Hold 3D objects that are part of the engine
    this.isRunning = false; // Engine state (running or paused)
  }

  // Add a 3D object to the scene
  addObject(object) {
    this.objects.push(object);
    this.scene.add(object);
  }

  // Start the engine (animation loop)
  start() {
    this.isRunning = true;
    this.animate(); // Start the animation loop
  }

  // Stop the engine (animation loop)
  stop() {
    this.isRunning = false;
  }

  // The animation loop for updating the scene
  animate() {
    if (this.isRunning) {
      requestAnimationFrame(() => this.animate());
    }

    // Update all objects in the scene
    this.objects.forEach((object) => {
      if (object.update) object.update(); // Call update method if it exists on the object
    });

    // Render the scene with the camera
    this.renderer.render(this.scene, this.camera);
  }

  // Set the camera position and view
  setCameraPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  // Resize the renderer and update the camera aspect ratio on window resize
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default MausEngine;
