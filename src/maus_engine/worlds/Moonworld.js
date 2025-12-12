// 01frontend/src/maus-engine/worlds/MoonWorld.js
import { LivePlanetWorld } from './LivePlanetWorld';

export class MoonWorld extends LivePlanetWorld {
    constructor(scene, updateInterval = 300000) {
        super(scene, '/src/assets/nasa/moon/moon_surface.png', updateInterval);
        this.liveTextureURL = null; // Moon may not have live updates yet
    }
}
