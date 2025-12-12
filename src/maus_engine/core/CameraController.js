// --------------------------------------------------------
// Camera Controller
// File: src/maus-engine/core/CameraController.js
// --------------------------------------------------------

export default class CameraController {
    constructor(canvas) {
        this.canvas = canvas;
        this.position = { x: 0, y: 0, z: 10 };
        this.rotation = { x: 0, y: 0, z: 0 };
    }

    update(delta) {
        // Placeholder for orbit/WASD/fly camera logic
    }

    moveTo(x, y, z) {
        this.position = { x, y, z };
    }

    rotate(x, y, z) {
        this.rotation = { x, y, z };
    }
}
