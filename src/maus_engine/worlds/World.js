// 01frontend/maus-ui/src/maus-engine/worlds/World.js

import * as THREE from "three";

export default class World {
    constructor(name = "UnnamedWorld") {
        this.name = name;
        this.group = new THREE.Group(); // every world has a root group
    }

    // Runs once when the world is loaded
    init(scene, renderer, camera) {
        // Override in subclass
    }

    // Runs every frame from SceneManager
    update(delta) {
        // Override in subclass
    }

    // Optionally override world-level render
    render(renderer, scene, camera, delta) {
        // Usually not needed
    }
}
