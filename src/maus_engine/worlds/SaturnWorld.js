// 01frontend/src/maus-engine/worlds/SaturnWorld.js
import { LivePlanetWorld } from './LivePlanetWorld';

export class SaturnWorld extends LivePlanetWorld {
    constructor(scene, updateInterval = 300000) {
        super(scene, '/src/assets/nasa/saturn/saturn_surface.png', updateInterval);
        this.liveTextureURL = 'https://your-api-or-host/saturn_bands.png';
    }
}
