// --------------------------------------------------------
// Interactive Object
// File: src/maus-engine/objects/InteractiveObject.js
// --------------------------------------------------------

import MAUSObject from "./MAUSObject.js";

export default class InteractiveObject extends MAUSObject {
    constructor(name) {
        super(name);
        this.isInteractive = true;
    }

    onClick() {
        console.log(`[InteractiveObject] ${this.name} clicked`);
    }

    update(delta) {
        // Update interactive animations
    }

    render(camera) {
        // Render the object in scene
    }
}
