// --------------------------------------------------------
// Planet Object
// File: src/maus-engine/objects/PlanetObject.js
// --------------------------------------------------------

import MAUSObject from "./MAUSObject.js";

export default class PlanetObject extends MAUSObject {
    constructor(name, radius = 1, texture = null) {
        super(name);
        this.radius = radius;
        this.texture = texture;
    }

    update(delta) {
        // Rotate planet
        this.rotation.y += 0.01 * delta;
    }

    render(camera) {
        // Placeholder: render planet using camera
    }
}
