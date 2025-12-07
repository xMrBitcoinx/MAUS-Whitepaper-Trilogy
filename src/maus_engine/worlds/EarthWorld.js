// 01frontend/src/maus-engine/worlds/EarthWorld.js
import { LivePlanetWorld } from './LivePlanetWorld';

export class EarthWorld extends LivePlanetWorld {
    constructor(scene, updateInterval = 300000) {
        super(scene, '/src/assets/nasa/earth/earth_clouds_8k.png', updateInterval);
        this.liveTextureURL = 'https://your-api-or-host/earth_clouds.png';
    }
}
