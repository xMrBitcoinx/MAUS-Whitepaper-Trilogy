// --------------------------------------------------------
// Scene Manager
// File: src/maus-engine/core/SceneManager.js
// R3F + MAUSEngine Compatible
// --------------------------------------------------------

export default class SceneManager {
    constructor() {
        this.currentWorld = null;
    }

    // ----------------------------------------------------
    // Assign active world
    // ----------------------------------------------------
    setWorld(world) {
        this.currentWorld = world;
        console.log(`[SceneManager] World set to: ${world.name}`);
    }

    // ----------------------------------------------------
    // Update loop
    // ----------------------------------------------------
    update(delta) {
        if (!this.currentWorld) return;

        // World has its own update(delta)
        if (typeof this.currentWorld.update === "function") {
            this.currentWorld.update(delta);
        }
    }

    // ----------------------------------------------------
    // Render support (optional override)
    // (MAUSEngine will trigger this if world has a render method)
    // ----------------------------------------------------
    render(renderer, scene, camera, delta) {
        if (!this.currentWorld) return;

        if (typeof this.currentWorld.render === "function") {
            this.currentWorld.render(renderer, scene, camera, delta);
        }
    }
}
