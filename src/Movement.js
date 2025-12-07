// 📁 03frontend/src/Movement.js

const THREE = require('three');  // If using Three.js for 3D

let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();

// Movement speed
const speed = 0.1;

function updateMovement(entity, deltaTime) {
  // Example: Forward movement
  direction.z = speed * deltaTime;
  entity.position.add(direction);
}

module.exports = { updateMovement };
