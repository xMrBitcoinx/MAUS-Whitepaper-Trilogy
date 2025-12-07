import { LivePlanetWorld } from './LivePlanetWorld';

export class MarsWorld extends LivePlanetWorld {
    constructor(scene, updateInterval = 300000) {
        super(scene, '/src/assets/nasa/mars/mars_surface.png', updateInterval);
        this.liveTextureURL = null; // base Mars surface
        this.liveDustURL = 'https://your-api-or-host/mars_dust.png';
    }

    async updateLiveDustFromAPI() {
        if (!this.liveDustURL) return;
        await this.updateLiveTexture(this.liveDustURL);
    }

    startLiveUpdates() {
        this.updateIntervalId = setInterval(async () => {
            if (!this.canUpdate()) return;
            // Update Mars dust
            await this.updateLiveDustFromAPI();
        }, this.updateInterval);
    }
}
