import { LivePlanetWorld } from './LivePlanetWorld';

export class JupiterWorld extends LivePlanetWorld {
    constructor(scene, updateInterval = 300000) {
        super(scene, '/src/assets/nasa/jupiter/jupiter_surface.png', updateInterval);
        this.liveTextureURL = null;
        this.liveBandsURL = 'https://your-api-or-host/jupiter_bands.png';
    }

    async updateLiveCloudBandsFromAPI() {
        if (!this.liveBandsURL) return;
        await this.updateLiveTexture(this.liveBandsURL);
    }

    startLiveUpdates() {
        this.updateIntervalId = setInterval(async () => {
            if (!this.canUpdate()) return;
            await this.updateLiveCloudBandsFromAPI();
        }, this.updateInterval);
    }
}
