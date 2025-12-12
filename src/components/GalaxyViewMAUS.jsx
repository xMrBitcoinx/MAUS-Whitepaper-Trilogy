// 01frontend/src/components/GalaxyViewMAUS.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { MAUSEngine } from '../maus-engine/core/MAUSEngine';
import { EarthWorld } from '../maus-engine/worlds/EarthWorld';
import { MarsWorld } from '../maus-engine/worlds/MarsWorld';
import { MoonWorld } from '../maus-engine/worlds/MoonWorld';
import { JupiterWorld } from '../maus-engine/worlds/JupiterWorld';
import { SaturnWorld } from '../maus-engine/worlds/SaturnWorld';
import { Tween } from '@tweenjs/tween.js';

export default function GalaxyViewMAUS() {
    const mountRef = useRef(null);
    const [engine, setEngine] = useState(null);
    const [currentWorld, setCurrentWorld] = useState(null);

    // Planet positions in galaxy
    const planetPositions = {
        Earth: new THREE.Vector3(-5, 0, 0),
        Mars: new THREE.Vector3(5, 0, 0),
        Moon: new THREE.Vector3(0, 3, 0),
        Jupiter: new THREE.Vector3(-7, 3, 0),
        Saturn: new THREE.Vector3(7, 3, 0),
    };

    useEffect(() => {
        const scene = new THREE.Scene();
        const mausEngine = new MAUSEngine(mountRef.current);
        setEngine(mausEngine);

        // Initialize all planets
        const planets = {
            Earth: new EarthWorld(scene),
            Mars: new MarsWorld(scene),
            Moon: new MoonWorld(scene),
            Jupiter: new JupiterWorld(scene),
            Saturn: new SaturnWorld(scene),
        };

        // Position planets in galaxy
        Object.keys(planets).forEach((name) => {
            const world = planets[name];
            world.planetMesh.position.copy(planetPositions[name]);
            if (world.cloudMesh) world.cloudMesh.position.copy(planetPositions[name]);
            if (world.nightMesh) world.nightMesh.position.copy(planetPositions[name]);
            if (world.atmosphereMesh) world.atmosphereMesh.position.copy(planetPositions[name]);
        });

        mausEngine.loadWorld(planets.Earth);
        setCurrentWorld(planets.Earth);
        mausEngine.start();

        return () => mausEngine.stop();
    }, []);

    // Fly camera to selected planet
    const flyToPlanet = (planetName) => {
        if (!engine || !currentWorld) return;
        const targetPos = planetPositions[planetName];
        const start = { x: engine.camera.position.x, y: engine.camera.position.y, z: engine.camera.position.z };
        new Tween(start)
            .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z + 5 }, 2000)
            .easing(Tween.Easing.Cubic.InOut)
            .onUpdate(() => {
                engine.camera.position.set(start.x, start.y, start.z);
                engine.camera.lookAt(targetPos);
            })
            .start();
    };

    return (
        <div style={{ width: '100%', height: '100vh' }} ref={mountRef}>
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                {Object.keys(planetPositions).map((name) => (
                    <button key={name} onClick={() => flyToPlanet(name)}>{name}</button>
                ))}
            </div>
        </div>
    );
}
