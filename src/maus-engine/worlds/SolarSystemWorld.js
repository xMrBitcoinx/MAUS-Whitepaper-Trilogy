// --------------------------------------------------------
// Solar System World
// File: src/maus-engine/worlds/SolarSystemWorld.js
// --------------------------------------------------------

export default class SolarSystemWorld {
    constructor() {
        this.name = "Solar System";
        this.planets = [];
    }

    onLoad(engine) {
        console.log("[SolarSystemWorld] Loaded into MAUS Engine");
        // Load planets and orbits
    }

    update(delta) {
        this.planets.forEach(planet => planet.update(delta));
    }

    render(camera) {
        this.planets.forEach(planet => planet.render(camera));
    }
}
