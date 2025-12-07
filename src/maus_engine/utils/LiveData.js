// 01frontend/src/maus-engine/utils/LiveData.js
import * as THREE from 'three';

// Fetch live texture from API or hosted image
export async function fetchLiveTexture(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        await img.decode();
        const texture = new THREE.Texture(img);
        texture.needsUpdate = true;
        return texture;
    } catch (err) {
        console.error('Failed to fetch live texture:', err);
        return null;
    }
}
