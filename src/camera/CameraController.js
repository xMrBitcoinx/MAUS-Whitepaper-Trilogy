// 📁 src/camera/CameraController.js
import { Vector3 } from 'three';

const speed = 0.1;  // Movement speed for WASD
let zoomSpeed = 1;  // Zoom speed for camera

class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.velocity = new Vector3();
  }

  updateMovement(deltaTime, keyState) {
    // Move forward
    if (keyState["W"]) {
      const direction = new Vector3(0, 0, -1);  // Move along the z-axis
      direction.multiplyScalar(speed * deltaTime);
      this.camera.position.add(direction);
    }
    
    // Move backward
    if (keyState["S"]) {
      const direction = new Vector3(0, 0, 1);  // Move backward along the z-axis
      direction.multiplyScalar(speed * deltaTime);
      this.camera.position.add(direction);
    }
    
    // Strafe left
    if (keyState["A"]) {
      const direction = new Vector3(-1, 0, 0);  // Move left along the x-axis
      direction.multiplyScalar(speed * deltaTime);
      this.camera.position.add(direction);
    }
    
    // Strafe right
    if (keyState["D"]) {
      const direction = new Vector3(1, 0, 0);  // Move right along the x-axis
      direction.multiplyScalar(speed * deltaTime);
      this.camera.position.add(direction);
    }

    // Zoom in and out
    if (keyState["V"]) {
      this.camera.position.z += zoomSpeed * deltaTime;  // Zoom out by moving the camera away
    }
  }
}

export default CameraController;
