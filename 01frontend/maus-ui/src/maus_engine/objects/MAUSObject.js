// --------------------------------------------------------
// Base MAUS Object
// File: src/maus-engine/objects/MAUSObject.js
// --------------------------------------------------------

export default class MAUSObject {
    constructor(name = "MAUSObject") {
        this.name = name;
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    }

    update(delta) {
        // Placeholder for per-frame updates
    }

    render(camera) {
        // Placeholder for rendering logic
    }
}
