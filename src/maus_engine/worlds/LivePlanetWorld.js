// 01frontend/src/maus-engine/worlds/LivePlanetWorld.js
import { Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import { MAUSWorld } from './MAUSWorldBase';
import { fetchLiveTexture } from '../utils/LiveData';

export class LivePlanetWorld extends MAUSWorld {
    constructor(scene, initialTextureURL, updateInterval = 300000) {
        super(scene);
        this.scene = scene;
        this.updateInterval = updateInterval;
        this.initialTextureURL = initialTextureURL;
        this.loader = new TextureLoader();

        this.loader.load(initialTextureURL, (texture) => {
            this.planetTexture = texture;
            this.initPlanetMesh();
        });

        this.startLiveUpdates();
    }

    initPlanetMesh() {
        if (!this.planetMesh) return;
        const geometry = this.planetMesh.geometry.clone();
        const material = new MeshStandardMaterial({
            map: this.planetTexture,
            transparent: true,
        });
        this.planetMesh.material = material;
    }

    async updateLiveTexture(url) {
        try {
            const liveTexture = await fetchLiveTexture(url);
            if (liveTexture && this.planetMesh) {
                this.planetMesh.material.map = liveTexture;
                this.planetMesh.material.needsUpdate = true;
            }
        } catch (err) {
            console.warn('Live update failed:', err);
        }
    }

    startLiveUpdates() {
        this.updateIntervalId = setInterval(async () => {
            if (!this.canUpdate()) return;
            if (this.liveTextureURL) await this.updateLiveTexture(this.liveTextureURL);
        }, this.updateInterval);
    }

    canUpdate() {
        // Placeholder for GPU/memory check — returns true for now
        return true;
    }

    setUpdateInterval(newIntervalMs) {
        this.updateInterval = newIntervalMs;
        clearInterval(this.updateIntervalId);
        this.startLiveUpdates();
    }
}
